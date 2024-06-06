"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUser = exports.getUsers = exports.getUser = void 0;
const User_module_1 = require("../Module/User.module");
// Save user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_module_1.User.findById(req.params.id);
    res.send(user);
});
exports.getUser = getUser;
const getUsers = (req, res) => {
    const users = User_module_1.User.find();
    res.send(users);
};
exports.getUsers = getUsers;
const setUser = (req, res) => {
    const uset = {
        id: Math.floor(Math.random() * 1000),
        name: req.body.name,
        email: req.body.email
    };
    User_module_1.User.create(uset);
    res.status(201).json(uset);
};
exports.setUser = setUser;
