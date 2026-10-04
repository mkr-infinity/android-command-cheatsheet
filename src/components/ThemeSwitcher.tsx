import React, { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
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
      <div className="w-14 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Current theme: ${theme}. Click to switch to ${isDark ? 'light' : 'dark'} mode.`}
      className={`relative inline-flex items-center h-8 w-16 p-1 rounded-full transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-cyber-lime/60 ${
        isDark
          ? 'bg-neutral-900 border border-neutral-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
          : 'bg-neutral-200 border border-neutral-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]'
      }`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background Icons */}
      <div className="w-full flex items-center justify-between px-1.5 text-xs pointer-events-none">
        <Sun
          className={`w-3.5 h-3.5 transition-colors duration-200 ${
            !isDark ? 'text-amber-700 opacity-100' : 'text-neutral-600 opacity-40'
          }`}
        />
        <Moon
          className={`w-3.5 h-3.5 transition-colors duration-200 ${
            isDark ? 'text-cyber-lime opacity-100' : 'text-neutral-400 opacity-40'
          }`}
        />
      </div>

      {/* Sliding Illuminated Clay Thumb */}
      <span
        className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          isDark
            ? 'left-9 bg-neutral-800 text-cyber-lime shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_6px_rgba(0,0,0,0.8),0_0_8px_rgba(226,249,82,0.3)] border border-neutral-700'
            : 'left-1 bg-white text-amber-700 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_5px_rgba(0,0,0,0.15)] border border-neutral-300'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 fill-cyber-lime/20 text-cyber-lime" />
        ) : (
          <Sun className="w-3.5 h-3.5 fill-amber-500/20 text-amber-700" />
        )}
      </span>
    </button>
  );
};
