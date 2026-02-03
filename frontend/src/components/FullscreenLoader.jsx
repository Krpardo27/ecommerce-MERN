import { motion, AnimatePresence } from "framer-motion";

const FullscreenLoader = ({ isVisible, label = "Cargando…" }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.span
              className="w-12 h-12 rounded-full border-2 border-zinc-700 border-t-lime-400"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="text-sm tracking-wide text-zinc-400">{label}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenLoader;
