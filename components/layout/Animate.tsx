"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function Animate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="max-w-350 mx-auto px-5 md:px-15 xl:px-50"
    >
      {children}
    </motion.div>
  );
}

export default Animate;
