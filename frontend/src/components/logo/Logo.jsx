import "../../index.css"
import { FaBroom } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate("/")} 
      className="flex items-center gap-2 group cursor-pointer"
    >
        <FaBroom className="text-gray-300 text-xl group-hover:rotate-360 transition-transform duration-500" />
        <span className="text-gray-300 font-bold text-xl tracking-tighter">
            Order<span className="text-cyan-600">System</span>
        </span>
    </div>
  )
}