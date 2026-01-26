import ProductCard from "../../ui/card/ProductCard.jsx";
import { motion } from "framer-motion";

function Body() {
  return (
    <section className="bg-linear-to-b from-beige-light to-beige min-h-screen">
      {/* topp */}
      <div className="relative overflow-hidden">
        {/* Bakgrund*/}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.2)_1px,transparent_0)] bg-size-[40px_40px]"></div>
        </div>

        {/* Rubrik  */}
        <div className="container mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* separator */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-20 bg-linear-to-r from-transparent via-gold to-transparent"></div>
              <div className="mx-6">
                <span className="text-gold-dark font-heading italic text-sm tracking-[0.5em]">
                  LUXURY SELECTION
                </span>
              </div>
              <div className="h-px w-20 bg-linear-to-r from-transparent via-gold to-transparent"></div>
            </div>

            {/* Huvudrubrik */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-black font-light mb-6 tracking-tight">
              <span className="block">Our Premium</span>
              <span className="block text-gold italic">Collection</span>
            </h1>

            {/* Underrubrik */}
            <p className="text-gray-dark font-body text-lg max-w-2xl mx-auto leading-relaxed tracking-wide font-normal">
              Handcrafted formulations that blend ancient Moroccan wisdom with
              modern skincare science
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-24"
          >
            {[
              { number: "100%", label: "Organic", color: "text-green-dark" },
              {
                number: "24H",
                label: "Cold-pressed",
                color: "text-gold-dark",
              },
              { number: "S1", label: "Sustainable", color: "text-green" },
              { number: "0%", label: "Additives", color: "text-gold" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-3xl md:text-4xl font-heading ${stat.color} mb-2 font-light`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-dark font-body text-sm tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Produktsektion */}
      <div className="relative">
        {/* Dekorativ bakgrund */}
        <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-beige-light to-transparent"></div>

        <div className="container mx-auto px-4 pb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <ProductCard />
          </motion.div>
        </div>

        {/* Call to Action sektion */}
        {/* <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="container mx-auto px-4 py-20 text-center"
         >
           <div className="max-w-2xl mx-auto bg-linear-to-br from-black/5 to-beige/20 backdrop-blur-sm rounded-2xl p-12 border border-beige-dark/30">
             <h2 className="text-3xl font-heading text-black mb-6 font-light">
               Experience Moroccan Luxury
             </h2>
             <p className="text-gray-dark font-body mb-8 leading-relaxed">
               Join our community of skincare enthusiasts and receive exclusive
               insights into ancient beauty rituals.
             </p>
             <button className="bg-black text-pearl hover:bg-gold hover:text-black px-10 py-4 rounded-sm transition-all duration-300 tracking-widest text-sm font-body">
               JOIN OUR JOURNEY
             </button>
           </div>
         </motion.div> */}
      </div>
    </section>
  );
}

export default Body;
