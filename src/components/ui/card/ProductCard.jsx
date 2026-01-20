import { Link } from "react-router-dom";
import productsData from "../../../data/products.json";
import Button from "../button/Button.jsx";
import { useCart } from "../../../context/CartContext.jsx";

export default function ProductList() {
  const products = productsData.productsData || [];
  const { addToCart, isInCart } = useCart();

  const testCart = () => {
    console.log("🛒 Test: addToCart finns?", typeof addToCart);
    console.log("🛒 Test: isInCart finns?", typeof isInCart);

    if (products.length > 0) {
      console.log("🛒 Test: Lägger till första produkten:", products[0].name);
      addToCart(products[0], 1);
    }
  };

  return (
    <div className="bg-beige py-8 flex justify-center items-center pb-20">
      <button
        onClick={testCart}
        className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded z-50"
      >
        Test Cart
      </button>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Produktgrid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const handleAddToCart = () => {
              addToCart(product, 1);
              console.log("Added to Cart:", product.name);
            };

            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Bildcontainer  */}
                <div className="relative h-64 overflow-hidden bg-beige/30 flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000"
                  />

                  
                  {/* New badge */}
                  {product.isNew && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                </div>

                {/* Produktinformation */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-2 min-h-14">
                    {product.name}
                  </h3>

                 

                  {/* Prissektion */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        {product.currency || "$"}
                        {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <span className="text-gray-400 line-through text-sm">
                            {product.currency || "$"}
                            {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                    </div>

                    {/* Rating  */}
                    {product.rating && (
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                        <span className="text-amber-600 font-bold text-sm mr-1">
                          {product.rating}
                        </span>
                        <div className="text-amber-500 text-sm">★</div>
                      </div>
                    )}
                  </div>

                  {/* Kort beskrivning */}
                  {product.shortDescription && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Knappar */}
                  <div className="flex gap-2">
                    {isInCart(product.id) ? (
                      <Button
                        disabled
                        className="flex-1 py-2 text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                        text="Added ✓"
                      />
                    ) : (
                      <Button
                        onClick={handleAddToCart} 
                        className="flex-1 py-2 text-sm"
                        text="Add to Cart"
                      />
                    )}
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 font-medium py-2.5 px-4 rounded-lg text-sm text-center transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inga produkter meddelande */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
}
