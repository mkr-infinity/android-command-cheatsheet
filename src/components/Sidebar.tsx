import React, { useState } from 'react';
import {
  ChevronDown,
  Search,
  PanelLeftClose,
  Bookmark,
} from 'lucide-react';
import { GithubIcon, CoffeeIcon } from './icons/BrandIcons';
import { adbCategories, fastbootCategories } from '../data';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath?: string;
  basePath?: string;
  onOpenSearch?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentPath = '/',
  basePath = '',
  onOpenSearch,
}) => {
  const [adbOpen, setAdbOpen] = useState(true);
  const [fastbootOpen, setFastbootOpen] = useState(true);

  const cleanPath = currentPath.replace(/\/+$/, '') || '/';

  const isNavActive = (target: string) => {
    const normTarget = target.replace(/\/+$/, '') || '/';
    if (normTarget === '/' && cleanPath === '/') return true;
    if (normTarget !== '/' && cleanPath.startsWith(normTarget)) return true;
    return false;
  };

  const logoMarkSrc = `${basePath}/assets/branding/logo-mark.svg`.replace(/\/+/g, '/');
  const logoFullSrc = `${basePath}/assets/branding/logo.svg`.replace(/\/+/g, '/');

  return (
    <>
      {/* Backdrop overlay when sidebar is open */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Drawer: Completely hides off-screen when closed */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 flex flex-col border-r border-neutral-200 dark:border-cyber-border bg-white dark:bg-cyber-dark shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header with Brand Logo & Close Button */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-cyber-border bg-neutral-50/50 dark:bg-cyber-surface/40">
          <a
            href={`${basePath}/`.replace(/\/+/g, '/')}
            className="flex items-center gap-3 overflow-hidden focus:outline-none"
            title="Android Command Cheatsheet"
          >
            <img
              src={logoFullSrc}
              alt="Android Command Cheatsheet"
              className="h-8 max-w-[190px] object-contain"
            />
          </a>

          {/* Close Sidebar Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-200 dark:border-cyber-border text-neutral-500 dark:text-cyber-muted hover:text-neutral-900 dark:hover:text-cyber-lime hover:bg-neutral-100 dark:hover:bg-cyber-surface transition-colors"
            title="Hide sidebar"
          >
            <PanelLeftClose className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Quick Search Button */}
        <div className="p-3 border-b border-neutral-100 dark:border-cyber-border/40">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch?.();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-neutral-200 dark:border-cyber-border bg-neutral-50 hover:bg-neutral-100 dark:bg-cyber-surface dark:hover:bg-cyber-surfaceHover text-neutral-600 dark:text-cyber-muted text-xs font-mono transition-all group focus:outline-none focus:ring-1 focus:ring-cyber-lime"
            title="Search commands (Ctrl+K or /)"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-neutral-400 dark:text-cyber-lime group-hover:scale-110 transition-transform" />
              <span>Search commands...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] uppercase font-mono rounded bg-neutral-200 dark:bg-cyber-black text-neutral-500 dark:text-cyber-dim border border-neutral-300 dark:border-cyber-border">
              /
            </kbd>
          </button>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          <nav className="space-y-1.5">
            {/* 1. Home Section with Logo Mark */}
            <a
              href={`${basePath}/`.replace(/\/+/g, '/')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                isNavActive('/') &&
                !isNavActive('/adb') &&
                !isNavActive('/fastboot') &&
                !isNavActive('/learn') &&
                !isNavActive('/about')
                  ? 'bg-neutral-100 dark:bg-cyber-surface text-neutral-900 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold'
                  : 'text-neutral-600 dark:text-cyber-muted hover:bg-neutral-50 dark:hover:bg-cyber-surfaceHover hover:text-neutral-900 dark:hover:text-cyber-text'
              }`}
              title="Home Cheatsheet"
            >
              <img
                src={logoMarkSrc}
                alt="Logo"
                className="w-4 h-4 shrink-0 rounded object-contain"
              />
              <span>Home</span>
            </a>

            {/* 2. ADB Section with Logo Mark */}
            <div className="rounded-lg border border-neutral-200/60 dark:border-cyber-border/60 p-1.5 bg-neutral-50/50 dark:bg-cyber-surface/30">
              <div className="flex items-center justify-between">
                <a
                  href={`${basePath}/adb/`.replace(/\/+/g, '/')}
                  className={`flex-1 flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${
                    isNavActive('/adb')
                      ? 'bg-neutral-200/70 dark:bg-cyber-surface text-neutral-900 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold'
                      : 'text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
                  }`}
                  title="ADB Commands"
                >
                  <img
                    src={logoMarkSrc}
                    alt="Logo"
                    className="w-4 h-4 shrink-0 rounded object-contain"
                  />
                  <span className="font-mono font-bold tracking-wide">ADB</span>
                </a>

                <button
                  type="button"
                  onClick={() => setAdbOpen(!adbOpen)}
                  className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:text-cyber-dim dark:hover:text-cyber-muted"
                  aria-label="Toggle ADB categories"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      adbOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {adbOpen && (
                <div className="mt-1 ml-3 pl-2.5 border-l border-neutral-200 dark:border-cyber-border space-y-0.5">
                  {adbCategories.slice(1).map((cat) => (
                    <a
                      key={cat}
                      href={`${basePath}/adb/?category=${encodeURIComponent(cat)}`.replace(/\/+/g, '/')}
                      className="block px-2 py-1 text-xs text-neutral-500 dark:text-cyber-muted hover:text-neutral-900 dark:hover:text-cyber-lime hover:translate-x-0.5 transition-all truncate"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Fastboot Section with Logo Mark */}
            <div className="rounded-lg border border-neutral-200/60 dark:border-cyber-border/60 p-1.5 bg-neutral-50/50 dark:bg-cyber-surface/30">
              <div className="flex items-center justify-between">
                <a
                  href={`${basePath}/fastboot/`.replace(/\/+/g, '/')}
                  className={`flex-1 flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${
                    isNavActive('/fastboot')
                      ? 'bg-neutral-200/70 dark:bg-cyber-surface text-neutral-900 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold'
                      : 'text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
                  }`}
                  title="Fastboot Commands"
                >
                  <img
                    src={logoMarkSrc}
                    alt="Logo"
                    className="w-4 h-4 shrink-0 rounded object-contain"
                  />
                  <span className="font-mono font-bold tracking-wide">FASTBOOT</span>
                </a>

                <button
                  type="button"
                  onClick={() => setFastbootOpen(!fastbootOpen)}
                  className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:text-cyber-dim dark:hover:text-cyber-muted"
                  aria-label="Toggle Fastboot categories"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      fastbootOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {fastbootOpen && (
                <div className="mt-1 ml-3 pl-2.5 border-l border-neutral-200 dark:border-cyber-border space-y-0.5">
                  {fastbootCategories.slice(1).map((cat) => (
                    <a
                      key={cat}
                      href={`${basePath}/fastboot/?category=${encodeURIComponent(cat)}`.replace(/\/+/g, '/')}
                      className="block px-2 py-1 text-xs text-neutral-500 dark:text-cyber-muted hover:text-neutral-900 dark:hover:text-cyber-lime hover:translate-x-0.5 transition-all truncate"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Learn Section with Logo Mark */}
            <a
              href={`${basePath}/learn/`.replace(/\/+/g, '/')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                isNavActive('/learn')
                  ? 'bg-neutral-100 dark:bg-cyber-surface text-neutral-900 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold'
                  : 'text-neutral-600 dark:text-cyber-muted hover:bg-neutral-50 dark:hover:bg-cyber-surfaceHover hover:text-neutral-900 dark:hover:text-cyber-text'
              }`}
              title="Learn Guides"
            >
              <img
                src={logoMarkSrc}
                alt="Logo"
                className="w-4 h-4 shrink-0 rounded object-contain"
              />
              <span>Learn</span>
            </a>

            {/* 5. About Section with Logo Mark */}
            <a
              href={`${basePath}/about/`.replace(/\/+/g, '/')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                isNavActive('/about')
                  ? 'bg-neutral-100 dark:bg-cyber-surface text-neutral-900 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold'
                  : 'text-neutral-600 dark:text-cyber-muted hover:bg-neutral-50 dark:hover:bg-cyber-surfaceHover hover:text-neutral-900 dark:hover:text-cyber-text'
              }`}
              title="About Project"
            >
              <img
                src={logoMarkSrc}
                alt="Logo"
                className="w-4 h-4 shrink-0 rounded object-contain"
              />
              <span>About</span>
            </a>
          </nav>
        </div>

        {/* Sidebar Footer Link / Support */}
        <div className="p-3 border-t border-neutral-200 dark:border-cyber-border text-xs text-neutral-500 dark:text-cyber-dim bg-neutral-50/50 dark:bg-cyber-surface/40 flex items-center justify-between">
          <a
            href="https://buymeacoffee.com/mkr_infinity"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 dark:text-cyber-muted dark:hover:text-cyber-lime font-mono text-[11px] transition-colors"
          >
            <CoffeeIcon className="w-3.5 h-3.5 text-amber-500" />
            <span>Buy Me a Coffee</span>
          </a>

          <a
            href="https://github.com/mkr-infinity/android-command-cheatsheet"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-500 dark:text-cyber-muted hover:text-neutral-900 dark:hover:text-cyber-lime transition-colors"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </aside>
    </>
  );
};
