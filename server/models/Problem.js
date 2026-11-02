const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String, default: '' },
});

const starterCodeSchema = new mongoose.Schema({
  cpp: { type: String, default: '' },
  python: { type: String, default: '' },
  javascript: { type: String, default: '' },
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
    },
    topic: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    examples: [exampleSchema],
    constraints: [{ type: String }],
    starterCode: starterCodeSchema,
    testCases: [
      {
        input: { type: String },
        expectedOutput: { type: String },
      },
    ],
    series: {
      type: String,
      default: 'Core Essentials',
    },
    domainRelevance: [
      {
        type: String,
        enum: ['software-development', 'web-developer', 'data-science', 'beginner'],
      },
    ],
    hints: [
      {
        level: { type: Number, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    commonTraps: [{ type: String }],
    peerTips: [
      {
        author: { type: String, default: 'Student Peer' },
        tip: { type: String, required: true },
        votes: { type: Number, default: 1 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    whyImportant: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Problem', problemSchema);
