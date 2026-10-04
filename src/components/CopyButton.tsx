import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
  showText?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = '',
  label = 'Copy',
  showText = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : `Copy ${text}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono transition-all duration-150 border ${
        copied
          ? 'bg-cyber-lime/10 border-cyber-lime text-cyber-lime dark:bg-cyber-lime/15 dark:text-cyber-lime'
          : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-800 dark:bg-cyber-surface hover:dark:bg-cyber-surfaceHover dark:border-cyber-border dark:text-cyber-muted dark:hover:text-cyber-lime hover:border-neutral-400 dark:hover:border-cyber-borderHover'
      } focus:outline-none focus:ring-1 focus:ring-cyber-lime ${className}`}
      title={copied ? 'Copied!' : 'Copy command'}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-cyber-lime stroke-[2.5]" />
          {showText && <span className="font-semibold text-cyber-lime">Copied</span>}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 stroke-[2]" />
          {showText && <span>{label}</span>}
        </>
      )}
    </button>
  );
};
