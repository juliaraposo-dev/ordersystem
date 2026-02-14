import axios from "axios";
import "../../index.css";
import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";

export default function ProductImage(product) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="w-full h-48 mb-4 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
            {imageError || !product.image_url ? (
            <div className="flex flex-col items-center text-gray-400">
                <FaBoxOpen size={48} className="opacity-50" />
                <span className="text-xs mt-2">No image</span>
            </div>
            ) : (
            <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={() => setImageError(true)}
            />
            )}
        </div>
    )
}