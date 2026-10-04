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
    className: 'font-black text-neutral-900 dark:text-white uppercase tracking-wider',
    style: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
  },
  {
    name: 'Syne Futuristic Bold',
    className: 'font-extrabold text-cyber-lime tracking-widest',
    style: { fontFamily: '"Syne", sans-serif' },
  },
  {
    name: 'Code Italics',
    className: 'font-serif italic font-bold text-amber-500 dark:text-amber-300',
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
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-neutral-950 dark:text-cyber-text flex flex-wrap items-center gap-x-3 gap-y-1">
      <span>Android Command</span>
      <span className="relative inline-flex items-center">
        <span
          className={`transition-all duration-200 underline decoration-cyber-lime/40 underline-offset-8 inline-block min-w-[200px] sm:min-w-[240px] md:min-w-[280px] ${currentFont.className}`}
          style={currentFont.style}
        >
          {displayText}
          <span className="inline-block w-1.5 h-7 sm:h-9 md:h-11 bg-cyber-lime ml-1 -mb-1 animate-pulse" />
        </span>
      </span>
    </h1>
  );
};
