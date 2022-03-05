const Router = require('express')
const authController = require('../controller/authController.js')

const authRouter = Router();
authRouter.post('/', authController.passwordLogin);
authRouter.post('/token', authController.token);
authRouter.delete('/logout', authController.logout)


module.exports = authRouter;

