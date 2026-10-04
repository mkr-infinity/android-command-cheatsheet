import React from 'react';
import { Sparkles, Bug } from 'lucide-react';
import { createFeatureRequestUrl, createReportIssueUrl } from '../utils/github';

interface FooterProps {
  basePath?: string;
}

export const Footer: React.FC<FooterProps> = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const featureUrl = createFeatureRequestUrl({ pageUrl: currentUrl });
  const issueUrl = createReportIssueUrl({ pageUrl: currentUrl });

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-cyber-dark py-4 px-4 sm:px-8 text-xs font-mono text-neutral-600 dark:text-neutral-400 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Left Side: Brand name and status */}
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
          <span className="w-2 h-2 rounded-full bg-cyber-lime inline-block shadow-[0_0_8px_#E2F952]" />
          <span className="font-bold text-neutral-900 dark:text-cyber-text">
            Android Command Cheatsheet
          </span>
          <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">•</span>
          <span className="text-neutral-500 dark:text-neutral-500">
            ADB &amp; Fastboot Reference
          </span>
          <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">•</span>
          <a
            href="https://t.me/mkr_infinity"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-800 dark:text-cyber-lime hover:underline font-bold inline-flex items-center gap-1"
            title="Contact @mkr_infinity on Telegram"
          >
            <span>Having issue? Contact @mkr_infinity</span>
          </a>
        </div>

        {/* Right Side: Last updated 4th October 2026 + Request Feature & Report Issue Buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end text-[11px]">
          <span className="text-neutral-500 dark:text-neutral-400">
            Last updated: 4th October 2026
          </span>
          <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">•</span>

          <a
            href={featureUrl}
            target="_blank"
            rel="noreferrer"
            className="clay-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-cyber-lime"
            title="Request a feature on GitHub"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyber-lime shrink-0" />
            <span>Request a Feature</span>
          </a>

          <a
            href={issueUrl}
            target="_blank"
            rel="noreferrer"
            className="clay-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-amber-400"
            title="Report an issue on GitHub"
          >
            <Bug className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Report an Issue</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
