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
    <div className="sticky top-2 sm:top-3 z-30 px-3 sm:px-6 pointer-events-none">
      <header className="pointer-events-auto flex items-center justify-between h-14 sm:h-16 px-3.5 sm:px-6 rounded-2xl border border-neutral-300/80 dark:border-neutral-800/80 bg-white/85 dark:bg-[#0c0c0e]/85 backdrop-blur-xl transition-all shadow-[0_8px_30px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]">
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
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime shadow-[0_0_6px_rgb(var(--accent-lime-rgb))] animate-pulse" />
            <span>SYSTEM READY • 96 CMDS</span>
          </div>
        </div>

        {/* Center Desktop Search Trigger Bar (Premium Floating Style) */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 hover:bg-neutral-100 dark:bg-[#141416]/80 hover:dark:bg-[#1c1c1f] text-neutral-500 dark:text-neutral-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyber-lime/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] group hover:border-neutral-400 dark:hover:border-neutral-700"
          >
            <div className="flex items-center gap-2.5 text-xs font-mono">
              <span className="p-1 rounded-lg bg-cyber-lime/10 text-cyber-lime group-hover:scale-110 transition-transform">
                <Search className="w-3.5 h-3.5" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300 font-sans font-medium">Search 96 commands, flags, tools...</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px]">
              <kbd className="px-2 py-0.5 uppercase rounded-lg bg-white dark:bg-black text-neutral-800 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 shadow-sm font-bold">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
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
    </div>
  );
};
