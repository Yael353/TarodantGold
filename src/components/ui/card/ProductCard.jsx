export default function ProductCard() {
  const products = [
    {
      id: 1,
      name: "Argan Oil",
      description: "Pure argan oil for hair and skin care.",
      price: 29.99,
    },
    {
      id: 2,
      name: "Rosehip Oil",
      description: "Rich in antioxidants for skin rejuvenation.",
      price: 34.99,
    },
    {
      id: 3,
      name: "Jojoba Oil",
      description: "Moisturizing oil suitable for all skin types.",
      price: 24.99,
    },
    {
      id: 4,
      name: "Coconut Oil",
      description: "Versatile oil for cooking and skin care.",
      price: 19.99,
    },
  ];

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-semibold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
