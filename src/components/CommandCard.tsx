import React, { useState, useEffect } from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
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
    <div className="group relative flex flex-col justify-between p-4 md:p-5 rounded-xl border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-surface hover:border-neutral-400 dark:hover:border-cyber-borderHover transition-all duration-200 shadow-sm hover:shadow-cyber">
      {/* Top Header: Category & Risk & Favorite */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono tracking-wider text-neutral-600 dark:text-cyber-muted bg-neutral-100 dark:bg-cyber-dark border border-neutral-200 dark:border-cyber-border">
              {command.category}
            </span>
            <RiskBadge risk={command.risk} />
          </div>

          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-1.5 rounded-lg border transition-colors ${
              favorite
                ? 'border-cyber-lime/40 bg-cyber-lime/10 text-cyber-lime'
                : 'border-transparent text-neutral-400 dark:text-cyber-dim hover:text-neutral-700 dark:hover:text-cyber-text'
            }`}
            title={favorite ? 'In your favorites' : 'Save to favorites'}
          >
            <Bookmark
              className={`w-4 h-4 ${favorite ? 'fill-cyber-lime text-cyber-lime' : ''}`}
            />
          </button>
        </div>

        {/* Command Syntax in Monospace */}
        <div className="relative my-2 p-2.5 rounded-lg bg-neutral-50 dark:bg-cyber-dark border border-neutral-200 dark:border-cyber-border overflow-x-auto">
          <code className="text-[13px] md:text-sm font-mono text-neutral-900 dark:text-cyber-lime font-bold tracking-tight whitespace-nowrap block">
            {command.command}
          </code>
        </div>

        {/* Short Explanation */}
        <p className="text-xs md:text-sm text-neutral-600 dark:text-cyber-muted line-clamp-2 mt-2 leading-relaxed">
          {command.description}
        </p>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-neutral-100 dark:border-cyber-border/40">
        <CopyButton text={command.command} />

        <a
          href={detailUrl}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime group-hover:translate-x-0.5 transition-all"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
        </a>
      </div>
    </div>
  );
};
