import React from 'react';
import { PanelLeft, Search } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { GithubIcon, CoffeeIcon } from './icons/BrandIcons';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  basePath?: string;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenSearch,
  basePath = '',
  isSidebarOpen = false,
}) => {
  const logoMarkSrc = `${basePath}/assets/branding/logo-mark.svg`.replace(/\/+/g, '/');

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 border-b border-neutral-200 dark:border-cyber-border bg-white/95 dark:bg-cyber-dark/95 backdrop-blur-md transition-colors">
      {/* Left Area: Sidebar Toggle Button + Logo Mark + Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          className="flex items-center gap-1.5 p-2 rounded-lg border border-neutral-200 dark:border-cyber-border text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime hover:bg-neutral-100 dark:hover:bg-cyber-surface transition-all focus:outline-none focus:ring-1 focus:ring-cyber-lime"
          title={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          <PanelLeft className="w-4 h-4 stroke-[2]" />
          <span className="hidden sm:inline font-mono text-xs font-medium">Sidebar</span>
        </button>

        <a
          href={`${basePath}/`.replace(/\/+/g, '/')}
          className="flex items-center gap-2.5 focus:outline-none"
        >
          <img
            src={logoMarkSrc}
            alt="ACC Logo"
            className="w-7 h-7 object-contain"
          />
          <span className="font-mono text-sm font-bold text-neutral-950 dark:text-cyber-text tracking-wide hidden xs:inline">
            ANDROID <span className="text-cyber-lime">CMD</span>
          </span>
        </a>
      </div>

      {/* Center Desktop Search Trigger Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg border border-neutral-200 dark:border-cyber-border bg-neutral-50 hover:bg-neutral-100 dark:bg-cyber-surface/70 hover:dark:bg-cyber-surfaceHover text-neutral-500 dark:text-cyber-muted transition-all focus:outline-none focus:ring-1 focus:ring-cyber-lime"
        >
          <div className="flex items-center gap-2 text-xs font-mono">
            <Search className="w-3.5 h-3.5 text-cyber-lime" />
            <span>Search all commands...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] uppercase font-mono rounded bg-neutral-200 dark:bg-cyber-black text-neutral-600 dark:text-cyber-dim border border-neutral-300 dark:border-cyber-border">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Search commands"
          className="flex lg:hidden p-2 rounded-lg border border-neutral-200 dark:border-cyber-border text-neutral-600 dark:text-cyber-muted hover:bg-neutral-100 dark:hover:bg-cyber-surface"
        >
          <Search className="w-4 h-4 text-cyber-lime" />
        </button>

        <a
          href="https://buymeacoffee.com/mkr_infinity"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-neutral-200 dark:border-cyber-border bg-neutral-50 hover:bg-neutral-100 dark:bg-cyber-surface hover:dark:bg-cyber-surfaceHover text-neutral-700 dark:text-cyber-muted hover:text-neutral-900 dark:hover:text-cyber-lime transition-all"
          title="Support project on Buy Me a Coffee"
        >
          <CoffeeIcon className="w-3.5 h-3.5 text-amber-500" />
          <span>Support</span>
        </a>

        <a
          href="https://github.com/mkr-infinity/android-command-cheatsheet"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Repository"
          className="p-2 rounded-lg border border-neutral-200 dark:border-cyber-border text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime hover:bg-neutral-100 dark:hover:bg-cyber-surface transition-colors"
          title="GitHub Repository"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>
    </header>
  );
};
