import express from 'express';

import {addToCart, removeFromCart, getCart, deleteFromCart} from '../controllers/cart.controller.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/addOne', authMiddleware, addToCart);
cartRouter.post('/removeOne', authMiddleware, removeFromCart);
cartRouter.post('/delete', authMiddleware, deleteFromCart);
cartRouter.get('/get', authMiddleware, getCart);

export default cartRouter;
