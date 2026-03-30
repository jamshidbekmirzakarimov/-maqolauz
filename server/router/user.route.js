import express from 'express';
import { getUsers, registerUser, userLogin } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/users', getUsers)
userRouter.post('/login', userLogin)
export default userRouter;