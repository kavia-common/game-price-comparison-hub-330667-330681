import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Konami code sequence for easter egg activation.
 */
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

// PUBLIC_INTERFACE
/**
 * EasterEggs – Hidden interactive overlays and effects.
 *
 * Features:
 * - Konami Code: triggers a full-screen celebration overlay
 * - Search milestones: shows congratulations at 5, 10, 25 searches
 * - Special query detection: reacts to searching "konami", "price is right", etc.
 *
 * @param {object} props
 * @param {number} props.searchCount - Total number of searches performed.
 * @param {string} props.query - Current search query.
 */
export default function EasterEggs({ searchCount, query }) {
  const [konamiActive, setKonamiActive] = useState(false);
  const [milestone, setMilestone] = useState(null);
  const [specialMessage, setSpecialMessage] = useState(null);

  // Konami Code detection
  const [konamiIndex, setKonamiIndex] = useState(0);

  const handleKeyDown = useCallback((e) => {
    if (e.key === KONAMI_CODE[konamiIndex]) {
      const nextIndex = konamiIndex + 1;
      if (nextIndex === KONAMI_CODE.length) {
        setKonamiActive(true);
        setKonamiIndex(0);
        // Auto-dismiss after 5 seconds
        setTimeout(() => setKonamiActive(false), 5000);
      } else {
        setKonamiIndex(nextIndex);
      }
    } else {
      setKonamiIndex(0);
    }
  }, [konamiIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Search milestone detection
  useEffect(() => {
    const milestones = { 5: '🎮 5 Hunts!', 10: '🏆 10 Hunts!', 25: '👑 25 Hunts! You are a PRO hunter!' };
    if (milestones[searchCount]) {
      setMilestone(milestones[searchCount]);
      setTimeout(() => setMilestone(null), 3000);
    }
  }, [searchCount]);

  // Special query detection
  useEffect(() => {
    if (!query) return;
    const lowerQuery = query.toLowerCase();
    const specials = {
      'konami': '🕹️ Up Up Down Down Left Right Left Right B A!',
      'price is right': '💰 Come on down! You\'re the next contestant!',
      'it takes two': '👫 Best co-op game ever!',
      'half-life 3': '🔮 One day... one day...',
      'gta 6': '🌴 Vice City awaits...',
    };

    for (const [key, msg] of Object.entries(specials)) {
      if (lowerQuery.includes(key)) {
        setSpecialMessage(msg);
        setTimeout(() => setSpecialMessage(null), 3000);
        break;
      }
    }
  }, [query]);

  return (
    <>
      {/* Konami Code Overlay */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setKonamiActive(false)}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="text-7xl mb-4">🎮</div>
              <h2 className="text-4xl font-display font-black text-cyber-blue text-glow-blue mb-2">
                KONAMI CODE!
              </h2>
              <p className="text-cyber-pink text-lg font-body">
                You found the secret! You&apos;re a true gamer! 🏆
              </p>
              <div className="mt-4 flex justify-center gap-2">
                {['⬆️', '⬆️', '⬇️', '⬇️', '⬅️', '➡️', '⬅️', '➡️', '🅱️', '🅰️'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone Toast */}
      <AnimatePresence>
        {milestone && (
          <motion.div
            className="fixed top-6 right-6 z-50 bg-surface-card border border-cyber-yellow/30 rounded-lg px-5 py-3 box-glow-blue"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
          >
            <p className="text-cyber-yellow font-display font-bold text-sm">
              {milestone}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Special Query Toast */}
      <AnimatePresence>
        {specialMessage && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface-card border border-cyber-purple/30 rounded-lg px-5 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="text-cyber-purple font-body text-sm font-semibold">
              {specialMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
