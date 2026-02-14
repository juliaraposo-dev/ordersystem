import Navbar from "./components/navbar/Navbar.jsx";
import ProductList from "./components/product-card/ProductList.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        {/* Conteúdo principal da aplicação */}
        <ProductList />
      </div>
    </div>
  )
}
