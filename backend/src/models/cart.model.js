import { openDB } from '../configDB.js';

class CartModel {

    static async createTableCart() {
        const db = await openDB();
        await db.exec(`CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )`);
    }

    static async dropTableCart() {
        const db = await openDB();
        await db.exec("DROP TABLE IF EXISTS cart");
    }

    static async addToCart(productId, quantity) {
        const db = await openDB();
        await db.run("INSERT INTO cart (product_id, quantity) VALUES (?, ?)", productId, quantity);
    }

    static async getCartItems() {
        const db = await openDB();
        const items = await db.all(`SELECT cart.id, products.name, products.price, cart.quantity
                                    FROM cart
                                    JOIN products ON cart.product_id = products.id`);
        return items;
    }

    static async updateItemQuantity(productId, quantity) {
        const db = await openDB();
        await db.run("UPDATE cart SET quantity = ? WHERE product_id = ?", quantity, productId);
    }

    static async removeFromCart(productId) {
        const db = await openDB();
        await db.run("DELETE FROM cart WHERE product_id = ?", productId);
    }

    static async clearCart() {
        const db = await openDB();
        await db.run("DELETE FROM cart");
    }

}

export default CartModel;