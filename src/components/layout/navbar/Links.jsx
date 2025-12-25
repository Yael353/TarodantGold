export default function Links() {
  const links = ["Home", "Collection", "About", "Contact"];

  return (
    <nav className="flex items-center gap-10">
      {links.map((link) => (
        <div key={link} className="relative group">
          <button
            className="text-beige-dark font-body font-light tracking-[0.2em] 
                           text-xs uppercase transition-colors duration-300
                           hover:text-gold-dark"
          >
            {link}
          </button>
          <div
            className="absolute -bottom-1 left-0 w-0 h-px bg-gold 
                        transition-all duration-500 group-hover:w-full"
          />
        </div>
      ))}
    </nav>
  );
}
