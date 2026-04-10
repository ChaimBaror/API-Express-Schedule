"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const user_route_1 = __importDefault(require("./Routes/user.route"));
const timetable_1 = __importDefault(require("./Routes/timetable"));
const auth_route_1 = __importDefault(require("./Routes/auth.route"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
app.use((0, cors_1.default)({
    origin: allowedOrigins
}));
// Rate limit auth endpoints — 20 attempts per 15 min per IP
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { error: 'Too many requests, try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});
// Routes
app.use('/auth', authLimiter, auth_route_1.default);
app.use('/user', user_route_1.default);
app.use('/api/item', timetable_1.default);
// Global error handler
app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ error: "Internal server error" });
});
const port = process.env.PORT || 8000;
(0, config_1.default)();
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
exports.default = app;
