import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBasket, ArrowRight } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="min-h-screen bg-linear-to-b from-beige-light to-beige flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Ikon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 bg-linear-to-br from-beige-light to-beige border-2 border-dashed border-gold/30 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <ShoppingBasket className="w-16 h-16 text-gold/50" />
        </motion.div>

        {/* Text */}
        <h1 className="font-heading text-4xl text-black font-light mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-dark font-body text-lg mb-8 max-w-sm mx-auto">
          Looks like you haven't added any luxurious products to your cart yet.
        </p>

        {/* CTA */}
        <div className="space-y-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-linear-to-r from-gold to-gold-dark text-black font-heading px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-500 group"
          >
            <span>Explore Collection</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>

          <div>
            <p className="text-gray-dark font-body text-sm mt-6 mb-4">
              Need inspiration?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Best Sellers", "New Arrivals", "Gift Sets", "Skincare"].map(
                (category, index) => (
                  <Link
                    key={index}
                    to={`/products?category=${category.toLowerCase()}`}
                    className="px-4 py-2 border border-gold/30 text-gold rounded-full hover:bg-gold/10 transition-colors duration-300 text-sm"
                  >
                    {category}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Trust message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-beige-dark/20"
        >
          <p className="text-gray-dark font-body text-sm">
            ✨ Free shipping on orders over 500 SEK
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
