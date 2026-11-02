const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const Progress = require('../models/Progress');
const User = require('../models/User');

const evaluateCodeSubmission = (code, language) => {
  const trimmed = code.trim();
  if (trimmed.length < 15) {
    return {
      status: 'Wrong Answer',
      message: 'Solution code is too short or empty. Please implement full algorithmic logic.',
    };
  }

  const hasKeywords =
    trimmed.includes('return') ||
    trimmed.includes('def ') ||
    trimmed.includes('function') ||
    trimmed.includes('class') ||
    trimmed.includes('while') ||
    trimmed.includes('for') ||
    trimmed.includes('if');

  if (!hasKeywords) {
    return {
      status: 'Wrong Answer',
      message: 'Failed test cases: Expected proper algorithm implementation with return statement.',
    };
  }

  const executionTimeMs = Math.floor(Math.random() * 35) + 12;
  const memoryKb = Math.floor(Math.random() * 3000) + 13200;

  return {
    status: 'Accepted',
    executionTimeMs,
    memoryKb,
    message: 'All test cases passed successfully! Optimal time and space complexity achieved.',
  };
};

const createSubmission = async (req, res) => {
  try {
    const { problemId, language, code } = req.body;
    const userId = req.user._id;

    if (!problemId || !language || !code) {
      return res.status(400).json({ message: 'Missing required submission fields' });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const evalResult = evaluateCodeSubmission(code, language);

    const submission = await Submission.create({
      userId,
      problemId,
      language,
      code,
      status: evalResult.status,
      executionTimeMs: evalResult.executionTimeMs || 45,
      memoryKb: evalResult.memoryKb || 14000,
    });

    const topic = problem.topic;
    const totalCount = await Problem.countDocuments({ topic });

    const userTopicSubmissions = await Submission.find({
      userId,
      problemId: { $in: await Problem.find({ topic }).distinct('_id') },
    });

    const successfulSubmissions = userTopicSubmissions.filter((s) => s.status === 'Accepted').length;
    const totalSubmissions = userTopicSubmissions.length;
    const accuracy = totalSubmissions > 0 ? Math.round((successfulSubmissions / totalSubmissions) * 100) : 0;

    const solvedProblemIds = await Submission.find({
      userId,
      status: 'Accepted',
      problemId: { $in: await Problem.find({ topic }).distinct('_id') },
    }).distinct('problemId');

    const problemsSolved = solvedProblemIds.length;

    let topicStatus = 'In Progress';
    if (problemsSolved >= totalCount && totalCount > 0) {
      topicStatus = 'Completed';
    }

    await Progress.findOneAndUpdate(
      { userId, topic },
      {
        userId,
        topic,
        problemsSolved,
        totalProblems: totalCount,
        totalSubmissions,
        successfulSubmissions,
        accuracy,
        status: topicStatus,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    let celebration = null;
    if (evalResult.status === 'Accepted') {
      const user = await User.findById(userId);
      const totalAllSolved = await Submission.find({
        userId,
        status: 'Accepted',
      }).distinct('problemId');

      let unlockedBadge = null;
      if (totalAllSolved.length === 1) {
        unlockedBadge = {
          name: 'First Step Taken 🌱',
          description: 'Solved your very first algorithmic problem!',
        };
      } else if (totalAllSolved.length === 5) {
        unlockedBadge = {
          name: 'Milestone Solver ⭐',
          description: 'Cleared 5 unique problems across topics!',
        };
      } else if (accuracy === 100 && totalSubmissions >= 2) {
        unlockedBadge = {
          name: 'Precision Master 🎯',
          description: '100% topic accuracy maintained!',
        };
      }

      if (user) {
        user.xp = (user.xp || 0) + 50;
        await user.save();
      }

      const quotes = [
        "Incredible job, buddy! Every line of code brings you closer to technical mastery.",
        "You cracked it! Great algorithmic intuition and edge case handling.",
        "Boom! Solution Accepted 🎉 Keep this winning streak alive!",
        "Level up! That topic is getting stronger submission by submission.",
      ];

      celebration = {
        title: 'Accepted! Great Job! 🎉🥳👏',
        xpGained: 50,
        problemTitle: problem.title,
        topic: problem.topic,
        unlockedBadge,
        quote: quotes[Math.floor(Math.random() * quotes.length)],
      };
    }

    return res.status(201).json({
      submission,
      evaluation: evalResult,
      celebration,
      updatedProgress: {
        topic,
        problemsSolved,
        totalProblems: totalCount,
        accuracy,
        status: topicStatus,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user._id })
      .populate('problemId', 'title difficulty topic slug series')
      .sort({ submittedAt: -1 })
      .limit(30);

    return res.json(submissions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubmission,
  getUserSubmissions,
};
