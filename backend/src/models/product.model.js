import { openDB } from "../configDB.js";

class ItemModel {

  static async createTableItems() {
    const db = await openDB();
      await db.exec(`   CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price NUMERIC NOT NULL,
        image_url TEXT
      )`);
  }

    static async getAllItems() {
        const db = await openDB();
        const items = await db.all("SELECT * FROM items");
        return items;
    }

    static async getItemById(id) {
        const db = await openDB();
        const item = await db.get("SELECT * FROM items WHERE id = ?", id);
        return item;
    }
}