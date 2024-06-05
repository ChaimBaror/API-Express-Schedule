"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../Controllers/users.controller");
const route = (0, express_1.Router)();
route.get('/', users_controller_1.getUsers);
route.get('/user:id', users_controller_1.getUser);
route.post('/', users_controller_1.setUser);
exports.default = route;
