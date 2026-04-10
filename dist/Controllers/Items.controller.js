"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = void 0;
const item_module_1 = require("../Module/item.module");
const VALID_COLUMNS = ["Right", "Medium", "Left"];
const getItem = async (req, res) => {
    try {
        const items = await item_module_1.Item.find();
        const left = items.filter((i) => i.col === "Left");
        const right = items.filter((i) => i.col === "Right");
        const medium = items.filter((i) => i.col === "Medium");
        res.json({ left, right, medium });
    }
    catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getItem = getItem;
const createItem = async (req, res) => {
    const { col, _id, title, times, description, index } = req.body;
    if (!col || !VALID_COLUMNS.includes(col)) {
        return res.status(400).json({ error: "Invalid column. Must be Right, Medium, or Left" });
    }
    try {
        const item = await item_module_1.Item.create({
            _id,
            title: title || '',
            times: times || [],
            description: description || '',
            index,
            col
        });
        res.status(201).json(item);
    }
    catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    const { title, description, times, col, index } = req.body;
    const _id = req.params.id;
    const itemFields = {};
    if (title !== undefined)
        itemFields.title = title;
    if (description !== undefined)
        itemFields.description = description;
    if (times !== undefined)
        itemFields.times = times;
    if (col !== undefined)
        itemFields.col = col;
    if (index !== undefined)
        itemFields.index = index;
    try {
        const item = await item_module_1.Item.findByIdAndUpdate(_id, { $set: itemFields }, { new: true });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    }
    catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await item_module_1.Item.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ msg: 'Item removed' });
    }
    catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteItem = deleteItem;
