import { motion } from "framer-motion";

export default function CoffeeSplash() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative w-20 h-24">
        {/* Coffee Cup */}
        <motion.div
          className="absolute w-full h-3/4 bg-[#6f4e37] rounded-b-2xl"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Cup Handle */}
          <div className="absolute right-[-30px] top-[20%] w-8 h-1/2 bg-[#6f4e37] rounded-r-lg" />
        </motion.div>

        {/* Steam */}
        <svg 
          width="100" 
          height="100" 
          viewBox="0 0 100 100" 
          className="absolute bottom-[70%]"
        >
          <motion.path
            d="M25 50 Q30 30 35 50 Q40 70 45 50 Q50 30 55 50 Q60 70 65 50 Q70 30 75 50"
            className="stroke-[#6f4e37] stroke-2"
            fill="none"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [-20, -40, -60],
              scale: [1, 0.8, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M15 50 Q20 30 25 50 Q30 70 35 50 Q40 30 45 50 Q50 70 55 50 Q60 30 65 50"
            className="stroke-[#6f4e37] stroke-2"
            fill="none"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [-10, -30, -50],
              scale: [1, 0.8, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </svg>
      </div>

      {/* Loading Text */}
      <motion.div
        className="absolute mt-32 text-[#6f4e37] font-sans font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Brewing...
      </motion.div>
    </div>
  );
}