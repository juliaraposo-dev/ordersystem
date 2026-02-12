import { openDB } from "../configDB.js";

class ProductModel {

  static async createTableProducts() {
    const db = await openDB();
      await db.exec(`   CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price NUMERIC NOT NULL,
        image_url TEXT
      )`);
  }

  static async getAllProducts() {
      const db = await openDB();
      const products = await db.all("SELECT * FROM products");
      return products;
  }

  static async getProductById(id) {
      const db = await openDB();
      const item = await db.get("SELECT * FROM products WHERE id = ?", id);
      return item;
  }
}

export default ProductModel;