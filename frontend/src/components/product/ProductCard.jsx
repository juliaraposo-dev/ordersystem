import axios from "axios";
import "../../index.css";
import ProductImage from "./ProductImage";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    if (!product) return null;
    
    const handleNavigation = () => {
        const id = product.product_id || product.id;
        navigate(`/product/${id}`);
    };

    return (
        <div 
            onClick={handleNavigation}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4 transition-all hover:shadow-lg cursor-pointer flex flex-col h-full"
        >
            <ProductImage {...product} />

            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1 text-gray-800 truncate">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-cyan-600 font-bold text-xl">
                        ${product.price?.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}