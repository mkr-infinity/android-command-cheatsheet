import React, { useState, useEffect } from 'react';

const FONT_STYLES = [
  {
    name: 'JetBrains Terminal',
    className: 'font-mono text-cyber-lime font-bold tracking-tight',
    style: { fontFamily: '"JetBrains Mono", monospace' },
  },
  {
    name: 'Space Grotesk Cyber',
    className: 'font-extrabold text-amber-600 dark:text-amber-400 tracking-tight',
    style: { fontFamily: '"Space Grotesk", sans-serif' },
  },
  {
    name: 'Modern Technical Sans',
    className: 'font-black text-neutral-900 dark:text-white tracking-tight',
    style: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
  },
  {
    name: 'Syne Futuristic Bold',
    className: 'font-extrabold text-cyber-lime tracking-tight',
    style: { fontFamily: '"Syne", sans-serif' },
  },
  {
    name: 'Code Italics',
    className: 'font-serif italic font-bold text-amber-500 dark:text-amber-300 tracking-tight',
    style: { fontFamily: '"Playfair Display", Georgia, serif' },
  },
];

const TARGET_WORD = 'Cheatsheet';

export const AliveTitle: React.FC = () => {
  const [fontIndex, setFontIndex] = useState(0);
  const [displayText, setDisplayText] = useState(TARGET_WORD);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(TARGET_WORD.length);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex === TARGET_WORD.length) {
      // Pause for 2 seconds while displaying the word in current font
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex > 0) {
      // Erase word
      timer = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
        setDisplayText(TARGET_WORD.slice(0, charIndex - 1));
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      // Switch font and begin re-typing
      setIsDeleting(false);
      setFontIndex((prev) => (prev + 1) % FONT_STYLES.length);
      timer = setTimeout(() => {
        setCharIndex(1);
        setDisplayText(TARGET_WORD.slice(0, 1));
      }, 100);
    } else if (!isDeleting && charIndex < TARGET_WORD.length) {
      // Type next character
      timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
        setDisplayText(TARGET_WORD.slice(0, charIndex + 1));
      }, 70);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting]);

  const currentFont = FONT_STYLES[fontIndex];

  return (
    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight text-neutral-950 dark:text-white flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-wrap">
      {/* Elevated Android Command Typography */}
      <span className="shrink-0 select-none tracking-tight">
        <span className="text-neutral-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-neutral-100 dark:to-neutral-300 drop-shadow-sm font-black">
          Android Command
        </span>
      </span>

      {/* Cybercore Display Box Container: Locks the animated word inside and never overflows */}
      <div className="inline-flex items-center shrink-0">
        <div className="relative flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl border-2 border-cyber-lime/40 dark:border-cyber-lime/60 bg-white/95 dark:bg-[#0c0d11]/95 shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_0_24px_rgba(204,255,0,0.14),inset_0_2px_4px_rgba(0,0,0,0.85)] min-w-[200px] sm:min-w-[270px] md:min-w-[320px] max-w-full overflow-hidden backdrop-blur-md transition-all">
          {/* Subtle ambient display glow */}
          <div className="absolute inset-0 bg-cyber-lime/5 pointer-events-none rounded-xl sm:rounded-2xl" />

          {/* Contained dynamic text */}
          <span
            className={`relative z-10 transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap select-none ${currentFont.className}`}
            style={currentFont.style}
          >
            <span>{displayText}</span>
            <span className="inline-block w-1.5 h-5 sm:h-7 md:h-8 bg-cyber-lime ml-1.5 rounded-sm animate-pulse shadow-[0_0_10px_rgb(var(--accent-lime-rgb))]" />
          </span>
        </div>
      </div>
    </h1>
  );
};
