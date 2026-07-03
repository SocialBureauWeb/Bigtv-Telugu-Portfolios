export const API_BASE = import.meta.env.VITE_API_URL || '';

export function apiFetch(path, options) {
  const url = path && (path.startsWith('http://') || path.startsWith('https://')) ? path : `${API_BASE}${path}`;
  return fetch(url, options);
}

export default apiFetch;
