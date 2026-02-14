import express from 'express';
import CartController from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/add', CartController.addToCart);
router.get('/items', CartController.getCartItems);
router.put('/update', CartController.updateItemQuantity);
router.delete('/remove', CartController.removeFromCart);
router.delete('/clear', CartController.clearCart);

export default router;