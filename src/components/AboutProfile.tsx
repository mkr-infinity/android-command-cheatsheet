import React, { useEffect, useState } from 'react';
import {
  Code2,
  Sparkles,
  Users,
  GitBranch,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { GithubIcon, InstagramIcon, TelegramIcon, GlobeIcon, CoffeeIcon } from './icons/BrandIcons';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  blog: string;
}

export const AboutProfile: React.FC = () => {
  const [profile, setProfile] = useState<GitHubUser>({
    login: 'mkr-infinity',
    name: 'Mohammad Kaif Raja',
    avatar_url: 'https://github.com/mkr-infinity.png',
    bio: 'Software engineer and developer creating developer tools, system utilities, and open source documentation.',
    public_repos: 18,
    followers: 24,
    following: 12,
    html_url: 'https://github.com/mkr-infinity',
    blog: 'https://mkr-infinity.github.io',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/mkr-infinity')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: GitHubUser) => {
        if (data && data.avatar_url) {
          setProfile((prev) => ({
            ...prev,
            name: data.name || prev.name,
            avatar_url: data.avatar_url || prev.avatar_url,
            bio: data.bio || prev.bio,
            public_repos: data.public_repos ?? prev.public_repos,
            followers: data.followers ?? prev.followers,
            following: data.following ?? prev.following,
            html_url: data.html_url || prev.html_url,
            blog: data.blog || prev.blog,
          }));
        }
      })
      .catch(() => {
        // Fallback to static values gracefully
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Claymorphic Developer Identity Card */}
      <div className="clay-card p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-lime/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          {/* Avatar with Claymorphic ring & Status indicator */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-tr from-neutral-300 via-neutral-100 to-neutral-300 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700 shadow-lg">
              <img
                src={profile.avatar_url}
                alt={profile.name || profile.login}
                className="w-full h-full object-cover rounded-xl bg-neutral-900"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://github.com/mkr-infinity.png';
                }}
              />
            </div>
            {/* Live Status indicator */}
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#111113] border-2 border-[#111113] flex items-center justify-center"
              title="Verified Maintainer"
            >
              <span className="w-3 h-3 rounded-full bg-cyber-lime shadow-[0_0_8px_#E2F952]" />
            </span>
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-neutral-950 dark:text-cyber-text">
                  {profile.name}
                </h3>
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm font-mono text-neutral-500 hover:text-neutral-900 dark:text-cyber-muted dark:hover:text-cyber-lime inline-flex items-center gap-1 mt-0.5"
                >
                  <span>@{profile.login}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Verified Pill */}
              <div className="self-center sm:self-auto">
                <span className="clay-pill text-xs text-cyber-lime font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyber-lime" />
                  <span>PROJECT CREATOR</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xl">
              {profile.bio}
            </p>

            {/* GitHub Live Stats Counter Chips */}
            <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap pt-2">
              <div className="clay-pill text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <GitBranch className="w-3.5 h-3.5 text-cyber-lime" />
                <span><strong>{profile.public_repos}</strong> Repos</span>
              </div>

              <div className="clay-pill text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                <span><strong>{profile.followers}</strong> Followers</span>
              </div>

              <div className="clay-pill text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-cyber-lime" />
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor / Buy Me a Coffee Block */}
      <section className="clay-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm">
            <CoffeeIcon className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-mono font-bold text-neutral-950 dark:text-cyber-text">
              Sponsor the Project
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              Empower independent developer tooling and maintenance.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
          Android Command Cheatsheet is completely free and open-source. If this documentation reference speeds up your Android development, testing, or device flashing workflow, sponsoring via Buy Me a Coffee helps maintain and expand the command database.
        </p>

        <div className="pt-2">
          <a
            href="https://buymeacoffee.com/mkr_infinity"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-mono font-bold bg-[#FFDD00] text-neutral-950 hover:bg-[#FACC15] transition-all shadow-[0_4px_14px_-2px_rgba(255,221,0,0.4)] active:translate-y-0.5 select-none"
          >
            <CoffeeIcon className="w-4 h-4" />
            <span>Sponsor on Buy Me a Coffee</span>
          </a>
        </div>
      </section>

      {/* Social & Connect Grid */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
          Connect &amp; Social Channels
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* GitHub Profile */}
          <a
            href="https://github.com/mkr-infinity"
            target="_blank"
            rel="noreferrer"
            className="clay-card p-4 hover:translate-y-[-2px] transition-all flex items-center gap-3 group"
          >
            <GithubIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-cyber-lime transition-colors" />
            <div className="min-w-0">
              <span className="font-mono text-xs font-bold text-neutral-950 dark:text-cyber-text block truncate">
                mkr-infinity
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">GitHub Profile</span>
            </div>
          </a>

          {/* Repository */}
          <a
            href="https://github.com/mkr-infinity/android-command-cheatsheet"
            target="_blank"
            rel="noreferrer"
            className="clay-card p-4 hover:translate-y-[-2px] transition-all flex items-center gap-3 group"
          >
            <Code2 className="w-5 h-5 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-cyber-lime transition-colors" />
            <div className="min-w-0">
              <span className="font-mono text-xs font-bold text-neutral-950 dark:text-cyber-text block truncate">
                android-command-cheatsheet
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Source Repository</span>
            </div>
          </a>

          {/* Website */}
          <a
            href="https://mkr-infinity.github.io"
            target="_blank"
            rel="noreferrer"
            className="clay-card p-4 hover:translate-y-[-2px] transition-all flex items-center gap-3 group"
          >
            <GlobeIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-cyber-lime transition-colors" />
            <div className="min-w-0">
              <span className="font-mono text-xs font-bold text-neutral-950 dark:text-cyber-text block truncate">
                mkr-infinity.github.io
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Personal Website</span>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/mkr_infinity"
            target="_blank"
            rel="noreferrer"
            className="clay-card p-4 hover:translate-y-[-2px] transition-all flex items-center gap-3 group"
          >
            <InstagramIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400 group-hover:text-rose-500 transition-colors" />
            <div className="min-w-0">
              <span className="font-mono text-xs font-bold text-neutral-950 dark:text-cyber-text block truncate">
                @mkr_infinity
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Instagram</span>
            </div>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/mkr_infinity"
            target="_blank"
            rel="noreferrer"
            className="clay-card p-4 hover:translate-y-[-2px] transition-all flex items-center gap-3 group"
          >
            <TelegramIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400 group-hover:text-sky-500 transition-colors" />
            <div className="min-w-0">
              <span className="font-mono text-xs font-bold text-neutral-950 dark:text-cyber-text block truncate">
                @mkr_infinity
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Telegram</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
