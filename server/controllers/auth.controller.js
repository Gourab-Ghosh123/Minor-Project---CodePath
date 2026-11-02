const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Progress = require('../models/Progress');
const Problem = require('../models/Problem');

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

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'codepath_secret_key_2026', {
    expiresIn: '30d',
  });
};

const initializeUserProgress = async (userId) => {
  for (let i = 0; i < TOPICS.length; i++) {
    const topic = TOPICS[i];
    const totalCount = await Problem.countDocuments({ topic });
    const isInitialTopic = i < 4;
    await Progress.findOneAndUpdate(
      { userId, topic },
      {
        userId,
        topic,
        problemsSolved: 0,
        totalProblems: totalCount,
        totalSubmissions: 0,
        successfulSubmissions: 0,
        accuracy: 0,
        status: isInitialTopic ? 'In Progress' : 'Locked',
      },
      { upsert: true, new: true }
    );
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, domain } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password,
      domain: domain || 'software-development',
    });

    await initializeUserProgress(user._id);

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      domain: user.domain,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        domain: user.domain || 'software-development',
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, domain } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name.trim();
    if (domain) {
      const validDomains = ['software-development', 'web-developer', 'data-science', 'beginner'];
      if (validDomains.includes(domain)) {
        user.domain = domain;
      }
    }

    await user.save();

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      domain: user.domain,
      xp: user.xp,
      badges: user.badges,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  initializeUserProgress,
};
