import { useState } from "react"; // 1. Importar o useState
import { FaBoxOpen } from "react-icons/fa"; // 2. Escolher o ícone de placeholder
import "../../index.css";

export default function ProductCard({ product }) {
    const [imageError, setImageError] = useState(false);
    const handleAddToCart = async () => {
        try {
            await axios.post("http://localhost:3001/api/cart/add", {
            product_id: product.id,
            quantity: 1
            });
            alert("Produto adicionado ao carrinho!");
        } catch (error) {
            alert("Erro: " + error.response.data.error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 transition-all hover:shadow-lg flex flex-col h-full">
        {/* Container da Imagem ou Ícone */}
        <div className="w-full h-48 mb-4 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
            {imageError || !product.product_image_url ? (
            // Renderiza o Ícone se houver erro ou se a URL for vazia
            <div className="flex flex-col items-center text-gray-400">
                <FaBoxOpen size={48} className="opacity-50" />
                <span className="text-xs mt-2">No image</span>
            </div>
            ) : (
            // Renderiza a Imagem se estiver tudo certo
            <img
                src={product.product_image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={() => setImageError(true)} // Se falhar, muda o estado
            />
            )}
        </div>

        {/* Conteúdo do Produto */}
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
            <button
            onClick={handleAddToCart}
            className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors duration-300 font-medium text-sm">
                Add to Cart
            </button>
            </div>
        </div>
        </div>
    );
}