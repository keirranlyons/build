import type { Stock } from '../types/stock';
import { formatMarketCap, formatNumber, formatVolume } from '../utils/format';

interface StockDetailProps {
  stock: Stock;
  isWatched: boolean;
  onToggleWatch: () => void;
  onClose: () => void;
}

function Metric({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-3">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className={`text-sm font-medium ${color || 'text-white'}`}>{value}</p>
    </div>
  );
}

export function StockDetail({ stock, isWatched, onToggleWatch, onClose }: StockDetailProps) {
  const changeColor = stock.changePercent24h >= 0 ? 'text-emerald-400' : 'text-red-400';
  const yearRange = stock.yearLow && stock.yearHigh
    ? `$${formatNumber(stock.yearLow)} — $${formatNumber(stock.yearHigh)}`
    : 'N/A';
  const yearProgress = stock.yearLow && stock.yearHigh
    ? ((stock.price - stock.yearLow) / (stock.yearHigh - stock.yearLow)) * 100
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-start justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-300">
              {stock.image ? (
                <img src={stock.image} alt={stock.symbol} className="w-12 h-12 rounded-full" />
              ) : (
                stock.symbol.slice(0, 2)
              )}
            </div>
            <div>
              <h2 className="text-white text-lg font-bold">{stock.name}</h2>
              <p className="text-gray-500 text-sm">{stock.symbol} · {stock.exchange} · {stock.sector}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleWatch}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${isWatched ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-800 text-gray-500 hover:text-gray-300'}`}
              title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {isWatched ? '\u2605' : '\u2606'}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Price section */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-white">${formatNumber(stock.price)}</span>
            <span className={`text-lg font-medium ${changeColor}`}>
              {stock.changePercent24h >= 0 ? '+' : ''}{stock.changePercent24h.toFixed(2)}%
            </span>
            <span className={`text-sm ${changeColor}`}>
              ({stock.change24h >= 0 ? '+' : ''}${formatNumber(stock.change24h)})
            </span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Open" value={`$${formatNumber(stock.open)}`} />
            <Metric label="Previous Close" value={`$${formatNumber(stock.previousClose)}`} />
            <Metric label="Day Low" value={`$${formatNumber(stock.low24h)}`} />
            <Metric label="Day High" value={`$${formatNumber(stock.high24h)}`} />
            <Metric label="Market Cap" value={formatMarketCap(stock.marketCap)} />
            <Metric label="Volume" value={formatVolume(stock.volume24h)} />
            {stock.pe && <Metric label="P/E Ratio" value={stock.pe.toFixed(1)} color={stock.pe > 0 ? undefined : 'text-red-400'} />}
            {stock.eps && <Metric label="EPS" value={`$${stock.eps.toFixed(2)}`} color={stock.eps > 0 ? 'text-emerald-400' : 'text-red-400'} />}
            {stock.avgVolume && <Metric label="Avg Volume" value={formatVolume(stock.avgVolume)} />}
            <Metric label="Industry" value={stock.industry} />
          </div>

          {/* 52-week range */}
          {yearProgress !== null && (
            <div className="mt-4">
              <p className="text-gray-500 text-xs mb-2">52-Week Range</p>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-gray-400">${formatNumber(stock.yearLow!)}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, yearProgress))}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-emerald-500"
                    style={{ left: `${Math.min(100, Math.max(0, yearProgress))}%`, transform: 'translate(-50%, -50%)' }}
                  />
                </div>
                <span className="text-gray-400">${formatNumber(stock.yearHigh!)}</span>
              </div>
              <p className="text-gray-600 text-xs mt-1 text-center">{yearRange}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
