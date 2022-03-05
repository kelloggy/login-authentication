const Router = require('express')
const userController = require('../controller/userController');
const authController = require('../controller/authController')


const userRouter = Router();
userRouter.post('/register', authController.checkJwtToken, userController.postUser);
userRouter.get('/', authController.checkJwtToken, userController.getUsers);


module.exports = userRouter;

