"use client"
import { motion } from "framer-motion";
import { GiHummingbird } from "react-icons/gi";

export default function Loading() {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-white overflow-hidden">
      <motion.div
        className="w-32 h-32 border-t-4 border-b-4 border-green-700 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="text-3xl text-green-900 mt-6 font-bold"
        animate={{ opacity: [0, 1, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading Stories...
      </motion.p>
      <motion.div
        className="absolute text-green-800 text-8xl"
        animate={{ x: ["-100vw", "100vw"], y: ["-50vh", "50vh"], rotate: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
      >
        <GiHummingbird />
      </motion.div>
    </div>
  );
}
