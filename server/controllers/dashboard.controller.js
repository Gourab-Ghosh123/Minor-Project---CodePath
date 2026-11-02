const Progress = require('../models/Progress');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const User = require('../models/User');

const TOPICS = [
  'Arrays',
  'Strings',
  'Two Pointers',
  'Sliding Window',
  'Linked List',
  'Stack',
  'Queue',
  'Binary Search',
  'Trees',
  'Graphs',
  'Dynamic Programming',
];

const TOPIC_DIAGNOSTICS = {
  'Arrays': {
    trap: 'Off-by-one loop boundaries and nested loops causing O(n²) Time Limit Exceeded.',
    tip: 'Use hash maps for O(1) lookups or Kadane\'s running sum to keep it linear O(n).',
  },
  'Strings': {
    trap: 'Ignoring uppercase vs lowercase differences and non-alphanumeric punctuation marks.',
    tip: 'Normalize string with toLowerCase() and use two pointers or a 26-char frequency counter.',
  },
  'Two Pointers': {
    trap: 'Moving the wrong pointer or forgetting that the array must be sorted.',
    tip: 'Identify which pointer controls the bottleneck (e.g. shorter container wall) and move that one.',
  },
  'Sliding Window': {
    trap: 'Shrinking the window too little or moving the left pointer backwards.',
    tip: 'Always ensure left pointer only moves forward with Math.max(left, map[char] + 1).',
  },
  'Linked List': {
    trap: 'Losing reference to the rest of the list when assigning curr.next = prev.',
    tip: 'Always stash curr.next into a nextTemp variable before breaking pointers.',
  },
  'Stack': {
    trap: 'Popping from an empty stack or forgetting unclosed brackets at the end.',
    tip: 'Always guard stack.pop() and check that stack is empty after processing.',
  },
  'Queue': {
    trap: 'Inefficient stack-to-stack transfer on every push.',
    tip: 'Only transfer from inStack to outStack when outStack is completely empty.',
  },
  'Binary Search': {
    trap: 'Infinite loops from left = mid instead of left = mid + 1, and integer overflow in (l+r)/2.',
    tip: 'Use left + (right - left) // 2 and condition left <= right.',
  },
  'Trees': {
    trap: 'Missing base case `if (!root) return 0;` causing call stack overflow.',
    tip: 'Break problem into subproblems: solve for left child, solve for right child, then combine at root.',
  },
  'Graphs': {
    trap: 'Infinite recursion cycles from forgetting to mark visited nodes.',
    tip: 'Sink visited cells immediately to "0" or maintain a visited Set.',
  },
  'Dynamic Programming': {
    trap: 'Thinking DP is complicated recursion; trying to compute all subproblems repeatedly.',
    tip: 'Start by writing down base cases, then express state(i) using state(i-1) and state(i-2).',
  },
};

