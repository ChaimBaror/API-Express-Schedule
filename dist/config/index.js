"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Support both full MONGO_URI and legacy MONGO_KEY (password only)
const mongoURI = process.env.MONGO_URI
    || `mongodb+srv://chbaror:${process.env.MONGO_KEY}@schedule-api.qx2dys7.mongodb.net/?retryWrites=true&w=majority&appName=schedule-api`;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log('MongoDB connected...');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
exports.default = connectDB;
