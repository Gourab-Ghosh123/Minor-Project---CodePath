const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const { protect } = require('../middleware/auth.middleware');

const DOMAIN_ROADMAPS = {
  'software-development': {
    domainKey: 'software-development',
    title: 'Software Development / SDE Core Track',
    badge: '💻 SDE Canonical',
    description: 'The complete industry-standard algorithmic path covering foundational linear structures through advanced trees, graphs, and dynamic programming.',
    stages: [
      { id: 1, name: 'Arrays', description: 'Contiguous memory, prefix sums, and element lookups.' },
      { id: 2, name: 'Strings', description: 'String manipulations, frequency counters, and anagrams.' },
      { id: 3, name: 'Two Pointers', description: 'Bidirectional scans and pointer boundary optimizations.' },
      { id: 4, name: 'Sliding Window', description: 'Continuous subarray optimizations and window expansion/contraction.' },
      { id: 5, name: 'Linked List', description: 'Pointer traversals, node swapping, and cycle detection.' },
      { id: 6, name: 'Stack', description: 'LIFO structure, parenthesis validation, and monotonic stacks.' },
      { id: 7, name: 'Queue', description: 'FIFO buffering, two-stack emulation, and BFS queues.' },
      { id: 8, name: 'Binary Search', description: 'Logarithmic search space halving and rotated sorted arrays.' },
      { id: 9, name: 'Trees', description: 'Hierarchical tree traversals, inversion, and depth calculation.' },
      { id: 10, name: 'Graphs', description: 'Breadth-First Search, Depth-First Search, and connected components.' },
      { id: 11, name: 'Dynamic Programming', description: 'Overlapping subproblems, state memoization, and optimal substructure.' },
    ],
  },
  'web-developer': {
    domainKey: 'web-developer',
    title: 'Web Developer DSA Track',
    badge: '🌐 Web & Fullstack',
    description: 'Curated for frontend, backend, and full-stack engineers dealing with DOM tree hierarchies, JSON token parsing, event queues, and state graph resolutions.',
    stages: [
      { id: 1, name: 'Arrays', description: 'Object collections, map/filter patterns, and ID lookups in O(1).' },
      { id: 2, name: 'Strings', description: 'Sanitization, URL parameter parsing, and text searching.' },
      { id: 3, name: 'Stack', description: 'Call stack emulation, undo/redo history, and nested tag matching.' },
      { id: 4, name: 'Queue', description: 'Event loop queues, microtask processing, and async job workers.' },
      { id: 5, name: 'Two Pointers', description: 'List deduplication and response payload optimization.' },
      { id: 6, name: 'Sliding Window', description: 'Streaming rate limiting and token bucket buffering.' },
      { id: 7, name: 'Trees', description: 'Virtual DOM diffing, component hierarchies, and JSON AST trees.' },
      { id: 8, name: 'Graphs', description: 'Module bundler dependency graphs and route navigation graphs.' },
    ],
  },
  'data-science': {
    domainKey: 'data-science',
    title: 'Data Science & ML Track',
    badge: '📊 Data & Machine Learning',
    description: 'Engineered for Data Scientists and ML engineers focusing on matrix arrays, spatial indexing, decision trees, neural network graph layers, and optimization DP.',
    stages: [
      { id: 1, name: 'Arrays', description: 'Multi-dimensional matrices, vector dot products, and slicing.' },
      { id: 2, name: 'Two Pointers', description: 'Vector coordinate distances and pairwise similarity.' },
      { id: 3, name: 'Binary Search', description: 'Hyperparameter threshold optimization and quantile finding.' },
      { id: 4, name: 'Trees', description: 'Decision trees, random forests, and KD-tree spatial searches.' },
      { id: 5, name: 'Graphs', description: 'Knowledge graphs, social network clustering, and Markov chains.' },
      { id: 6, name: 'Dynamic Programming', description: 'Viterbi algorithm, sequence alignment, and optimization.' },
    ],
  },
  'beginner': {
    domainKey: 'beginner',
    title: 'Beginner / Noob to Pro Track',
    badge: '🌱 Friendly Starter',
    description: 'A gentle, zero-intimidation starting line designed to build algorithmic confidence step-by-step with friendly buddy guidance.',
    stages: [
      { id: 1, name: 'Arrays', description: 'Looping through lists, finding targets, and simple counts.' },
      { id: 2, name: 'Strings', description: 'Checking palindromes, counting letters, and reversing characters.' },
      { id: 3, name: 'Two Pointers', description: 'Visualizing left and right moving fingers on a list.' },
      { id: 4, name: 'Stack', description: 'Plate-stack intuition for matching parentheses and undo actions.' },
      { id: 5, name: 'Binary Search', description: 'High-low guessing game intuition to find targets in sorted lists.' },
      { id: 6, name: 'Trees', description: 'Family tree root-left-right intuition and simple counting.' },
    ],
  },
};

