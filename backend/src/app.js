import express from 'express';
import productRoutes from './routes/product.routes.js';
import CartRoutes from './routes/cart.routes.js';

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', CartRoutes);

export default app;
