import CartService from "../services/cart.service.js";

class CartController {

    static async addToCart(req, res) {
        try {
            const { product_id, quantity } = req.body;
            await CartService.addProductToCart(product_id, quantity);
            res.status(200).json({ message: "Product added to cart" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getCartItems(req, res) {
        try {
            const items = await CartService.getCartItems();
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateItemQuantity(req, res) {
        try {
            const { product_id, quantity } = req.body;
            await CartService.updateItemQuantity(product_id, quantity);
            res.status(200).json({ message: "Cart item quantity updated" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async removeFromCart(req, res) {
        try {
            const { product_id } = req.body;
            await CartService.removeFromCart(product_id);
            res.status(200).json({ message: "Product removed from cart" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async clearCart(req, res) {
        try {
            await CartService.clearCart();
            res.status(200).json({ message: "Cart cleared" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

export default CartController;