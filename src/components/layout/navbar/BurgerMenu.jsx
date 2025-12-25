import { motion, MotionConfig } from "framer-motion";

function BurgerMenu({ isOpen, onToggle }) {
  return (
    <MotionConfig
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        onClick={onToggle}
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center hover:bg-gold/10 transition-colors"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.span
          style={{
            left: "50%",
            top: "35%",
            x: "-50%",
            y: "-50%",
            backgroundColor: "gold",
          }}
          className={`absolute h-0.5 w-6 md:w-7 rounded-full`}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              top: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              top: ["50%", "50%", "35%"],
            },
          }}
        />
        <motion.span
          style={{
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
            backgroundColor: "gold",
          }}
          className={`absolute h-0.5 w-6 md:w-7 rounded-full`}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "-45deg"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg"],
            },
          }}
        />
        <motion.span
          style={{
            right: "calc(50% + 10px)",
            bottom: "35%",
            x: "-50%",
            y: "50%",
            backgroundColor: "gold",
          }}
          className={`absolute h-0.5 w-4 md:w-5 rounded-full`}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              left: "50%",
              bottom: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              left: "calc(50% + 10px)",
              bottom: ["50%", "50%", "35%"],
            },
          }}
        />
      </motion.button>
    </MotionConfig>
  );
}

export default BurgerMenu;
