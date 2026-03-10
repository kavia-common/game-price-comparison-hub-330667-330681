import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * HeroSection – The top section of PriceHunt with an animated logo,
 * tagline, and a cyberpunk-styled search bar.
 */
// PUBLIC_INTERFACE
/**
 * Hero section component with animated background, logo, and search input.
 *
 * @param {object} props
 * @param {function} props.onSearch - Callback when user submits a search query.
 * @param {boolean} props.loading - Whether a search is currently in progress.
 */
export default function HeroSection({ onSearch, loading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      onSearch(inputValue);
    }
  };

  return (
    <header className="relative overflow-hidden py-12 sm:py-20 px-4">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyber-blue/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-cyber-pink/5 blur-3xl"
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-cyber-purple/5 blur-3xl"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Logo */}
        <motion.h1
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-wider mb-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="text-cyber-blue text-glow-blue">PRICE</span>
          <span className="text-cyber-pink text-glow-pink">HUNT</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-gray-400 text-sm sm:text-base mb-8 tracking-widest uppercase font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Compare game prices across India's top stores
        </motion.p>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="relative group">
            {/* Glow border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg opacity-30 group-hover:opacity-60 group-focus-within:opacity-60 blur transition-opacity duration-300" />

            <div className="relative flex items-center bg-surface-dark rounded-lg border border-gray-800">
              {/* Search icon */}
              <div className="pl-4 pr-2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search for a game... (e.g. God of War, Spider-Man 2)"
                className="flex-1 bg-transparent py-3.5 px-2 text-white placeholder-gray-600 focus:outline-none font-body text-sm sm:text-base"
                disabled={loading}
                aria-label="Search for a game"
              />

              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="mr-1.5 px-5 py-2 bg-gradient-to-r from-cyber-blue to-cyan-500 text-black font-semibold rounded-md text-sm hover:from-cyan-400 hover:to-cyber-blue transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed font-body"
                aria-label="Search"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Hunting...
                  </span>
                ) : (
                  'Hunt Prices'
                )}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </header>
  );
}
