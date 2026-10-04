import React, { useState, useEffect } from 'react';
import { ArrowRight, Bookmark, Terminal, Zap } from 'lucide-react';
import type { CommandItem } from '../data/types';
import { CopyButton } from './CopyButton';
import { RiskBadge } from './RiskBadge';
import { isFavorite, toggleFavorite } from '../utils/storage';

interface CommandCardProps {
  command: CommandItem;
  basePath?: string;
}

export const CommandCard: React.FC<CommandCardProps> = ({ command, basePath = '' }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(command.id));

    const handleFavChange = () => {
      setFavorite(isFavorite(command.id));
    };

    window.addEventListener('acc_favorites_changed', handleFavChange);
    return () => window.removeEventListener('acc_favorites_changed', handleFavChange);
  }, [command.id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const next = toggleFavorite(command.id);
    setFavorite(next);
  };

  const detailUrl = `${basePath}/${command.tool}/${command.id}/`.replace(/\/+/g, '/');

  return (
    <div className="clay-card group relative flex flex-col justify-between p-4 md:p-5 hover:translate-y-[-2px] transition-all duration-200">
      <div>
        {/* Top Header: Category & Risk & Favorite */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="clay-pill text-[11px] font-mono text-neutral-700 dark:text-cyber-muted">
              {command.tool === 'adb' ? (
                <Terminal className="w-3 h-3 text-cyber-lime inline mr-1" />
              ) : (
                <Zap className="w-3 h-3 text-amber-700 dark:text-amber-400 inline mr-1" />
              )}
              {command.category}
            </span>
            <RiskBadge risk={command.risk} />
          </div>

          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-1.5 rounded-lg transition-all active:scale-95 ${
              favorite
                ? 'bg-cyber-lime/10 text-cyber-lime border border-cyber-lime/30'
                : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-cyber-text'
            }`}
            title={favorite ? 'In your favorites' : 'Save to favorites'}
          >
            <Bookmark
              className={`w-4 h-4 ${favorite ? 'fill-cyber-lime text-cyber-lime' : ''}`}
            />
          </button>
        </div>

        {/* Command Syntax in Monospace Clay Terminal Block */}
        <div className="relative my-2.5 px-3 py-2.5 rounded-xl bg-[#0f1115] border border-neutral-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.06)] overflow-x-auto flex items-center gap-2">
          <span className="text-[11px] font-mono text-cyber-lime select-none font-bold shrink-0">$</span>
          <code className="text-xs sm:text-[13px] font-mono text-neutral-100 dark:text-cyber-lime font-bold tracking-tight whitespace-nowrap">
            {command.command}
          </code>
        </div>

        {/* Clear Explanation: What it does */}
        <div className="mt-3 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
            What it does:
          </div>
          <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 line-clamp-2 leading-relaxed font-medium">
            {command.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <CopyButton text={command.command} />

        <a
          href={detailUrl}
          className="clay-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-800 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime group-hover:translate-x-0.5 transition-all"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
