import React from 'react';
import { motion } from 'framer-motion';

// PUBLIC_INTERFACE
/**
 * ErrorDisplay – Shows error messages with a retry button in cyberpunk style.
 *
 * @param {object} props
 * @param {string} props.message - The error message to display.
 * @param {function} props.onRetry - Callback to retry the failed action.
 */
export default function ErrorDisplay({ message, onRetry }) {
  return (
    <motion.div
      className="max-w-lg mx-auto my-12 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-surface-card border border-red-500/30 rounded-xl p-8">
        {/* Error icon */}
        <motion.div
          className="text-5xl mb-4"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ⚠️
        </motion.div>

        <h3 className="text-xl font-bold text-red-400 font-display mb-2">
          SYSTEM ERROR
        </h3>

        <p className="text-gray-400 text-sm font-body mb-6 leading-relaxed">
          {message}
        </p>

        {/* Retry button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-gradient-to-r from-cyber-pink to-red-500 text-white font-semibold rounded-lg text-sm hover:from-red-500 hover:to-cyber-pink transition-all duration-200 font-body"
            aria-label="Retry search"
          >
            🔄 Retry Search
          </button>
        )}

        <p className="text-gray-600 text-xs mt-4 font-body">
          If the problem persists, the backend might be offline.
        </p>
      </div>
    </motion.div>
  );
}
