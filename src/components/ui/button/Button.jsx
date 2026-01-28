import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function Button({
  text = "Shop Now",
  variant = "primary",
  size = "medium",
  icon = null,
  fullWidth = false,
  className = "",
  onClick,
  disabled = false,
  loading = false,
}) {
  // Variants
  const variants = {
    primary: {
      base: "bg-gradient-to-br from-gold via-gold-dark to-gold-dark",
      hover: "hover:from-gold hover:via-gold hover:to-amber-600",
      text: "text-black",
      border: "border border-gold/30",
      shadow: "shadow-lg shadow-gold/20",
    },
    secondary: {
      base: "bg-transparent",
      hover: "hover:bg-gold/10",
      text: "text-gold",
      border: "border border-gold/40",
      shadow: "shadow-lg shadow-gold/10",
    },
    dark: {
      base: "bg-gradient-to-br from-black via-black to-gray-900",
      hover: "hover:from-black hover:via-black hover:to-gold-dark",
      text: "text-pearl",
      border: "border border-gold/20",
      shadow: "shadow-xl shadow-black/30",
    },
    minimal: {
      base: "bg-transparent",
      hover: "hover:bg-beige/10",
      text: "text-beige-dark",
      border: "border border-beige-dark/30",
      shadow: "",
    },
  };

  // Sizes
  const sizes = {
    small: "px-6 py-2.5 text-sm",
    medium: "px-8 py-3.5 text-base",
    large: "px-10 py-4 text-lg",
    xlarge: "px-12 py-5 text-xl",
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.medium;

  // Default icons per variant
  const defaultIcons = {
    
    secondary: <ArrowRight size={18} />,
    dark: <Sparkles size={18} />,
    minimal: null,
  };

  const buttonIcon = icon || defaultIcons[variant];

  return (
    <motion.button
      whileHover={{
        scale: 1.01,
        boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative
        ${selectedVariant.base}
        ${selectedVariant.hover}
        ${selectedVariant.text}
        ${selectedVariant.border}
        ${selectedVariant.shadow}
        ${selectedSize}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        rounded-lg
        font-heading
        font-medium
        tracking-widest
        uppercase
        transition-all
        duration-300
        overflow-hidden
        group
        ${className}
      `}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          />
        ) : (
          buttonIcon && (
            <motion.div
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              {buttonIcon}
            </motion.div>
          )
        )}

        <motion.span
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          className="whitespace-nowrap"
        >
          {text}
        </motion.span>

        {/* Subtle arrow for some variants */}
        {(variant === "secondary" || variant === "minimal") && !icon && (
          <motion.div
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="opacity-0 group-hover:opacity-100 translate-x-2.5 group-hover:translate-x-0 transition-all duration-300"
          >
            <ArrowRight size={16} />
          </motion.div>
        )}
      </div>

      {/* Subtle shine effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white/30 to-transparent" />

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}

// Special luxury button variant
export function LuxuryButton({ text = "Discover Luxury", ...props }) {
  return (
    <div className="relative group">
      {/* Outer glow */}
      <div className="absolute -inset-1 bg-linear-to-r from-gold via-amber-500 to-gold rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

      {/* Button */}
      <Button
        variant="primary"
        size="large"
        text={text}
        icon={<Sparkles size={20} />}
        className="relative"
        {...props}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 40,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 40,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Icon button variant
export function IconButton({ icon, size = "medium", ...props }) {
  const iconSizes = {
    small: "p-2",
    medium: "p-3",
    large: "p-4",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${iconSizes[size]}
        bg-black/30
        backdrop-blur-sm
        border border-gold/30
        text-gold
        rounded-full
        hover:bg-gold/10
        hover:border-gold/50
        transition-all
        duration-300
        group
        relative
        overflow-hidden
      `}
      {...props}
    >
      <div className="relative z-10">{icon}</div>
      <div className="absolute inset-0 bg-linear-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
}

export default Button;
