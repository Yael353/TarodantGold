import React from "react";
import { Link } from "react-router-dom";
import productsData from "../../data/products.json";

function RelatedProducts({ currentProductId }) {
  const products = productsData.productsData || [];

  const relatedProducts = products.filter(
    (product) => product.id !== currentProductId
  );

  const displayProducts = relatedProducts.slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <div className="grid grid-cols-2 P-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl">
        {displayProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group block"
          >
            <div className="bg-white w-45 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-70 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