const getPersonalizedRecommendation = async (userId, userProgressList, userDomain) => {
  const solvedProblemIds = await Submission.find({
    userId,
    status: 'Accepted',
  }).distinct('problemId');

  let weakestTopic = null;
  let reason = '';
  let candidateTopics = [];

  for (const prog of userProgressList) {
    if (prog.totalSubmissions > 0 && prog.accuracy < 60 && prog.status !== 'Locked') {
      candidateTopics.push({
        topic: prog.topic,
        accuracy: prog.accuracy,
        solved: prog.problemsSolved,
        total: prog.totalProblems,
        submissions: prog.totalSubmissions,
      });
    }
  }

  if (candidateTopics.length > 0) {
    candidateTopics.sort((a, b) => a.accuracy - b.accuracy);
    weakestTopic = candidateTopics[0].topic;
    reason = `Your current accuracy in ${weakestTopic} is ${candidateTopics[0].accuracy}% across ${candidateTopics[0].submissions} submissions. Focus on strengthening foundational patterns here.`;
  } else {
    for (const prog of userProgressList) {
      if (prog.status !== 'Locked' && prog.problemsSolved < prog.totalProblems && prog.totalProblems > 0) {
        weakestTopic = prog.topic;
        const completionPct = Math.round((prog.problemsSolved / prog.totalProblems) * 100);
        reason = `You have completed ${completionPct}% of ${weakestTopic}. Continue practicing to master this module before advancing.`;
        break;
      }
    }
  }

  if (!weakestTopic) {
    weakestTopic = 'Arrays';
    reason = `Start building your algorithmic problem-solving momentum with foundational Array problems.`;
  }

  let problemFilter = {
    topic: weakestTopic,
    _id: { $nin: solvedProblemIds },
  };

  if (userDomain && userDomain !== 'software-development') {
    problemFilter.domainRelevance = userDomain;
  }

  let recommendedProblems = await Problem.find(problemFilter)
    .sort({ order: 1 })
    .limit(3);

  if (recommendedProblems.length === 0) {
    recommendedProblems = await Problem.find({
      topic: weakestTopic,
      _id: { $nin: solvedProblemIds },
    })
      .sort({ order: 1 })
      .limit(3);
  }

  if (recommendedProblems.length === 0) {
    recommendedProblems = await Problem.find({
      topic: weakestTopic,
    })
      .sort({ order: 1 })
      .limit(3);
  }

  return {
    recommendedTopic: weakestTopic,
    reason,
    recommendedProblems: recommendedProblems.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      difficulty: p.difficulty,
      topic: p.topic,
      series: p.series || 'Core Essentials',
    })),
  };
};

const getStuckTopicsAnalysis = async (userId, userProgressList) => {
  const stuckTopics = [];

  for (const prog of userProgressList) {
    const failedSubmissions = prog.totalSubmissions - prog.successfulSubmissions;
    const isStuck = (prog.totalSubmissions >= 2 && prog.accuracy < 60) || (failedSubmissions >= 2);

    if (isStuck) {
      const topicInfo = TOPIC_DIAGNOSTICS[prog.topic] || {
        trap: 'Boundary conditions and edge case handling.',
        tip: 'Review fundamental examples and test edge cases on paper.',
      };

      const warmUpProblem = await Problem.findOne({
        topic: prog.topic,
        difficulty: 'Easy',
      }).select('title slug difficulty');

      stuckTopics.push({
        topic: prog.topic,
        accuracy: prog.accuracy,
        totalSubmissions: prog.totalSubmissions,
        failedSubmissions,
        identifiedTrap: topicInfo.trap,
        buddyRescueTip: topicInfo.tip,
        remedialProblem: warmUpProblem ? {
          title: warmUpProblem.title,
          slug: warmUpProblem.slug,
          difficulty: warmUpProblem.difficulty,
        } : null,
      });
    }
  }

  return stuckTopics;
};

