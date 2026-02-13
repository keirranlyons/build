import type { Stock } from '../types/stock';

// Mock data representing real stocks grouped by sector/industry.
// In production, replace with API calls to Financial Modeling Prep, Alpha Vantage, etc.
export const mockStocks: Stock[] = [
  // Technology - Software
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 420.35, change24h: 5.12, changePercent24h: 1.23, marketCap: 3120000000000, volume24h: 22500000, high24h: 422.10, low24h: 414.50, sector: 'Technology', industry: 'Software - Infrastructure', exchange: 'NASDAQ' },
  { symbol: 'ORCL', name: 'Oracle Corp', price: 178.90, change24h: -1.45, changePercent24h: -0.80, marketCap: 492000000000, volume24h: 8200000, high24h: 181.20, low24h: 177.60, sector: 'Technology', industry: 'Software - Infrastructure', exchange: 'NYSE' },
  { symbol: 'CRM', name: 'Salesforce Inc', price: 312.45, change24h: 4.78, changePercent24h: 1.55, marketCap: 302000000000, volume24h: 5600000, high24h: 314.00, low24h: 307.20, sector: 'Technology', industry: 'Software - Application', exchange: 'NYSE' },
  { symbol: 'ADBE', name: 'Adobe Inc', price: 485.60, change24h: -3.20, changePercent24h: -0.65, marketCap: 215000000000, volume24h: 3200000, high24h: 490.10, low24h: 483.40, sector: 'Technology', industry: 'Software - Application', exchange: 'NASDAQ' },
  { symbol: 'NOW', name: 'ServiceNow Inc', price: 892.30, change24h: 12.40, changePercent24h: 1.41, marketCap: 184000000000, volume24h: 1800000, high24h: 895.50, low24h: 878.90, sector: 'Technology', industry: 'Software - Application', exchange: 'NYSE' },

  // Technology - Semiconductors
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 875.50, change24h: 22.30, changePercent24h: 2.61, marketCap: 2150000000000, volume24h: 45000000, high24h: 880.20, low24h: 852.10, sector: 'Technology', industry: 'Semiconductors', exchange: 'NASDAQ' },
  { symbol: 'TSM', name: 'Taiwan Semiconductor', price: 168.75, change24h: 3.45, changePercent24h: 2.09, marketCap: 875000000000, volume24h: 18000000, high24h: 170.00, low24h: 165.30, sector: 'Technology', industry: 'Semiconductors', exchange: 'NYSE' },
  { symbol: 'AVGO', name: 'Broadcom Inc', price: 1680.20, change24h: -15.60, changePercent24h: -0.92, marketCap: 780000000000, volume24h: 3500000, high24h: 1700.00, low24h: 1675.40, sector: 'Technology', industry: 'Semiconductors', exchange: 'NASDAQ' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 178.40, change24h: 4.80, changePercent24h: 2.77, marketCap: 288000000000, volume24h: 52000000, high24h: 180.10, low24h: 173.50, sector: 'Technology', industry: 'Semiconductors', exchange: 'NASDAQ' },
  { symbol: 'INTC', name: 'Intel Corp', price: 31.20, change24h: -0.85, changePercent24h: -2.65, marketCap: 132000000000, volume24h: 38000000, high24h: 32.10, low24h: 30.90, sector: 'Technology', industry: 'Semiconductors', exchange: 'NASDAQ' },

  // Technology - Consumer Electronics
  { symbol: 'AAPL', name: 'Apple Inc', price: 195.80, change24h: 1.90, changePercent24h: 0.98, marketCap: 3010000000000, volume24h: 55000000, high24h: 197.20, low24h: 193.50, sector: 'Technology', industry: 'Consumer Electronics', exchange: 'NASDAQ' },
  { symbol: 'SONY', name: 'Sony Group Corp', price: 88.45, change24h: 1.20, changePercent24h: 1.37, marketCap: 108000000000, volume24h: 2100000, high24h: 89.10, low24h: 87.00, sector: 'Technology', industry: 'Consumer Electronics', exchange: 'NYSE' },

  // Healthcare - Pharmaceuticals
  { symbol: 'LLY', name: 'Eli Lilly & Co', price: 782.40, change24h: 18.50, changePercent24h: 2.42, marketCap: 743000000000, volume24h: 4200000, high24h: 785.00, low24h: 762.50, sector: 'Healthcare', industry: 'Drug Manufacturers - General', exchange: 'NYSE' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 158.30, change24h: -0.70, changePercent24h: -0.44, marketCap: 381000000000, volume24h: 7500000, high24h: 159.80, low24h: 157.50, sector: 'Healthcare', industry: 'Drug Manufacturers - General', exchange: 'NYSE' },
  { symbol: 'PFE', name: 'Pfizer Inc', price: 28.45, change24h: 0.35, changePercent24h: 1.25, marketCap: 160000000000, volume24h: 25000000, high24h: 28.80, low24h: 28.00, sector: 'Healthcare', industry: 'Drug Manufacturers - General', exchange: 'NYSE' },
  { symbol: 'MRK', name: 'Merck & Co', price: 125.60, change24h: -2.10, changePercent24h: -1.64, marketCap: 318000000000, volume24h: 9200000, high24h: 128.00, low24h: 125.10, sector: 'Healthcare', industry: 'Drug Manufacturers - General', exchange: 'NYSE' },
  { symbol: 'ABBV', name: 'AbbVie Inc', price: 174.20, change24h: 1.80, changePercent24h: 1.04, marketCap: 308000000000, volume24h: 6800000, high24h: 175.50, low24h: 172.00, sector: 'Healthcare', industry: 'Drug Manufacturers - General', exchange: 'NYSE' },

  // Healthcare - Biotech
  { symbol: 'AMGN', name: 'Amgen Inc', price: 285.70, change24h: -4.30, changePercent24h: -1.48, marketCap: 153000000000, volume24h: 3100000, high24h: 290.50, low24h: 284.20, sector: 'Healthcare', industry: 'Biotechnology', exchange: 'NASDAQ' },
  { symbol: 'GILD', name: 'Gilead Sciences', price: 82.15, change24h: 1.45, changePercent24h: 1.80, marketCap: 102000000000, volume24h: 6400000, high24h: 83.00, low24h: 80.50, sector: 'Healthcare', industry: 'Biotechnology', exchange: 'NASDAQ' },
  { symbol: 'VRTX', name: 'Vertex Pharmaceuticals', price: 428.90, change24h: 7.60, changePercent24h: 1.80, marketCap: 110000000000, volume24h: 1900000, high24h: 430.50, low24h: 420.00, sector: 'Healthcare', industry: 'Biotechnology', exchange: 'NASDAQ' },

  // Financial Services - Banks
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 198.50, change24h: 2.80, changePercent24h: 1.43, marketCap: 572000000000, volume24h: 9800000, high24h: 199.80, low24h: 195.20, sector: 'Financial Services', industry: 'Banks - Diversified', exchange: 'NYSE' },
  { symbol: 'BAC', name: 'Bank of America', price: 35.80, change24h: 0.45, changePercent24h: 1.27, marketCap: 282000000000, volume24h: 32000000, high24h: 36.10, low24h: 35.20, sector: 'Financial Services', industry: 'Banks - Diversified', exchange: 'NYSE' },
  { symbol: 'WFC', name: 'Wells Fargo', price: 58.90, change24h: -0.65, changePercent24h: -1.09, marketCap: 210000000000, volume24h: 15000000, high24h: 59.80, low24h: 58.50, sector: 'Financial Services', industry: 'Banks - Diversified', exchange: 'NYSE' },
  { symbol: 'GS', name: 'Goldman Sachs', price: 465.30, change24h: 8.20, changePercent24h: 1.79, marketCap: 152000000000, volume24h: 2800000, high24h: 468.00, low24h: 456.50, sector: 'Financial Services', industry: 'Capital Markets', exchange: 'NYSE' },
  { symbol: 'MS', name: 'Morgan Stanley', price: 98.70, change24h: 1.50, changePercent24h: 1.54, marketCap: 160000000000, volume24h: 7200000, high24h: 99.50, low24h: 97.00, sector: 'Financial Services', industry: 'Capital Markets', exchange: 'NYSE' },

  // Financial Services - Insurance
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 412.50, change24h: 3.20, changePercent24h: 0.78, marketCap: 895000000000, volume24h: 3400000, high24h: 414.00, low24h: 408.80, sector: 'Financial Services', industry: 'Insurance - Diversified', exchange: 'NYSE' },
  { symbol: 'PGR', name: 'Progressive Corp', price: 215.40, change24h: -1.80, changePercent24h: -0.83, marketCap: 126000000000, volume24h: 2900000, high24h: 218.00, low24h: 214.50, sector: 'Financial Services', industry: 'Insurance - Property & Casualty', exchange: 'NYSE' },

  // Energy - Oil & Gas
  { symbol: 'XOM', name: 'Exxon Mobil', price: 108.20, change24h: -2.40, changePercent24h: -2.17, marketCap: 432000000000, volume24h: 15000000, high24h: 111.00, low24h: 107.80, sector: 'Energy', industry: 'Oil & Gas Integrated', exchange: 'NYSE' },
  { symbol: 'CVX', name: 'Chevron Corp', price: 155.80, change24h: -3.10, changePercent24h: -1.95, marketCap: 290000000000, volume24h: 8200000, high24h: 159.50, low24h: 155.20, sector: 'Energy', industry: 'Oil & Gas Integrated', exchange: 'NYSE' },
  { symbol: 'COP', name: 'ConocoPhillips', price: 118.90, change24h: -1.80, changePercent24h: -1.49, marketCap: 140000000000, volume24h: 5500000, high24h: 121.20, low24h: 118.50, sector: 'Energy', industry: 'Oil & Gas E&P', exchange: 'NYSE' },

  // Consumer Discretionary - Internet Retail
  { symbol: 'AMZN', name: 'Amazon.com Inc', price: 185.60, change24h: 3.40, changePercent24h: 1.87, marketCap: 1920000000000, volume24h: 48000000, high24h: 186.80, low24h: 182.00, sector: 'Consumer Cyclical', industry: 'Internet Retail', exchange: 'NASDAQ' },
  { symbol: 'BABA', name: 'Alibaba Group', price: 82.30, change24h: 2.10, changePercent24h: 2.62, marketCap: 198000000000, volume24h: 14000000, high24h: 83.50, low24h: 79.80, sector: 'Consumer Cyclical', industry: 'Internet Retail', exchange: 'NYSE' },

  // Consumer Cyclical - Auto
  { symbol: 'TSLA', name: 'Tesla Inc', price: 248.50, change24h: 8.90, changePercent24h: 3.71, marketCap: 790000000000, volume24h: 98000000, high24h: 252.00, low24h: 238.60, sector: 'Consumer Cyclical', industry: 'Auto Manufacturers', exchange: 'NASDAQ' },
  { symbol: 'TM', name: 'Toyota Motor Corp', price: 242.80, change24h: -1.20, changePercent24h: -0.49, marketCap: 315000000000, volume24h: 1200000, high24h: 245.00, low24h: 241.50, sector: 'Consumer Cyclical', industry: 'Auto Manufacturers', exchange: 'NYSE' },

  // Communication Services
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 155.20, change24h: 2.80, changePercent24h: 1.84, marketCap: 1950000000000, volume24h: 25000000, high24h: 156.50, low24h: 152.00, sector: 'Communication Services', industry: 'Internet Content & Information', exchange: 'NASDAQ' },
  { symbol: 'META', name: 'Meta Platforms', price: 505.40, change24h: 9.60, changePercent24h: 1.94, marketCap: 1290000000000, volume24h: 18000000, high24h: 508.00, low24h: 494.80, sector: 'Communication Services', industry: 'Internet Content & Information', exchange: 'NASDAQ' },
  { symbol: 'NFLX', name: 'Netflix Inc', price: 628.50, change24h: -5.40, changePercent24h: -0.85, marketCap: 272000000000, volume24h: 5600000, high24h: 635.00, low24h: 625.80, sector: 'Communication Services', industry: 'Entertainment', exchange: 'NASDAQ' },
  { symbol: 'DIS', name: 'Walt Disney Co', price: 112.30, change24h: 1.60, changePercent24h: 1.44, marketCap: 205000000000, volume24h: 10500000, high24h: 113.50, low24h: 110.40, sector: 'Communication Services', industry: 'Entertainment', exchange: 'NYSE' },

  // Consumer Staples
  { symbol: 'PG', name: 'Procter & Gamble', price: 162.40, change24h: 0.80, changePercent24h: 0.49, marketCap: 382000000000, volume24h: 6200000, high24h: 163.20, low24h: 161.00, sector: 'Consumer Defensive', industry: 'Household & Personal Products', exchange: 'NYSE' },
  { symbol: 'KO', name: 'Coca-Cola Co', price: 60.80, change24h: 0.25, changePercent24h: 0.41, marketCap: 263000000000, volume24h: 12000000, high24h: 61.10, low24h: 60.40, sector: 'Consumer Defensive', industry: 'Beverages - Non-Alcoholic', exchange: 'NYSE' },
  { symbol: 'PEP', name: 'PepsiCo Inc', price: 172.50, change24h: -0.90, changePercent24h: -0.52, marketCap: 237000000000, volume24h: 4800000, high24h: 174.00, low24h: 172.00, sector: 'Consumer Defensive', industry: 'Beverages - Non-Alcoholic', exchange: 'NASDAQ' },
  { symbol: 'WMT', name: 'Walmart Inc', price: 168.90, change24h: 1.20, changePercent24h: 0.72, marketCap: 455000000000, volume24h: 7800000, high24h: 169.50, low24h: 167.20, sector: 'Consumer Defensive', industry: 'Discount Stores', exchange: 'NYSE' },
  { symbol: 'COST', name: 'Costco Wholesale', price: 742.80, change24h: 5.40, changePercent24h: 0.73, marketCap: 330000000000, volume24h: 2100000, high24h: 745.00, low24h: 736.50, sector: 'Consumer Defensive', industry: 'Discount Stores', exchange: 'NASDAQ' },

  // Industrials
  { symbol: 'CAT', name: 'Caterpillar Inc', price: 335.60, change24h: -4.50, changePercent24h: -1.32, marketCap: 164000000000, volume24h: 3200000, high24h: 340.80, low24h: 334.20, sector: 'Industrials', industry: 'Farm & Heavy Construction Machinery', exchange: 'NYSE' },
  { symbol: 'DE', name: 'Deere & Company', price: 405.20, change24h: -6.80, changePercent24h: -1.65, marketCap: 118000000000, volume24h: 1900000, high24h: 412.50, low24h: 403.80, sector: 'Industrials', industry: 'Farm & Heavy Construction Machinery', exchange: 'NYSE' },
  { symbol: 'UNP', name: 'Union Pacific', price: 248.90, change24h: 2.10, changePercent24h: 0.85, marketCap: 152000000000, volume24h: 2800000, high24h: 250.50, low24h: 246.40, sector: 'Industrials', industry: 'Railroads', exchange: 'NYSE' },
  { symbol: 'BA', name: 'Boeing Co', price: 215.80, change24h: -3.40, changePercent24h: -1.55, marketCap: 132000000000, volume24h: 8500000, high24h: 220.00, low24h: 214.50, sector: 'Industrials', industry: 'Aerospace & Defense', exchange: 'NYSE' },
  { symbol: 'RTX', name: 'RTX Corp', price: 98.40, change24h: 0.70, changePercent24h: 0.72, marketCap: 130000000000, volume24h: 4200000, high24h: 99.10, low24h: 97.50, sector: 'Industrials', industry: 'Aerospace & Defense', exchange: 'NYSE' },

  // Real Estate
  { symbol: 'AMT', name: 'American Tower', price: 205.30, change24h: 1.80, changePercent24h: 0.88, marketCap: 95800000000, volume24h: 2100000, high24h: 206.50, low24h: 203.00, sector: 'Real Estate', industry: 'REIT - Specialty', exchange: 'NYSE' },
  { symbol: 'PLD', name: 'Prologis Inc', price: 128.40, change24h: 0.90, changePercent24h: 0.71, marketCap: 118000000000, volume24h: 3800000, high24h: 129.20, low24h: 127.00, sector: 'Real Estate', industry: 'REIT - Industrial', exchange: 'NYSE' },
  { symbol: 'SPG', name: 'Simon Property Group', price: 152.60, change24h: -1.20, changePercent24h: -0.78, marketCap: 50200000000, volume24h: 1600000, high24h: 154.50, low24h: 151.80, sector: 'Real Estate', industry: 'REIT - Retail', exchange: 'NYSE' },
  { symbol: 'O', name: 'Realty Income Corp', price: 55.80, change24h: 0.30, changePercent24h: 0.54, marketCap: 46500000000, volume24h: 4500000, high24h: 56.20, low24h: 55.30, sector: 'Real Estate', industry: 'REIT - Retail', exchange: 'NYSE' },
];
