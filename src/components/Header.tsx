interface HeaderProps {
  totalStocks: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sectors: string[];
  selectedSector: string;
  onSectorChange: (s: string) => void;
}

export function Header({
  totalStocks,
  searchQuery,
  onSearchChange,
  sectors,
  selectedSector,
  onSectorChange,
}: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white text-lg">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">StockTracker</h1>
              <p className="text-xs text-gray-400">{totalStocks} assets by industry</p>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
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
          </div>
        </div>
      </div>
    </header>
  );
}
