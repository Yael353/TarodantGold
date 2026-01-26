import { Link } from "react-router-dom";
import productsData from "../../../data/products.json";

export default function RelatedProducts({ currentProductId }) {
  const products = productsData.productsData || [];

  const relatedProducts = products.filter(
    (product) => product.id !== currentProductId,
  );

  const displayProducts = relatedProducts.slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <div className="mt-2">
      <div className="flex">
        {displayProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group block"
          >
            <div className="aspect-square rounded-lg p-2">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 line-clamp-1">
                {product.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
