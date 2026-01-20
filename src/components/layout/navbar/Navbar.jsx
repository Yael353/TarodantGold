import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BurgerMenu from "./BurgerMenu";
import Button from "../../ui/button/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-black/90 backdrop-blur-md border-b border-beige/10 h-20 flex items-center px-6 fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center w-full mx-auto">
          {/* Logo - vänster */}
          <Link to="/">
            <div className="flex-1 flex justify-start">
              <div className="group cursor-pointer">
                <h1 className="text-gold font-heading text-2xl md:text-3xl tracking-widest font-light">
                  TARODANT
                </h1>
                <div className="flex items-center justify-center gap-1">
                  <div className="h-px w-6 bg-linear-to-r from-transparent to-gold"></div>
                  <span className="text-beige-dark/80 font-body text-xs tracking-widest font-light">
                    GOLD
                  </span>
                  <div className="h-px w-6 bg-linear-to-l from-transparent to-gold"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center gap-10">
              <Link to="/products" className="text-gray-300 hover:text-gold">
                Products
              </Link>
            </div>
          </div>

          {/* Höger sida */}
          <div className="hidden md:flex flex-1 justify-end">
            {/* Kanske lägga till i18n? */}
          </div>

          {/* Mobil meny knapp */}
          <div className="md:hidden">
            <BurgerMenu
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </nav>

      {/* Mobilt läge animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 top-20 w-screen bg-black/95 backdrop-blur-lg z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="h-full flex flex-col items-center justify-center px-6"
            >
              <div className="space-y-8 text-center">
                {/* Mobile Links med fördröjda animationer */}
                <div className="flex flex-col gap-8">
                  {["Home", "Shop", "About Us", "Contact"].map(
                    (item, index) => (
                      <motion.button
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl text-beige font-light tracking-widest hover:text-gold transition-colors"
                      >
                        {item}
                      </motion.button>
                    )
                  )}
                </div>

                {/* Divider med animation */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="h-px w-48 mx-auto bg-linear-to-r from-transparent via-gold/30 to-transparent"
                />

                {/* CTA med animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <Button />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
