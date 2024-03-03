import { Router } from 'express';
import { checkJwtToken } from '../controller/authController.js';
import { postUser, getUsers } from '../controller/userController.js';

const userRouter = Router();
userRouter.post('/register', checkJwtToken, postUser);
userRouter.get('/', checkJwtToken, getUsers);

export default userRouter

