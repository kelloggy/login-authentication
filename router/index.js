import express from 'express';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';

const { Router } = express;
const router = Router();

router.use(express.json());
router.use('/auth' ,authRouter);
router.use('/user', userRouter);

export default router;
