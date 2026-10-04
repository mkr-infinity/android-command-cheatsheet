<p align="center">
  <img src="public/assets/branding/logo.svg" width="280" alt="Android Command Cheatsheet Logo">
</p>

<h1 align="center">Android Command Cheatsheet</h1>

<p align="center">
  <strong>A high-performance technical reference and cheatsheet for Android ADB &amp; Fastboot commands.</strong>
</p>

<p align="center">
  <a href="https://github.com/mkr-infinity/android-command-cheatsheet/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License"></a>
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Built%20with-Astro%205-FF5D01.svg?style=flat-square&logo=astro&logoColor=white" alt="Built with Astro"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Language-TypeScript-3178C6.svg?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Styling-TailwindCSS%203-38B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white" alt="TailwindCSS"></a>
  <a href="https://buymeacoffee.com/mkr_infinity"><img src="https://img.shields.io/badge/Sponsor-Buy%20Me%20A%20Coffee-FFDD00.svg?style=flat-square&logo=buy-me-a-coffee&logoColor=black" alt="Sponsor"></a>
</p>

---

## ⚡ Overview

**Android Command Cheatsheet** is a fast, cybercore-inspired technical documentation website and reference tool engineered for Android developers, technicians, ROM maintainers, and power users.

It indexes over **96+ ADB and Fastboot commands** organized with comprehensive syntax breakdowns, real-world examples, danger levels, parameter dictionaries, and instant one-click copy support.

---

## ✨ Features

- **⚡ 96+ Indexed Commands**: Exhaustive coverage across connection, package management, shell, inputs, dumpsys, recovery, fastboot flashing, slot management, and root commands.
- **🏷️ Interactive Parameter Dictionaries**: Every command includes an interactive explanation breakdown for placeholders like `<package_name>`, `<path>`, `<serial>`, and `<slot>`.
- **🛡️ Risk Ratings & Precautions**: Commands are color-coded and badged (`Safe`, `Moderate`, `High Risk`, `Critical/Destructive`) with recovery and safety steps.
- **🔍 Real-Time Instant Search**: Filter commands across keywords, categories, and danger levels with keyboard shortcuts (`/` or `Ctrl+K`).
- **⭐ Local Bookmarks & Favorites**: Save frequently used commands locally in your browser with zero latency.
- **🌐 Interactive Magnetic Grid**: Cybercore technical canvas with responsive magnetic cursor physics and alive kinetic typography.
- **🌗 Claymorphic Dual Themes**: Custom-engineered High-Contrast Slate Light theme and Deep Cybercore Dark theme with 3D tactile buttons.
- **📱 Fully Responsive**: Custom desktop cockpit with collapsible sidebar alongside an optimized mobile interface.

---

## 📚 Essential Companion Guides

For step-by-step firmware modification and partition management, explore these companion guides by the same creator:

- 🔓 **[Guide to Unlock Bootloader](https://github.com/mkr-infinity/Guide-to-unlock-Bootloader)**  
  Official step-by-step walkthrough for unlocking OEM bootloaders across Google Pixel, Xiaomi, OnePlus, Motorola, and Samsung devices.

- 📲 **[Guide for Flashing GSI to Any Device](https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device)**  
  Complete manual for flashing Generic System Images (GSI) via DSU Sideloader, Fastbootd, and Dynamic Partitions on Project Treble devices.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ or 22+
- [pnpm](https://pnpm.io/) 9+ or 11+

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/mkr-infinity/android-command-cheatsheet.git
cd android-command-cheatsheet

# Install dependencies
pnpm install

# Start local development server
pnpm dev
```

Visit `http://localhost:4321` in your browser.

### Building for Production

```bash
# Generate static HTML build in /dist
pnpm build

# Preview production build locally
pnpm preview
```

---

## 📦 Deployment

The project is pre-configured for automated one-click deployments to:

| Platform | Configuration | Output Directory | Notes |
| :--- | :--- | :--- | :--- |
| **GitHub Pages** | `.github/workflows/deploy.yml` | `dist` | Includes `public/.nojekyll` and dynamic base path support |
| **Netlify** | `netlify.toml` | `dist` | Automated SSR/SPA 404 redirects enabled |
| **Vercel** | `vercel.json` | `dist` | Clean URLs and zero-config static serving |

---

## 📂 Project Architecture

```
android-command-cheatsheet/
├── .github/workflows/deploy.yml   # GitHub Actions static deployment pipeline
├── public/                        # Static assets, logos, .nojekyll, robots.txt
├── src/
│   ├── components/                # React islands (Search, Detail, Title, Header, Profile)
│   ├── data/
│   │   ├── adbCommands.ts         # ADB command database with parameter schemas
│   │   ├── fastbootCommands.ts    # Fastboot command database with parameter schemas
│   │   └── types.ts               # Core TypeScript definitions & command interfaces
│   ├── layouts/
│   │   └── BaseLayout.astro       # Root HTML document, SEO meta, and shell container
│   ├── pages/                     # File-based routing (Index, ADB, Fastboot, Learn, About)
│   └── styles/
│       └── global.css             # Cybercore design tokens, claymorphic styles & themes
├── astro.config.mjs               # Astro static configuration
├── netlify.toml                   # Netlify build and routing specifications
├── vercel.json                    # Vercel static routing rules
└── package.json
```

---

## 👤 Author & Creator

Crafted by **Mohammad Kaif Raja** ([@mkr-infinity](https://github.com/mkr-infinity))

> *"Passionate about systems, not code. From flashing OS to customizing Linux, I’ve tested countless distros. Tech is my playground, curiosity my guide."*

- GitHub: [@mkr-infinity](https://github.com/mkr-infinity)
- Portfolio: [mkr-infinity.github.io](https://mkr-infinity.github.io)
- Sponsor: [Buy Me a Coffee](https://buymeacoffee.com/mkr_infinity)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
