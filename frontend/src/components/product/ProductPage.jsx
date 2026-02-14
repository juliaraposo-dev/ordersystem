import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMinus, FaPlus, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import "../../index.css";
import ProductImage from "./ProductImage";

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleIncrement = () => {
        if (quantity < 10) setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleAddToCart = async () => {
        try {
            await axios.post("http://localhost:3001/api/cart/add", {
                product_id: product.id,
                quantity: quantity
            });
            alert("Successfully added to cart! (Limit of 10 units applied)");
        } catch (error) {
            alert("Error adding to cart");
        }
    };

    if (loading) return <div className="max-w-7xl mx-auto p-6 text-center">Loading...</div>;
    if (!product) return <div className="max-w-7xl mx-auto p-6 text-center">Product not found.</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 mb-6 transition-colors font-medium"
            >
                <FaArrowLeft size={14} /> Back
            </button>

            <h2 className="text-2xl font-bold text-cyan-600 mb-8">Product Details</h2>
            
            <div className="flex flex-col items-center text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <ProductImage {...product} />
                
                <h3 className="text-2xl font-bold text-gray-800 mt-6">
                    {product.name}
                </h3>
                <p className="text-gray-600 max-w-md mt-2 mb-6">
                    {product.description}
                </p>
                
                <span className="text-3xl font-black text-cyan-600 mb-8">
                    ${(product.price * quantity).toFixed(2)}
                </span>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
                        <button 
                            onClick={handleDecrement}
                            className="p-3 text-gray-600 hover:text-cyan-600 disabled:opacity-30"
                            disabled={quantity <= 1}
                        >
                            <FaMinus size={14} />
                        </button>
                        
                        <input 
                            type="number" 
                            value={quantity}
                            readOnly
                            className="w-12 text-center bg-transparent font-bold text-lg text-gray-800 outline-none"
                        />
                        
                        <button 
                            onClick={handleIncrement}
                            className="p-3 text-gray-600 hover:text-cyan-600 disabled:opacity-30"
                            disabled={quantity >= 10}
                        >
                            <FaPlus size={14} />
                        </button>
                    </div>

                    <button 
                        onClick={() => {
                            handleAddToCart();
                            navigate("/cart");
                        }}
                        className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-cyan-100"
                    >
                        <FaShoppingCart />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}