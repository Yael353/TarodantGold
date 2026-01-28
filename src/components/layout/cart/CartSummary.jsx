import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CreditCard, Lock, Gift, Tag } from "lucide-react";
import { useCart } from "../../../context/CartContext";

export default function CartSummary() {
  const {
    totalItems,
    totalPrice,
    formattedTotalPrice,
    hasFreeShipping,
    shippingCost,
    getCartSummary,
  } = useCart();

  const summary = getCartSummary();
  const estimatedTotal = totalPrice + summary.shipping + summary.estimatedTax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-24"
    >
      <div className="bg-linear-to-br from-pearl to-beige-dark text-gold rounded-2xl p-8 border border-gold/20 shadow-2xl">
        <h2 className="font-heading text-2xl text-gold font-light mb-6">
          Order Summary
        </h2>

        {/* Order details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gold-dark font-body">
              Items ({totalItems})
            </span>
            <span className="font-heading text-xl">{formattedTotalPrice}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gold-dark font-body">Shipping</span>
            <span
              className={`font-heading ${hasFreeShipping ? "text-green-dark" : ""}`}
            >
              {hasFreeShipping ? "FREE" : `${summary.shipping} SEK`}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gold-dark font-body">Estimated Tax</span>
            <span className="font-heading">
              {summary.estimatedTax.toFixed(2)} SEK
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-gold/30 to-transparent my-4" />

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-gold/10">
            <span className="text-beige font-body text-lg">Total</span>
            <div className="text-right">
              <div className="font-heading text-3xl text-gold font-light">
                {new Intl.NumberFormat("sv-SE", {
                  style: "currency",
                  currency: "SEK",
                }).format(estimatedTotal)}
              </div>
              <p className="text-beige/60 text-sm mt-1">Including VAT</p>
            </div>
          </div>
        </div>

        {/* Promo code */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={18} className="text-gold" />
            <span className="font-body text-beige/80">Promo Code</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="ENTER CODE"
              className="flex-1 bg-beige border-gold text-black px-4 py-3 rounded-lg outline-none focus:border-gold transition-colors duration-300 font-body tracking-widest"
            />
            <button className="px-6 py-3 bg-linear-to-r from-gold to-gold-dark text-black font-bold rounded-lg hover:shadow-lg transition-shadow duration-300">
              APPLY
            </button>
          </div>
        </div>

        {/* Checkout button */}
        <button className="w-full bg-linear-to-r from-gold to-gold-dark text-black font-heading text-lg py-4 rounded-xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-500 mb-6 flex items-center justify-center gap-3">
          <CreditCard size={22} />
          PROCEED TO CHECKOUT
        </button>

        {/* Security */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-beige/60 text-sm mb-2">
            <Lock size={14} />
            <span>Secure checkout • Encrypted payment</span>
          </div>
          <p className="text-beige/40 text-xs">
            By completing your purchase you agree to our Terms of Service
          </p>
        </div>

        {/* Payment methods */}
        <div className="mt-8 pt-8 border-t border-gold/10">
          <p className="text-beige/60 text-sm mb-4 text-center">We accept</p>
          <div className="flex justify-center gap-4">
            {["💳", "👛", "📱", "🏦"].map((icon, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-xl"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Gift option */}
        <div className="mt-8 p-4 bg-black/30 rounded-xl border border-gold/10">
          <div className="flex items-center gap-3">
            <Gift size={20} className="text-gold" />
            <div>
              <p className="font-body text-beige">This order contains a gift</p>
              <p className="text-beige/60 text-sm">
                Add a gift message at checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue shopping link */}
      <div className="mt-6 text-center">
        <Link
          to="/products"
          className="text-gold hover:text-gold-dark font-body tracking-widest transition-colors duration-300"
        >
          ← Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
}
