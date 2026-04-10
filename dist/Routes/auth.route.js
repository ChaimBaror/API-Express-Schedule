"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../Controllers/auth.controller");
const routes = (0, express_1.Router)();
// Public auth routes
routes.post('/register', auth_controller_1.register);
routes.post('/login', auth_controller_1.login);
routes.post('/google', auth_controller_1.googleAuth);
routes.post('/set-password', auth_controller_1.setPassword);
// User lookup (used by NextAuth)
routes.get('/user/:email', auth_controller_1.getUserByEmail);
// Admin routes
routes.post('/admin/create-gabay', auth_controller_1.createGabay);
exports.default = routes;
