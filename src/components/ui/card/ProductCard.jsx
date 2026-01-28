import { Link } from "react-router-dom";
import productsData from "../../../data/products.json";
import Button from "../button/Button.jsx";
import { useCart } from "../../../context/CartContext.jsx";
import { motion } from "framer-motion";

export default function ProductList() {
  // Komponenten heter ProductList, inte ProductCard
  const products = productsData.productsData || [];
  const { addToCart, isInCart } = useCart();

  return (
    <div className="bg-beige-light py-8 flex justify-center items-center pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Produktgrid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const handleAddToCart = () => {
              addToCart(product, 1);
              console.log("Added to Cart:", product.name);
            };

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-linear-to-b from-white to-beige-light/30 rounded-xl overflow-hidden border border-beige-dark/30 hover:border-gold/40 transition-all duration-500 hover:shadow-luxury"
              >
                {/* Bildcontainer med hover-effekt */}
                <div className="relative h-80 overflow-hidden bg-linear-to-br from-beige-light/40 to-beige-light/10">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Overlay med info på hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 text-pearl">
                      <p className="text-sm font-heading tracking-wide">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Badge med animation */}
                  {product.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 bg-linear-to-r from-gold to-gold-dark text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                    >
                      NEW ARRIVAL
                    </motion.div>
                  )}
                </div>

                {/* Produktinformation */}
                <div className="p-6 space-y-4">
                  {/* Titel och pris */}
                  <div>
                    <h3 className="font-heading text-xl text-black font-light tracking-wide mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-heading text-gold-dark font-light">
                        {product.currency || "$"}
                        {product.price.toFixed(2)}
                      </span>
                      {/* Rating med stjärnor */}
                      {product.rating && (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(product.rating)
                                  ? "text-gold"
                                  : "text-gray"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Kort beskrivning (endast mobil) */}
                  {product.shortDescription && (
                    <p className="text-gray-dark font-body text-sm mb-4 line-clamp-2 md:hidden">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Knappar */}
                  <div className="flex gap-3 pt-4">
                    {isInCart(product.id) ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-green-dark text-white py-3 rounded-sm text-sm tracking-widest font-body"
                      >
                        ADDED TO CART
                      </motion.button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={handleAddToCart}
                        className="flex-1 bg-black text-pearl hover:bg-gold hover:text-black py-3 rounded-sm text-sm tracking-widest font-body transition-all duration-300"
                      >
                        ADD TO CART
                      </motion.button>
                    )}
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 border border-gray hover:border-gold hover:text-gold-dark text-black py-3 text-center text-sm tracking-widest font-body rounded-sm transition-all duration-300"
                    >
                      LEARN <br />
                      MORE
                    </Link>
                  </div>
                </div>

                {/* Eco badge - endast för vissa produkter */}
                {product.isEco && (
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-soft rounded-full flex items-center justify-center">
                    <span className="text-green-dark text-xs font-bold rotate-45">
                      ECO
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Inga produkter meddelande */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-dark font-body text-xl">
              No products available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
