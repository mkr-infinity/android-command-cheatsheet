import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Bookmark,
  History,
  RotateCcw,
  Terminal,
  Zap,
  SlidersHorizontal,
} from 'lucide-react';
import { allCommands, adbCategories, fastbootCategories } from '../data';
import type { CommandItem, ToolType, RiskLevel } from '../data/types';
import { CommandCard } from './CommandCard';
import { getFavorites, getRecentHistory } from '../utils/storage';

interface InteractiveExplorerProps {
  initialTool?: ToolType | 'all';
  initialCategory?: string;
  basePath?: string;
}

export const InteractiveExplorer: React.FC<InteractiveExplorerProps> = ({
  initialTool = 'all',
  initialCategory = 'All',
  basePath = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<ToolType | 'all'>(initialTool);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | 'all'>('all');
  const [viewTab, setViewTab] = useState<'all' | 'favorites' | 'recent'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  // Load storage state
  useEffect(() => {
    setFavorites(getFavorites());
    setRecent(getRecentHistory());

    const handleFavChange = () => setFavorites(getFavorites());
    const handleRecentChange = () => setRecent(getRecentHistory());

    window.addEventListener('acc_favorites_changed', handleFavChange);
    window.addEventListener('acc_recent_changed', handleRecentChange);

    return () => {
      window.removeEventListener('acc_favorites_changed', handleFavChange);
      window.removeEventListener('acc_recent_changed', handleRecentChange);
    };
  }, []);

  // Sync category from URL search params if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        setSelectedCategory(catParam);
      }
      const qParam = params.get('q');
      if (qParam) {
        setSearchQuery(qParam);
      }
      const filterParam = params.get('filter');
      if (filterParam === 'favorites') {
        setViewTab('favorites');
      } else if (filterParam === 'recent') {
        setViewTab('recent');
      }
    }
  }, []);

  // Compute available categories based on active tool
  const categories = useMemo(() => {
    if (selectedTool === 'adb') return adbCategories;
    if (selectedTool === 'fastboot') return fastbootCategories;
    const set = new Set<string>(['All']);
    adbCategories.forEach((c) => set.add(c));
    fastbootCategories.forEach((c) => set.add(c));
    return Array.from(set);
  }, [selectedTool]);

  useEffect(() => {
    if (selectedCategory !== 'All' && !categories.includes(selectedCategory as any)) {
      setSelectedCategory('All');
    }
  }, [selectedTool, categories, selectedCategory]);

  // Filter commands
  const filteredCommands = useMemo(() => {
    let list = allCommands;

    if (viewTab === 'favorites') {
      list = list.filter((cmd) => favorites.includes(cmd.id));
    } else if (viewTab === 'recent') {
      list = recent
        .map((id) => allCommands.find((cmd) => cmd.id === id))
        .filter((cmd): cmd is CommandItem => Boolean(cmd));
    }

    return list.filter((cmd) => {
      if (selectedTool !== 'all' && cmd.tool !== selectedTool) {
        return false;
      }
      if (selectedCategory !== 'All' && cmd.category !== selectedCategory) {
        return false;
      }
      if (selectedRisk !== 'all' && cmd.risk !== selectedRisk) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchCommand = cmd.command.toLowerCase().includes(q);
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchDesc = cmd.description.toLowerCase().includes(q);
      const matchCat = cmd.category.toLowerCase().includes(q);
      const matchTags = cmd.tags.some((t) => t.toLowerCase().includes(q));
      const matchAliases = cmd.aliases?.some((a) => a.toLowerCase().includes(q)) ?? false;
      const matchExamples = cmd.examples.some((ex) => ex.toLowerCase().includes(q));

      return (
        matchCommand ||
        matchTitle ||
        matchDesc ||
        matchCat ||
        matchTags ||
        matchAliases ||
        matchExamples
      );
    });
  }, [selectedTool, selectedCategory, selectedRisk, searchQuery, viewTab, favorites, recent]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedRisk !== 'all' ||
    (initialTool === 'all' && selectedTool !== 'all') ||
    viewTab !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTool(initialTool);
    setSelectedCategory('All');
    setSelectedRisk('all');
    setViewTab('all');
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar: Tabs & Search Input */}
      <div className="p-4 md:p-6 rounded-2xl border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-surface shadow-sm space-y-4">
        {/* Navigation Tabs: All / Favorites / History */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-cyber-border/40">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-cyber-dark border border-neutral-200 dark:border-cyber-border">
            <button
              type="button"
              onClick={() => setViewTab('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                viewTab === 'all'
                  ? 'bg-white dark:bg-cyber-surface text-neutral-950 dark:text-cyber-lime shadow-sm border border-neutral-300 dark:border-cyber-limeBorder font-semibold'
                  : 'text-neutral-600 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
              }`}
            >
              <span>All Commands</span>
            </button>

            <button
              type="button"
              onClick={() => setViewTab('favorites')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                viewTab === 'favorites'
                  ? 'bg-white dark:bg-cyber-surface text-neutral-950 dark:text-cyber-lime shadow-sm border border-neutral-300 dark:border-cyber-limeBorder font-semibold'
                  : 'text-neutral-600 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-cyber-lime" />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-cyber-lime/20 text-neutral-900 dark:text-cyber-lime border border-cyber-lime/40">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setViewTab('recent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                viewTab === 'recent'
                  ? 'bg-white dark:bg-cyber-surface text-neutral-950 dark:text-cyber-lime shadow-sm border border-neutral-300 dark:border-cyber-limeBorder font-semibold'
                  : 'text-neutral-600 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
              }`}
            >
              <History className="w-3.5 h-3.5 text-neutral-500 dark:text-cyber-muted" />
              <span>Recent</span>
              {recent.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                  {recent.length}
                </span>
              )}
            </button>
          </div>

          {/* Tool Selector (If on / page) */}
          {initialTool === 'all' && (
            <div className="flex items-center gap-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setSelectedTool('all')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedTool === 'all'
                    ? 'border-neutral-900 dark:border-cyber-lime text-neutral-950 dark:text-cyber-lime bg-neutral-100 dark:bg-cyber-lime/10 font-bold'
                    : 'border-neutral-200 dark:border-cyber-border text-neutral-600 dark:text-cyber-muted hover:bg-neutral-50 dark:hover:bg-cyber-surfaceHover'
                }`}
              >
                All Tools
              </button>
              <button
                type="button"
                onClick={() => setSelectedTool('adb')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  selectedTool === 'adb'
                    ? 'border-neutral-900 dark:border-cyber-lime text-neutral-950 dark:text-cyber-lime bg-neutral-100 dark:bg-cyber-lime/10 font-bold'
                    : 'border-neutral-200 dark:border-cyber-border text-neutral-600 dark:text-cyber-muted hover:bg-neutral-50 dark:hover:bg-cyber-surfaceHover'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyber-lime" />
                <span>ADB</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedTool('fastboot')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  selectedTool === 'fastboot'
                    ? 'border-neutral-900 dark:border-cyber-lime text-neutral-950 dark:text-cyber-lime bg-neutral-100 dark:bg-cyber-lime/10 font-bold'
                    : 'border-neutral-200 dark:border-cyber-border text-neutral-600 dark:text-cyber-muted hover:bg-neutral-50 dark:hover:bg-cyber-surfaceHover'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Fastboot</span>
              </button>
            </div>
          )}
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-cyber-lime" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter commands by keyword, flag, description (e.g. logcat, reboot, pull, unlock)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-200 dark:border-cyber-border bg-neutral-50 dark:bg-cyber-dark text-sm font-sans text-neutral-950 dark:text-cyber-text placeholder:text-neutral-400 dark:placeholder:text-cyber-dim focus:outline-none focus:ring-1 focus:ring-cyber-lime focus:border-cyber-lime transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-neutral-600 dark:text-cyber-dim dark:hover:text-cyber-text"
            >
              Clear
            </button>
          )}
        </div>

        {/* Secondary Filter Row: Categories & Risk */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          {/* Category Pills (Horizontal scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white dark:bg-cyber-lime dark:text-black border-neutral-900 dark:border-cyber-lime font-bold shadow-sm'
                    : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-cyber-dark dark:hover:bg-cyber-surfaceHover border-neutral-200 dark:border-cyber-border text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Risk Level Filter */}
          <div className="flex items-center gap-1 shrink-0 self-start md:self-auto">
            <span className="text-[11px] font-mono text-neutral-400 dark:text-cyber-dim mr-1">
              Risk:
            </span>
            {(['all', 'safe', 'caution', 'destructive'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRisk(r)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase transition-all border ${
                  selectedRisk === r
                    ? 'border-neutral-900 dark:border-cyber-lime bg-neutral-100 dark:bg-cyber-lime/10 text-neutral-950 dark:text-cyber-lime font-bold'
                    : 'border-neutral-200 dark:border-cyber-border text-neutral-500 dark:text-cyber-dim hover:text-neutral-800 dark:hover:text-cyber-muted'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header: Count & Reset Controls */}
      <div className="flex items-center justify-between px-1 text-xs font-mono text-neutral-500 dark:text-cyber-muted">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-neutral-900 dark:text-cyber-lime">{filteredCommands.length}</strong> commands
          </span>
          {selectedCategory !== 'All' && (
            <span className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-cyber-surface text-neutral-800 dark:text-cyber-text text-[11px]">
              in {selectedCategory}
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:text-cyber-muted dark:hover:text-cyber-lime transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Commands Grid */}
      {filteredCommands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} basePath={basePath} />
          ))}
        </div>
      ) : (
        /* Empty States */
        <div className="py-16 px-6 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-cyber-border bg-white dark:bg-cyber-surface/50">
          {viewTab === 'favorites' ? (
            <div className="max-w-md mx-auto space-y-3">
              <Bookmark className="w-10 h-10 mx-auto text-neutral-400 dark:text-cyber-lime/60 stroke-[1.5]" />
              <h3 className="text-base font-semibold text-neutral-800 dark:text-cyber-text">
                No saved favorite commands yet
              </h3>
              <p className="text-xs text-neutral-500 dark:text-cyber-muted leading-relaxed">
                Click the bookmark icon on any command card to pin your most frequently used ADB and Fastboot commands here for instant access.
              </p>
              <button
                type="button"
                onClick={() => setViewTab('all')}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 text-white dark:bg-cyber-lime dark:text-black font-semibold hover:opacity-90 transition-opacity"
              >
                Browse All Commands
              </button>
            </div>
          ) : viewTab === 'recent' ? (
            <div className="max-w-md mx-auto space-y-3">
              <History className="w-10 h-10 mx-auto text-neutral-400 dark:text-cyber-dim stroke-[1.5]" />
              <h3 className="text-base font-semibold text-neutral-800 dark:text-cyber-text">
                No recently viewed commands
              </h3>
              <p className="text-xs text-neutral-500 dark:text-cyber-muted leading-relaxed">
                Commands you inspect in detail will automatically appear in your local history list.
              </p>
              <button
                type="button"
                onClick={() => setViewTab('all')}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 text-white dark:bg-cyber-lime dark:text-black font-semibold hover:opacity-90 transition-opacity"
              >
                Browse All Commands
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto space-y-3">
              <SlidersHorizontal className="w-10 h-10 mx-auto text-neutral-400 dark:text-cyber-dim stroke-[1.5]" />
              <h3 className="text-base font-semibold text-neutral-800 dark:text-cyber-text">
                No commands match your filters
              </h3>
              <p className="text-xs text-neutral-500 dark:text-cyber-muted leading-relaxed">
                No results found for your search term or active category filters. Try clearing your filters or searching for alternative keywords.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono border border-neutral-300 dark:border-cyber-border bg-neutral-100 hover:bg-neutral-200 dark:bg-cyber-surface hover:dark:bg-cyber-surfaceHover text-neutral-800 dark:text-cyber-lime font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
