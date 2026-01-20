// import jsonData from "../data/products.json";

// export function useProducts() {
//   const products = jsonData.productsData || [];

//   console.log("Products loaded:", products.length, "items");

//   const getProductById = (id) => {
//     const product = products.find((p) => p.id === id);
//     console.log(`Looking for id ${id}:`, product ? "Found" : "Not found");
//     return product;
//   };

//   const getProductsByCategory = (category) =>
//     products.filter((p) => p.category === category);

//   const getFeaturedProducts = () => products.filter((p) => p.isFeatured);

//   const getBestsellers = () => products.filter((p) => p.isBestseller);

//   const searchProducts = (query) => {
//     const q = query.toLowerCase();
//     return products.filter(
//       (p) =>
//         p.name.toLowerCase().includes(q) ||
//         p.description.toLowerCase().includes(q)
//     );
//   };

//   return {
//     products,
//     getProductById,
//     getProductsByCategory,
//     getFeaturedProducts,
//     getBestsellers,
//     searchProducts,
//   };
// }
