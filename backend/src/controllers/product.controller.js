import ProductService from "../services/product.service.js";

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            res.json(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Failed to fetch products" });
        }
    }

    static async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await ProductService.getProductById(id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            res.status(500).json({ error: "Failed to fetch product" });
        }
    }
}