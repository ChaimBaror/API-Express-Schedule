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
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = void 0;
const item_module_1 = require("../Module/item.module");
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello getItem");
    try {
        const left = yield item_module_1.Left.find();
        const right = yield item_module_1.Right.find();
        const medium = yield item_module_1.Medium.find();
        console.log({ left, right, medium });
        res.json({ left, right, medium });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getItem = getItem;
const createItem = (req, res) => {
    console.log("hello setItem", req.body);
    const col = req.body.col;
    const item = {
        _id: req.body.uid,
        title: req.body.title || '',
        times: req.body.times || {},
        description: req.body.description || ''
    };
    console.log("item", item);
    try {
        if (col == 'Right')
            item_module_1.Right.create(item).then(() => res.status(201).json(item));
        if (col == 'Medium')
            item_module_1.Medium.create(item).then(() => res.status(201).json(item));
        if (col == 'Left')
            item_module_1.Left.create(item).then(() => res.status(201).json(item));
    }
    catch (error) {
        console.log(error);
    }
};
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, times, col } = req.body;
    const _id = req.params.id;
    const itemFields = { title, description, times };
    try {
        let item;
        switch (col) {
            case "Right":
                item = yield item_module_1.Right.findByIdAndUpdate(_id, { $set: itemFields }, { new: true });
                break;
            case "Medium":
                item = yield item_module_1.Medium.findByIdAndUpdate(_id, { $set: itemFields }, { new: true });
                break;
            case "Left":
                item = yield item_module_1.Left.findByIdAndUpdate(_id, { $set: itemFields }, { new: true });
                break;
            default:
                return res.status(400).json({ error: "Invalid column" });
        }
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    }
    catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { col } = req.body;
    const id = req.params.id;
    console.log("hello deleteItem", id, col);
    try {
        let result;
        switch (col) {
            case "Right":
                result = yield item_module_1.Right.deleteOne({ _id: id });
                break;
            case "Medium":
                result = yield item_module_1.Medium.deleteOne({ _id: id });
                break;
            case "Left":
                result = yield item_module_1.Left.deleteOne({ _id: id });
                break;
            default:
                return res.status(400).json({ error: "Invalid column" });
        }
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ msg: 'Item removed' });
    }
    catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.deleteItem = deleteItem;
