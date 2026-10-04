# Contributing to Android Command Cheatsheet

Thank you for your interest in contributing to **Android Command Cheatsheet**!

We welcome contributions from Android developers, ROM maintainers, security researchers, and enthusiasts.

---

## 🛠️ How to Add or Update Commands

All commands are strictly typed in TypeScript and located in:
- `src/data/adbCommands.ts` — ADB Commands
- `src/data/fastbootCommands.ts` — Fastboot Commands

### Command Schema

When adding a command, follow the `Command` schema defined in `src/data/types.ts`:

```typescript
{
  id: 'pm-example-cmd',
  title: 'Clear Package Cache',
  command: 'adb shell pm trim-caches <desired_free_space>',
  category: 'adb-app',
  risk: 'safe', // 'safe' | 'moderate' | 'high' | 'critical'
  requires: {
    root: false,
    deviceState: 'device', // 'device' | 'bootloader' | 'recovery' | 'sideload' | 'any'
    usbDebugging: true,
  },
  shortDesc: 'Trim cache files to reach desired free internal storage space.',
  fullDesc: 'Instructs the package manager to free the specified number of bytes by deleting cache files across all applications.',
  syntax: 'adb shell pm trim-caches <desired_free_space>',
  examples: [
    {
      description: 'Trim 500MB of cache storage',
      cmd: 'adb shell pm trim-caches 500M',
    },
  ],
  warning: 'Does not delete user database credentials, only cache directories.',
  relatedCommands: ['pm-clear', 'shell-df'],
}
```

---

## 💻 Development Workflow

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the local development server:
   ```bash
   pnpm dev
   ```
4. Verify your changes compile without TypeScript or Astro errors:
   ```bash
   pnpm build
   ```
5. Submit a pull request describing the command or UI improvement.

---

## 📜 Code of Conduct

Please maintain respect, professional collaboration, and helpful technical accuracy in all discussions and pull requests.
