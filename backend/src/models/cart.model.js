import { openDB } from '../configDB.js';

class CartModel {

    static async createTableCart() {
        const db = await openDB();
        await db.exec(`CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'open',
            FOREIGN KEY (product_id) REFERENCES products(id)

            CHECK (quantity > 0 AND quantity <= 100)
        )`);
    }

    static async getTotalPrice() {
        const db = await openDB();
        const result = await db.get(`
            SELECT SUM(p.price * c.quantity) AS total_price 
            FROM cart c 
            JOIN products p ON c.product_id = p.id
        `);
        return result?.total_price || 0;
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

    static async checkout() {
        const db = await openDB();
        
        await db.run("UPDATE cart SET status = 'checked_out' WHERE status = 'open'");
        this.clearCart();
    }

}

export default CartModel;