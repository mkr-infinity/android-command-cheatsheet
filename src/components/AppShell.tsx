import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { SupportBar } from './SupportBar';
import { SearchModal } from './SearchModal';
import { CursorInteractiveBackground } from './CursorInteractiveBackground';
import { MagneticGridBackground } from './MagneticGridBackground';

interface AppShellProps {
  currentPath?: string;
  basePath?: string;
  commandName?: string;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentPath = '/',
  basePath = '',
  commandName,
  children,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(260);

  useEffect(() => {
    // Check initial screen width: on desktop default open, on mobile default closed
    const isMobile = window.innerWidth < 768;
    const savedState = localStorage.getItem('acc_sidebar_open');
    if (savedState !== null) {
      setIsSidebarOpen(savedState === 'true' && !isMobile);
    } else {
      setIsSidebarOpen(!isMobile);
    }

    const savedWidth = localStorage.getItem('acc_sidebar_width');
    if (savedWidth) {
      const parsed = parseInt(savedWidth, 10);
      if (!isNaN(parsed) && parsed >= 200 && parsed <= 420) {
        setSidebarWidth(parsed);
      }
    }

    const handleCustomOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('acc_open_search', handleCustomOpenSearch);

    // Keyboard shortcuts: Ctrl+K, Cmd+K, '/'
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.getAttribute('contenteditable') === 'true');

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('acc_open_search', handleCustomOpenSearch);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleSidebar = () => {
    const next = !isSidebarOpen;
    setIsSidebarOpen(next);
    try {
      localStorage.setItem('acc_sidebar_open', String(next));
    } catch {}
  };

  const handleWidthChange = (newWidth: number) => {
    setSidebarWidth(newWidth);
    try {
      localStorage.setItem('acc_sidebar_width', String(newWidth));
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-lightBg dark:bg-cyber-black text-cyber-lightText dark:text-cyber-text transition-colors duration-200 relative selection:bg-cyber-lime selection:text-black">
      {/* Interactive Magnetic Repulsion Background Grid */}
      <MagneticGridBackground />

      {/* Lightweight Cursor Interactive Spotlight Background */}
      <CursorInteractiveBackground />

      {/* Sticky Global Header across top */}
      <Header
        basePath={basePath}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* In-Flow Body Container: Desktop Resizable Sidebar + Content Area */}
      <div className="flex-1 flex w-full relative z-10">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => {
            setIsSidebarOpen(false);
            try {
              localStorage.setItem('acc_sidebar_open', 'false');
            } catch {}
          }}
          currentPath={currentPath}
          basePath={basePath}
          onOpenSearch={() => setIsSearchOpen(true)}
          width={sidebarWidth}
          onWidthChange={handleWidthChange}
        />

        {/* Main Content Area: Content automatically reflows when sidebar expands/shrinks */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-200">
          <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8 max-w-7xl w-full mx-auto">
            {children}
          </main>

          <Footer basePath={basePath} />
        </div>
      </div>

      {/* Floating Sponsor / Feedback Bar */}
      <SupportBar command={commandName} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        basePath={basePath}
      />
    </div>
  );
};
