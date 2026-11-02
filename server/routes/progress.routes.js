const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const { protect } = require('../middleware/auth.middleware');

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

router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const progressList = await Progress.find({ userId });
    const solvedProblemIds = await Submission.find({
      userId,
      status: 'Accepted',
    }).distinct('problemId');
    const allUserSubmissions = await Submission.find({ userId });

    const detailedTopics = await Promise.all(
      TOPICS.map(async (topicName) => {
        const p = progressList.find((item) => item.topic === topicName);
        const problems = await Problem.find({ topic: topicName }).select('title difficulty slug series whyImportant');

        const problemsWithStatus = problems.map((prob) => ({
          _id: prob._id,
          title: prob.title,
          slug: prob.slug,
          difficulty: prob.difficulty,
          series: prob.series || 'Core Essentials',
          whyImportant: prob.whyImportant || '',
          isSolved: solvedProblemIds.some((id) => id.toString() === prob._id.toString()),
        }));

        const totalCount = problems.length;
        const solvedCount = problemsWithStatus.filter((prob) => prob.isSolved).length;
        const percentage = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

        return {
          topic: topicName,
          problemsSolved: solvedCount,
          totalProblems: totalCount,
          percentage,
          accuracy: p ? p.accuracy : 0,
          totalSubmissions: p ? p.totalSubmissions : 0,
          status: p ? p.status : 'Locked',
          problems: problemsWithStatus,
        };
      })
    );

    // Group by series
    const allProblems = await Problem.find({}).select('title difficulty slug series topic whyImportant');
    const seriesMap = {};
    for (const prob of allProblems) {
      const sName = prob.series || 'Core Essentials';
      if (!seriesMap[sName]) {
        seriesMap[sName] = {
          name: sName,
          totalProblems: 0,
          problemsSolved: 0,
          problems: [],
        };
      }
      const isSolved = solvedProblemIds.some((id) => id.toString() === prob._id.toString());
      seriesMap[sName].totalProblems++;
      if (isSolved) seriesMap[sName].problemsSolved++;
      seriesMap[sName].problems.push({
        _id: prob._id,
        title: prob.title,
        slug: prob.slug,
        difficulty: prob.difficulty,
        topic: prob.topic,
        isSolved,
      });
    }

    const detailedSeries = Object.values(seriesMap).map((s) => ({
      series: s.name,
      totalProblems: s.totalProblems,
      problemsSolved: s.problemsSolved,
      percentage: s.totalProblems > 0 ? Math.round((s.problemsSolved / s.totalProblems) * 100) : 0,
      problems: s.problems,
    }));

    // Stuck topic detection
    const stuckTopics = detailedTopics.filter(
      (t) => (t.totalSubmissions >= 2 && t.accuracy < 50) || (t.totalSubmissions > 0 && t.problemsSolved === 0)
    ).map((t) => ({
      topic: t.topic,
      accuracy: t.accuracy,
      totalSubmissions: t.totalSubmissions,
      problemsSolved: t.problemsSolved,
      suggestedAction: `Target our beginner warmup problem in ${t.topic} and use Step 1 intuition hints!`,
    }));

    const totalPossibleProblems = detailedTopics.reduce((acc, t) => acc + t.totalProblems, 0);
    const totalSolvedProblems = detailedTopics.reduce((acc, t) => acc + t.problemsSolved, 0);
    const overallPercentage =
      totalPossibleProblems > 0 ? Math.round((totalSolvedProblems / totalPossibleProblems) * 100) : 0;

    return res.json({
      topics: detailedTopics,
      series: detailedSeries,
      stuckTopics,
      metrics: {
        totalPossibleProblems,
        totalSolvedProblems,
        overallPercentage,
        totalSubmissions: allUserSubmissions.length,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
