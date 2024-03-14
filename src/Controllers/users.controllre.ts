
import { Request, Response } from 'express';
import { Users } from '../Module/User';
import { Timetable, User } from '../Module/Timetable.models';

const user : Users[] = [
    {
        id: 1,
        name: 'Chaim',
        email: 'chaim@chaim'
    },
    {
        id: 2,
        name: 'shira',
        email: 'chaima@chaima'
    }
];

// Save user
 export const getUser = async (req : Request, res : Response) => {
    const task = user.find((t) => t.id === parseInt(req.params.id));
console.log("task",task);

    if (!task) {
      res.status(404).send('user not found');
    } else {
      res.json(task);
    }
 }

const getUsers = (req: Request, res: Response) => {
    res.send('Hello,Get users' + user.map((u) => u.name) + 'TypeScript Express!');
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