import express from 'express';
import ProductController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProductById);

export default router;