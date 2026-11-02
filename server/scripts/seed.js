const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('../models/Problem');
const { seedData } = require('./seedProblemsData');

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codepath_dsa';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for seeding');

    await Problem.deleteMany({});
    console.log('Cleared existing problems');

    await Problem.insertMany(seedData);
    console.log(`Seeded ${seedData.length} DSA problems successfully!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error.message);
    process.exit(1);
  }
};

seedDB();
