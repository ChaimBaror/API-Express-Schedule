import {Router} from 'express';
import { setItem, getItem, deleteItem, updateItem } from '../Controllers/Items.controller';
// Routes
const routes = Router();

routes.get('/', getItem)
routes.post('/', setItem);
routes.put('/:id', updateItem);
routes.delete('/:id', deleteItem );

export default routes;