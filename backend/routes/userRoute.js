import express from "express"
import { newUserReg, login, resetPwd } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.js'
import isAdmin from '../middleware/verifyAdmin.js'

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/new", newUserReg);
userRouter.patch("/passwordReset", authMiddleware, resetPwd);

userRouter.patch("/admin/passwordReset", authMiddleware, isAdmin, resetPwd);


export default userRouter;