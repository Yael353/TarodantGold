import ProductCard from "../../ui/card/ProductCard.jsx";

function Body() {
  return (
    <div className=" bg-beige">
      <div className="flex items-center justify-center gap-1 md:gap-2 pt-10 pb-10">
        <div className="h-2 w-20 bg-linear-to-r from-transparent to-gold"></div>
        <h1 className="text-black font-heading text-2xl md:text-3xl md:tracking-widest font-light">
          Our premium collection
        </h1>
        <div className="h-2 w-20 bg-linear-to-l from-transparent to-gold-dark"></div>
      </div>
      <ProductCard />
    </div>
  );
}

export default Body;
