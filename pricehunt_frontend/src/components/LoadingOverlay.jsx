import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading tips displayed while the user waits for results.
 */
const LOADING_TIPS = [
  'Scanning GamesTheShop...',
  'Checking GameNation prices...',
  'Hunting Amazon.in deals...',
  'Scraping Flipkart listings...',
  'Browsing Mcube Games...',
  'Searching GameShort.in...',
  'Querying Dacby catalogue...',
  'Checking HG World inventory...',
];

// PUBLIC_INTERFACE
/**
 * LoadingOverlay – Animated cyberpunk loading indicator shown during API calls.
 * Displays a pulsing animation with rotating store scanning messages.
 */
export default function LoadingOverlay() {
  const [tipIndex, setTipIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated rings */}
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          className="absolute inset-0 border-2 border-cyber-blue/40 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-2 border-2 border-cyber-pink/40 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute inset-4 border-2 border-cyber-purple/40 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 m-auto w-4 h-4 bg-cyber-blue rounded-full"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Loading text */}
      <motion.p
        className="text-cyber-blue font-display text-lg tracking-wider mb-3"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        HUNTING PRICES
      </motion.p>

      {/* Store scanning tip */}
      <motion.p
        key={tipIndex}
        className="text-gray-500 text-sm font-body"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {LOADING_TIPS[tipIndex]}
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-gray-800 rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-blue rounded-full"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '50%' }}
        />
      </div>
    </div>
  );
}
