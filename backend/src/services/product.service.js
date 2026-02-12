import ProductModel from "../models/product.model.js";

class ProductService {
  static async getAllProducts() {
    return await ProductModel.getAllItems();
  }

  static async getProductById(id) {
    if(!id) {
      throw new Error("Product ID is required");
    }
    if(isNaN(id) || id <= 0) {
      throw new Error("Invalid product ID");
    }
    return await ProductModel.getItemById(id);
  }

}

export default ProductService;