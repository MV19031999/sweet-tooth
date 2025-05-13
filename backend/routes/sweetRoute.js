import express from "express";
import { addSweet, removeSweet, listSweet, updateSweet, availSweet } from "../controllers/sweet.controller.js";
import authMiddleware from "../middleware/auth.js"
import isAdmin from "../middleware/verifyAdmin.js"


const sweetRouter = express.Router();

sweetRouter.get('/list', listSweet);

sweetRouter.post('/add', authMiddleware, isAdmin, addSweet);
sweetRouter.put('/update/:id', authMiddleware, isAdmin, updateSweet);
sweetRouter.patch('/avail/:id', authMiddleware, isAdmin, availSweet);
sweetRouter.delete('/delete/:id', authMiddleware, isAdmin, removeSweet);

export default sweetRouter;