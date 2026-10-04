import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getInitialTheme, applyTheme, type Theme } from '../utils/storage';

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-cyber-border bg-neutral-100 dark:bg-cyber-surface" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-200 dark:border-cyber-border bg-neutral-100 hover:bg-neutral-200 dark:bg-cyber-surface dark:hover:bg-cyber-surfaceHover text-neutral-800 dark:text-cyber-muted dark:hover:text-cyber-lime transition-all focus:outline-none focus:ring-1 focus:ring-cyber-lime"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-cyber-lime" />
      ) : (
        <Moon className="w-4 h-4 text-neutral-900" />
      )}
    </button>
  );
};
