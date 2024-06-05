import {Router} from 'express';
import { createItem, getItem, deleteItem, updateItem } from '../Controllers/Items.controller';
// Routes
const routes = Router();

routes.get('/', getItem)
routes.post('/', createItem);
routes.put('/:id', updateItem);
routes.delete('/:id', deleteItem );

export default routes;