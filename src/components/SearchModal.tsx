import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft, Terminal, ShieldAlert } from 'lucide-react';
import { allCommands, searchCommands } from '../data';
import { RiskBadge } from './RiskBadge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  basePath?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, basePath = '' }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = searchCommands(query).slice(0, 15);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        const cmd = results[selectedIndex];
        const targetUrl = `${basePath}/${cmd.tool}/${cmd.id}/`.replace(/\/+/g, '/');
        window.location.href = targetUrl;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, basePath, onClose]);

  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:p-12 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mt-4 sm:mt-10 rounded-xl border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-dark shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200 dark:border-cyber-border bg-neutral-50/70 dark:bg-cyber-surface/70">
          <Search className="w-5 h-5 text-neutral-400 dark:text-cyber-lime shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, flags, keywords (e.g. screenshot, install apk, unlock)..."
            className="w-full bg-transparent text-sm md:text-base text-neutral-900 dark:text-cyber-text placeholder:text-neutral-400 dark:placeholder:text-cyber-dim focus:outline-none font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:text-cyber-dim dark:hover:text-cyber-text"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono rounded border border-neutral-200 dark:border-cyber-border text-neutral-500 dark:text-cyber-muted hover:bg-neutral-200 dark:hover:bg-cyber-surface"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-cyber-border/40">
          {results.length > 0 ? (
            results.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const detailUrl = `${basePath}/${cmd.tool}/${cmd.id}/`.replace(/\/+/g, '/');

              return (
                <a
                  key={cmd.id}
                  href={detailUrl}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-start justify-between gap-3 p-3 rounded-lg text-left transition-all ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-cyber-surfaceHover border-l-2 border-cyber-lime'
                      : 'hover:bg-neutral-50 dark:hover:bg-cyber-surface'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-200 dark:bg-cyber-surface text-neutral-800 dark:text-cyber-muted border border-neutral-300 dark:border-cyber-border">
                        {cmd.tool.toUpperCase()}
                      </span>
                      <span className="text-xs font-medium text-neutral-500 dark:text-cyber-muted">
                        {cmd.category}
                      </span>
                      <RiskBadge risk={cmd.risk} showIcon={false} />
                    </div>

                    <div className="font-mono text-sm font-semibold text-neutral-900 dark:text-cyber-lime truncate">
                      {cmd.command}
                    </div>

                    <div className="text-xs text-neutral-600 dark:text-cyber-muted line-clamp-1 mt-0.5">
                      {cmd.title} — {cmd.description}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 self-center text-xs font-mono text-neutral-400 dark:text-cyber-dim">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-neutral-950 dark:text-cyber-lime bg-cyber-lime/10 px-1.5 py-0.5 rounded border border-cyber-lime/30">
                        <CornerDownLeft className="w-3 h-3" /> Jump
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-neutral-400 dark:text-cyber-muted" />
                  </div>
                </a>
              );
            })
          ) : query.trim() ? (
            <div className="py-12 px-4 text-center">
              <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-neutral-400 dark:text-cyber-dim" />
              <div className="text-sm font-medium text-neutral-800 dark:text-cyber-text">
                No matching commands found
              </div>
              <p className="text-xs text-neutral-500 dark:text-cyber-muted mt-1 max-w-sm mx-auto">
                No results for "{query}". Try searching for broader terms like "wifi", "log", "reboot", or "flash".
              </p>
            </div>
          ) : (
            <div className="py-8 px-4 text-center">
              <Terminal className="w-7 h-7 mx-auto mb-2 text-neutral-400 dark:text-cyber-lime opacity-75" />
              <p className="text-xs font-mono text-neutral-500 dark:text-cyber-muted">
                Type any command keyword, flag, or description.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-4 py-2.5 border-t border-neutral-200 dark:border-cyber-border bg-neutral-50 dark:bg-cyber-surface/75 text-[11px] font-mono text-neutral-500 dark:text-cyber-muted flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="text-neutral-400 dark:text-cyber-dim">
            {allCommands.length} commands indexed
          </div>
        </div>
      </div>
    </div>
  );
};
