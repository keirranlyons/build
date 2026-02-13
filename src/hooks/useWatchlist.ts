import { useCallback, useState } from 'react';

const STORAGE_KEY = 'stocktracker_watchlist';

function loadWatchlist(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* ignore corrupt data */ }
  return new Set();
}

function saveWatchlist(symbols: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...symbols]));
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Set<string>>(loadWatchlist);
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  const toggleSymbol = useCallback((symbol: string) => {
    setWatchlist(prev => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      saveWatchlist(next);
      return next;
    });
  }, []);

  const isWatched = useCallback((symbol: string) => watchlist.has(symbol), [watchlist]);

  return {
    watchlist,
    watchlistCount: watchlist.size,
    showWatchlistOnly,
    setShowWatchlistOnly,
    toggleSymbol,
    isWatched,
  };
}
