import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import userRoute from "./Routes/user.route";
import timetableRoute from "./Routes/timetable";
import authRoute from "./Routes/auth.route";
import connectDB from './config';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
app.use(cors({
    origin: allowedOrigins
}));

// Rate limit auth endpoints — 20 attempts per 15 min per IP
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { error: 'Too many requests, try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Routes
app.use('/auth', authLimiter, authRoute);
app.use('/user', userRoute);
app.use('/api/item', timetableRoute);

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 8000;

connectDB();

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

export default app;
