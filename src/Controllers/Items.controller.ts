import { Request, Response } from 'express';
import { Left, Medium, Right } from '../Module/item.module';


export const getItem = async (req: Request, res: Response) => {
    console.log("hello getItem");

    try {
        const left = await Left.find();
        const right = await Right.find();
        const medium = await Medium.find();

        console.log({ left, right, medium });
        res.json({ left, right, medium });
    } catch (error) {
        console.log(error);
    }

}

export const setItem = (req: Request, res: Response) => {
    console.log("hello setItem", req.body);
    const col = req.body.col
    const item = {
        title: req.body.title || '',
        times: req.body.time || [],
        description: req.body.description || ''
    }
    console.log("item", item);
    
    try {
        if (col == 'Right') Right.create(item).then(() => res.status(203).json(item))
        if (col == 'Medium') Medium.create(item).then(() => res.status(203).json(item))
        if (col == 'Left') Left.create(item).then(() => res.status(203).json(item))
    } catch (error) {
        console.log(error)
    }
}

export const updateItem = async (req: Request, res: Response) => {
    const { title, description, times, col } = req.body;
    const _id = req.params.id;

    const itemFields = { title, description, times };

    try {
        let item;
        switch (col) {
            case "Right":
                item = await Right.findByIdAndUpdate(_id, { $set: itemFields }, { new: true });
                break;
            case "Medium":
                item = await Medium.findByIdAndUpdate(_id, { $set: itemFields }, { new: true });
                break;
            case "Left":
                item = await Left.findByIdAndUpdate(_id, { $set: itemFields }, { new: true });
                break;
            default:
                return res.status(400).json({ error: "Invalid column" });
        }

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
    const { col } = req.body;
    const id = req.params.id;
    console.log("hello deleteItem", id, col);
    

    try {
        let result;

        switch (col) {
            case "Right":
                result = await Right.deleteOne({ _id: id });
                break;
            case "Medium":
                result = await Medium.deleteOne({ _id: id });
                break;
            case "Left":
                result = await Left.deleteOne({ _id: id });
                break;
            default:
                return res.status(400).json({ error: "Invalid column" });
        }

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ msg: 'Item removed' });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: 'Server error' });
    }
};