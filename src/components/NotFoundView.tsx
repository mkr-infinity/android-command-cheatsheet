import React from 'react';
import { Terminal, Home, Bug, Search } from 'lucide-react';
import { createReportIssueUrl } from '../utils/github';

interface NotFoundViewProps {
  basePath?: string;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ basePath = '' }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const homeUrl = `${basePath}/`.replace(/\/+/g, '/');
  const reportUrl = createReportIssueUrl({
    pageUrl: currentUrl,
    command: '404 - Not Found',
  });

  return (
    <div className="py-16 md:py-24 px-4 max-w-2xl mx-auto text-center space-y-8 animate-fadeIn">
      {/* Cybercore Error Box */}
      <div className="relative inline-block p-8 rounded-2xl border border-neutral-300 dark:border-cyber-border bg-white dark:bg-cyber-surface shadow-2xl">
        {/* Hardware pins / dots */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-lime/80" />
        </div>
        <div className="text-[11px] font-mono text-neutral-400 dark:text-cyber-dim text-right mb-4">
          ERR_CODE_404_NOT_FOUND
        </div>

        {/* Large 404 Visual */}
        <div className="font-mono text-6xl md:text-8xl font-black tracking-widest text-neutral-900 dark:text-cyber-lime">
          404
        </div>
        <div className="mt-2 font-mono text-xs md:text-sm uppercase tracking-widest text-rose-500 dark:text-rose-400 font-semibold">
          [ STATUS: ROUTE_UNRESOLVED ]
        </div>

        <p className="mt-4 text-sm md:text-base text-neutral-600 dark:text-cyber-muted max-w-md mx-auto leading-relaxed">
          The requested command, document, or route does not exist in the Android Command Cheatsheet database.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
        <a
          href={homeUrl}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-semibold bg-neutral-900 text-white dark:bg-cyber-lime dark:text-cyber-black hover:opacity-90 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-cyber-lime"
        >
          <Home className="w-4 h-4" />
          <span>Go to Home</span>
        </a>

        <a
          href={reportUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-medium border border-neutral-300 dark:border-cyber-border bg-white dark:bg-cyber-surface hover:dark:bg-cyber-surfaceHover text-neutral-800 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-all focus:outline-none focus:ring-1 focus:ring-cyber-lime"
        >
          <Bug className="w-4 h-4 text-amber-500" />
          <span>Report this Issue on GitHub</span>
        </a>
      </div>

      {/* Suggested Quick Links */}
      <div className="pt-6 border-t border-neutral-200 dark:border-cyber-border/60">
        <span className="text-xs font-mono text-neutral-400 dark:text-cyber-dim block mb-3">
          Popular Reference Sections:
        </span>
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-mono">
          <a
            href={`${basePath}/adb/`.replace(/\/+/g, '/')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-cyber-border bg-neutral-50 dark:bg-cyber-dark hover:dark:bg-cyber-surface text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-colors"
          >
            ADB Commands
          </a>
          <a
            href={`${basePath}/fastboot/`.replace(/\/+/g, '/')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-cyber-border bg-neutral-50 dark:bg-cyber-dark hover:dark:bg-cyber-surface text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-colors"
          >
            Fastboot Commands
          </a>
          <a
            href={`${basePath}/learn/`.replace(/\/+/g, '/')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-cyber-border bg-neutral-50 dark:bg-cyber-dark hover:dark:bg-cyber-surface text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-colors"
          >
            Getting Started Guide
          </a>
        </div>
      </div>
    </div>
  );
};
