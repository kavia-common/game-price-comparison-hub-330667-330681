import React from 'react';
import { motion } from 'framer-motion';

/**
 * CategoryTabs – Toggle between "New" and "Preowned" game categories.
 */
// PUBLIC_INTERFACE
/**
 * Category tab switcher component.
 *
 * @param {object} props
 * @param {string} props.category - Current active category ('new' or 'preowned').
 * @param {function} props.onChange - Callback when category is changed.
 */
export default function CategoryTabs({ category, onChange }) {
  const tabs = [
    { key: 'new', label: 'New', icon: '🆕' },
    { key: 'preowned', label: 'Preowned', icon: '♻️' },
  ];

  return (
    <div className="flex justify-center my-8">
      <div className="inline-flex bg-surface-card rounded-lg p-1 border border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative px-6 py-2.5 rounded-md text-sm font-semibold font-body transition-colors duration-200 ${
              category === tab.key
                ? 'text-black'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-label={`Show ${tab.label} games`}
            aria-pressed={category === tab.key}
          >
            {category === tab.key && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyan-500 rounded-md"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{tab.icon}</span>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
