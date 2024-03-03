import { Router } from 'express';
import { passwordLogin, checkJwtToken, token, logout } from '../controller/authController.js';

const authRouter = Router();
authRouter.post('/', passwordLogin);
authRouter.post('/token', token);
authRouter.delete('/logout', logout)

export default authRouter;

