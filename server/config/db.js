const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codepath_dsa';
    
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 2000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (localErr) {
      console.log('Local MongoDB not running. Initializing In-Memory MongoDB engine for seamless mentor demo...');
    }

    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`Embedded MongoDB Connected: ${conn.connection.host}`);

    const Problem = require('../models/Problem');
    const { seedData } = require('../scripts/seedProblemsData');
    for (const prob of seedData) {
      await Problem.findOneAndUpdate({ slug: prob.slug }, prob, { upsert: true, new: true });
    }
    console.log(`Successfully synced ${seedData.length} core DSA problems with domain and hint data!`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
