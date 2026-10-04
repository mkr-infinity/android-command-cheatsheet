import React from 'react';
import { GithubIcon, CoffeeIcon } from './icons/BrandIcons';

interface FooterProps {
  basePath?: string;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="border-t border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-dark py-4 px-4 sm:px-8 text-xs font-mono text-neutral-500 dark:text-cyber-muted transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="w-2 h-2 rounded-full bg-cyber-lime inline-block" />
          <span className="font-semibold text-neutral-800 dark:text-cyber-text">
            Android Command Cheatsheet
          </span>
          <span className="text-neutral-300 dark:text-cyber-border hidden sm:inline">•</span>
          <span className="text-neutral-500 dark:text-cyber-dim">
            ADB &amp; Fastboot Reference
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-neutral-500 dark:text-cyber-muted">
          <span>Last updated: October 2024</span>
          <span className="text-neutral-300 dark:text-cyber-border">•</span>
          <a
            href="https://buymeacoffee.com/mkr_infinity"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-colors"
          >
            <CoffeeIcon className="w-3.5 h-3.5 text-amber-500" />
            <span>Sponsor</span>
          </a>
          <span className="text-neutral-300 dark:text-cyber-border">•</span>
          <a
            href="https://github.com/mkr-infinity/android-command-cheatsheet"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
