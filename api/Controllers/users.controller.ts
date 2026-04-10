import { Request, Response } from 'express';
import { User } from '../Module/User.module';

// Safe user fields — never expose password
const SAFE_FIELDS = '_id name email phone role kehilaSlugs createdAt';

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select(SAFE_FIELDS);
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
        const users = await User.find().select(SAFE_FIELDS);
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Server error' });
    }
}

export { getUsers }
