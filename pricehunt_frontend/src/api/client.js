/**
 * PriceHunt API Client
 *
 * Communicates with the compare-prices backend.
 *
 * URL resolution strategy:
 *   - In development, requests use relative paths (e.g. "/compare-prices")
 *     which are proxied by the Vite dev server to the backend. This avoids
 *     CORS and self-signed certificate issues entirely.
 *   - When VITE_API_URL is explicitly set, that absolute URL is used
 *     (intended for production builds where the proxy is not available).
 *
 * Environment variable checked:
 *   1. VITE_API_URL — explicit backend URL (only used when set)
 *
 * When no explicit URL is provided, an empty base is used so that all
 * requests become relative and go through the Vite dev-server proxy.
 */

// Only use an explicit URL when VITE_API_URL is set.
// VITE_BACKEND_URL and VITE_API_BASE in .env point to the HTTPS backend
// which may have certificate issues from the browser; the Vite proxy
// (configured in vite.config.js) is the preferred path in development.
const explicitUrl = import.meta.env.VITE_API_URL || '';

// Strip trailing slashes for consistent path joining.
const API_BASE_URL = explicitUrl.replace(/\/+$/, '');

/**
 * Builds a full request URL for an API path.
 * When API_BASE_URL is empty (dev proxy mode), returns a relative path.
 * When API_BASE_URL is set, constructs an absolute URL.
 *
 * @param {string} path - The API path (e.g. "/compare-prices").
 * @param {Record<string, string>} params - Query parameters.
 * @returns {string} The final URL string.
 */
function buildUrl(path, params = {}) {
  // When using the Vite proxy (empty base), build a relative URL
  if (!API_BASE_URL) {
    const searchParams = new URLSearchParams(params).toString();
    return searchParams ? `${path}?${searchParams}` : path;
  }
  // Absolute URL for production / explicit env configuration
  const url = new URL(path, API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

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
 * Sends a GET request to /compare-prices with the specified query and category.
 * In development, the request is proxied through the Vite dev server to
 * the backend on port 3001.
 *
 * @param {string} query - The game name or search query.
 * @param {string} category - 'new', 'preowned', or 'all'.
 * @returns {Promise<object>} - The comparison results including results array and stats.
 * @throws {Error} - If the request fails or times out.
 */
export async function comparePrices(query, category = 'new') {
  const url = buildUrl('/compare-prices', { query, category });

  const response = await fetchWithTimeout(url, {
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
    const healthUrl = API_BASE_URL ? `${API_BASE_URL}/` : '/';
    const response = await fetchWithTimeout(healthUrl, {}, 5000);
    return response.ok;
  } catch {
    return false;
  }
}
