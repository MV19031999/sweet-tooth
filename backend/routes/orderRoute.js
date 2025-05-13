import express from "express";

import authMiddleware from '../middleware/auth.js';
import isAdmin from "../middleware/verifyAdmin.js";
import { placeOrder, getUserOrder, getAllOrder, updateOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router()

orderRouter.post('/new', authMiddleware, placeOrder);
orderRouter.get('/userOrders', authMiddleware, getUserOrder);

orderRouter.get('/allOrders', authMiddleware, isAdmin, getAllOrder);
orderRouter.patch('/update/:id', authMiddleware, isAdmin, updateOrder)

export default orderRouter;
