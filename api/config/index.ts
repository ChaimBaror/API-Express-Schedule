import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Support both full MONGO_URI and legacy MONGO_KEY (password only)
const mongoURI = process.env.MONGO_URI
  || `mongodb+srv://chbaror:${process.env.MONGO_KEY}@schedule-api.qx2dys7.mongodb.net/?retryWrites=true&w=majority&appName=schedule-api`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
