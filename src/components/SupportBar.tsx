import React, { useState, useEffect } from 'react';
import { X, Sparkles, Bug } from 'lucide-react';
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
      aria-label="Feedback and support"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-30 p-3.5 sm:p-4 rounded-xl border border-neutral-300 dark:border-cyber-border bg-white/95 dark:bg-cyber-surface/95 backdrop-blur-md shadow-xl flex items-center justify-between gap-4 transition-all duration-300 animate-slideUp"
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-cyber-text truncate">
          Have an idea or found something wrong?
        </p>
        <p className="text-[11px] text-neutral-500 dark:text-cyber-muted hidden sm:block mt-0.5">
          Help improve the Android Command Cheatsheet.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href={featureUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-neutral-200 dark:border-cyber-border bg-neutral-50 hover:bg-neutral-100 dark:bg-cyber-dark hover:dark:bg-cyber-surfaceHover text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyber-lime shrink-0" />
          <span className="hidden sm:inline">Request a Feature</span>
          <span className="sm:hidden">Feature</span>
        </a>

        <a
          href={issueUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-neutral-200 dark:border-cyber-border bg-neutral-50 hover:bg-neutral-100 dark:bg-cyber-dark hover:dark:bg-cyber-surfaceHover text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-all"
        >
          <Bug className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="hidden sm:inline">Report an Issue</span>
          <span className="sm:hidden">Issue</span>
        </a>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close support bar"
          className="p-1.5 rounded-lg border border-transparent hover:border-neutral-200 dark:hover:border-cyber-border text-neutral-400 hover:text-neutral-600 dark:text-cyber-dim dark:hover:text-cyber-text transition-colors"
          title="Dismiss for this session"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
