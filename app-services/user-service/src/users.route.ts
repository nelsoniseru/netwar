import { Router } from 'express';
import UserController from './users.controller';
import {auth} from '../../../middleware/middleware';

const router = Router();

router.post('/users', UserController.createUser);
router.get('/users/:id',auth, UserController.getUser);
router.put('/users/:id',auth, UserController.updateUser);
router.delete('/users/:id',auth, UserController.deleteUser);
router.get('/users',auth, UserController.getAllUsers);

export default router;
