import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaArrowLeft, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import ProductCard from "../product/ProductCard";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const showToast = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const fetchCart = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/cart/items");
            setCartItems(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchCart();
    }, []);

    const handleRemove = async (e, productId) => {
        e.stopPropagation();
        if (!productId) return;
        try {
            await axios.delete(`http://localhost:3001/api/cart/remove/${productId}`);
            showToast("Item removed");
            fetchCart();
        } catch (error) {
            alert("Error removing item");
        }
    };

    const handleUpdateQuantity = async (e, productId, newQuantity) => {
        e.stopPropagation();
        if (newQuantity < 1 || newQuantity > 10) return;

        try {
            await axios.put("http://localhost:3001/api/cart/update", {
                product_id: productId,
                quantity: newQuantity
            });
            fetchCart();
        } catch (error) {
            console.error("Update failed");
        }
    };

    const handleCheckout = async () => {
        try {
            await axios.delete("http://localhost:3001/api/cart/checkout");
            alert("Checked out successfully!");
            fetchCart();
            navigate("/");
        } catch (error) {
            alert("Checkout error");
        }
    };

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (loading) return <div className="max-w-7xl mx-auto p-6 text-center text-gray-400 font-medium">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 relative">
            {notification && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl">
                    <FaCheckCircle className="text-cyan-400" />
                    <span className="font-medium text-sm">{notification}</span>
                </div>
            )}

            <button 
                onClick={() => navigate("/")} 
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-600 mb-8 transition-colors font-medium cursor-pointer"
            >
                <FaArrowLeft size={12} /> Back to Store
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <FaShoppingCart className="text-cyan-600" /> Your Shopping Cart
            </h2>

            {cartItems.length === 0 ? (
                <div className="text-center p-16 bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-lg">Your cart is currently empty.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 relative p-5 transition-all hover:shadow-md h-full">
                                <div className="flex-grow">
                                    <ProductCard product={item} />
                                </div>
                                
                                <button 
                                    onClick={(e) => handleRemove(e, item.product_id)}
                                    className="absolute top-4 right-4 z-20 text-gray-300 hover:text-red-500 cursor-pointer p-2 bg-white/50 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-100"
                                >
                                    <FaTrash size={14} />
                                </button>

                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantity</span>
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={(e) => handleUpdateQuantity(e, item.product_id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className={`w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm font-bold transition-all ${item.quantity <= 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-cyan-50 cursor-pointer text-cyan-600'}`}
                                            >
                                                -
                                            </button>
                                            <span className="font-bold text-gray-700 w-5 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={(e) => handleUpdateQuantity(e, item.product_id, item.quantity + 1)}
                                                disabled={item.quantity >= 10}
                                                className={`w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm font-bold transition-all ${item.quantity >= 10 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-cyan-50 cursor-pointer text-cyan-600'}`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-right text-[11px] font-bold text-gray-400">
                                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-8 bg-white border border-gray-100 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-8 shadow-sm">
                        <div className="text-center sm:text-left">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total</p>
                            <p className="text-4xl font-black text-gray-900">${total.toFixed(2)}</p>
                        </div>
                        <button 
                            onClick={() => {
                                handleCheckout();
                                navigate("/");
                            }} 
                            className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white px-16 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-cyan-100 active:scale-95 w-full sm:w-auto"
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}