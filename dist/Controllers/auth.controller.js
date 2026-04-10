"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createGabay = exports.setPassword = exports.googleAuth = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_module_1 = require("../Module/User.module");
/**
 * POST /auth/register
 * Register a new user with email + password + phone
 */
const register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'name, email, password, phone are required' });
    }
    try {
        const existing = await User_module_1.User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_module_1.User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: 'user',
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.register = register;
/**
 * POST /auth/login
 * Login with email + password → returns user object
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }
    try {
        const user = await User_module_1.User.findOne({ email });
        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.login = login;
/**
 * POST /auth/google
 * Called by NextAuth on Google sign-in → create or find user
 */
const googleAuth = async (req, res) => {
    const { name, email, googleId, phone } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'email is required' });
    }
    try {
        let user = await User_module_1.User.findOne({ email });
        if (user) {
            // Update googleId if not set
            if (!user.googleId && googleId) {
                user.googleId = googleId;
                await user.save();
            }
        }
        else {
            // First-time Google sign-in → create user
            user = await User_module_1.User.create({
                name: name || email.split('@')[0],
                email,
                googleId,
                phone: phone || '',
                role: 'user',
            });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
            hasPassword: !!user.password,
        });
    }
    catch (error) {
        console.error("Error with Google auth:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.googleAuth = googleAuth;
/**
 * POST /auth/set-password
 * For Google users to set a password so they can login with email+password
 */
const setPassword = async (req, res) => {
    const { email, password, phone } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }
    try {
        const user = await User_module_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.password = await bcryptjs_1.default.hash(password, 10);
        if (phone)
            user.phone = phone;
        await user.save();
        res.json({ msg: 'Password set successfully' });
    }
    catch (error) {
        console.error("Error setting password:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.setPassword = setPassword;
/**
 * POST /admin/create-gabay
 * Admin creates a gabay account for a kehila
 */
const createGabay = async (req, res) => {
    const { name, email, password, phone, kehilaSlugs } = req.body;
    if (!name || !email || !password || !phone || !(kehilaSlugs === null || kehilaSlugs === void 0 ? void 0 : kehilaSlugs.length)) {
        return res.status(400).json({ error: 'name, email, password, phone, kehilaSlugs are required' });
    }
    try {
        const existing = await User_module_1.User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_module_1.User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: 'gabay',
            kehilaSlugs,
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
        });
    }
    catch (error) {
        console.error("Error creating gabay:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createGabay = createGabay;
/**
 * GET /auth/user/:email
 * Get user by email (used by NextAuth callbacks)
 */
const getUserByEmail = async (req, res) => {
    try {
        const user = await User_module_1.User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
            hasPassword: !!user.password,
        });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getUserByEmail = getUserByEmail;
