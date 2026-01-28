import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import { useCart } from "../../../context/CartContext";

export default function CartItem({ item, index }) {
  const {
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    updateQuantity,
  } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      updateQuantity(item.id, value);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-linear-to-br from-white to-beige-light/20 rounded-2xl p-6 border border-beige-dark/20 hover:border-gold/30 transition-all duration-500 hover:shadow-xl"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Bild */}
        <Link
          to={`/product/${item.id}`}
          className="shrink-0 w-full md:w-40 h-40 rounded-xl overflow-hidden bg-linear-to-br from-beige-light/30 to-beige-light/10"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={item.images?.[0] || "/placeholder.jpg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Information */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <Link
                to={`/product/${item.id}`}
                className="group/title inline-block"
              >
                <h3 className="font-heading text-xl text-black font-light mb-2 group-hover/title:text-gold transition-colors duration-300">
                  {item.name}
                </h3>
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.isEco && (
                  <span className="px-3 py-1 bg-green-soft text-green-dark text-xs rounded-full">
                    ECO
                  </span>
                )}
                {item.isNew && (
                  <span className="px-3 py-1 bg-gold-light text-gold-dark text-xs rounded-full">
                    NEW
                  </span>
                )}
              </div>

              {/* Pris */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-heading text-2xl text-gold-dark font-light">
                  {item.currency || "SEK"} {item.price.toFixed(2)}
                </span>
                <span className="text-gray-dark font-body">per item</span>
              </div>
            </div>

            {/* Quantity controls */}
            <div className="flex flex-col items-end gap-4">
              {/* Desktop quantity */}
              <div className="hidden md:flex items-center border border-beige-dark/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => decrementQuantity(item.id)}
                  className="w-10 h-10 flex items-center justify-center text-gray-dark hover:text-gold hover:bg-beige-dark/10 transition-all duration-300"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center text-lg font-heading bg-transparent outline-none"
                />
                <button
                  onClick={() => incrementQuantity(item.id)}
                  className="w-10 h-10 flex items-center justify-center text-gray-dark hover:text-gold hover:bg-beige-dark/10 transition-all duration-300"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Mobile quantity */}
              <div className="md:hidden flex items-center justify-between w-full">
                <div className="flex items-center border border-beige-dark/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="w-10 h-10 flex items-center justify-center text-gray-dark hover:text-gold hover:bg-beige-dark/10"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-16 text-center text-lg font-heading">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="w-10 h-10 flex items-center justify-center text-gray-dark hover:text-gold hover:bg-beige-dark/10"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-2 text-gray-dark hover:text-red-500 font-body text-sm transition-colors duration-300"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
                <button className="flex items-center gap-2 text-gray-dark hover:text-red-400 font-body text-sm transition-colors duration-300">
                  <Heart size={16} />
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Total för denna produkt */}
          <div className="mt-6 pt-6 border-t border-beige-dark/10 flex justify-between items-center">
            <span className="text-gray-dark font-body">Item total:</span>
            <span className="font-heading text-2xl text-gold-dark font-light">
              {item.currency || "SEK"} {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
