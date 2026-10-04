import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { CoffeeIcon } from './icons/BrandIcons';
import { isSupportBarHidden, setSupportBarHidden } from '../utils/storage';

interface SupportBarProps {
  command?: string;
}

export const SupportBar: React.FC<SupportBarProps> = () => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isSupportBarHidden()) {
      setVisible(true);
    }

    const handleHide = () => setVisible(false);
    window.addEventListener('acc_support_bar_hidden', handleHide);
    return () => window.removeEventListener('acc_support_bar_hidden', handleHide);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setSupportBarHidden();
  };

  if (!mounted || !visible) return null;

  return (
    <aside
      aria-label="Sponsor Bar"
      className="fixed bottom-4 right-4 sm:right-6 z-40 p-3 sm:p-4 rounded-2xl max-w-sm border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-[#121214] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.25),_0_4px_10px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.85),_inset_0_1px_1px_rgba(255,255,255,0.12)] flex items-center justify-between gap-3.5 transition-all duration-300 animate-slideUp"
    >
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-cyber-text truncate">
          Support this project
        </p>
        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 font-mono">
          Free &amp; open source cheatsheet
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href="https://buymeacoffee.com/mkr_infinity"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[#FFDD00] text-black border-2 border-neutral-950 shadow-[0_3px_0_#000] hover:bg-[#FACC15] active:translate-y-0.5 active:shadow-none transition-all select-none"
          title="Sponsor on Buy Me a Coffee"
        >
          <CoffeeIcon className="w-3.5 h-3.5 text-black shrink-0" />
          <span>Sponsor</span>
        </a>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Dismiss sponsor message"
          className="p-1.5 rounded-lg border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-cyber-text transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </aside>
  );
};
