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
  ExternalLink,
  Unlock,
  Layers,
  BookOpen,
} from 'lucide-react';
import type { CommandItem } from '../data/types';
import { CopyButton } from './CopyButton';
import { RiskBadge } from './RiskBadge';
import { TelegramIcon } from './icons/BrandIcons';
import { isFavorite, toggleFavorite, addRecentHistory } from '../utils/storage';
import { createFeatureRequestUrl, createReportIssueUrl } from '../utils/github';
import { getCommandById } from '../data';
import { extractSyntaxTokens } from '../utils/tokenDictionary';

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

  const isUnlockRelated =
    command.tool === 'fastboot' &&
    (command.id.includes('unlock') ||
      command.id.includes('lock') ||
      command.category.toLowerCase().includes('unlock') ||
      command.tags.some((t) => t.includes('unlock') || t.includes('bootloader')));

  const isGsiOrFlashRelated =
    command.tool === 'fastboot' &&
    (command.id.includes('flash-system') ||
      command.id.includes('flashall') ||
      command.id.includes('flash-slot') ||
      command.id.includes('reboot-fastboot') ||
      command.category.toLowerCase().includes('flash') ||
      command.category.toLowerCase().includes('partition') ||
      command.tags.some((t) => t.includes('gsi') || t.includes('treble') || t.includes('system')));

  const syntaxTokens = extractSyntaxTokens(command.syntax, command.command);

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
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-bold">
          <Info className="w-4 h-4 text-cyber-lime" />
          <span>What It Does</span>
        </div>
        <div className="clay-card p-5 sm:p-6 text-sm sm:text-base leading-relaxed font-sans border-l-4 border-l-cyber-lime">
          <p className="font-medium text-neutral-900 dark:text-cyber-text leading-relaxed">
            {command.description}
          </p>
        </div>
      </section>

      {/* Syntax Block */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-bold">
            <Terminal className="w-4 h-4 text-cyber-lime" />
            <span>Command Syntax</span>
          </div>
          <CopyButton text={command.syntax} label="Copy Syntax" />
        </div>
        <div className="relative p-4 sm:p-5 rounded-2xl bg-[#0b0c10] border border-neutral-800 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.15)] overflow-x-auto">
          <div className="flex items-center gap-1.5 mb-3 pb-2.5 border-b border-neutral-800/80 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 text-[10px] font-mono uppercase text-neutral-400 tracking-widest font-semibold">Terminal</span>
          </div>
          <div className="flex items-start gap-2.5 font-mono text-sm md:text-base">
            <span className="text-cyber-lime select-none font-bold shrink-0">$</span>
            <code className="text-cyber-lime font-bold whitespace-nowrap block">
              {command.syntax}
            </code>
          </div>
        </div>
      </section>

      {/* Parameter Vocabulary & Placeholder Explanation Guide */}
      {syntaxTokens.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-bold">
            <BookOpen className="w-4 h-4 text-cyber-lime" />
            <span>Parameters &amp; Placeholders Breakdown</span>
          </div>

          <div className="clay-card p-5 sm:p-6 space-y-4">
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
              This command syntax includes specific placeholder tokens. Below is an explanation of what each word represents and concrete real-world values to replace it with:
            </p>

            <div className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
              {syntaxTokens.map((item, idx) => (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <code className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-[#0f1115] text-cyber-lime border border-neutral-800 shadow-sm">
                      {item.token}
                    </code>
                    <span className="font-mono text-xs font-bold text-neutral-900 dark:text-cyber-text">
                      {item.name}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-3 rounded-xl bg-neutral-100/80 dark:bg-[#151518] border border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 mr-2 font-sans font-medium">Real-world value:</span>
                      <strong className="text-neutral-950 dark:text-cyber-lime font-bold">{item.example}</strong>
                    </div>
                    {item.usageExample && (
                      <div className="text-[11px] text-neutral-600 dark:text-neutral-400 truncate">
                        <span className="font-sans">Command syntax: </span>
                        <code className="text-neutral-900 dark:text-neutral-200 font-semibold">{item.usageExample}</code>
                      </div>
                    )}
                  </div>

                  {item.tip && (
                    <div className="text-[11px] text-amber-700 dark:text-amber-400 font-sans italic flex items-center gap-1.5 pt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{item.tip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Examples Block */}
      {command.examples && command.examples.length > 0 && (
        <section className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-bold">
            Usage Examples
          </div>
          <div className="space-y-2.5">
            {command.examples.map((ex, idx) => (
              <div
                key={idx}
                className="clay-card flex items-center justify-between gap-3 p-3.5 sm:p-4 overflow-x-auto"
              >
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-xs font-mono text-cyber-lime select-none font-bold shrink-0">$</span>
                  <code className="text-xs sm:text-sm font-mono text-neutral-900 dark:text-cyber-text font-bold whitespace-nowrap">
                    {ex}
                  </code>
                </div>
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

      {/* Targeted Companion Guide Callout: Bootloader Unlocking */}
      {isUnlockRelated && (
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="clay-pill text-[11px] font-mono text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/30 font-bold">
                <Unlock className="w-3 h-3 inline mr-1" />
                OFFICIAL COMPANION GUIDE
              </span>
            </div>
            <h4 className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-cyber-text">
              Looking for OEM-Specific Unlock Instructions?
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans max-w-xl">
              Bootloader unlocking often requires vendor-specific steps (Xiaomi Mi Unlock account binding, OnePlus tokens, Motorola keys). Check the step-by-step master guide by <strong>@mkr-infinity</strong>:
            </p>
          </div>
          <a
            href="https://github.com/mkr-infinity/Guide-to-unlock-Bootloader"
            target="_blank"
            rel="noreferrer"
            className="clay-button shrink-0 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-neutral-900 dark:text-cyber-text hover:text-amber-700 dark:hover:text-amber-400"
          >
            <span>Open Unlock Guide</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Targeted Companion Guide Callout: GSI / System Flashing */}
      {isGsiOrFlashRelated && (
        <div className="p-4 sm:p-5 rounded-2xl border border-cyber-lime/40 bg-cyber-lime/5 dark:bg-cyber-lime/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="clay-pill text-[11px] font-mono text-cyber-lime bg-cyber-lime/10 border-cyber-lime/30 font-bold">
                <Layers className="w-3 h-3 inline mr-1" />
                OFFICIAL COMPANION GUIDE
              </span>
            </div>
            <h4 className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-cyber-text">
              Flashing Generic System Images (GSI) / Project Treble?
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans max-w-xl">
              Learn how to enter fastbootd, erase and resize logical dynamic partitions, and disable dm-verity with the complete handbook by <strong>@mkr-infinity</strong>:
            </p>
          </div>
          <a
            href="https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device"
            target="_blank"
            rel="noreferrer"
            className="clay-button shrink-0 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-neutral-900 dark:text-cyber-text hover:text-cyber-lime"
          >
            <span>Open GSI Flashing Guide</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
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

      {/* Trademark Direct Support Card with customized Telegram pre-filled message */}
      {(() => {
        const pageUrl = typeof window !== 'undefined' && window.location.href 
          ? window.location.href 
          : `https://mkr-infinity.github.io/android-command-cheatsheet/${command.tool}/${command.id}/`;
        const telegramPrefilledText = `Hey Mohammad Kaif Raja! I came from your Android Command Cheatsheet website (${pageUrl}) regarding the command: ${command.command}. Could you assist me with this?`;
        const telegramUrl = `https://t.me/mkr_infinity?text=${encodeURIComponent(telegramPrefilledText)}`;

        return (
          <div className="clay-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-l-4 border-l-cyber-lime">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyber-lime/10 text-cyber-lime border border-cyber-lime/30 shrink-0">
                <TelegramIcon className="w-5 h-5 text-[#229ED9]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-mono font-bold text-neutral-950 dark:text-cyber-text">
                  Having issue? Contact <span className="text-cyber-lime">@mkr_infinity</span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sans mt-0.5">
                  Direct technical assistance &amp; ROM flashing troubleshooting by Mohammad Kaif Raja.
                </p>
              </div>
            </div>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="clay-button-primary px-4 py-2 text-xs font-mono font-bold inline-flex items-center gap-2 shrink-0 shadow-sm"
              title="Contact @mkr_infinity on Telegram with command details"
            >
              <TelegramIcon className="w-3.5 h-3.5 text-black shrink-0" />
              <span>Contact @mkr_infinity</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        );
      })()}
    </article>
  );
};
