
import { Request, Response } from 'express';
import { User } from '../Module/User.module';


export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Server error' });
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Server error' });
    }
}

const setUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email
        });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Server error' });
    }
}

export { getUsers, setUser }