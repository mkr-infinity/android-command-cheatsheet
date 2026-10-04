import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';
import type { RiskLevel } from '../data/types';

interface RiskBadgeProps {
  risk: RiskLevel;
  className?: string;
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ risk, className = '', showIcon = true }) => {
  switch (risk) {
    case 'safe':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono tracking-wide uppercase border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 ${className}`}
          title="Safe: Read-only or reversible non-destructive command"
        >
          {showIcon && <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 dark:bg-cyber-lime inline-block" />}
          <span>Safe</span>
        </span>
      );
    case 'caution':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono tracking-wide uppercase border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-400 ${className}`}
          title="Caution: Changes device state or app data; execute with care"
        >
          {showIcon && <AlertTriangle className="w-3 h-3 stroke-[2]" />}
          <span>Caution</span>
        </span>
      );
    case 'destructive':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono tracking-wide uppercase border border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-400 font-semibold ${className}`}
          title="Destructive: Causes permanent data erasure, partition flash, or system modifications"
        >
          {showIcon && <AlertOctagon className="w-3 h-3 stroke-[2.5]" />}
          <span>Destructive</span>
        </span>
      );
    default:
      return null;
  }
};
