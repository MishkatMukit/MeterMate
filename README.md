<div align="center">

# ⚡ MeterMate

**Prepaid Meter Token Formatter for Bangladesh**

*Paste your SMS. Get formatted tokens. Recharge your meter.*

![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

</div>

---

## Overview

MeterMate is a client-side web application designed for prepaid electricity meter users in Bangladesh. Electricity providers send recharge confirmations via SMS containing multiple 20-digit tokens concatenated together with no clear separators, making manual entry error-prone and frustrating.

MeterMate automatically detects your provider, extracts token digits from SMS text, splits them into valid 20-digit segments, and formats each into readable 4-digit groups — ready to copy and enter into your meter.

**100% client-side. No data ever leaves your browser.**

---

## Features

### Token Processing
- **Automatic SMS Provider Detection** — Recognizes BPDB, BREB, DESCO, DPDC, NESCO, and WZPDCL
- **Token Extraction & Formatting** — Strips non-numeric characters and splits into 20-digit tokens
- **Multiple Token Support** — Handles single tokens or batches of 15+ concatenated tokens
- **Readable Display** — Formats tokens as `XXXX-XXXX-XXXX-XXXX-XXXX` for easy reading

### Copy & Navigation
- **Copy Current Token** — One-tap copy of the active token (raw 20-digit string)
- **Copy All Tokens** — Copy all tokens at once, newline-separated
- **Token Navigation** — Step through tokens with Previous/Next buttons or keyboard arrows
- **Auto-Advance** — Optionally advance to the next token after copying (configurable)
- **Token Completion Tracking** — Visual progress with strikethrough on completed tokens
- **Reinsert Confirmation** — Confirm before revisiting an already-used token
- **Skip Confirmation** — Confirm before jumping ahead past unused tokens

### Information & Reference
- **Meter Information Extraction** — Displays meter number, recharge amount, VAT, transaction ID, and more when available in SMS
- **Meter Code Reference** — Browse verified USSD/service codes for Hexing, Inhemeter, Linyang, and Eastern meters
- **Token History** — View and manage previously parsed tokens (stored locally)

### Accessibility & UX
- **Bangla & English Language Support** — Full bilingual interface
- **Light & Dark Mode** — Theme toggle with system preference detection
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Progress Indicators** — Visual dots and counter showing current position
- **Keyboard Navigation** — Arrow key support for token stepping

### Privacy & Security
- **100% Local Processing** — All SMS parsing and formatting happens in your browser
- **No Data Uploads** — No SMS content, tokens, or meter information is transmitted
- **No Account Required** — Use immediately without registration
- **Local Storage Only** — History and preferences stored in browser localStorage

---

## Screenshots

<div align="center">

| Homepage | Token Formatter | Meter Codes |
|:--------:|:---------------:|:-----------:|
| ![Homepage](screenshots/homepage.png) | ![Formatter](screenshots/formatter.png) | ![Meter Codes](screenshots/meter-codes.png) |
| *Landing page with feature overview* | *Core token parsing and navigation* | *Reference codes for prepaid meters* |

| History | Settings | Mobile View |
|:-------:|:--------:|:-----------:|
| ![History](screenshots/history.png) | ![Settings](screenshots/settings.png) | ![Mobile](screenshots/mobile.png) |
| *Previously parsed token entries* | *Theme and language preferences* | *Responsive mobile interface* |

</div>

> **Note:** Replace the placeholder images above with actual screenshots.

---

## How It Works

```
┌─────────────┐     ┌──────────────────┐     ┌────────────────┐
│  Paste SMS  │ ──▶ │  Auto-Detect     │ ──▶ │ Extract Digits │
│             │     │  Provider        │     │                │
└─────────────┘     └──────────────────┘     └────────┬───────┘
                                                       │
                                                       ▼
┌─────────────┐     ┌──────────────────┐     ┌────────────────┐
│  Copy &     │ ◀── │ Format Tokens    │ ◀── │ Split into     │
│  Recharge   │     │ (4-digit groups) │     │ 20-digit tokens│
└─────────────┘     └──────────────────┘     └────────────────┘
```

1. **Paste SMS** — Copy your recharge confirmation SMS and paste it into the input field
2. **Automatic Parsing** — MeterMate extracts all numeric characters from the message
3. **Provider Detection** — The app identifies your electricity provider from SMS keywords
4. **Token Formatting** — Digits are split into 20-digit tokens and formatted as readable groups
5. **Copy & Recharge** — Copy individual tokens or all at once, then enter them into your meter

---

## Supported Providers

| Provider | Full Name |
|----------|-----------|
| **BPDB** | Bangladesh Power Development Board |
| **BREB** | Bangladesh Rural Electrification Board (Palli Bidyut) |
| **DESCO** | Dhaka Electric Supply Company |
| **DPDC** | Dhaka Power Distribution Company |
| **NESCO** | Northern Electricity Supply Company |
| **WZPDCL** | West Zone Power Distribution Company |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [React 19](https://react.dev) |
| Language | [TypeScript 6](https://www.typescriptlang.org) |
| Build Tool | [Vite 8](https://vite.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Routing | [React Router 7](https://reactrouter.com) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) pattern |
| Icons | [Lucide React](https://lucide.dev) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Validation | [Zod](https://zod.dev) |
| Notifications | [Sonner](https://sonner.emilkowal.ski) |
| Linting | [OxLint](https://oxc.rs/docs/guide/usage/linter) |
| PWA | [vite-plugin-pwa](https://vite-pwa.netlify.app) |

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) 18+ (recommended: 20+)
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/meter-mate.git
cd meter-mate

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run OxLint for code quality checks |
| `npm run typecheck` | TypeScript type checking only |

---

## Project Structure

```
meter-mate/
├── public/                 # Static assets (icons, favicon)
├── src/
│   ├── components/
│   │   ├── common/         # Shared utility components
│   │   ├── layout/         # Header, footer, app layout
│   │   ├── token/          # Token display, navigation, copy
│   │   └── ui/             # shadcn-style primitives (Button, Card, Input)
│   ├── constants/          # Provider patterns, meter codes, app config
│   ├── context/            # React contexts (theme, language, settings, tokens)
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Route layout wrappers
│   ├── lib/                # Core logic modules
│   │   ├── detector.ts     # Provider detection from SMS text
│   │   ├── formatter.ts    # Token splitting and display formatting
│   │   ├── history.ts      # localStorage history management
│   │   ├── i18n.ts         # Internationalization (en/bn)
│   │   ├── parser.ts       # SMS digit extraction and meter info parsing
│   │   └── validator.ts    # Token count and length validation
│   ├── pages/              # Route page components
│   │   ├── About/
│   │   ├── Favorites/
│   │   ├── Formatter/
│   │   ├── History/
│   │   ├── Home/
│   │   ├── MeterCodes/
│   │   └── Settings/
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions (cn, etc.)
│   ├── App.tsx             # Root component with providers and routes
│   └── main.tsx            # Application entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Architecture Notes

- **Parsing pipeline** — Pure functions in `src/lib/` handle detection → extraction → formatting → validation independently
- **No parsing logic in components** — Components only orchestrate calls to `lib/` modules
- **Context providers** — Theme, language, settings, and token state managed via React Context
- **Path alias** — `@/` maps to `src/` for clean imports

---

## Privacy

MeterMate is built with privacy as a core principle:

- **No server** — The app is a static site; there is no backend
- **No data transmission** — SMS content, tokens, meter numbers, and transaction IDs never leave your browser
- **No analytics** — No tracking scripts or analytics services
- **No storage** — All data stays in browser memory; history uses localStorage only
- **Transparent** — You can verify network activity in your browser's DevTools

---

## Roadmap

Planned features for future releases:

- [ ] Import/Export token history (CSV, PDF)
- [ ] QR code generation for individual tokens
- [ ] Text-to-speech token reading
- [ ] OCR from SMS screenshots
- [ ] Offline enhancements with full PWA support
- [ ] Additional meter brand codes and verification
- [ ] More provider-specific parsing refinements
- [ ] Favorite meters for quick access
- [ ] Share tokens via Web Share API

---

## Contributing

Contributions are welcome. To get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Keep parsing logic in `src/lib/` — no parsing in components
- Add translations for both English and Bangla in `src/lib/i18n.ts`
- Run `npm run lint` and `npm run typecheck` before committing
- Write clear commit messages describing the change

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author

**Mishkat Mahabub**

- Portfolio: (https://mishkatmukit.vercel.app)

---

<div align="center">

**Made with care for Bangladesh's prepaid meter users**

</div>
