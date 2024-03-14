import { Router } from 'express';
import { getUser, getUsers, setUser } from '../Controllers/users.controller';

const route = Router();

route.get('/',getUsers );
route.get('/user:id', getUser)
route.post('/', setUser);

export default route;  