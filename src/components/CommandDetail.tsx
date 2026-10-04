import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  AlertTriangle,
  AlertOctagon,
  Check,
  Sparkles,
  Bug,
  ChevronRight,
  Info,
  Terminal,
  Zap,
} from 'lucide-react';
import type { CommandItem } from '../data/types';
import { CopyButton } from './CopyButton';
import { RiskBadge } from './RiskBadge';
import { isFavorite, toggleFavorite, addRecentHistory } from '../utils/storage';
import { createFeatureRequestUrl, createReportIssueUrl } from '../utils/github';
import { getCommandById } from '../data';

interface CommandDetailProps {
  command: CommandItem;
  basePath?: string;
}

export const CommandDetail: React.FC<CommandDetailProps> = ({ command, basePath = '' }) => {
  const [favorite, setFavorite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    addRecentHistory(command.id);
    setFavorite(isFavorite(command.id));

    const handleFavChange = () => setFavorite(isFavorite(command.id));
    window.addEventListener('acc_favorites_changed', handleFavChange);
    return () => window.removeEventListener('acc_favorites_changed', handleFavChange);
  }, [command.id]);

  const handleToggleFavorite = () => {
    const next = toggleFavorite(command.id);
    setFavorite(next);
  };

  const handleShare = async () => {
    try {
      if (typeof window !== 'undefined') {
        const url = window.location.href;
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
        }
      }
    } catch {}
  };

  const backUrl = `${basePath}/${command.tool}/`.replace(/\/+/g, '/');
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const featureUrl = createFeatureRequestUrl({ pageUrl: currentUrl, command: command.command });
  const issueUrl = createReportIssueUrl({ pageUrl: currentUrl, command: command.command });

  const relatedCommands = command.related
    .map((relId) => getCommandById(relId))
    .filter((cmd): cmd is CommandItem => Boolean(cmd));

  return (
    <article className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Back Button & Navigation Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <a
          href={backUrl}
          className="clay-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-950 dark:text-cyber-muted dark:hover:text-cyber-lime transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {command.tool.toUpperCase()} commands</span>
        </a>

        {/* Quick Actions: Favorite & Share */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`clay-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs ${
              favorite
                ? 'border-cyber-lime/40 bg-cyber-lime/10 text-neutral-900 dark:text-cyber-lime font-bold'
                : 'text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
            }`}
            title="Save to favorites"
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorite ? 'fill-cyber-lime text-cyber-lime' : ''}`} />
            <span>{favorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="clay-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime"
            title="Copy link to command"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyber-lime" />
                <span className="text-cyber-lime font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Command Header Card */}
      <div className="clay-card p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="clay-pill text-xs font-mono uppercase text-neutral-800 dark:text-cyber-muted">
            {command.tool === 'adb' ? (
              <Terminal className="w-3 h-3 text-cyber-lime inline mr-1" />
            ) : (
              <Zap className="w-3 h-3 text-amber-500 inline mr-1" />
            )}
            {command.tool.toUpperCase()}
          </span>
          <span className="clay-pill text-xs text-neutral-600 dark:text-neutral-400">
            {command.category}
          </span>
          <RiskBadge risk={command.risk} />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-neutral-950 dark:text-cyber-text tracking-tight">
            {command.command}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mt-2 font-medium">
            {command.title}
          </p>
        </div>

        {/* Risk Warning Callout if Caution or Destructive */}
        {command.riskExplanation && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 shadow-sm ${
              command.risk === 'destructive'
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-950 dark:text-rose-200'
                : 'border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-200'
            }`}
          >
            {command.risk === 'destructive' ? (
              <AlertOctagon className="w-5 h-5 shrink-0 mt-0.5 stroke-[2.5] text-rose-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 stroke-[2] text-amber-500" />
            )}
            <div className="text-xs md:text-sm leading-relaxed">
              <strong className="block font-mono uppercase mb-0.5 tracking-wide">
                {command.risk === 'destructive' ? 'Destructive Operation Warning' : 'Caution Required'}
              </strong>
              {command.riskExplanation}
            </div>
          </div>
        )}
      </div>

      {/* What it does (Clear, Easy to Understand) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
          <Info className="w-4 h-4 text-cyber-lime" />
          <span>What It Does</span>
        </div>
        <div className="clay-card p-5 sm:p-6 text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
          <p className="font-medium text-neutral-900 dark:text-cyber-text">
            {command.description}
          </p>
        </div>
      </section>

      {/* Syntax Block */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
            <Terminal className="w-4 h-4 text-cyber-lime" />
            <span>Command Syntax</span>
          </div>
          <CopyButton text={command.syntax} label="Copy Syntax" />
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 dark:bg-[#09090b] border border-neutral-800 dark:border-neutral-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] overflow-x-auto">
          <code className="text-sm md:text-base font-mono text-cyber-lime font-bold whitespace-nowrap block">
            {command.syntax}
          </code>
        </div>
      </section>

      {/* Examples Block */}
      {command.examples && command.examples.length > 0 && (
        <section className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
            Usage Examples
          </div>
          <div className="space-y-2.5">
            {command.examples.map((ex, idx) => (
              <div
                key={idx}
                className="clay-card flex items-center justify-between gap-3 p-3.5 sm:p-4 overflow-x-auto"
              >
                <code className="text-xs sm:text-sm font-mono text-neutral-950 dark:text-cyber-text font-semibold whitespace-nowrap">
                  {ex}
                </code>
                <CopyButton text={ex} showText={false} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Options & Flags */}
      {command.options && command.options.length > 0 && (
        <section className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
            Options &amp; Flags
          </div>
          <div className="clay-card overflow-hidden">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 font-mono text-xs">
                  <th className="py-3 px-4 font-semibold w-1/3">Flag / Parameter</th>
                  <th className="py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-mono">
                {command.options.map((opt, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors">
                    <td className="py-3 px-4 text-neutral-950 dark:text-cyber-lime font-bold whitespace-nowrap">
                      {opt.flag}
                    </td>
                    <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                      {opt.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Requirements */}
      {command.requirements && command.requirements.length > 0 && (
        <section className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
            Prerequisites &amp; Requirements
          </div>
          <ul className="clay-card space-y-2.5 p-5 text-xs sm:text-sm">
            {command.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200">
                <span className="w-2 h-2 rounded-full bg-cyber-lime mt-1.5 shrink-0 shadow-[0_0_8px_rgba(226,249,82,0.6)]" />
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Commands */}
      {relatedCommands.length > 0 && (
        <section className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
            Related Commands
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedCommands.map((rel) => {
              const relUrl = `${basePath}/${rel.tool}/${rel.id}/`.replace(/\/+/g, '/');
              return (
                <a
                  key={rel.id}
                  href={relUrl}
                  className="clay-card p-3.5 sm:p-4 hover:translate-y-[-1px] group transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-neutral-900 dark:text-cyber-lime truncate">
                      {rel.command}
                    </span>
                    <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-cyber-lime group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1 mt-1 font-sans">
                    {rel.title}
                  </p>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* Feedback & Corrections for this command */}
      <div className="clay-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-neutral-900 dark:text-cyber-text">
            Found an error or missing flag for <code className="font-mono text-neutral-950 dark:text-cyber-lime font-bold">{command.command}</code>?
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 font-mono">
            Submit a correction or request additional examples on GitHub.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={issueUrl}
            target="_blank"
            rel="noreferrer"
            className="clay-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-cyber-lime"
          >
            <Bug className="w-3.5 h-3.5 text-amber-500" />
            <span>Report Error</span>
          </a>

          <a
            href={featureUrl}
            target="_blank"
            rel="noreferrer"
            className="clay-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-cyber-lime"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyber-lime" />
            <span>Suggest Example</span>
          </a>
        </div>
      </div>
    </article>
  );
};
