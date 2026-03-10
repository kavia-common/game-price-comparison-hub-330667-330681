/**
 * PriceHunt API Client
 *
 * Communicates with the compare-prices backend.
 *
 * URL resolution strategy (checked in order):
 *   1. VITE_API_URL      — explicit backend URL
 *   2. VITE_BACKEND_URL  — alternative backend URL variable
 *   3. VITE_API_BASE     — another alternative variable
 *   4. Empty string      — relative paths through Vite dev-server proxy
 *
 * When an explicit backend URL is provided, the client calls the backend
 * directly (cross-origin). The backend must have the correct CORS headers
 * for this to work.
 *
 * When no explicit URL is provided, all requests become relative and go
 * through the Vite dev-server proxy (suitable for local development).
 *
 * Environment variables:
 *   - VITE_API_URL       — preferred backend URL
 *   - VITE_BACKEND_URL   — fallback backend URL
 *   - VITE_API_BASE      — second fallback backend URL
 */

// Resolve the backend URL from available environment variables.
// The .env file may set VITE_BACKEND_URL / VITE_API_BASE but not VITE_API_URL.
const resolvedUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_BASE ||
  '';

// Strip trailing slashes for consistent path joining.
const API_BASE_URL = resolvedUrl.replace(/\/+$/, '');

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
  // Absolute URL for hosted preview / production
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
 * When a backend URL is configured, calls the backend directly (cross-origin).
 * Otherwise, the request goes through the Vite dev-server proxy.
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
