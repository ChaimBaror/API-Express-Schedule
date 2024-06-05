"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./Routes/user.route"));
const timetable_1 = __importDefault(require("./Routes/timetable"));
const connectDB = require('./config');
// Initialize Express application
const app = (0, express_1.default)();
// Middleware for parsing URL-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware for parsing JSON bodies
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000' // Allow only this origin
}));
// Routes
app.use('/user', user_route_1.default); // User-related routes
app.use('/api/item', timetable_1.default); // Timetable-related routes
// Define the port for the server to listen on
const port = process.env.PORT || 8000;
// Connect to the database
connectDB();
// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
