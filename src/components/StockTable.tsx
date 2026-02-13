import type { IndustryGroup, SortDirection, SortField } from '../types/stock';
import { formatMarketCap, formatNumber, formatVolume } from '../utils/format';

interface StockTableProps {
  group: IndustryGroup;
  collapsed: boolean;
  onToggle: () => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

function SortIcon({ field, currentField, direction }: { field: SortField; currentField: SortField; direction: SortDirection }) {
  if (field !== currentField) {
    return <span className="text-gray-600 ml-1">&#8597;</span>;
  }
  return <span className="text-emerald-400 ml-1">{direction === 'asc' ? '&#9650;' : '&#9660;'}</span>;
}

export function StockTable({ group, collapsed, onToggle, sortField, sortDirection, onSort }: StockTableProps) {
  const sectorColors: Record<string, string> = {
    Technology: 'bg-blue-500/20 text-blue-400',
    Healthcare: 'bg-pink-500/20 text-pink-400',
    'Financial Services': 'bg-yellow-500/20 text-yellow-400',
    Energy: 'bg-orange-500/20 text-orange-400',
    'Consumer Cyclical': 'bg-purple-500/20 text-purple-400',
    'Consumer Defensive': 'bg-teal-500/20 text-teal-400',
    'Communication Services': 'bg-indigo-500/20 text-indigo-400',
    Industrials: 'bg-gray-500/20 text-gray-400',
    'Real Estate': 'bg-emerald-500/20 text-emerald-400',
  };

  const badgeClass = sectorColors[group.sector] || 'bg-gray-500/20 text-gray-400';

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      {/* Group header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-800/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm w-5">{collapsed ? '▸' : '▾'}</span>
          <h2 className="text-white font-semibold text-base">{group.name}</h2>
          <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>
            {group.sector}
          </span>
          <span className="text-gray-500 text-sm">{group.stocks.length} stocks</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-gray-500 mr-2">Avg 24h:</span>
            <span className={group.avgChange >= 0 ? 'text-emerald-400' : 'text-red-400'}>
              {group.avgChange >= 0 ? '+' : ''}{group.avgChange.toFixed(2)}%
            </span>
          </div>
          <div>
            <span className="text-gray-500 mr-2">Market Cap:</span>
            <span className="text-white">{formatMarketCap(group.totalMarketCap)}</span>
          </div>
        </div>
      </button>

      {/* Stock rows */}
      {!collapsed && (
        <div className="border-t border-gray-800">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_100px_100px_120px_100px_100px_100px] gap-2 px-5 py-2 text-xs text-gray-500 bg-gray-800/30">
            <button onClick={() => onSort('name')} className="text-left flex items-center hover:text-gray-300 cursor-pointer">
              Name <SortIcon field="name" currentField={sortField} direction={sortDirection} />
            </button>
            <button onClick={() => onSort('price')} className="text-right flex items-center justify-end hover:text-gray-300 cursor-pointer">
              Price <SortIcon field="price" currentField={sortField} direction={sortDirection} />
            </button>
            <button onClick={() => onSort('changePercent24h')} className="text-right flex items-center justify-end hover:text-gray-300 cursor-pointer">
              24h % <SortIcon field="changePercent24h" currentField={sortField} direction={sortDirection} />
            </button>
            <button onClick={() => onSort('marketCap')} className="text-right flex items-center justify-end hover:text-gray-300 cursor-pointer">
              Market Cap <SortIcon field="marketCap" currentField={sortField} direction={sortDirection} />
            </button>
            <button onClick={() => onSort('volume24h')} className="text-right flex items-center justify-end hover:text-gray-300 cursor-pointer">
              Volume <SortIcon field="volume24h" currentField={sortField} direction={sortDirection} />
            </button>
            <div className="text-right">24h High</div>
            <div className="text-right">24h Low</div>
          </div>

          {/* Stock rows */}
          {group.stocks.map(stock => (
            <div
              key={stock.symbol}
              className="grid grid-cols-[1fr_100px_100px_120px_100px_100px_100px] gap-2 px-5 py-3 border-t border-gray-800/50 hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-300 shrink-0">
                  {stock.symbol.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{stock.name}</p>
                  <p className="text-gray-500 text-xs">{stock.symbol} · {stock.exchange}</p>
                </div>
              </div>
              <div className="text-right text-white text-sm self-center font-medium">
                ${formatNumber(stock.price)}
              </div>
              <div className={`text-right text-sm self-center font-medium ${stock.changePercent24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {stock.changePercent24h >= 0 ? '+' : ''}{stock.changePercent24h.toFixed(2)}%
              </div>
              <div className="text-right text-gray-300 text-sm self-center">
                {formatMarketCap(stock.marketCap)}
              </div>
              <div className="text-right text-gray-300 text-sm self-center">
                {formatVolume(stock.volume24h)}
              </div>
              <div className="text-right text-gray-400 text-sm self-center">
                ${formatNumber(stock.high24h)}
              </div>
              <div className="text-right text-gray-400 text-sm self-center">
                ${formatNumber(stock.low24h)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
