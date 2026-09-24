const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from environment variables');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Don't exit process for health check purposes, or exit if critical.
    // For this project, we want to allow health check to report database status
    // so we won't process.exit() here if we want the app to start without db.
    // However, usually we might exit. We will just log it.
  }
};

module.exports = connectDB;
