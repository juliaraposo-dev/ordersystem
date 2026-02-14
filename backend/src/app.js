import express from 'express';
import ProductRoutes from './routes/product.routes.js';
import CartRoutes from './routes/cart.routes.js';
import OrderRoutes from './routes/order.routes.js';

const app = express();

app.use(express.json());

app.use('/api/products', ProductRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/orders', OrderRoutes);

export default app;
