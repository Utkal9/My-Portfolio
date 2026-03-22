// authRoutes.js
import express from 'express';
import { login, getMe, changePassword } from '../controllers/authController.js';
import auth from '../middleware/authMiddleware.js';
const authRouter = express.Router();
authRouter.post('/login', login);
authRouter.get('/me', auth, getMe);
authRouter.post('/change-password', auth, changePassword);
export default authRouter;
