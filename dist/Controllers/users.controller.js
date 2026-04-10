"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = void 0;
const User_module_1 = require("../Module/User.module");
// Safe user fields — never expose password
const SAFE_FIELDS = '_id name email phone role kehilaSlugs createdAt';
const getUser = async (req, res) => {
    try {
        const user = await User_module_1.User.findById(req.params.id).select(SAFE_FIELDS);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getUser = getUser;
const getUsers = async (req, res) => {
    try {
        const users = await User_module_1.User.find().select(SAFE_FIELDS);
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getUsers = getUsers;