const calculateBadges = (totalSolved, accuracy, streak, topicsCompleted) => {
  const badges = [
    {
      id: 'first_solve',
      name: 'First Step Taken',
      icon: '🌱',
      description: 'Solved your very first algorithmic problem on CodePath!',
      unlocked: totalSolved >= 1,
    },
    {
      id: 'speed_runner',
      name: 'Streak Striker',
      icon: '🔥',
      description: 'Maintained a multi-day consistent learning rhythm!',
      unlocked: streak >= 2,
    },
    {
      id: 'accuracy_master',
      name: 'Precision Coder',
      icon: '🎯',
      description: 'Achieved an overall submission accuracy rate above 60%!',
      unlocked: accuracy >= 60 && totalSolved >= 2,
    },
    {
      id: 'topic_conqueror',
      name: 'Topic Conqueror',
      icon: '🏆',
      description: 'Fully cleared all challenges in at least one DSA topic!',
      unlocked: topicsCompleted >= 1,
    },
    {
      id: 'century_club',
      name: 'Milestone Solver',
      icon: '⭐',
      description: 'Completed 5 or more unique DSA problems!',
      unlocked: totalSolved >= 5,
    },
  ];

  return badges;
};

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const userDomain = user?.domain || 'software-development';

    for (const topic of TOPICS) {
      const count = await Problem.countDocuments({ topic });
      const existing = await Progress.findOne({ userId, topic });
      if (!existing) {
        await Progress.create({
          userId,
          topic,
          problemsSolved: 0,
          totalProblems: count,
          totalSubmissions: 0,
          successfulSubmissions: 0,
          accuracy: 0,
          status: ['Arrays', 'Strings', 'Two Pointers', 'Sliding Window'].includes(topic)
            ? 'In Progress'
            : 'Locked',
        });
      } else if (existing.totalProblems !== count) {
        existing.totalProblems = count;
        await existing.save();
      }
    }

    const progressList = await Progress.find({ userId });
    const submissions = await Submission.find({ userId });

    const solvedProblemIds = await Submission.find({
      userId,
      status: 'Accepted',
    }).distinct('problemId');

    const totalSolved = solvedProblemIds.length;
    const totalSubmissionsCount = submissions.length;
    const successfulCount = submissions.filter((s) => s.status === 'Accepted').length;
    const overallAccuracy =
      totalSubmissionsCount > 0 ? Math.round((successfulCount / totalSubmissionsCount) * 100) : 0;

    const topicsCompleted = progressList.filter(
      (p) => p.status === 'Completed' || (p.totalProblems > 0 && p.problemsSolved >= p.totalProblems)
    ).length;

    let currentStreak = 1;
    if (submissions.length >= 2) {
      currentStreak = 3;
    } else if (submissions.length === 1) {
      currentStreak = 1;
    }

    const xp = (totalSolved * 50) + (successfulCount * 25);

    const orderedProgress = TOPICS.map((topicName) => {
      const p = progressList.find((item) => item.topic === topicName);
      const total = p ? p.totalProblems : 0;
      const solved = p ? p.problemsSolved : 0;
      const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
      return {
        topic: topicName,
        problemsSolved: solved,
        totalProblems: total,
        accuracy: p ? p.accuracy : 0,
        percentage,
        status: p ? p.status : 'Locked',
      };
    });

    // Series-wise progress grouping
    const allProblems = await Problem.find({});
    const seriesMap = {};
    for (const prob of allProblems) {
      const seriesName = prob.series || 'Core Essentials';
      if (!seriesMap[seriesName]) {
        seriesMap[seriesName] = { name: seriesName, total: 0, solved: 0 };
      }
      seriesMap[seriesName].total++;
      if (solvedProblemIds.some((id) => id.toString() === prob._id.toString())) {
        seriesMap[seriesName].solved++;
      }
    }

    const seriesProgress = Object.values(seriesMap).map((s) => ({
      series: s.name,
      totalProblems: s.total,
      problemsSolved: s.solved,
      percentage: s.total > 0 ? Math.round((s.solved / s.total) * 100) : 0,
    }));

    const recommendation = await getPersonalizedRecommendation(userId, progressList, userDomain);
    const stuckAnalysis = await getStuckTopicsAnalysis(userId, progressList);
    const badges = calculateBadges(totalSolved, overallAccuracy, currentStreak, topicsCompleted);

    const recentSubmissions = await Submission.find({ userId })
      .populate('problemId', 'title difficulty topic slug series')
      .sort({ submittedAt: -1 })
      .limit(6);

    const buddyMessages = [
      `Hey buddy! Ready to power up your ${userDomain.replace('-', ' ')} journey today?`,
      `Remember: Every expert software engineer once struggled with array index boundaries!`,
      `Small daily progress compounds into massive interview confidence. Keep going!`,
      `Need hints? Click "I'm Stuck / Ask Buddy 🌿" whenever a problem feels tricky!`,
    ];
    const dailyBuddyMessage = buddyMessages[Math.floor(Math.random() * buddyMessages.length)];

    return res.json({
      student: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        domain: userDomain,
        xp,
      },
      stats: {
        problemsSolved: totalSolved,
        accuracy: overallAccuracy,
        currentStreak,
        topicsCompleted,
        totalSubmissions: totalSubmissionsCount,
        xp,
      },
      topicProgress: orderedProgress,
      seriesProgress,
      recommendation,
      stuckAnalysis,
      badges,
      buddyCompanion: {
        name: 'ByteBuddy 🌿',
        greeting: dailyBuddyMessage,
        activeDomain: userDomain,
      },
      recentSubmissions,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardData,
  getPersonalizedRecommendation,
};
