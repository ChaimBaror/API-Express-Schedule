import express from "express";
import userRoute from "./Routes/user.route";
import timetableRoute from "./Routes/timetable";
import { run } from "./config";

// Initialize Express application
const app = express();

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/user', userRoute); // User-related routes
app.use('/api', timetableRoute); // Timetable-related routes

// Define the port for the server to listen on
const port = process.env.PORT || 8000;

// Connect to the database
run().catch(console.error);

// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
