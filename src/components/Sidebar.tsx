import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Terminal,
  Zap,
  BookOpen,
  User,
  ChevronDown,
  Search,
  PanelLeftClose,
  GripVertical,
} from 'lucide-react';
import { GithubIcon, CoffeeIcon } from './icons/BrandIcons';
import { adbCategories, fastbootCategories } from '../data';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath?: string;
  basePath?: string;
  onOpenSearch?: () => void;
  width?: number;
  onWidthChange?: (width: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentPath = '/',
  basePath = '',
  onOpenSearch,
  width = 260,
  onWidthChange,
}) => {
  const [adbOpen, setAdbOpen] = useState(true);
  const [fastbootOpen, setFastbootOpen] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  const cleanPath = currentPath.replace(/\/+$/, '') || '/';

  const isNavActive = (target: string) => {
    const normTarget = target.replace(/\/+$/, '') || '/';
    if (normTarget === '/' && cleanPath === '/') return true;
    if (normTarget !== '/' && cleanPath.startsWith(normTarget)) return true;
    return false;
  };

  const logoFullSrc = `${basePath}/assets/branding/logo.svg`.replace(/\/+/g, '/');

  // Drag resize handler for desktop
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Clamp width between 200px and 420px
      const newWidth = Math.min(Math.max(e.clientX, 200), 420);
      onWidthChange?.(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, onWidthChange]);

  const navContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-white dark:bg-cyber-dark">
      {/* Sidebar Header with Brand Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-cyber-border bg-neutral-50/60 dark:bg-cyber-surface/40 shrink-0">
        <a
          href={`${basePath}/`.replace(/\/+/g, '/')}
          className="flex items-center gap-2 overflow-hidden focus:outline-none"
          title="Android Command Cheatsheet"
          onClick={() => isMobile && onClose()}
        >
          <img
            src={logoFullSrc}
            alt="Android Command Cheatsheet"
            className="h-7 max-w-[170px] object-contain"
          />
        </a>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Hide sidebar"
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-200 dark:border-cyber-border text-neutral-500 dark:text-cyber-muted hover:text-neutral-900 dark:hover:text-cyber-lime hover:bg-neutral-100 dark:hover:bg-cyber-surface transition-colors"
          title="Hide sidebar"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Search Trigger */}
      <div className="p-3 border-b border-neutral-100 dark:border-cyber-border/40 shrink-0">
        <button
          type="button"
          onClick={() => {
            if (isMobile) onClose();
            onOpenSearch?.();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-neutral-200 dark:border-cyber-border bg-neutral-50 hover:bg-neutral-100 dark:bg-cyber-surface dark:hover:bg-cyber-surfaceHover text-neutral-600 dark:text-cyber-muted text-xs font-mono transition-all group focus:outline-none focus:ring-1 focus:ring-cyber-lime"
          title="Search commands (Ctrl+K or /)"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-cyber-lime group-hover:scale-110 transition-transform" />
            <span>Search commands...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] uppercase font-mono rounded bg-neutral-200 dark:bg-cyber-black text-neutral-600 dark:text-cyber-dim border border-neutral-300 dark:border-cyber-border">
            /
          </kbd>
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        <nav className="space-y-1.5">
          {/* 1. Home Section with Home Icon */}
          <a
            href={`${basePath}/`.replace(/\/+/g, '/')}
            onClick={() => isMobile && onClose()}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              isNavActive('/') &&
              !isNavActive('/adb') &&
              !isNavActive('/fastboot') &&
              !isNavActive('/learn') &&
              !isNavActive('/about')
                ? 'bg-neutral-100 dark:bg-cyber-surface text-neutral-950 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold shadow-sm'
                : 'text-neutral-600 dark:text-cyber-muted hover:bg-neutral-50 dark:hover:bg-cyber-surfaceHover hover:text-neutral-950 dark:hover:text-cyber-text'
            }`}
          >
            <Home className="w-4 h-4 text-cyber-lime shrink-0" />
            <span>Home</span>
          </a>

          {/* 2. ADB Section with Terminal Icon */}
          <div className="rounded-xl border border-neutral-200/70 dark:border-cyber-border/60 p-1.5 bg-neutral-50/40 dark:bg-cyber-surface/20">
            <div className="flex items-center justify-between">
              <a
                href={`${basePath}/adb/`.replace(/\/+/g, '/')}
                onClick={() => isMobile && onClose()}
                className={`flex-1 flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  isNavActive('/adb')
                    ? 'bg-neutral-200/80 dark:bg-cyber-surface text-neutral-950 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold'
                    : 'text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
                }`}
              >
                <Terminal className="w-4 h-4 text-cyber-lime shrink-0" />
                <span className="font-mono font-bold tracking-wide">ADB</span>
              </a>

              <button
                type="button"
                onClick={() => setAdbOpen(!adbOpen)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:text-cyber-dim dark:hover:text-cyber-muted"
                aria-label="Toggle ADB categories"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
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
                    onClick={() => isMobile && onClose()}
                    className="block px-2 py-1 text-xs text-neutral-500 dark:text-cyber-muted hover:text-neutral-900 dark:hover:text-cyber-lime hover:translate-x-0.5 transition-all truncate"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 3. Fastboot Section with Zap Icon */}
          <div className="rounded-xl border border-neutral-200/70 dark:border-cyber-border/60 p-1.5 bg-neutral-50/40 dark:bg-cyber-surface/20">
            <div className="flex items-center justify-between">
              <a
                href={`${basePath}/fastboot/`.replace(/\/+/g, '/')}
                onClick={() => isMobile && onClose()}
                className={`flex-1 flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  isNavActive('/fastboot')
                    ? 'bg-neutral-200/80 dark:bg-cyber-surface text-neutral-950 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold'
                    : 'text-neutral-700 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-text'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono font-bold tracking-wide">FASTBOOT</span>
              </a>

              <button
                type="button"
                onClick={() => setFastbootOpen(!fastbootOpen)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:text-cyber-dim dark:hover:text-cyber-muted"
                aria-label="Toggle Fastboot categories"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
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
                    onClick={() => isMobile && onClose()}
                    className="block px-2 py-1 text-xs text-neutral-500 dark:text-cyber-muted hover:text-neutral-900 dark:hover:text-cyber-lime hover:translate-x-0.5 transition-all truncate"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 4. Learn Section with BookOpen Icon */}
          <a
            href={`${basePath}/learn/`.replace(/\/+/g, '/')}
            onClick={() => isMobile && onClose()}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              isNavActive('/learn')
                ? 'bg-neutral-100 dark:bg-cyber-surface text-neutral-950 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold shadow-sm'
                : 'text-neutral-600 dark:text-cyber-muted hover:bg-neutral-50 dark:hover:bg-cyber-surfaceHover hover:text-neutral-950 dark:hover:text-cyber-text'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyber-lime shrink-0" />
            <span>Learn</span>
          </a>

          {/* 5. About Section with User Icon */}
          <a
            href={`${basePath}/about/`.replace(/\/+/g, '/')}
            onClick={() => isMobile && onClose()}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              isNavActive('/about')
                ? 'bg-neutral-100 dark:bg-cyber-surface text-neutral-950 dark:text-cyber-lime border-l-2 border-cyber-lime font-semibold shadow-sm'
                : 'text-neutral-600 dark:text-cyber-muted hover:bg-neutral-50 dark:hover:bg-cyber-surfaceHover hover:text-neutral-950 dark:hover:text-cyber-text'
            }`}
          >
            <User className="w-4 h-4 text-neutral-500 dark:text-cyber-muted shrink-0" />
            <span>About</span>
          </a>
        </nav>
      </div>

      {/* Sidebar Footer Link with Sponsor Text */}
      <div className="p-3 border-t border-neutral-200 dark:border-cyber-border text-xs text-neutral-500 dark:text-cyber-dim bg-neutral-50/60 dark:bg-cyber-surface/40 flex items-center justify-between shrink-0">
        <a
          href="https://buymeacoffee.com/mkr_infinity"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-950 dark:text-cyber-muted dark:hover:text-cyber-lime font-mono text-xs font-semibold transition-colors"
        >
          <CoffeeIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Sponsor</span>
        </a>

        <a
          href="https://github.com/mkr-infinity/android-command-cheatsheet"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-500 dark:text-cyber-muted hover:text-neutral-950 dark:hover:text-cyber-lime transition-colors"
          title="GitHub Repository"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* ======================================================== */}
      {/* 1. MOBILE DRAWER UI (< md)                                */}
      {/* ======================================================== */}
      <div className="md:hidden">
        {/* Backdrop overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Mobile Slide-in Drawer */}
        <aside
          className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] flex flex-col border-r border-neutral-200 dark:border-cyber-border shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {navContent(true)}
        </aside>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP IN-FLOW RESIZABLE SIDEBAR (>= md)              */}
      {/* ======================================================== */}
      <aside
        style={{
          width: isOpen ? `${width}px` : '0px',
        }}
        className={`hidden md:flex flex-col border-r border-neutral-200 dark:border-cyber-border shrink-0 sticky top-16 h-[calc(100vh-4rem)] select-none transition-[width] duration-200 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 overflow-hidden pointer-events-none border-r-0'
        }`}
      >
        <div className="w-full h-full overflow-hidden flex flex-col" style={{ width: `${width}px` }}>
          {navContent(false)}
        </div>
      </aside>

      {/* Desktop Resizable Drag Handle */}
      {isOpen && (
        <div
          ref={resizeHandleRef}
          onMouseDown={() => setIsResizing(true)}
          className={`hidden md:flex items-center justify-center w-1.5 hover:w-2 -ml-1 z-20 cursor-col-resize select-none group transition-all shrink-0 ${
            isResizing ? 'w-2 bg-cyber-lime' : 'bg-transparent hover:bg-cyber-lime/50'
          }`}
          title="Drag to resize sidebar width"
        >
          <div className="w-0.5 h-8 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-900 dark:group-hover:bg-cyber-lime transition-colors" />
        </div>
      )}
    </>
  );
};
