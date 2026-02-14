import express from 'express';
import cors from 'cors';
import ProductRoutes from './routes/product.routes.js';
import CartRoutes from './routes/cart.routes.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/products', ProductRoutes);
app.use('/api/cart', CartRoutes);


export default app;
