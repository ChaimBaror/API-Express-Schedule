"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Items_controller_1 = require("../Controllers/Items.controller");
// Routes
const routes = (0, express_1.Router)();
routes.get('/', Items_controller_1.getItem);
routes.post('/', Items_controller_1.createItem);
routes.put('/:id', Items_controller_1.updateItem);
routes.delete('/:id', Items_controller_1.deleteItem);
exports.default = routes;
