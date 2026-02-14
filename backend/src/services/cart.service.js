import CartModel from "../models/cart.model.js";

class CartService {

    static async addProductToCart(productId, quantity) {
        if(!quantity) {
            throw new Error("Quantity is required");
        }
        if(isNaN(quantity) || quantity <= 0 || quantity > 10) {
            throw new Error("Quantity must be between 1 and 10");
        }
        if(!productId) {
            throw new Error("Product ID is required");
        }
        if(isNaN(productId) || productId <= 0) {
            throw new Error("Invalid product ID");
        }
        await CartModel.addToCart(productId, quantity);
    }

    static async getCartItems() {
        const items = await CartModel.getCartItems();
        return items;
    }

    static async updateItemQuantity(productId, quantity) {
        if(!quantity) {
            throw new Error("Quantity is required");
        }
        if(isNaN(quantity) || quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
        if(!productId) {
            throw new Error("Product ID is required");
        }
        if(isNaN(productId) || productId <= 0) {
            throw new Error("Invalid product ID");
        }
        await CartModel.updateItemQuantity(productId, quantity);
    }

    static async removeFromCart(productId) {
        if(!productId) {
            throw new Error("Product ID is required");
        }
        if(isNaN(productId) || productId <= 0) {
            throw new Error("Invalid product ID");
        }
        await CartModel.removeFromCart(productId);
    }

    static async clearCart() {
        await CartModel.clearCart();
    }

}

export default CartService;