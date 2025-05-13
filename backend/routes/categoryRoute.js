import express from "express";
import {addCategory, getCategory, deleteCategory, updateCategory} from '../controllers/category.controller.js';
import authMiddleware from "../middleware/auth.js"
import isAdmin from "../middleware/verifyAdmin.js"

const categoryRouter = express.Router();

categoryRouter.post('/add', authMiddleware, isAdmin, addCategory);
categoryRouter.delete('/delete/:id', authMiddleware, isAdmin, deleteCategory);
categoryRouter.put('/update/:id', authMiddleware, isAdmin, updateCategory);


categoryRouter.get('/get', getCategory);

export default categoryRouter