import app from './src/app.js';
import ItemModel from './src/models/item.model.js';

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
