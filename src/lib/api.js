// Central client-side API helper for the static frontend.
//
// The site is exported as static HTML (no Next.js server), so every backend
// call goes to the standalone Express API whose base URL is injected at build
// time via NEXT_PUBLIC_API_URL. Auth uses a JWT bearer token kept in
// localStorage (cross-origin httpOnly cookies are unreliable on static hosts).

export const API_BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) || "";

const TOKEN_KEY = "nuvosid_token";
const AUTH_EVENT = "nuvosid-auth-changed";

export function getToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
    // Notify listeners (Navbar, FixedCTA, …) that auth state changed.
    window.dispatchEvent(new Event(AUTH_EVENT));
  } catch {
    /* ignore storage errors (private mode, etc.) */
  }
}

export function clearToken() {
  setToken(null);
}

// Subscribe to auth changes; returns an unsubscribe function.
export function onAuthChange(handler) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(AUTH_EVENT, handler);
  return () => window.removeEventListener(AUTH_EVENT, handler);
}

// fetch wrapper that prefixes the API base URL and attaches the bearer token.
export function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return fetch(`${API_BASE}${path}`, { ...options, headers });
}
