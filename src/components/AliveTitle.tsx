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
    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-neutral-950 dark:text-cyber-text flex flex-col sm:flex-row sm:items-baseline sm:flex-nowrap gap-x-3 gap-y-1 whitespace-nowrap">
      <span className="shrink-0 whitespace-nowrap select-none">Android Command</span>
      <span className="relative inline-flex items-baseline whitespace-nowrap overflow-visible">
        <span
          className={`transition-all duration-200 underline decoration-cyber-lime/40 underline-offset-8 inline-flex items-baseline whitespace-nowrap min-w-[140px] sm:min-w-[200px] md:min-w-[240px] ${currentFont.className}`}
          style={currentFont.style}
        >
          <span>{displayText}</span>
          <span className="inline-block w-1.5 h-5 sm:h-7 md:h-9 bg-cyber-lime ml-1 self-center animate-pulse" />
        </span>
      </span>
    </h1>
  );
};
