import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Trash2, RefreshCw } from "lucide-react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import { useCart } from "../../../context/CartContext";

export default function CartPage() {
  const { cart, totalItems, totalPrice, clearCart, isEmpty } = useCart();

  if (isEmpty) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-beige-light to-beige pt-24 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center text-sm text-gray-dark font-body tracking-wide">
            <Link
              to="/"
              className="hover:text-gold transition-colors duration-300"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/products"
              className="hover:text-gold transition-colors duration-300"
            >
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Shopping Cart</span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Produkter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-2/3"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h1 className="font-heading text-3xl md:text-4xl text-black font-light">
                      Your Cart
                    </h1>
                    <p className="text-gray-dark font-body">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-2 text-gray-dark hover:text-red-500 font-body text-sm transition-colors duration-300"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                  <Link
                    to="/products"
                    className="flex items-center gap-2 text-gold hover:text-gold-dark font-body text-sm transition-colors duration-300"
                  >
                    <RefreshCw size={16} />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />
            </div>

            {/* Product List */}
            <motion.div layout className="space-y-6">
              {cart.map((item, index) => (
                <CartItem
                  key={`${item.id}-${index}`}
                  item={item}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-beige-dark/20"
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-3 text-gold hover:text-gold-dark font-body tracking-widest transition-colors duration-300 group"
              >
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform duration-300"
                />
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>

          {/* Höger sida - Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/3"
          >
            <CartSummary />
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: "🚚",
              title: "Free Shipping",
              desc: "On orders over 500 SEK",
            },
            {
              icon: "🔄",
              title: "30-Day Returns",
              desc: "Hassle-free returns",
            },
            {
              icon: "🔒",
              title: "Secure Payment",
              desc: "100% secure & encrypted",
            },
            {
              icon: "🌿",
              title: "100% Organic",
              desc: "Certified organic products",
            },
          ].map((badge, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-white to-beige-light/30 p-6 rounded-xl border border-beige-dark/20 text-center"
            >
              <div className="text-3xl mb-3">{badge.icon}</div>
              <h3 className="font-heading text-black font-light mb-1">
                {badge.title}
              </h3>
              <p className="text-gray-dark font-body text-sm">{badge.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
