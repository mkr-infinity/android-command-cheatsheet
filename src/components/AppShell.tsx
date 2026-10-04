import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { SupportBar } from './SupportBar';
import { SearchModal } from './SearchModal';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
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

  return (
    <div className="min-h-screen flex flex-col bg-cyber-lightBg dark:bg-cyber-black text-cyber-lightText dark:text-cyber-text transition-colors duration-200">
      {/* Sidebar Drawer: Completely hidden when closed */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPath={currentPath}
        basePath={basePath}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Full-Width Content Container */}
      <div className="flex-1 flex flex-col w-full">
        <Header
          basePath={basePath}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <Footer basePath={basePath} />
      </div>

      {/* Floating Support Bar */}
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
