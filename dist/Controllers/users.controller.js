"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUser = exports.getUsers = exports.getUser = void 0;
const User_module_1 = require("../Module/User.module");
const getUser = async (req, res) => {
    try {
        const user = await User_module_1.User.findById(req.params.id);
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
        const users = await User_module_1.User.find();
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getUsers = getUsers;
const setUser = async (req, res) => {
    try {
        const user = await User_module_1.User.create({
            name: req.body.name,
            email: req.body.email
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.setUser = setUser;
