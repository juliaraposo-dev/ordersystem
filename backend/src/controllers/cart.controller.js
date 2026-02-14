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
            const { productId } = req.params;

            if (!productId || productId === 'undefined') {
                return res.status(400).json({ error: "Product ID is missing" });
            }

            await CartService.removeFromCart(productId);
            res.status(200).json({ message: "Item removed" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async checkout(req, res) {
        try {
            await CartService.checkout();
            res.status(200).json({ message: "Checkout successful" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default CartController;
