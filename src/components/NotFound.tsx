import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const [isBrewing, setIsBrewing] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const startBrewing = () => {
    if (!isBrewing) {
      setIsBrewing(true);
      setShowError(false);

      setTimeout(() => {
        setShowError(true);
      }, 2000);

      setTimeout(() => {
        setIsBrewing(false);
      }, 4000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-4">
      <div className="w-full max-w-xl text-center">
        {/* Espresso Machine */}
        <motion.div
          className="relative mb-16"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}>
          <div className="relative h-64 w-full">
            <svg
              viewBox="0 0 400 220"
              xmlns="http://www.w3.org/2000/svg">
              {/* Machine Base */}
              <rect
                x="50"
                y="170"
                width="300"
                height="20"
                rx="2"
                fill="#2a2a2a"
                stroke="#333"
                strokeWidth="1"
              />
              <rect
                x="60"
                y="190"
                width="280"
                height="10"
                rx="2"
                fill="#222"
              />
              <rect
                x="70"
                y="200"
                width="260"
                height="10"
                rx="2"
                fill="#1a1a1a"
              />
              <rect
                x="80"
                y="210"
                width="240"
                height="10"
                rx="2"
                fill="#111"
              />

              {/* Machine Body */}
              <rect
                x="80"
                y="50"
                width="240"
                height="120"
                rx="5"
                fill="#444"
                stroke="#505050"
                strokeWidth="2"
              />
              <rect
                x="90"
                y="60"
                width="220"
                height="100"
                rx="3"
                fill="#333"
              />

              {/* Control Panel */}
              <rect
                x="90"
                y="70"
                width="95"
                height="80"
                rx="2"
                fill="#2a2a2a"
              />

              {/* Display Screen */}
              <rect
                x="95"
                y="75"
                width="85"
                height="25"
                rx="1"
                fill="#111"
              />

              {/* Error Message */}
              <AnimatePresence>
                {showError && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <text
                      x="137.5"
                      y="90"
                      fontSize="14"
                      fill="red"
                      textAnchor="middle">
                      ERROR
                    </text>
                    <text
                      x="137.5"
                      y="95"
                      fontSize="8"
                      fill="red"
                      textAnchor="middle">
                      404
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <circle
                cx="110"
                cy="120"
                r="10"
                fill="#222"
                stroke="#505050"
                strokeWidth="1"
              />
              <circle
                cx="140"
                cy="120"
                r="10"
                fill="#222"
                stroke="#505050"
                strokeWidth="1"
              />
              <circle
                cx="170"
                cy="120"
                r="10"
                fill="#222"
                stroke="#505050"
                strokeWidth="1"
              />

              {/* Button Icons */}
              <path
                d="M105,120 L115,120"
                stroke="#ddd"
                strokeWidth="1.5"
              />
              <path
                d="M140,116 L140,124"
                stroke="#ddd"
                strokeWidth="1.5"
              />
              <path
                d="M165,116 L175,124 M175,116 L165,124"
                stroke="#ddd"
                strokeWidth="1.5"
              />

              {/* Brew Group */}
              <rect
                x="210"
                y="70"
                width="90"
                height="80"
                rx="2"
                fill="#333"
                stroke="#3a3a3a"
                strokeWidth="1"
              />

              {/* Portafilter Holder */}
              <path
                d="M230,140 L280,140 L290,150 L220,150 Z"
                fill="#222"
              />
              <path
                d="M255,140 L255,110"
                stroke="#2a2a2a"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Brew Head */}
              <circle
                cx="255"
                cy="100"
                r="15"
                fill="#222"
                stroke="#2d2d2d"
                strokeWidth="2"
              />
              <circle
                cx="255"
                cy="100"
                r="10"
                fill="#1a1a1a"
              />
              <circle
                cx="255"
                cy="100"
                r="5"
                fill="#111"
              />

              {/* Coffee Cup */}
              <motion.g
                animate={isBrewing ? { y: [0, -5, 0] } : {}}
                transition={{ duration: 0.3, times: [0, 0.5, 1], repeat: isBrewing ? 3 : 0 }}>
                <rect
                  x="235"
                  y="170"
                  width="40"
                  height="2"
                  fill="#999"
                />
                <rect
                  x="238"
                  y="172"
                  width="34"
                  height="25"
                  rx="1"
                  fill="#eee"
                />
                <path
                  d="M238,172 L272,172 L268,197 L242,197 Z"
                  fill="#f5f5f5"
                />

                {/* Cup Inside */}
                <rect
                  x="242"
                  y="174"
                  width="26"
                  height="20"
                  rx="1"
                  fill="#333"
                />

                {/* Coffee Stream */}
                <AnimatePresence>
                  {isBrewing && (
                    <motion.g
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}>
                      <path
                        d="M255,110 L255,174"
                        stroke="#4a2c2a"
                        strokeWidth="3"
                        strokeDasharray="2 1"
                      />

                      {/* Coffee Filling in Cup */}
                      <motion.rect
                        x="242"
                        y="194"
                        width="26"
                        height="0"
                        fill="#4a2c2a"
                        animate={{ height: 15, y: 179 }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>
              </motion.g>

              {/* Machine Top */}
              <rect
                x="70"
                y="40"
                width="260"
                height="10"
                rx="2"
                fill="#3a3a3a"
              />
              <rect
                x="100"
                y="30"
                width="200"
                height="10"
                rx="2"
                fill="#444"
              />
              <rect
                x="130"
                y="20"
                width="140"
                height="10"
                rx="5"
                fill="#505050"
              />

              {/* Steam Wand */}
              <path
                d="M300,90 Q310,70 320,60"
                stroke="#777"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <circle
                cx="320"
                cy="60"
                r="3"
                fill="#999"
              />

              {/* Brew Button - Interactive */}
              <motion.circle
                cx="140"
                cy="120"
                r="12"
                fill={isBrewing ? '#7a3e2f' : '#222'}
                stroke={isBrewing ? '#d97c5f' : '#505050'}
                strokeWidth="1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={startBrewing}
                style={{ cursor: 'pointer' }}
              />

              {/* 404 Message */}
              <text
                x="90"
                y="40"
                fontSize="16"
                fill="#777"
                fontWeight="bold">
                ESPRESSO 404
              </text>
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-amber-300">Page Not Found</h2>
          <p className="text-amber-200">We couldn't pull this shot for you.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-6">
          <p className="italic text-amber-100">"It seems our machine has encountered a brewing error."</p>

          <div className="flex justify-center gap-4">
            <motion.button
              className="rounded-lg bg-amber-700 px-5 py-2 text-white shadow-md transition-colors hover:bg-amber-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}>
              Return Home
            </motion.button>

            <motion.button
              className="rounded-lg bg-zinc-700 px-5 py-2 text-white shadow-md transition-colors hover:bg-zinc-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startBrewing}>
              Try Again
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.p
        className="mt-8 text-sm text-amber-400/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}>
        Press the center button to try brewing
      </motion.p>
    </div>
  );
};

export default NotFound;
