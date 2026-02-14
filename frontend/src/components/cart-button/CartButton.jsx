import "../../index.css";
import { FaShoppingCart } from "react-icons/fa";

export default function CartButton() {
    return (
        <button className="relative p-2.5 text-gray-300 hover:text-white bg-gray-900/50 rounded-full border border-white/10 transition-all cursor-pointer">
            <FaShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-cyan-600 text-[11px] font-bold rounded-full ring-2 ring-gray-800">
                0
            </span>
        </button>
    )
}