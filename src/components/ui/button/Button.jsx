function Button() {
  return (
    <button
      className="relative bg-gold-dark text-black font-heading font-semibold py-1 px-8 
                  border-2 border-t-gold-300 border-r-gold-700 border-b-gold-900 border-l-gold-500
                  transition-all duration-200
                  shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.2),inset_2px_2px_4px_rgba(255,255,255,0.1)]
                  hover:shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.2),inset_1px_1px_3px_rgba(255,255,255,0.1)]
                  hover:translate-y-0.5
                  active:shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]
                  active:translate-y-1"
    >
      Shop Now
    </button>
  );
}

export default Button;
