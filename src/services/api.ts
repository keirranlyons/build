import type { Stock } from '../types/stock';

const BASE_URL = 'https://financialmodelingprep.com/api/v3';

function getApiKey(): string | null {
  return import.meta.env.VITE_FMP_API_KEY || null;
}

export function hasApiKey(): boolean {
  const key = getApiKey();
  return !!key && key !== 'your_api_key_here';
}

// FMP stock screener response shape
interface FmpScreenerItem {
  symbol: string;
  companyName: string;
  marketCap: number;
  sector: string;
  industry: string;
  price: number;
  volume: number;
  exchange: string;
  exchangeShortName: string;
}

// FMP quote response shape
interface FmpQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
  dayLow: number;
  dayHigh: number;
  yearLow: number;
  yearHigh: number;
  marketCap: number;
  volume: number;
  avgVolume: number;
  exchange: string;
  open: number;
  previousClose: number;
  pe: number;
  eps: number;
}

// FMP profile response shape
interface FmpProfile {
  symbol: string;
  companyName: string;
  sector: string;
  industry: string;
  description: string;
  website: string;
  image: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error('Invalid API key. Check your VITE_FMP_API_KEY in .env');
    }
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch top stocks by market cap using the FMP stock screener.
 * Returns symbols + sector/industry classification.
 */
export async function fetchStockUniverse(limit = 150): Promise<FmpScreenerItem[]> {
  const key = getApiKey();
  if (!key) throw new Error('No API key');

  const url = `${BASE_URL}/stock-screener?marketCapMoreThan=10000000000&isActivelyTrading=true&limit=${limit}&apikey=${key}`;
  return fetchJson<FmpScreenerItem[]>(url);
}

/**
 * Fetch live quotes for a batch of symbols.
 * FMP supports comma-separated symbols in a single request.
 */
export async function fetchQuotes(symbols: string[]): Promise<FmpQuote[]> {
  const key = getApiKey();
  if (!key) throw new Error('No API key');

  // FMP supports up to ~50 symbols per request; batch if needed
  const batchSize = 50;
  const results: FmpQuote[] = [];

  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);
    const url = `${BASE_URL}/quote/${batch.join(',')}?apikey=${key}`;
    const data = await fetchJson<FmpQuote[]>(url);
    results.push(...data);
  }

  return results;
}

/**
 * Fetch company profiles for sector/industry data.
 */
export async function fetchProfiles(symbols: string[]): Promise<FmpProfile[]> {
  const key = getApiKey();
  if (!key) throw new Error('No API key');

  const batchSize = 50;
  const results: FmpProfile[] = [];

  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);
    const url = `${BASE_URL}/profile/${batch.join(',')}?apikey=${key}`;
    const data = await fetchJson<FmpProfile[]>(url);
    results.push(...data);
  }

  return results;
}

/**
 * Full fetch: get stock universe, then enrich with live quotes.
 * Returns merged Stock[] with sector/industry + live price data.
 */
export async function fetchAllStocks(): Promise<Stock[]> {
  // Step 1: Get the universe (gives us sector/industry)
  const universe = await fetchStockUniverse();
  const symbols = universe.map(s => s.symbol);

  // Step 2: Get live quotes
  const quotes = await fetchQuotes(symbols);
  const quoteMap = new Map(quotes.map(q => [q.symbol, q]));

  // Step 3: Merge
  const stocks: Stock[] = [];
  for (const item of universe) {
    const quote = quoteMap.get(item.symbol);
    if (!quote) continue;
    if (!item.sector || !item.industry) continue; // skip unclassified

    stocks.push({
      symbol: item.symbol,
      name: item.companyName || quote.name,
      price: quote.price,
      change24h: quote.change,
      changePercent24h: quote.changesPercentage,
      marketCap: quote.marketCap || item.marketCap,
      volume24h: quote.volume,
      high24h: quote.dayHigh,
      low24h: quote.dayLow,
      open: quote.open,
      previousClose: quote.previousClose,
      sector: item.sector,
      industry: item.industry,
      exchange: item.exchangeShortName || item.exchange,
      pe: quote.pe || undefined,
      eps: quote.eps || undefined,
      yearHigh: quote.yearHigh || undefined,
      yearLow: quote.yearLow || undefined,
      avgVolume: quote.avgVolume || undefined,
    });
  }

  return stocks;
}

/**
 * Refresh only quotes for existing symbols (cheaper, for auto-refresh).
 */
export async function refreshQuotes(existingStocks: Stock[]): Promise<Stock[]> {
  const symbols = existingStocks.map(s => s.symbol);
  const quotes = await fetchQuotes(symbols);
  const quoteMap = new Map(quotes.map(q => [q.symbol, q]));

  return existingStocks.map(stock => {
    const quote = quoteMap.get(stock.symbol);
    if (!quote) return stock;
    return {
      ...stock,
      price: quote.price,
      change24h: quote.change,
      changePercent24h: quote.changesPercentage,
      marketCap: quote.marketCap || stock.marketCap,
      volume24h: quote.volume,
      high24h: quote.dayHigh,
      low24h: quote.dayLow,
      open: quote.open,
      previousClose: quote.previousClose,
      pe: quote.pe || stock.pe,
      eps: quote.eps || stock.eps,
      yearHigh: quote.yearHigh || stock.yearHigh,
      yearLow: quote.yearLow || stock.yearLow,
      avgVolume: quote.avgVolume || stock.avgVolume,
    };
  });
}
