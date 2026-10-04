// Client-side storage utilities for Favorites, Recent History, Theme, and Support Bar

const FAVORITES_KEY = 'acc_favorites_v1';
const RECENT_KEY = 'acc_recent_v1';
const SUPPORT_BAR_KEY = 'support-bar-hidden';
const THEME_KEY = 'acc_theme';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = getFavorites();
  const exists = current.includes(id);
  const updated = exists ? current.filter((x) => x !== id) : [id, ...current];
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated.slice(0, 50)));
    window.dispatchEvent(new CustomEvent('acc_favorites_changed', { detail: updated }));
  } catch (e) {
    console.error('Failed to update favorites in localStorage', e);
  }
  return !exists;
}

export function getRecentHistory(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentHistory(id: string): void {
  if (typeof window === 'undefined') return;
  const current = getRecentHistory().filter((x) => x !== id);
  const updated = [id, ...current].slice(0, 15);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('acc_recent_changed', { detail: updated }));
  } catch (e) {
    console.error('Failed to update recent history in localStorage', e);
  }
}

// Section 20 Requirement:
// Use sessionStorage, not permanent localStorage, for support bar hidden state.
export function isSupportBarHidden(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(SUPPORT_BAR_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setSupportBarHidden(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SUPPORT_BAR_KEY, 'true');
    window.dispatchEvent(new CustomEvent('acc_support_bar_hidden'));
  } catch (e) {
    console.error('Failed to save support bar status in sessionStorage', e);
  }
}

export type Theme = 'dark' | 'light';

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {}
  return 'dark';
}

export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}
