import React from 'react';
import { motion } from 'framer-motion';
import PriceCard from './PriceCard';

/**
 * ResultsGrid – Displays price comparison results in an animated grid.
 */
// PUBLIC_INTERFACE
/**
 * Results grid component that renders price comparison cards.
 *
 * @param {object} props
 * @param {object} props.results - API response containing results array.
 */
export default function ResultsGrid({ results }) {
  const items = results?.results || results?.data || [];

  if (!items.length) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-gray-500 text-lg font-body">
          No results found. Try a different search term.
        </p>
        <p className="text-gray-600 text-sm mt-2">
          💡 Tip: Try searching with the full game title
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08 },
        },
      }}
    >
      {items.map((item, index) => (
        <PriceCard key={`${item.store}-${item.url}-${index}`} item={item} index={index} />
      ))}
    </motion.div>
  );
}
