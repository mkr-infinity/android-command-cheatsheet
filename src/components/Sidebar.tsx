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
  Cable,
  Package,
  FolderSync,
  TerminalSquare,
  Bug,
  FileText,
  Camera,
  RotateCw,
  ShieldCheck,
  Network,
  Sliders,
  Flame,
  Info,
  Cpu,
  Layers,
  HardDriveDownload,
  Trash2,
  Unlock,
  PlaySquare,
  ExternalLink,
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
  width = 270,
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
      const newWidth = Math.min(Math.max(e.clientX, 210), 440);
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

  const getAdbCategoryIcon = (category: string) => {
    switch (category) {
      case 'Device & Connection':
        return <Cable className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'App Management':
        return <Package className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'Files & Storage':
        return <FolderSync className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'Shell':
        return <TerminalSquare className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'Debugging':
        return <Bug className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'Logs':
        return <FileText className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'Screenshots & Recording':
        return <Camera className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'Reboot & Recovery':
        return <RotateCw className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'Permissions':
        return <ShieldCheck className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'Network':
        return <Network className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'System':
        return <Sliders className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      case 'Advanced':
        return <Flame className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
      default:
        return <Terminal className="w-3.5 h-3.5 text-cyber-lime shrink-0" />;
    }
  };

  const getFastbootCategoryIcon = (category: string) => {
    switch (category) {
      case 'Device Detection':
        return <Search className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      case 'Device Information':
        return <Info className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      case 'Reboot':
        return <RotateCw className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      case 'Bootloader':
        return <Cpu className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      case 'Partitions':
        return <Layers className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      case 'Flashing':
        return <HardDriveDownload className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      case 'Erasing':
        return <Trash2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      case 'Unlock/Lock':
        return <Unlock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      case 'Boot Images':
        return <PlaySquare className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      case 'Advanced':
        return <Flame className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
      default:
        return <Zap className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />;
    }
  };

  const navContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-white dark:bg-[#0c0c0e]">
      {/* Sidebar Header with Brand Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#121214]/60 shrink-0">
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
          className="flex items-center justify-center w-8 h-8 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-cyber-lime hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Hide sidebar"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Search Trigger */}
      <div className="p-3 border-b border-neutral-100 dark:border-neutral-800/60 shrink-0">
        <button
          type="button"
          onClick={() => {
            if (isMobile) onClose();
            onOpenSearch?.();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-mono transition-all group focus:outline-none focus:ring-1 focus:ring-cyber-lime"
          title="Search commands (Ctrl+K or /)"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-cyber-lime group-hover:scale-110 transition-transform" />
            <span>Search commands...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] uppercase font-mono rounded bg-neutral-200 dark:bg-black text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800">
            /
          </kbd>
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
        <nav className="space-y-2">
          {/* 1. Home Section */}
          <a
            href={`${basePath}/`.replace(/\/+/g, '/')}
            onClick={() => isMobile && onClose()}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              isNavActive('/') &&
              !cleanPath.startsWith('/learn') &&
              !cleanPath.startsWith('/adb') &&
              !cleanPath.startsWith('/fastboot') &&
              !cleanPath.startsWith('/about')
                ? 'bg-neutral-100 dark:bg-[#18181b] text-neutral-950 dark:text-cyber-lime border-l-2 border-cyber-lime font-bold shadow-sm'
                : 'text-neutral-700 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-neutral-200'
            }`}
          >
            <Home className="w-4 h-4 text-cyber-lime shrink-0" />
            <span>Home Cheatsheet</span>
          </a>

          {/* 2. DEDICATED SECTION: What is ADB? */}
          <a
            href={`${basePath}/learn/adb/`.replace(/\/+/g, '/')}
            onClick={() => isMobile && onClose()}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs md:text-sm transition-all border ${
              cleanPath.startsWith('/learn/adb')
                ? 'bg-cyber-lime/15 text-neutral-950 dark:text-cyber-lime border-cyber-lime/40 font-bold shadow-sm border-l-2'
                : 'border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#121214] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-cyber-lime hover:border-cyber-lime/30'
            }`}
            title="What is ADB? Architecture, installation and setup guide"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-cyber-lime shrink-0" />
              <span className="font-semibold">What is ADB?</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyber-lime/10 text-neutral-900 dark:text-cyber-lime border border-cyber-lime/20">
              GUIDE
            </span>
          </a>

          {/* 3. DEDICATED SECTION: ADB Commands (Expandable with category icons) */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-2 bg-neutral-50/60 dark:bg-[#121214]/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <a
                href={`${basePath}/adb/`.replace(/\/+/g, '/')}
                onClick={() => isMobile && onClose()}
                className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs md:text-sm font-bold font-mono tracking-wide transition-all ${
                  cleanPath.startsWith('/adb')
                    ? 'bg-neutral-200/80 dark:bg-[#1c1c20] text-neutral-950 dark:text-cyber-lime border-l-2 border-cyber-lime'
                    : 'text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-cyber-lime'
                }`}
              >
                <Terminal className="w-4 h-4 text-cyber-lime shrink-0" />
                <span>ADB COMMANDS</span>
              </a>

              <button
                type="button"
                onClick={() => setAdbOpen(!adbOpen)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
                aria-label="Toggle ADB subtopics"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    adbOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {adbOpen && (
              <div className="ml-1 pl-2 border-l border-neutral-200 dark:border-neutral-800 space-y-0.5 pt-1">
                {adbCategories.slice(1).map((cat) => (
                  <a
                    key={cat}
                    href={`${basePath}/adb/?category=${encodeURIComponent(cat)}`.replace(/\/+/g, '/')}
                    onClick={() => isMobile && onClose()}
                    className="flex items-center gap-2 px-2 py-1 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-cyber-lime hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 rounded-md transition-all group truncate"
                  >
                    {getAdbCategoryIcon(cat)}
                    <span className="truncate">{cat}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 4. DEDICATED SECTION: What is Fastboot? */}
          <a
            href={`${basePath}/learn/fastboot/`.replace(/\/+/g, '/')}
            onClick={() => isMobile && onClose()}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs md:text-sm transition-all border ${
              cleanPath.startsWith('/learn/fastboot')
                ? 'bg-amber-500/15 text-neutral-950 dark:text-amber-400 border-amber-500/40 font-bold shadow-sm border-l-2'
                : 'border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#121214] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-amber-400 hover:border-amber-500/30'
            }`}
            title="What is Fastboot? Protocol, partition structure, and flashing guide"
          >
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-semibold">What is Fastboot?</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              GUIDE
            </span>
          </a>

          {/* 5. DEDICATED SECTION: Fastboot Commands (Expandable with category icons) */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-2 bg-neutral-50/60 dark:bg-[#121214]/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <a
                href={`${basePath}/fastboot/`.replace(/\/+/g, '/')}
                onClick={() => isMobile && onClose()}
                className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs md:text-sm font-bold font-mono tracking-wide transition-all ${
                  cleanPath.startsWith('/fastboot')
                    ? 'bg-neutral-200/80 dark:bg-[#1c1c20] text-neutral-950 dark:text-amber-400 border-l-2 border-amber-500'
                    : 'text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-amber-400'
                }`}
              >
                <Cpu className="w-4 h-4 text-amber-500 shrink-0" />
                <span>FASTBOOT COMMANDS</span>
              </a>

              <button
                type="button"
                onClick={() => setFastbootOpen(!fastbootOpen)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
                aria-label="Toggle Fastboot subtopics"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    fastbootOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {fastbootOpen && (
              <div className="ml-1 pl-2 border-l border-neutral-200 dark:border-neutral-800 space-y-0.5 pt-1">
                {fastbootCategories.slice(1).map((cat) => (
                  <a
                    key={cat}
                    href={`${basePath}/fastboot/?category=${encodeURIComponent(cat)}`.replace(/\/+/g, '/')}
                    onClick={() => isMobile && onClose()}
                    className="flex items-center gap-2 px-2 py-1 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-amber-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 rounded-md transition-all group truncate"
                  >
                    {getFastbootCategoryIcon(cat)}
                    <span className="truncate">{cat}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Official Companion Guides */}
          <div className="pt-2 pb-1">
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-bold">
              Companion Guides
            </div>
            <div className="space-y-0.5 mt-0.5">
              <a
                href="https://github.com/mkr-infinity/Guide-to-unlock-Bootloader"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-all group"
              >
                <div className="flex items-center gap-2 truncate">
                  <Unlock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                  <span className="truncate font-mono">Unlock Bootloader</span>
                </div>
                <ExternalLink className="w-3 h-3 text-neutral-400 opacity-60 group-hover:opacity-100 shrink-0 ml-1" />
              </a>

              <a
                href="https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:text-cyber-lime hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-all group"
              >
                <div className="flex items-center gap-2 truncate">
                  <Layers className="w-3.5 h-3.5 text-cyber-lime shrink-0" />
                  <span className="truncate font-mono">GSI Flashing Guide</span>
                </div>
                <ExternalLink className="w-3 h-3 text-neutral-400 opacity-60 group-hover:opacity-100 shrink-0 ml-1" />
              </a>
            </div>
          </div>

          {/* 6. About Section with User Icon */}
          <a
            href={`${basePath}/about/`.replace(/\/+/g, '/')}
            onClick={() => isMobile && onClose()}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              cleanPath.startsWith('/about')
                ? 'bg-neutral-100 dark:bg-[#18181b] text-neutral-950 dark:text-cyber-lime border-l-2 border-cyber-lime font-bold shadow-sm'
                : 'text-neutral-700 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-neutral-200'
            }`}
          >
            <User className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
            <span>About Creator &amp; Project</span>
          </a>
        </nav>
      </div>

      {/* Sidebar Footer Link with Sponsor Text & 3D styling */}
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50/70 dark:bg-[#121214]/60 flex items-center justify-between shrink-0">
        <a
          href="https://buymeacoffee.com/mkr_infinity"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold bg-[#FFDD00] text-black border-2 border-neutral-950 shadow-[0_2px_0_#000] hover:bg-[#FACC15] active:translate-y-0.5 active:shadow-none transition-all select-none"
        >
          <CoffeeIcon className="w-3.5 h-3.5 text-black shrink-0" />
          <span>Sponsor</span>
        </a>

        <a
          href="https://github.com/mkr-infinity/android-command-cheatsheet"
          target="_blank"
          rel="noreferrer"
          className="clay-button p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-cyber-lime"
          title="GitHub Repository"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Mobile Drawer UI (< md) */}
      <div className="md:hidden">
        <div
          className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
          aria-hidden="true"
        />

        <aside
          className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] flex flex-col border-r border-neutral-200 dark:border-neutral-800 shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {navContent(true)}
        </aside>
      </div>

      {/* 2. Desktop In-Flow Resizable Pane (>= md) */}
      <aside
        style={{
          width: isOpen ? `${width}px` : '0px',
        }}
        className={`hidden md:flex flex-col border-r border-neutral-200 dark:border-neutral-800 shrink-0 sticky top-0 h-screen select-none transition-[width] duration-200 ease-in-out ${
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
          className={`hidden md:flex items-center justify-center w-2 -ml-1 z-20 cursor-col-resize select-none group transition-all shrink-0 ${
            isResizing ? 'bg-cyber-lime' : 'bg-transparent hover:bg-cyber-lime/40'
          }`}
          title="Drag to resize sidebar width"
        >
          <div className="w-0.5 h-10 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-900 dark:group-hover:bg-cyber-lime transition-colors" />
        </div>
      )}
    </>
  );
};
