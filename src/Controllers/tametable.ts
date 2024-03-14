import { Request, Response } from 'express';
import { schduleTime } from "../Module/schduleTime";

let tasks: schduleTime[] = [];

// Save post (timetable) by user
export const post = async (req : Request, res : Response) => {
    
    const task: schduleTime = {
        id: Math.floor(Math.random() * 1000),
        title: req.body.title,
        time: req.body.time,
        description: req.body.description,
        completed: false,
      };
    
      tasks.push(task);
      res.status(201).json(task)
};

export const getPost = async (req : Request, res : Response) => {
    res.json(tasks)
}