import React, { useState, useEffect } from 'react';
import { X, Sparkles, Bug } from 'lucide-react';
import { CoffeeIcon } from './icons/BrandIcons';
import { isSupportBarHidden, setSupportBarHidden } from '../utils/storage';
import { createFeatureRequestUrl, createReportIssueUrl } from '../utils/github';

interface SupportBarProps {
  command?: string;
}

export const SupportBar: React.FC<SupportBarProps> = ({ command }) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isSupportBarHidden()) {
      setVisible(true);
    }

    const handleHide = () => setVisible(false);
    window.addEventListener('acc_support_bar_hidden', handleHide);
    return () => window.removeEventListener('acc_support_bar_hidden', handleHide);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setSupportBarHidden();
  };

  if (!mounted || !visible) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const featureUrl = createFeatureRequestUrl({ pageUrl: currentUrl, command });
  const issueUrl = createReportIssueUrl({ pageUrl: currentUrl, command });

  return (
    <aside
      aria-label="Community & Sponsor Bar"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-30 p-3 sm:p-3.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-md shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-between gap-3 transition-all duration-300 animate-slideUp"
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-neutral-900 dark:text-cyber-text truncate">
          Enjoying Android Command Cheatsheet?
        </p>
        <p className="text-[11px] text-neutral-500 dark:text-cyber-muted hidden sm:block mt-0.5 font-mono">
          Community-driven technical documentation.
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <a
          href="https://buymeacoffee.com/mkr_infinity"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#FFDD00] text-black hover:bg-[#FACC15] transition-all shadow-sm active:translate-y-0.5"
          title="Sponsor this project"
        >
          <CoffeeIcon className="w-3.5 h-3.5 text-black shrink-0" />
          <span>Sponsor</span>
        </a>

        <a
          href={featureUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono border border-neutral-200 dark:border-neutral-700 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 hover:dark:bg-neutral-700 text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-all active:translate-y-0.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyber-lime shrink-0" />
          <span className="hidden sm:inline">Feature</span>
        </a>

        <a
          href={issueUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono border border-neutral-200 dark:border-neutral-700 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 hover:dark:bg-neutral-700 text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-all active:translate-y-0.5"
        >
          <Bug className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="hidden sm:inline">Issue</span>
        </a>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close sponsor bar"
          className="p-1.5 rounded-lg border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 text-neutral-400 hover:text-neutral-600 dark:text-cyber-dim dark:hover:text-cyber-text transition-colors"
          title="Dismiss for this session"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
