import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BurgerMenu from "./BurgerMenu";
import Button from "../../ui/button/Button";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effekt
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // stängd meny navigering
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
    { path: "/shop", label: "Shop" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-gold/10 py-3"
            : "bg-black/90 backdrop-blur-md border-b border-beige/10 py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo - vänster */}
            <Link to="/" className="flex-1 flex justify-start">
              <motion.div className="group cursor-pointer">
                <h1 className="text-gold font-heading text-2xl md:text-3xl tracking-widest font-light">
                  TARODANT
                </h1>
                <div className="flex items-center justify-center gap-1">
                  <motion.div
                    className="h-px w-6 bg-linear-to-r from-transparent to-gold"
                    animate={{
                      background: [
                        "linear-gradient(to right, transparent, #d4af37)",
                        "linear-gradient(to right, transparent, #b8941f, #d4af37)",
                        "linear-gradient(to right, transparent, #d4af37)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <span className="text-beige-dark/80 font-body text-xs tracking-widest font-light">
                    GOLD
                  </span>
                  <motion.div
                    className="h-px w-6 bg-linear-to-l from-transparent to-gold"
                    animate={{
                      background: [
                        "linear-gradient(to left, transparent, #d4af37)",
                        "linear-gradient(to left, transparent, #b8941f, #d4af37)",
                        "linear-gradient(to left, transparent, #d4af37)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                </div>

                <div className="absolute -inset-2 bg-gold/5 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              </motion.div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative group flex flex-col items-center"
                  >
                    <span className="text-beige/80 font-body text-sm tracking-widest hover:text-gold transition-colors duration-300">
                      {link.label}
                    </span>

                    {/* Container */}
                    <div className="absolute -bottom-1 w-full">
                      <div className="flex justify-center">
                        <motion.div
                          className="h-px bg-linear-to-r from-transparent via-gold to-transparent"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {location.pathname === link.path && (
                      <div className="absolute -bottom-1 w-full">
                        <div className="flex justify-center">
                          <motion.div
                            layoutId="navbarActive"
                            className="h-px bg-gold"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Höger */}
            <div className="hidden md:flex flex-1 justify-end">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  className="border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all duration-300"
                  text="Discover"
                />
              </motion.div>
            </div>

            {/* Mobil meny knapp */}
            <div className="md:hidden">
              <BurgerMenu
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Meny Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-lg"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ scaleY: 0, transformOrigin: "top" }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="absolute  inset-0 top-20 bg-black/95"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="h-full flex flex-col items-center justify-center px-6 overflow-y-auto"
              >
                <div className="space-y-8 text-center max-w-sm w-full">
                  {/* Fördröjda animationer */}
                  <div className="flex flex-col gap-8">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="relative group block"
                        >
                          <span className="text-2xl text-beige font-light tracking-widest hover:text-gold transition-colors duration-300 block py-3">
                            {link.label}
                          </span>

                          {/* Underline meny*/}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-px bg-linear-to-r from-transparent via-gold to-transparent opacity-0 group-hover:w-1/2 group-hover:opacity-100 transition-all duration-500" />

                          {location.pathname === link.path && (
                            <motion.div
                              layoutId="mobileActive"
                              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-gold"
                              initial={{ width: 0 }}
                              animate={{ width: "25%" }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="h-px w-48 mx-auto bg-linear-to-r from-transparent via-gold/30 to-transparent"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="pt-8"
                  >
                    <Button
                      className="w-full max-w-xs mx-auto border border-gold/50 hover:border-gold hover:bg-gold/5"
                      text="Explore Collection"
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </motion.div>

                  {/* Additional Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-12"
                  >
                    <p className="text-beige/50 font-body text-sm tracking-widest">
                      Pure Moroccan Luxury
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-linear-to-r from-gold via-gold-dark to-gold z-40"
        style={{ scaleX: isScrolled ? 1 : 0 }}
        initial={false}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
