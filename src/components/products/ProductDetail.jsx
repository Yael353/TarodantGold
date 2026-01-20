import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../../data/products.json";
import RelatedProducts from "../ui/RelatedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = productsData.productsData.find(
      (p) => p.id.toString() === id
    );

    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-beige flex flex-col items-center justify-center">
        <h1 className="text-2xl text-gray-700 mb-4">Product not found</h1>
        <Link to="/" className="text-gold hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-beige top-20 min-h-screen p-8">
      {/* Bild-sidan */}
      <div className="container flex flex-col  mx-auto lg:flex-row">
        <div className="flex-1 w-full h-[80vh] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
            style={{
              objectPosition: "center 30%",
            }}
          />
        </div>

        {/* Detaljsidan */}
        <div className="flex-1 lg:ml-8 flex-col justify-center items-center mt-8 lg:mt-0">
          <div>
            <h2 className="font-light text-5xl text-shadow-gray-dark">
              {product.name}
            </h2>

            <div className="border-b pb-6 mb-6"></div>

            <h3 className="text-4xl font-light text-shadow-gray-dark font-heading">
              {product.volume}
            </h3>
            <div className="border-b pb-6 mb-6"></div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Vänster: Beskrivning och detaljer */}
              <div className="lg:flex-1 space-y-6">
                {/* Beskrivning */}
                <div className="">
                  <p className="text-gray-shadow-dark leading-relaxed font-body">
                    {product.description}
                  </p>
                </div>

                {/* Features och Benefits i grid */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-gray-600 font-light text-sm uppercase tracking-wide">
                      Features
                    </h4>
                    <ul className="space-y-2">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-gray-600 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {/* {product.benefits && product.benefits.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-gray-600 font-light text-sm uppercase tracking-wide">
                        Benefits
                      </h4>
                      <ul className="space-y-2">
                        {product.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span className="text-gray-600 text-sm">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div> */}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags &&
                    product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-beige/20 text-gray-700 rounded-full text-xs font-light"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              {/* Höger: Pris och volume */}
              <div className="lg:w-1/3 flex flex-col items-center lg:items-end space-y-4">
                {/* Pris-box med elegant design */}
                <div className="bg-linear-to-br from-beige-dark to-beige/10 p-6 rounded-xl border border-beige/40 min-w-50 text-center">
                  {/* Originalpris om rabatt */}
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <div className="mb-2">
                        <span className="text-gray-400 line-through text-sm">
                          {product.currency} {product.originalPrice}
                        </span>
                        <div className="text-xs text-gold mt-1">
                          Save {product.currency}{" "}
                          {product.originalPrice - product.price}
                        </div>
                      </div>
                    )}

                  {/* Huvudpris */}
                  <div className="text-5xl font-serif font-light text-gray-900 mb-1">
                    {product.price}
                  </div>

                  {/* Valuta och volume */}
                  <div className="text-gray-500 text-sm font-light">
                    {product.currency} • {product.volume}
                  </div>

                  {/* Stock status */}
                  <div
                    className={`mt-3 text-sm px-3 py-1 rounded-full ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </div>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex text-gold">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-10 h-px bg-linear-to-r from-beige/30 to-transparent mx-auto mt-4"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Vänster: Quantity input - elegant design */}
            <div className="flex-1 flex items-center justify-between bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <button
                className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors border-r border-gray-300"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <div className="flex-1 text-center px-4">
                <span className="text-lg font-medium text-gray-900">
                  {quantity}
                </span>
                <div className="text-xs text-gray-500 mt-1">Quantity</div>
              </div>

              <button
                className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors border-l border-gray-300"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            {/* Höger: Add to Cart knapp - med ikon */}
            <button className="flex-1 bg-linear-to-r from-gold to-gold-dark text-black font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart • {quantity}
            </button>
          </div>
        </div>
      </div>
      <div className="py-4"><RelatedProducts currentProductId={product.id} /></div>
      <div className="mt-8">
        <Link
          to="/products"
          className="inline-flex items-center text-gold hover:text-gold-dark font-medium"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Products
        </Link>
      </div>
    </div>
  );
}
