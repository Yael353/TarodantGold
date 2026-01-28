import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black/90 backdrop-blur-md border-t border-beige/10">
      {/* Bakgrundsbild  */}

      <div className="absolute inset-0">
        <img
          src="/images/footer.png"
          alt="Moroccan argan oil background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo sektion */}

        <div className="text-center mb-12">
          <div className="group cursor-pointer inline-block">
            <h1 className="text-gold font-heading text-3xl md:text-4xl tracking-widest font-light mb-2">
              TAROUDANT
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-linear-to-r from-transparent to-gold"></div>
              <span className="text-beige-dark/80 font-body text-sm tracking-widest font-light">
                PREMIUM ARGAN OIL
              </span>
              <div className="h-px w-8 bg-linear-to-l from-transparent to-gold"></div>
            </div>
          </div>
        </div>

        {/* Tre kolumner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Kolumn 1 */}
          <div>
            <h3 className="text-gold font-heading text-lg font-semibold mb-6 pb-2 border-b border-gold/30">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-beige/80 hover:text-gold transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-beige/80 hover:text-gold transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-beige/80 hover:text-gold transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-beige/80 hover:text-gold transition-colors duration-200"
                >
                  Blog & Tips
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-beige/80 hover:text-gold transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Kolumn 2 */}
          <div>
            <h3 className="text-gold font-heading text-lg font-semibold mb-6 pb-2 border-b border-gold/30">
              Customer Service
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-gold mt-1 shrink-0" />
                <span className="text-beige/80">info@taroudantgold.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="text-gold mt-1 shrink-0" />
                <span className="text-beige/80">+46 72 000 000</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gold mt-1 shrink-0" />
                <span className="text-beige/80">Stockholm, Sweden</span>
              </li>
            </ul>
          </div>

          {/* Kolumn 3 */}
          <div>
            <h3 className="text-gold font-heading text-lg font-semibold mb-6 pb-2 border-b border-gold/30">
              Stay Connected
            </h3>
            <p className="text-beige/80 mb-6">
              Subscribe to our newsletter for exclusive offers and argan oil
              tips.
            </p>

            {/* form */}
            <form className="mb-8">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-black/30 border border-gold/30 rounded px-4 py-2 text-beige placeholder-beige/50 focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="bg-gold/20 hover:bg-gold/30 text-gold font-medium px-4 py-2 rounded border border-gold/30 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* Social Media */}
            <div>
              <h4 className="text-beige font-medium mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black/40 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black/40 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-110 transition-all"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black/40 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="mailto:info@taroudantgold.com"
                  className="w-10 h-10 rounded-full bg-black/40 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-110 transition-all"
                  aria-label="Email"
                >
                  <FaEnvelope size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* copyright del */}
        <div className="pt-8 border-t border-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-beige/60 text-sm">
              © {currentYear} Tarodant Gold. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="/privacy"
                className="text-beige/60 hover:text-gold transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-beige/60 hover:text-gold transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/shipping"
                className="text-beige/60 hover:text-gold transition-colors"
              >
                Shipping Policy
              </a>
              <a
                href="/returns"
                className="text-beige/60 hover:text-gold transition-colors"
              >
                Returns & Refunds
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
