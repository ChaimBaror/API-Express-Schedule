import { Router } from 'express';
import {
    register,
    login,
    googleAuth,
    setPassword,
    createGabay,
    getUserByEmail
} from '../Controllers/auth.controller';

const routes = Router();

// Public auth routes
routes.post('/register', register);
routes.post('/login', login);
routes.post('/google', googleAuth);
routes.post('/set-password', setPassword);

// User lookup (used by NextAuth)
routes.get('/user/:email', getUserByEmail);

// Admin routes
routes.post('/admin/create-gabay', createGabay);

export default routes;