router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const requestedDomain = req.query.domain || req.user.domain || 'software-development';
    const activeDomainConfig = DOMAIN_ROADMAPS[requestedDomain] || DOMAIN_ROADMAPS['software-development'];

    const progressList = await Progress.find({ userId });
    const solvedProblemIds = await Submission.find({
      userId,
      status: 'Accepted',
    }).distinct('problemId');

    const roadmapStages = await Promise.all(
      activeDomainConfig.stages.map(async (item, index) => {
        const topicName = item.name;
        const p = progressList.find((entry) => entry.topic === topicName);
        
        let problemFilter = { topic: topicName };
        if (requestedDomain !== 'software-development') {
          problemFilter = {
            topic: topicName,
            domainRelevance: requestedDomain,
          };
        }

        let problems = await Problem.find(problemFilter).select('title difficulty slug order series whyImportant');
        if (problems.length === 0) {
          problems = await Problem.find({ topic: topicName }).select('title difficulty slug order series whyImportant');
        }

        const totalProblems = problems.length;
        const solvedCount = problems.filter((prob) =>
          solvedProblemIds.some((id) => id.toString() === prob._id.toString())
        ).length;

        const percentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

        let status = 'Locked';
        if (index === 0) {
          status = percentage === 100 ? 'Completed' : 'In Progress';
        } else {
          const prevTopic = activeDomainConfig.stages[index - 1].name;
          const prevProgress = progressList.find((entry) => entry.topic === prevTopic);
          const prevProblems = await Problem.find({ topic: prevTopic });
          const prevSolved = prevProblems.filter((prob) =>
            solvedProblemIds.some((id) => id.toString() === prob._id.toString())
          ).length;

          if (prevSolved > 0 || index < 3 || (prevProgress && prevProgress.problemsSolved > 0)) {
            status = percentage === 100 ? 'Completed' : 'In Progress';
          } else {
            status = 'Locked';
          }
        }

        return {
          id: item.id,
          topic: item.name,
          description: item.description,
          totalProblems,
          problemsSolved: solvedCount,
          percentage,
          status,
          problems: problems.map((prob) => ({
            _id: prob._id,
            title: prob.title,
            slug: prob.slug,
            difficulty: prob.difficulty,
            series: prob.series || 'Core Essentials',
            whyImportant: prob.whyImportant || '',
            isSolved: solvedProblemIds.some((id) => id.toString() === prob._id.toString()),
          })),
        };
      })
    );

    const availableDomains = Object.keys(DOMAIN_ROADMAPS).map((key) => ({
      key,
      title: DOMAIN_ROADMAPS[key].title,
      badge: DOMAIN_ROADMAPS[key].badge,
      description: DOMAIN_ROADMAPS[key].description,
    }));

    return res.json({
      activeDomain: {
        key: activeDomainConfig.domainKey,
        title: activeDomainConfig.title,
        badge: activeDomainConfig.badge,
        description: activeDomainConfig.description,
      },
      availableDomains,
      stages: roadmapStages,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
