"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type ModalProps = {
  children: React.ReactNode;
  close: () => void;
};

function Modal({ children, close }: ModalProps) {
  const modalBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickListener = (e: Event) => {
      console.log(modalBgRef.current, e.currentTarget);
      if (modalBgRef.current === (e.target as Node)) {
        close();
      }
    };
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, [close]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen h-screen bg-zinc-950/60 backdrop-blur-sm z-15 flex items-center justify-center"
      ref={modalBgRef}
    >
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 150, opacity: 0 }}
        className="bg-zinc-950 rounded-lg w-100 border-2 border-zinc-800"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
