export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  sector: string;
  industry: string;
  exchange: string;
  logo?: string;
}

export interface IndustryGroup {
  name: string;
  sector: string;
  stocks: Stock[];
  avgChange: number;
  totalMarketCap: number;
}

export type SortField = 'name' | 'price' | 'changePercent24h' | 'marketCap' | 'volume24h';
export type SortDirection = 'asc' | 'desc';
