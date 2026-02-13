import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { StockDetail } from './components/StockDetail';
import { StockTable } from './components/StockTable';
import { useStocks } from './hooks/useStocks';
import { useWatchlist } from './hooks/useWatchlist';
import type { Stock } from './types/stock';

function App() {
  const {
    status,
    error,
    lastUpdated,
    autoRefresh,
    setAutoRefresh,
    refresh,
    loadStocks,
    searchQuery,
    setSearchQuery,
    selectedSector,
    setSelectedSector,
    sectors,
    sortField,
    sortDirection,
    handleSort,
    industryGroups,
    collapsedGroups,
    toggleGroup,
    totalStocks,
  } = useStocks();

  const {
    watchlistCount,
    showWatchlistOnly,
    setShowWatchlistOnly,
    toggleSymbol,
    isWatched,
  } = useWatchlist();

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  // Filter by watchlist if active
  const visibleGroups = useMemo(() => {
    if (!showWatchlistOnly) return industryGroups;
    return industryGroups
      .map(group => ({
        ...group,
        stocks: group.stocks.filter(s => isWatched(s.symbol)),
      }))
      .filter(group => group.stocks.length > 0);
  }, [industryGroups, showWatchlistOnly, isWatched]);

  const visibleStockCount = showWatchlistOnly
    ? visibleGroups.reduce((sum, g) => sum + g.stocks.length, 0)
    : totalStocks;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header
        totalStocks={visibleStockCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sectors={sectors}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        status={status}
        lastUpdated={lastUpdated}
        autoRefresh={autoRefresh}
        onAutoRefreshToggle={() => setAutoRefresh(v => !v)}
        onRefresh={refresh}
        watchlistCount={watchlistCount}
        showWatchlistOnly={showWatchlistOnly}
        onWatchlistToggle={() => setShowWatchlistOnly(v => !v)}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-between">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={loadStocks}
              className="text-red-400 text-sm underline hover:text-red-300 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Demo data banner */}
        {status === 'demo' && !error && (
          <div className="mb-4 px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-sm">
              Showing demo data. To use live market data, create a <code className="bg-gray-800 px-1 rounded">.env</code> file with your{' '}
              <span className="font-medium">Financial Modeling Prep</span> API key:
            </p>
            <code className="block mt-2 text-xs text-gray-400 bg-gray-800 px-3 py-2 rounded">
              VITE_FMP_API_KEY=your_api_key_here
            </code>
          </div>
        )}

        {/* Summary bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400 text-sm">
            {visibleGroups.length} industries · {visibleStockCount} stocks
            {selectedSector !== 'All' && (
              <span className="text-emerald-400 ml-2">
                Filtered: {selectedSector}
              </span>
            )}
            {showWatchlistOnly && (
              <span className="text-yellow-400 ml-2">
                Watchlist only
              </span>
            )}
          </p>
          <p className="text-gray-500 text-xs hidden sm:block">
            Sorted by {sortField === 'changePercent24h' ? '24h change' : sortField} ({sortDirection === 'desc' ? 'high to low' : 'low to high'})
          </p>
        </div>

        {/* Loading state */}
        {status === 'loading' ? (
          <LoadingSkeleton />
        ) : visibleGroups.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {showWatchlistOnly ? 'No stocks in your watchlist' : 'No stocks found'}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              {showWatchlistOnly
                ? 'Star some stocks to add them to your watchlist'
                : 'Try a different search or sector filter'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleGroups.map(group => (
              <StockTable
                key={group.name}
                group={group}
                collapsed={collapsedGroups.has(group.name)}
                onToggle={() => toggleGroup(group.name)}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                isWatched={isWatched}
                onToggleWatch={toggleSymbol}
                onSelectStock={setSelectedStock}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pb-8 text-center">
          <p className="text-gray-600 text-xs">
            StockTracker{status === 'demo' ? ' — Demo data for demonstration purposes only.' : ' — Data provided by Financial Modeling Prep.'}
          </p>
        </footer>
      </main>

      {/* Stock detail modal */}
      {selectedStock && (
        <StockDetail
          stock={selectedStock}
          isWatched={isWatched(selectedStock.symbol)}
          onToggleWatch={() => toggleSymbol(selectedStock.symbol)}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
}

export default App;
