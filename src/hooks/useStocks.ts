import { useMemo, useState } from 'react';
import { mockStocks } from '../data/stocks';
import type { IndustryGroup, SortDirection, SortField, Stock } from '../types/stock';

export function useStocks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const sectors = useMemo(() => {
    const unique = [...new Set(mockStocks.map(s => s.sector))].sort();
    return ['All', ...unique];
  }, []);

  const filteredStocks = useMemo(() => {
    return mockStocks.filter(stock => {
      const matchesSearch =
        searchQuery === '' ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
      return matchesSearch && matchesSector;
    });
  }, [searchQuery, selectedSector]);

  const sortStocks = (stocks: Stock[]): Stock[] => {
    return [...stocks].sort((a, b) => {
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
  };

  const industryGroups = useMemo((): IndustryGroup[] => {
    const groupMap = new Map<string, Stock[]>();

    for (const stock of filteredStocks) {
      const key = stock.industry;
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push(stock);
    }

    const groups: IndustryGroup[] = [];
    for (const [industry, stocks] of groupMap) {
      const sorted = sortStocks(stocks);
      const avgChange = stocks.reduce((sum, s) => sum + s.changePercent24h, 0) / stocks.length;
      const totalMarketCap = stocks.reduce((sum, s) => sum + s.marketCap, 0);
      groups.push({
        name: industry,
        sector: stocks[0].sector,
        stocks: sorted,
        avgChange,
        totalMarketCap,
      });
    }

    return groups.sort((a, b) => b.totalMarketCap - a.totalMarketCap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredStocks, sortField, sortDirection]);

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
  };
}
