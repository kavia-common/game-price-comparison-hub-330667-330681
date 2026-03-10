import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Store color mapping for visual distinction across different retailers.
 */
const STORE_COLORS = {
  'gamestheshop': { border: 'border-blue-500/30', glow: 'hover:shadow-blue-500/20' },
  'gamenation': { border: 'border-green-500/30', glow: 'hover:shadow-green-500/20' },
  'amazon.in': { border: 'border-yellow-500/30', glow: 'hover:shadow-yellow-500/20' },
  'flipkart': { border: 'border-indigo-500/30', glow: 'hover:shadow-indigo-500/20' },
  'mcube games': { border: 'border-red-500/30', glow: 'hover:shadow-red-500/20' },
  'gameshort.in': { border: 'border-orange-500/30', glow: 'hover:shadow-orange-500/20' },
  'dacby': { border: 'border-purple-500/30', glow: 'hover:shadow-purple-500/20' },
  'hg world': { border: 'border-pink-500/30', glow: 'hover:shadow-pink-500/20' },
};

/**
 * Returns color classes for a given store name.
 * @param {string} storeName - The store name.
 * @returns {object} - Object with border and glow class strings.
 */
function getStoreColors(storeName) {
  const key = (storeName || '').toLowerCase();
  return STORE_COLORS[key] || { border: 'border-cyber-blue/20', glow: 'hover:shadow-cyber-blue/20' };
}

/**
 * Formats a price value to Indian Rupee format.
 * @param {number|string} price - The price value.
 * @returns {string} - Formatted price string.
 */
function formatPrice(price) {
  if (price == null || price === '' || isNaN(Number(price))) return 'N/A';
  return `₹${Number(price).toLocaleString('en-IN')}`;
}

// PUBLIC_INTERFACE
/**
 * PriceCard – Displays a single store's game price with image, title, and link.
 *
 * @param {object} props
 * @param {object} props.item - The price result item from the API.
 * @param {number} props.index - Index for animation staggering.
 */
export default function PriceCard({ item, index }) {
  const [imgError, setImgError] = useState(false);
  const colors = getStoreColors(item.store);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.a
      href={item.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`block bg-surface-card rounded-xl border ${colors.border} ${colors.glow} hover:shadow-lg transition-all duration-300 overflow-hidden group`}
      aria-label={`${item.title || 'Game'} at ${item.store || 'Store'} for ${formatPrice(item.price)}`}
    >
      {/* Image Section */}
      <div className="relative h-44 bg-surface-dark overflow-hidden">
        {item.image && !imgError ? (
          <img
            src={item.image}
            alt={item.title || 'Game cover'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-700">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
        )}

        {/* Store badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-xs font-semibold text-cyber-blue font-body border border-cyber-blue/20">
          {item.store || 'Unknown Store'}
        </div>

        {/* Best price badge */}
        {item.isBestPrice && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-cyber-green/20 backdrop-blur-sm rounded text-xs font-bold text-cyber-green border border-cyber-green/30">
            🏆 BEST
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white truncate font-body group-hover:text-cyber-blue transition-colors duration-200">
          {item.title || 'Unknown Game'}
        </h3>

        {/* Platform badge */}
        {item.platform && (
          <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] rounded bg-gray-800 text-gray-400 font-body">
            {item.platform}
          </span>
        )}

        {/* Price */}
        <div className="mt-3 flex items-end justify-between">
          <span className="text-2xl font-bold text-cyber-blue font-display tracking-wide">
            {formatPrice(item.price)}
          </span>
          <span className="text-xs text-gray-500 font-body">
            Visit →
          </span>
        </div>
      </div>
    </motion.a>
  );
}
