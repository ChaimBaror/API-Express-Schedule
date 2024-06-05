const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const mongo_key = process.env.MONGO_KEY || "";
const mongoURI =`mongodb+srv://chbaror:${mongo_key}@cluster.zvltlyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;
;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
