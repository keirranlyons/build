import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mockStocks } from '../data/stocks';
import { fetchAllStocks, hasApiKey, refreshQuotes } from '../services/api';
import type { DataStatus, IndustryGroup, SortDirection, SortField, Stock } from '../types/stock';

const REFRESH_INTERVAL_MS = 60_000; // 1 minute

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [status, setStatus] = useState<DataStatus>(hasApiKey() ? 'loading' : 'demo');
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initial fetch
  const loadStocks = useCallback(async () => {
    if (!hasApiKey()) {
      setStatus('demo');
      setStocks(mockStocks);
      return;
    }

    setStatus('loading');
    setError(null);
    try {
      const data = await fetchAllStocks();
      if (data.length > 0) {
        setStocks(data);
        setStatus('ready');
        setLastUpdated(new Date());
      } else {
        setStocks(mockStocks);
        setStatus('demo');
        setError('API returned no data. Showing demo data.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
      setStatus('error');
      setStocks(mockStocks); // fallback to demo
    }
  }, []);

  // Refresh prices only (cheaper API call)
  const refresh = useCallback(async () => {
    if (!hasApiKey() || status === 'loading') return;
    try {
      const updated = await refreshQuotes(stocks);
      setStocks(updated);
      setLastUpdated(new Date());
      if (status === 'error') setStatus('ready');
    } catch {
      // silent fail on refresh — keep stale data
    }
  }, [stocks, status]);

  // Initial load
  useEffect(() => {
    loadStocks();
  }, [loadStocks]);

  // Auto-refresh
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (autoRefresh && status === 'ready') {
      intervalRef.current = setInterval(refresh, REFRESH_INTERVAL_MS);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, status, refresh]);

  const sectors = useMemo(() => {
    const unique = [...new Set(stocks.map(s => s.sector))].sort();
    return ['All', ...unique];
  }, [stocks]);

  const filteredStocks = useMemo(() => {
    return stocks.filter(stock => {
      const matchesSearch =
        searchQuery === '' ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
      return matchesSearch && matchesSector;
    });
  }, [stocks, searchQuery, selectedSector]);

  const sortStocks = useCallback((list: Stock[]): Stock[] => {
    return [...list].sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;

      switch (sortField) {
        case 'name': aVal = a.name; bVal = b.name; break;
        case 'price': aVal = a.price; bVal = b.price; break;
        case 'changePercent24h': aVal = a.changePercent24h; bVal = b.changePercent24h; break;
        case 'marketCap': aVal = a.marketCap; bVal = b.marketCap; break;
        case 'volume24h': aVal = a.volume24h; bVal = b.volume24h; break;
        default: aVal = a.marketCap; bVal = b.marketCap;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDirection === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [sortField, sortDirection]);

  const industryGroups = useMemo((): IndustryGroup[] => {
    const groupMap = new Map<string, Stock[]>();

    for (const stock of filteredStocks) {
      const key = stock.industry;
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push(stock);
    }

    const groups: IndustryGroup[] = [];
    for (const [industry, list] of groupMap) {
      const sorted = sortStocks(list);
      const avgChange = list.reduce((sum, s) => sum + s.changePercent24h, 0) / list.length;
      const totalMarketCap = list.reduce((sum, s) => sum + s.marketCap, 0);
      groups.push({
        name: industry,
        sector: list[0].sector,
        stocks: sorted,
        avgChange,
        totalMarketCap,
      });
    }

    return groups.sort((a, b) => b.totalMarketCap - a.totalMarketCap);
  }, [filteredStocks, sortStocks]);

  const toggleGroup = (name: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return {
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
    totalStocks: filteredStocks.length,
    allStocks: stocks,
  };
}
