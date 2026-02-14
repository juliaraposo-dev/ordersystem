import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../index.css";
import { FaShoppingCart } from "react-icons/fa";

export default function CartButton() {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCount = async () => {
            try {
                // Certifique-se que o prefixo /api/cart bate com o seu app.use no server.js
                const response = await axios.get("http://localhost:3001/api/cart/items");
                
                if (Array.isArray(response.data)) {
                    setCount(response.data.length);
                }
            } catch (error) {
                console.error("Error fetching cart count", error);
            }
        };

        fetchCount();
        const interval = setInterval(fetchCount, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <button 
            onClick={() => navigate("/cart")}
            className="relative p-2.5 text-gray-300 hover:text-white bg-gray-900/50 rounded-full border border-white/10 transition-all cursor-pointer"
        >
            <FaShoppingCart size={24} />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-cyan-600 text-[11px] font-bold rounded-full ring-2 ring-gray-800 text-white">
                    {count}
                </span>
            )}
        </button>
    );
}