import app from './src/app.js';
import ProductModel from './src/models/product.model.js';
import CartModel from './src/models/cart.model.js';

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await ProductModel.createTableProducts();
    await CartModel.createTableCart();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
