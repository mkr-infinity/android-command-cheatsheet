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
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Back Button & Navigation Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <a
          href={backUrl}
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-mono text-neutral-500 hover:text-neutral-900 dark:text-cyber-muted dark:hover:text-cyber-lime transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {command.tool.toUpperCase()} commands</span>
        </a>

        {/* Quick Actions: Favorite & Share */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              favorite
                ? 'border-cyber-lime/40 bg-cyber-lime/10 text-neutral-900 dark:text-cyber-lime font-semibold'
                : 'border-neutral-200 dark:border-cyber-border text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
            }`}
            title="Save to favorites"
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorite ? 'fill-cyber-lime text-cyber-lime' : ''}`} />
            <span>{favorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-cyber-border text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime hover:bg-neutral-100 dark:hover:bg-cyber-surface text-xs font-mono transition-all"
            title="Copy link to command"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyber-lime" />
                <span className="text-cyber-lime font-semibold">Link Copied</span>
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
      <div className="p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-surface shadow-sm space-y-5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-2 py-0.5 rounded text-xs font-mono uppercase bg-neutral-100 dark:bg-cyber-dark text-neutral-700 dark:text-cyber-muted border border-neutral-200 dark:border-cyber-border">
            {command.tool.toUpperCase()}
          </span>
          <span className="text-xs font-medium text-neutral-500 dark:text-cyber-muted">
            {command.category}
          </span>
          <RiskBadge risk={command.risk} />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-mono font-bold text-neutral-950 dark:text-cyber-text tracking-tight">
            {command.command}
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-cyber-muted mt-2">
            {command.title}
          </p>
        </div>

        {/* Risk Warning Callout if Caution or Destructive */}
        {command.riskExplanation && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              command.risk === 'destructive'
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-900 dark:text-rose-300'
                : 'border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-300'
            }`}
          >
            {command.risk === 'destructive' ? (
              <AlertOctagon className="w-5 h-5 shrink-0 mt-0.5 stroke-[2.5]" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 stroke-[2]" />
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

      {/* What it does */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-cyber-muted flex items-center gap-2">
          <span>What it does</span>
        </h2>
        <div className="p-5 rounded-xl border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-surface text-sm md:text-base text-neutral-800 dark:text-cyber-text leading-relaxed">
          {command.description}
        </div>
      </section>

      {/* Syntax Block */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-cyber-muted">
            Command Syntax
          </h2>
          <CopyButton text={command.syntax} label="Copy Syntax" />
        </div>
        <div className="p-4 rounded-xl bg-neutral-900 dark:bg-cyber-black border border-neutral-800 dark:border-cyber-border overflow-x-auto">
          <code className="text-sm md:text-base font-mono text-cyber-lime font-bold whitespace-nowrap block">
            {command.syntax}
          </code>
        </div>
      </section>

      {/* Examples Block */}
      {command.examples && command.examples.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-cyber-muted">
            Usage Examples
          </h2>
          <div className="space-y-2.5">
            {command.examples.map((ex, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-cyber-surface border border-neutral-200 dark:border-cyber-border overflow-x-auto"
              >
                <code className="text-xs md:text-sm font-mono text-neutral-900 dark:text-cyber-text font-semibold whitespace-nowrap">
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
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-cyber-muted">
            Options &amp; Flags
          </h2>
          <div className="rounded-xl border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-surface overflow-hidden">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-cyber-border bg-neutral-50 dark:bg-cyber-dark text-neutral-600 dark:text-cyber-muted font-mono text-xs">
                  <th className="py-2.5 px-4 font-semibold w-1/3">Flag / Argument</th>
                  <th className="py-2.5 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-cyber-border/40 font-mono">
                {command.options.map((opt, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-cyber-surfaceHover/50">
                    <td className="py-3 px-4 text-neutral-950 dark:text-cyber-lime font-bold whitespace-nowrap">
                      {opt.flag}
                    </td>
                    <td className="py-3 px-4 text-neutral-700 dark:text-cyber-muted font-sans leading-relaxed">
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
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-cyber-muted">
            Prerequisites &amp; Requirements
          </h2>
          <ul className="space-y-2 p-5 rounded-xl border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-surface text-xs md:text-sm">
            {command.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-neutral-800 dark:text-cyber-text">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime mt-2 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tags */}
      {command.tags && command.tags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-2">
          <span className="text-xs font-mono text-neutral-400 dark:text-cyber-dim mr-1">
            Tags:
          </span>
          {command.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-cyber-surface border border-neutral-200 dark:border-cyber-border text-neutral-700 dark:text-cyber-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Related Commands */}
      {relatedCommands.length > 0 && (
        <section className="space-y-3 pt-4 border-t border-neutral-200 dark:border-cyber-border">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-cyber-muted">
            Related Commands
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedCommands.map((rel) => {
              const relUrl = `${basePath}/${rel.tool}/${rel.id}/`.replace(/\/+/g, '/');
              return (
                <a
                  key={rel.id}
                  href={relUrl}
                  className="p-3.5 rounded-xl border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-surface hover:border-neutral-400 dark:hover:border-cyber-borderHover group transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-cyber-lime truncate">
                      {rel.command}
                    </span>
                    <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-cyber-dim group-hover:text-cyber-lime group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-cyber-muted line-clamp-1 mt-1 font-sans">
                    {rel.title}
                  </p>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* Feedback & Corrections for this command */}
      <div className="p-4 md:p-5 rounded-xl border border-neutral-200 dark:border-cyber-border bg-neutral-50 dark:bg-cyber-dark flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-neutral-800 dark:text-cyber-text">
            Found an error or missing flag for <code className="font-mono text-neutral-950 dark:text-cyber-lime font-bold">{command.command}</code>?
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-cyber-muted mt-0.5">
            Submit a correction or request additional examples on GitHub.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={issueUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-surface hover:dark:bg-cyber-surfaceHover text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-all"
          >
            <Bug className="w-3.5 h-3.5 text-amber-500" />
            <span>Report Error</span>
          </a>

          <a
            href={featureUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-surface hover:dark:bg-cyber-surfaceHover text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyber-lime" />
            <span>Suggest Example</span>
          </a>
        </div>
      </div>
    </article>
  );
};
