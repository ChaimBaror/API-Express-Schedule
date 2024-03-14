import {Router} from 'express';
import { post, getPost } from '../Controllers/tametable.controller';
// Routes
const routes = Router();

// Save user
routes.get('/', getPost)
// Save post (timetable) by user
routes.post('/posts', post);

export default routes;