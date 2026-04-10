import { Request, Response } from 'express';
import { Item } from '../Module/item.module';

const VALID_COLUMNS = ["Right", "Medium", "Left"];

export const getItem = async (req: Request, res: Response) => {
    try {
        const items = await Item.find();

        const left = items.filter((i: any) => i.col === "Left");
        const right = items.filter((i: any) => i.col === "Right");
        const medium = items.filter((i: any) => i.col === "Medium");

        res.json({ left, right, medium });
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export const createItem = async (req: Request, res: Response) => {
    const { col, _id, title, times, description, index } = req.body;

    if (!col || !VALID_COLUMNS.includes(col)) {
        return res.status(400).json({ error: "Invalid column. Must be Right, Medium, or Left" });
    }

    try {
        const item = await Item.create({
            _id,
            title: title || '',
            times: times || [],
            description: description || '',
            index,
            col
        });
        res.status(201).json(item);
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export const updateItem = async (req: Request, res: Response) => {
    const { title, description, times, col, index } = req.body;
    const _id = req.params.id;

    const itemFields: any = {};
    if (title !== undefined) itemFields.title = title;
    if (description !== undefined) itemFields.description = description;
    if (times !== undefined) itemFields.times = times;
    if (col !== undefined) itemFields.col = col;
    if (index !== undefined) itemFields.index = index;

    try {
        const item = await Item.findByIdAndUpdate(
            _id,
            { $set: itemFields },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const result = await Item.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ msg: 'Item removed' });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
