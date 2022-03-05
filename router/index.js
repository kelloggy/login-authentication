const Router = require('express')
const express = require('express');
const authRouter = require('./authRouter.js')
const userRouter = require('./userRouter.js')
const jwt = require('jsonwebtoken');

const router = Router();

router.use(express.json());
router.use('/auth' ,authRouter);
router.use('/user', userRouter);

module.exports = router;
