import "../../index.css";
import Logo from "../logo/Logo.jsx";
import CartButton from "../cart/CartButton.jsx";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-white/10 px-4">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        <Logo />
        <CartButton />
        
      </div>
    </nav>
  );
}
