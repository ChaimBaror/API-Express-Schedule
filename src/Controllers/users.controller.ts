
import { Request, Response } from 'express';
import { User } from '../Module/User.module';


// Save user
 export const getUser = async (req : Request, res : Response) => {
    const user = await User.findById(req.params.id);
    res.send(user);
 }

const getUsers = (req: Request, res: Response) => {
    const users = User.find();
    res.send(users)
}

const setUser = (req: Request, res: Response) => {
    const uset = {
        id: Math.floor(Math.random() * 1000),
        name: req.body.name,
        email: req.body.email
    }
    User.create(uset)
    res.status(201).json(uset)
}

export  { getUsers, setUser }