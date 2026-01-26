import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";
import productsData from "../../data/products.json";
import RelatedProducts from "../ui/productDetails/RelatedProducts";
import Button from "../ui/button/Button";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const foundProduct = productsData.productsData.find(
      (p) => p.id.toString() === id,
    );

    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      console.log("Added to Cart:", product.name, "x", quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-beige-light to-beige flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-gold/30 border-t-gold rounded-full"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-beige-light to-beige flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-heading text-black font-light mb-6">
            Product Not Found
          </h1>
          <p className="text-gray-dark font-body mb-8 max-w-md">
            The product you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button
              className="border border-gold/30 hover:border-gold"
              text="Return Home"
              icon={<ArrowLeft size={18} />}
            />
          </Link>
        </motion.div>
      </div>
    );
  }

  const isProductInCart = isInCart(product.id);

  return (
    <div className="bg-gradient-to-b from-beige-light to-beige min-h-screen pt-24 pb-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8"
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
          <span className="text-gold">{product.name}</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-12"
        >
          {/* Bildsektion  */}
          <div className="lg:w-1/2">
            {/* Huvudbild */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-beige-light/50 to-beige-light/20 border border-beige-dark/20 mb-6"
            >
              <div className="aspect-square md:aspect-[4/5] flex items-center justify-center p-8">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <div className="bg-gradient-to-r from-gold to-gold-dark text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    NEW ARRIVAL
                  </div>
                )}
                {product.isEco && (
                  <div className="bg-gradient-to-r from-green to-green-dark text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    ECO-FRIENDLY
                  </div>
                )}
              </div>
            </motion.div>

            {/* Thumbnail bilder */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
                {product.images.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-gold shadow-lg"
                        : "border-beige-dark/30 hover:border-gold/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Detalj info  */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* titel */}
              <div>
                <div className="mb-4">
                  <span className="text-gray-dark font-body text-sm tracking-widest uppercase">
                    {product.category || "Premium Skincare"}
                  </span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-black font-light tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-gray-dark font-body text-lg mt-4">
                  {product.volume || "50ml"}
                </p>
              </div>

              {/* betyg */}
              <div className="flex flex-col items-center justify-between border-t border-b border-beige-dark/20 py-6">
                <div className="flex items-center gap-4">
                  {product.rating && (
                    <>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${
                              i < Math.floor(product.rating)
                                ? "text-gold fill-gold"
                                : "text-gray-light"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-dark font-body">
                        {product.rating} • {product.reviews || 24} reviews
                      </span>
                    </>
                  )}
                </div>

                {/* Pris */}
                <div className="text-right">
                  {product.originalPrice &&
                  product.originalPrice > product.price ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl text-gray-dark line-through font-body">
                        {product.currency || "$"}
                        {product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-4xl font-heading text-gold-dark font-light">
                        {product.currency || "$"}
                        {product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-4xl font-heading text-gold-dark font-light">
                      {product.currency || "$"}
                      {product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Beskrivning */}
              <div className="space-y-4">
                <h3 className="font-heading text-xl text-black font-light">
                  Description
                </h3>
                <p className="text-gray-dark font-body leading-relaxed">
                  {product.description ||
                    "Premium quality product with exceptional benefits."}
                </p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl text-black font-light">
                    Key Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-green" />
                        </div>
                        <span className="text-gray-dark font-body">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Taggar */}
              {product.tags && product.tags.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl text-black font-light">
                    Ingredients & Properties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-beige-dark/20 text-gray-dark rounded-full text-sm font-body hover:bg-beige-dark/30 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* kundvagn*/}
              <div className="space-y-6 pt-8 border-t border-beige-dark/20">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1 max-w-xs">
                    <div className="mb-2">
                      <label className="text-gray-dark font-body text-sm tracking-widest">
                        QUANTITY
                      </label>
                    </div>
                    <div className="flex items-center border border-beige-dark/30 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 flex items-center justify-center text-gray-dark hover:text-gold hover:bg-beige-dark/10 transition-all duration-300"
                      >
                        <Minus size={20} />
                      </button>
                      <div className="flex-1 text-center py-3">
                        <span className="text-2xl font-heading text-black">
                          {quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 flex items-center justify-center text-gray-dark hover:text-gold hover:bg-beige-dark/10 transition-all duration-300"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Lägg till i kundvagn */}
                  <div className="flex-1">
                    <div className="mb-2">
                      <label className="text-gray-dark font-body text-sm tracking-widest">
                        {isProductInCart ? "IN CART" : "ADD TO CART"}
                      </label>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`w-full py-4 rounded-lg flex items-center justify-center gap-3 font-body text-lg tracking-widest transition-all duration-300 ${
                        isProductInCart
                          ? "bg-green-dark text-white hover:bg-green"
                          : product.inStock
                            ? "bg-black text-pearl hover:bg-gold hover:text-black"
                            : "bg-gray text-gray-dark cursor-not-allowed"
                      }`}
                    >
                      {isProductInCart ? (
                        <>
                          <Check size={22} />
                          ADDED TO CART
                        </>
                      ) : product.inStock ? (
                        <>
                          <ShoppingBag size={22} />
                          ADD TO CART • {quantity}
                        </>
                      ) : (
                        "OUT OF STOCK"
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Tillgänglighet*/}
                <div className="flex items-center justify-between text-sm">
                  <div
                    className={`flex items-center gap-2 ${product.inStock ? "text-green-dark" : "text-red-500"}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-dark" : "bg-red-500"}`}
                    />
                    {product.inStock
                      ? "In Stock • Ready to ship"
                      : "Out of Stock"}
                  </div>
                  <div className="text-gray-dark">
                    Total:{" "}
                    <span className="text-gold-dark font-bold text-lg ml-1">
                      {product.currency || "$"}
                      {(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-beige-dark/20">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-xs text-gray-dark font-body">
                    Free Shipping
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-xs text-gray-dark font-body">
                    Secure Payment
                  </p>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-xs text-gray-dark font-body">
                    30-Day Return
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-green-soft flex items-center justify-center mx-auto mb-2">
                    <div className="w-4 h-4 text-green">✓</div>
                  </div>
                  <p className="text-xs text-gray-dark font-body">
                    100% Organic
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <RelatedProducts currentProductId={product.id} />
        </motion.div>

        {/* Back to products */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link to="/products">
            <Button
              className="border border-gold/30 hover:border-gold"
              text="Back to Collection"
              icon={<ArrowLeft size={18} />}
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
