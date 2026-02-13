import { Header } from './components/Header';
import { StockTable } from './components/StockTable';
import { useStocks } from './hooks/useStocks';

function App() {
  const {
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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header
        totalStocks={totalStocks}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sectors={sectors}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400 text-sm">
            {industryGroups.length} industries · {totalStocks} stocks
            {selectedSector !== 'All' && (
              <span className="text-emerald-400 ml-2">
                Filtered: {selectedSector}
              </span>
            )}
          </p>
          <p className="text-gray-500 text-xs">
            Sorted by {sortField === 'changePercent24h' ? '24h change' : sortField} ({sortDirection === 'desc' ? 'high to low' : 'low to high'})
          </p>
        </div>

        {/* Industry groups */}
        <div className="space-y-4">
          {industryGroups.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No stocks found</p>
              <p className="text-gray-600 text-sm mt-2">Try a different search or sector filter</p>
            </div>
          ) : (
            industryGroups.map(group => (
              <StockTable
                key={group.name}
                group={group}
                collapsed={collapsedGroups.has(group.name)}
                onToggle={() => toggleGroup(group.name)}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pb-8 text-center">
          <p className="text-gray-600 text-xs">
            StockTracker — Market data is for demonstration purposes only.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
