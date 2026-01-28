import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Body from "./components/layout/body/Body";
import Footer from "./components/layout/footer/Footer";
import ProductDetail from "./components/products/ProductDetail";
import "./App.css";
import HeroSection from "./components/layout/hero/HeroSection";
import { CartProvider } from "./context/CartContext";
import CartPage from "./components/layout/cart/CartPage";
import AboutPage from "./components/layout/aboutus/AboutUs";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow pt-20">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Body />
                </>
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products" element={<Body />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
