import React from 'react';

// PUBLIC_INTERFACE
/**
 * Footer – Simple cyberpunk-themed footer with attribution and store list.
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-800/50 mt-12 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Brand */}
        <div className="mb-4">
          <span className="font-display text-lg font-bold tracking-wider">
            <span className="text-cyber-blue">PRICE</span>
            <span className="text-cyber-pink">HUNT</span>
          </span>
        </div>

        {/* Store list */}
        <p className="text-gray-600 text-xs font-body mb-3">
          Comparing prices from:
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-500 font-body mb-6">
          {['GamesTheShop', 'GameNation', 'Amazon.in', 'Flipkart', 'Mcube Games', 'GameShort.in', 'Dacby', 'HG World'].map((store, i) => (
            <span key={store}>
              {store}
              {i < 7 && <span className="text-gray-700 ml-3">•</span>}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-gray-700 text-xs font-body">
          © {new Date().getFullYear()} PriceHunt. Built for gamers, by gamers.
        </p>

        {/* Easter egg hint */}
        <p className="text-gray-800 text-[10px] font-body mt-2 select-none" title="Try the Konami Code!">
          ↑↑↓↓←→←→BA
        </p>
      </div>
    </footer>
  );
}
