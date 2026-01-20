import { Link } from "react-router-dom";
import Button from "../../ui/button/Button";

export default function HeroSection() {
  return (
    <header className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -left-4 -right-4 md:left-0 md:right-0">
        {" "}
        <img
          src="/images/bg-2.png"
          alt="Moroccan argan oil background"
          className="w-[calc(100%+2rem)] md:w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50 w-[calc(100%+2rem)] md:w-full"></div>
      </div>

      <div className="relative z-10 min-h-[70vh] lg:min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <div className="mb-8 md:mb-12">
            <span className="text-pearl font-heading text-3xl md:text-4xl tracking-widest">
              Tarodant Gold
            </span>
          </div>

          <div className="max-w-6xl mx-auto tracking-widest mb-6">
            <h1 className="text-pearl font-heading text-4xl md:text-5xl lg:text-6xl font-light mb-2">
              The Pure Essence of Moroccan
            </h1>
            <h2 className="text-pearl font-heading text-4xl md:text-5xl lg:text-6xl font-light">
              Argan - 100% Organic
            </h2>
          </div>

          <div className="inline-block border border-gold/50 rounded-full px-4 py-2 mb-6 md:mb-8">
            <span className="text-pearl font-body font-medium tracking-widest text-sm md:text-base">
              100% ORGANIC • ETHICALLY SOURCED
            </span>
          </div>

          <p className="text-pearl/85 font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 tracking-wide">
            Nourish your skin and hair with the purest Moroccan argan oil, rich
            in antioxidants and essential fatty acids.
          </p>
          <Link to="/products">
          <Button />
          </Link>
        </div>
      </div>
    </header>
  );
}
