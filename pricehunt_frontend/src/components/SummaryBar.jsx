import React from 'react';
import { motion } from 'framer-motion';

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
 * SummaryBar – Displays price statistics (lowest, highest, average, store count)
 * for the current search results.
 *
 * @param {object} props
 * @param {object} props.results - API response containing stats and results.
 * @param {string} props.query - The search query that produced these results.
 * @param {string} props.category - Current category ('new' or 'preowned').
 */
export default function SummaryBar({ results, query, category }) {
  const items = results?.results || results?.data || [];
  const stats = results?.stats || {};

  // Compute stats from items if not provided by API
  const prices = items
    .map((item) => Number(item.price))
    .filter((p) => !isNaN(p) && p > 0);

  const lowest = stats.lowest || (prices.length ? Math.min(...prices) : null);
  const highest = stats.highest || (prices.length ? Math.max(...prices) : null);
  const average = stats.average || (prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : null);
  const storeCount = stats.storeCount || items.length;

  const statItems = [
    { label: 'Lowest Price', value: formatPrice(lowest), color: 'text-cyber-green', icon: '📉' },
    { label: 'Highest Price', value: formatPrice(highest), color: 'text-cyber-pink', icon: '📈' },
    { label: 'Average Price', value: formatPrice(average), color: 'text-cyber-yellow', icon: '📊' },
    { label: 'Stores Found', value: storeCount, color: 'text-cyber-blue', icon: '🏪' },
  ];

  return (
    <motion.div
      className="bg-surface-card border border-gray-800 rounded-xl p-4 sm:p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <h2 className="text-lg font-bold text-white font-body">
            Results for{' '}
            <span className="text-cyber-blue">&quot;{query}&quot;</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 font-body">
            Category: <span className="text-gray-300 capitalize">{category}</span>
          </p>
        </div>

        {lowest && (
          <div className="flex items-center gap-2 bg-cyber-green/10 border border-cyber-green/20 rounded-lg px-3 py-1.5">
            <span className="text-cyber-green text-xs font-semibold font-body">💰 Best Deal</span>
            <span className="text-cyber-green font-bold font-display text-lg">{formatPrice(lowest)}</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-dark rounded-lg p-3 text-center border border-gray-800/50"
          >
            <div className="text-lg mb-1">{stat.icon}</div>
            <div className={`text-xl font-bold font-display ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-body">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
