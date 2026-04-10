import { Router } from 'express';
import { getUser, getUsers } from '../Controllers/users.controller';

const route = Router();

route.get('/', getUsers);
route.get('/:id', getUser);

export default route;
