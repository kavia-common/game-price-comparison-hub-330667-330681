/**
 * PriceHunt API Client
 *
 * Communicates with the compare-prices backend.
 * Base URL is read from the VITE_API_URL environment variable.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Timeout wrapper for fetch requests.
 * @param {string} url - The URL to fetch.
 * @param {object} options - Fetch options.
 * @param {number} timeout - Timeout in milliseconds (default: 30000).
 * @returns {Promise<Response>}
 */
function fetchWithTimeout(url, options = {}, timeout = 30000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
  ]);
}

// PUBLIC_INTERFACE
/**
 * Compares game prices across stores.
 *
 * @param {string} query - The game name or search query.
 * @param {string} category - 'new' or 'preowned'.
 * @returns {Promise<object>} - The comparison results including results array and stats.
 * @throws {Error} - If the request fails or times out.
 */
export async function comparePrices(query, category = 'new') {
  const url = new URL('/compare-prices', API_BASE_URL);
  url.searchParams.set('query', query);
  url.searchParams.set('category', category);

  const response = await fetchWithTimeout(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  return response.json();
}

// PUBLIC_INTERFACE
/**
 * Checks if the backend API is healthy and reachable.
 *
 * @returns {Promise<boolean>} - True if the API is reachable.
 */
export async function healthCheck() {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/`, {}, 5000);
    return response.ok;
  } catch {
    return false;
  }
}
