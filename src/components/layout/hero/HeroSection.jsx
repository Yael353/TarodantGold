import { Link } from "react-router-dom";
import Button from "../../ui/button/Button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <header className="relative min-h-screen lg:min-h-[90vh] overflow-hidden">
      {/* Bakgrund */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="/images/bg-2.png"
          alt="Moroccan argan oil background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/30 to-black/40"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/10"></div>
      </div>

      <div className="absolute top-1/4 right-10 w-24 h-24 border border-gold/30 rounded-full opacity-20"></div>
      <div className="absolute bottom-1/4 left-10 w-32 h-32 border border-beige/20 rounded-full opacity-10"></div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logga */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <span className=" text-gold uppercase font-heading text-4xl md:text-5xl tracking-[0.2em] font-light">
                Taroudant GOLD
              </span>
            </motion.div>

            {/* Rubriker */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-10"
            >
              <h1 className="text-pearl font-heading text-5xl md:text-7xl lg:text-8xl font-light leading-tight tracking-wide">
                The Pure Essence
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-linear-to-r from-transparent via-gold to-transparent"></div>
                <h2 className="text-gold font-heading text-3xl md:text-4xl font-light italic">
                  of Moroccan Heritage
                </h2>
                <div className="h-px w-16 bg-linear-to-l from-transparent via-gold to-transparent"></div>
              </div>
            </motion.div>

            {/* Accent badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-3 border border-gold/30 rounded-full px-6 py-3 mb-10 backdrop-blur-sm bg-black/20"
            >
              <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
              <span className="text-pearl font-body text-sm tracking-[0.3em]">
                100% ORGANIC • ETHICALLY SOURCED • COLD-PRESSED
              </span>
              <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
            </motion.div>

            {/* Beskrivning */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-pearl/80 font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 tracking-wide font-normal"
            >
              Honoring Morocco's botanical heritage through sustainable
              partnerships. Each product tells a story of tradition, purity and
              modern elegance.
            </motion.p>

            {/* CTA Knappar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/products">
                <Button
                  variant="secondary"
                  className="px-12 py-4 text-lg group overflow-hidden relative bg-black hover:bg-gold text-pearl hover:text-black border border-gold/30"
                  text="Discover Collection"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-gold/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                </Button>
              </Link>
            </motion.div>

            {/* Scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            ></motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
