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
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md transition-colors shadow-sm">
      {/* Left Area: Sidebar Toggle Button + Logo Mark + Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all select-none active:translate-y-0.5 border ${
            isSidebarOpen
              ? 'border-cyber-lime/40 bg-cyber-lime/15 text-neutral-950 dark:text-cyber-lime shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
              : 'clay-button text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-cyber-lime'
          }`}
          title={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          <PanelLeft className="w-4 h-4 stroke-[2]" />
          <span className="hidden sm:inline">Sidebar</span>
        </button>

        <a
          href={`${basePath}/`.replace(/\/+/g, '/')}
          className="flex items-center gap-2.5 focus:outline-none group"
        >
          <div className="p-1 rounded-xl bg-neutral-100 dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-700 shadow-sm group-hover:scale-105 transition-transform">
            <img
              src={logoMarkSrc}
              alt="ACC Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="font-mono text-sm font-bold text-neutral-950 dark:text-cyber-text tracking-wide hidden xs:inline">
            ANDROID <span className="text-cyber-lime">CMD</span>
          </span>
        </a>

        {/* Live System Indicator on Desktop */}
        <div className="hidden xl:flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-neutral-100 dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime shadow-[0_0_6px_#E2F952] animate-pulse" />
          <span>v2.0 • 96 CMDS</span>
        </div>
      </div>

      {/* Center Desktop Search Trigger Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 hover:bg-neutral-100 dark:bg-[#121214] hover:dark:bg-[#18181b] text-neutral-500 dark:text-neutral-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyber-lime/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] group"
        >
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <Search className="w-3.5 h-3.5 text-cyber-lime group-hover:scale-110 transition-transform" />
            <span className="text-neutral-600 dark:text-neutral-300 font-sans">Quick search commands, flags, tools...</span>
          </div>
          <kbd className="px-2 py-0.5 text-[10px] uppercase font-mono rounded-lg bg-neutral-200 dark:bg-black text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 shadow-sm">
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
          className="clay-button flex lg:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-cyber-lime"
        >
          <Search className="w-4 h-4 text-cyber-lime" />
        </button>

        {/* 3D Tactile Sponsor Button */}
        <a
          href="https://buymeacoffee.com/mkr_infinity"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[#FFDD00] text-black border-2 border-neutral-950 shadow-[0_3px_0_#000] hover:bg-[#FACC15] active:translate-y-0.5 active:shadow-none transition-all select-none"
          title="Sponsor project on Buy Me a Coffee"
        >
          <CoffeeIcon className="w-3.5 h-3.5 text-black shrink-0" />
          <span>Sponsor</span>
        </a>

        {/* GitHub Link */}
        <a
          href="https://github.com/mkr-infinity/android-command-cheatsheet"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Repository"
          className="clay-button p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-cyber-lime"
          title="GitHub Repository"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        {/* Unique Theme Switcher */}
        <ThemeSwitcher />
      </div>
    </header>
  );
};
