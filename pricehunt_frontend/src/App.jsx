import React, { useState, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import CategoryTabs from './components/CategoryTabs';
import ResultsGrid from './components/ResultsGrid';
import SummaryBar from './components/SummaryBar';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorDisplay from './components/ErrorDisplay';
import EasterEggs from './components/EasterEggs';
import Footer from './components/Footer';
import { comparePrices } from './api/client';

/**
 * App – Root component for PriceHunt game price comparison.
 *
 * Manages search state, category tabs, results, loading, and error states.
 * Renders the cyberpunk-themed UI with animated components.
 */
// PUBLIC_INTERFACE
export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('new');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCount, setSearchCount] = useState(0);

  /**
   * Handles the search action: calls the API and updates state.
   * @param {string} searchQuery - The game title to search for.
   */
  const handleSearch = useCallback(async (searchQuery) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await comparePrices(trimmed, category);
      setResults(data);
      setSearchCount((prev) => prev + 1);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [category]);

  /**
   * Handles category tab change and re-searches if there is an active query.
   * @param {string} newCategory - 'new' or 'preowned'.
   */
  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
    if (query) {
      // Re-search with new category
      setLoading(true);
      setError(null);
      setResults(null);
      comparePrices(query, newCategory)
        .then((data) => {
          setResults(data);
          setSearchCount((prev) => prev + 1);
        })
        .catch((err) => {
          setError(err.message || 'Something went wrong. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="min-h-screen cyber-grid-bg scanlines relative">
      {/* Easter Eggs overlay */}
      <EasterEggs searchCount={searchCount} query={query} />

      {/* Hero Section with logo and search */}
      <HeroSection onSearch={handleSearch} loading={loading} />

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Category Tabs */}
        <CategoryTabs
          category={category}
          onChange={handleCategoryChange}
        />

        {/* Loading State */}
        {loading && <LoadingOverlay />}

        {/* Error State */}
        {error && !loading && (
          <ErrorDisplay
            message={error}
            onRetry={() => handleSearch(query)}
          />
        )}

        {/* Summary Bar */}
        {results && !loading && !error && (
          <SummaryBar results={results} query={query} category={category} />
        )}

        {/* Results Grid */}
        {results && !loading && !error && (
          <ResultsGrid results={results} />
        )}

        {/* Empty State */}
        {!results && !loading && !error && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-body">
              Search for a game above to compare prices across
              <span className="text-cyber-blue font-semibold"> 8 Indian stores</span>
            </p>
            <div className="mt-4 flex justify-center gap-3 flex-wrap text-xs text-gray-600">
              {['GamesTheShop', 'GameNation', 'Amazon.in', 'Flipkart', 'Mcube Games', 'GameShort.in', 'Dacby', 'HG World'].map((store) => (
                <span key={store} className="px-2 py-1 rounded border border-gray-800 bg-surface-card">
                  {store}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
