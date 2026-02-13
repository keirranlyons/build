import type { DataStatus } from '../types/stock';

interface HeaderProps {
  totalStocks: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sectors: string[];
  selectedSector: string;
  onSectorChange: (s: string) => void;
  status: DataStatus;
  lastUpdated: Date | null;
  autoRefresh: boolean;
  onAutoRefreshToggle: () => void;
  onRefresh: () => void;
  watchlistCount: number;
  showWatchlistOnly: boolean;
  onWatchlistToggle: () => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function Header({
  totalStocks,
  searchQuery,
  onSearchChange,
  sectors,
  selectedSector,
  onSectorChange,
  status,
  lastUpdated,
  autoRefresh,
  onAutoRefreshToggle,
  onRefresh,
  watchlistCount,
  showWatchlistOnly,
  onWatchlistToggle,
}: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top row: logo + status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white text-lg">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">StockTracker</h1>
              <p className="text-xs text-gray-400">{totalStocks} assets by industry</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status badge */}
            {status === 'demo' && (
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                Demo Data
              </span>
            )}
            {status === 'loading' && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 animate-pulse">
                Loading...
              </span>
            )}
            {status === 'error' && (
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                API Error
              </span>
            )}
            {status === 'ready' && (
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                Live
              </span>
            )}

            {/* Last updated */}
            {lastUpdated && (
              <span className="text-xs text-gray-500 hidden sm:inline">
                Updated {formatTime(lastUpdated)}
              </span>
            )}

            {/* Auto-refresh toggle */}
            <button
              onClick={onAutoRefreshToggle}
              className={`text-xs px-2 py-1 rounded-lg border cursor-pointer transition-colors ${
                autoRefresh
                  ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                  : 'border-gray-700 text-gray-500 bg-gray-800'
              }`}
              title={autoRefresh ? 'Auto-refresh on (1 min)' : 'Auto-refresh off'}
            >
              {autoRefresh ? 'Auto' : 'Paused'}
            </button>

            {/* Manual refresh */}
            <button
              onClick={onRefresh}
              disabled={status === 'loading' || status === 'demo'}
              className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Refresh now"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom row: search + filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name or ticker..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <select
            value={selectedSector}
            onChange={e => onSectorChange(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
          >
            {sectors.map(s => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Sectors' : s}
              </option>
            ))}
          </select>

          <button
            onClick={onWatchlistToggle}
            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer flex items-center gap-1.5 justify-center ${
              showWatchlistOnly
                ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
                : 'border-gray-700 text-gray-400 bg-gray-800 hover:text-white'
            }`}
          >
            <span>{showWatchlistOnly ? '\u2605' : '\u2606'}</span>
            <span>Watchlist{watchlistCount > 0 ? ` (${watchlistCount})` : ''}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
