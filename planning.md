# Bangladesh Prepaid Meter Token Formatter — Project Specification

**Version:** 1.0
**Status:** Draft for build

---

## 1. Overview

A client-side web application that helps users in Bangladesh accurately read and enter prepaid electricity meter tokens received via SMS.

### 1.1 Problem

Electricity providers in Bangladesh — BPDB, BREB/Palli Bidyut, DESCO, DPDC, NESCO, and WZPDCL — send prepaid recharge confirmations by SMS. These messages often contain multiple sequential 20-digit tokens concatenated together (e.g., 11 tokens = 220 unbroken digits), with no clear separator between them.

Many users, particularly elderly or non-technical users, struggle to identify where one token ends and the next begins before keying it into the meter. A misread digit boundary means a failed or incorrect entry.

### 1.2 Solution

The app automatically detects the provider, extracts the token digits from surrounding SMS text, splits them into valid 20-digit tokens, formats each into readable 4-digit blocks, and lets the user step through tokens one at a time with copy support.

### 1.3 Non-Goals (v1)

To keep scope tight, the following are explicitly **out of scope** for v1 (see Section 8, Future Features):
- No server/backend, no data leaves the device
- No account system or sync across devices
- No OCR, voice, or non-English/Bangla language support
- No persistence of entered SMS beyond the current session (see Section 4.10 on privacy)

---

## 2. Technology Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build tool | Vite |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui |
| Routing | React Router |
| Validation | Zod |
| Animation | Framer Motion |
| Icons | Lucide React |
| Notifications | Sonner |
| Backend | None — fully client-side |

---

## 3. Design Requirements

- Mobile-first, fully responsive
- Minimalist, modern, professional utility-app aesthetic
- Dark mode support (system-preference aware, with manual toggle)
- Clean, legible typography
- Large touch targets (minimum 44×44px per WCAG guidance)
- Large, high-contrast token display sized for elderly/low-vision users
- Meets WCAG 2.1 AA where practical (contrast ratios, focus states, keyboard navigation)
- Subtle, purposeful animation only — no motion that impedes readability or triggers vestibular discomfort (respect `prefers-reduced-motion`)

---

## 4. Core Features (v1)

### 4.1 SMS Input
- Multi-line textarea for pasting the full SMS text
- Paste and manual typing both supported
- Clear/reset action
- Placeholder example text showing expected input format

**Acceptance criteria:** User can paste an arbitrary SMS block up to at least 2,000 characters without UI breakage or truncation.

### 4.2 Provider Detection
- Detect provider from SMS content: BPDB, BREB, DPDC, DESCO, NESCO, WZPDCL
- Display detected provider name/badge prominently
- If no provider is confidently detected, show an "Unknown provider" state rather than a false match — do not guess

**Acceptance criteria:** Detection logic is pattern/keyword-based, documented per provider, and unit-testable independent of the UI.

### 4.3 Token Extraction
The parser must:
- Locate the token-bearing portion of the message and ignore unrelated text (amounts, dates, greetings, etc.)
- Strip commas, spaces, hyphens, and line breaks
- Retain digit characters only
- Handle a single token, multiple concatenated tokens, or one long continuous digit string equally well

**Acceptance criteria:** Parser is a pure function (`string in → digit string out`) with no UI dependency, so it can be tested against a library of sample messages.

### 4.4 Token Splitting
- Split the cleaned digit string into consecutive 20-digit segments

**Example:**
Input: `3217407773201949846325910358843419948233`
Output:
- Token 1: `32174077732019498463`
- Token 2: `25910358843419948233`

### 4.5 Token Formatting (Display)
- Render each 20-digit token as five 4-digit groups for readability

**Example:** `32174077732019498463` → `3217 4077 7320 1949 8463`

- The underlying value copied/used is always the unformatted 20-digit string; spacing is display-only

### 4.6 Token Navigation
- Display exactly one token at a time, large and centered
- Previous / Next controls, disabled appropriately at first/last token
- Header showing position, e.g. **"Token 3 of 11"**
- Keyboard support: arrow keys move between tokens; visible focus states

### 4.7 Copy
- Copy current token (formatted or raw — decide and be consistent; recommend copying raw digits without spaces, since that's what the meter accepts)
- Copy all tokens (newline- or comma-separated)
- Sonner toast confirmation on every copy action, including failure states (e.g., clipboard permission denied)

### 4.8 Validation
- Every segment must be exactly 20 digits
- Total digit count must be evenly divisible by 20
- On failure, show a specific, actionable message — not a generic error

**Example messages:**
- "Found 213 digits — expected a multiple of 20. Check for a missing or extra digit."
- "No numeric token data found in this message."

### 4.9 Meter Information Panel
Extract and display, when present in the SMS:
- Meter Number
- Recharge Amount
- Energy Cost
- VAT
- Demand Charge
- Meter Rent
- Rebate
- Transaction ID
- Sequence Number

Each field is independently optional — absence of one field must not block display of the others or of the tokens themselves.

### 4.10 Progress Indicator
- Visual progress dots (e.g., `● ○ ○ ○ ○ ○ ○ ○ ○ ○ ○`) alongside the numeric "1 / 11" label
- Dots should be tappable on larger screens to jump directly to a token (nice-to-have, not blocking)

### 4.11 Privacy & Data Handling
- All processing happens in-browser; no SMS content or token data is transmitted anywhere
- No analytics events should include token digits, meter numbers, or transaction IDs
- State resets on page reload unless local history (Section 8) is explicitly implemented later with clear user consent/controls

---

## 5. Information Architecture

### 5.1 Routes (v1 scope in bold, rest stubbed)
- **Home** — landing/intro, entry point to Formatter
- **Formatter** — the core workflow described in Section 4
- History — stub/placeholder, "Coming soon"
- Favorites — stub/placeholder
- Settings — theme toggle can live here even in v1
- About — static page, app purpose and disclaimer

### 5.2 Folder Structure

```
src/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   ├── token/
│   └── ui/            # shadcn/ui components
├── pages/
│   ├── Home/
│   ├── Formatter/
│   ├── History/
│   ├── Favorites/
│   ├── Settings/
│   └── About/
├── layouts/
├── routes/
├── hooks/
├── lib/
│   ├── parser.ts
│   ├── formatter.ts
│   ├── validator.ts
│   └── detector.ts
├── utils/
├── types/
├── constants/
├── context/
├── App.tsx
└── main.tsx
```

### 5.3 Parsing Pipeline

```
Paste SMS
   ↓
Detect provider        (detector.ts)
   ↓
Extract token section  (parser.ts)
   ↓
Remove separators       (parser.ts)
   ↓
Keep digits only        (parser.ts)
   ↓
Split every 20 digits   (formatter.ts)
   ↓
Validate                (validator.ts)
   ↓
Format for display      (formatter.ts)
   ↓
Render + Copy / Navigate
```

Each stage is a pure, independently testable function. The UI layer only orchestrates calls into `lib/` — no parsing logic should live in components.

---

## 6. Code Quality Requirements

- Strict TypeScript (`strict: true`, no implicit `any`)
- Modular architecture with single-responsibility modules
- Reusable, composable components
- SOLID principles applied where they add clarity (not dogmatically)
- No duplicated logic between components and `lib/`
- No unnecessary dependencies beyond the stack listed in Section 2
- Parser, formatter, validator, and detector logic must be well-commented, explaining *why*, not just *what*
- Recommend unit tests (Vitest) for all `lib/` modules, covering the edge cases in Section 7

---

## 7. Edge Cases to Handle

- Single token only
- Multiple tokens (2–15+)
- Digits separated by inconsistent spacing/hyphens/line breaks
- SMS with no recognizable provider
- SMS with no token data at all
- Digit count not divisible by 20 (off by one or more)
- Extra whitespace, emojis, or non-ASCII characters mixed into the message
- Very long pasted input (stress-test the textarea and parser)
- Clipboard copy failure (permissions, unsupported browser)

---

## 8. Future Features (Post-v1)

Not built in v1, but the routing/folder structure should not need rework to accommodate them later:

- Local history of parsed SMS/tokens
- Favorite meters
- QR code generation per token
- Voice reading of tokens (text-to-speech)
- OCR from SMS screenshots
- Installable PWA
- Bangla language support (UI and possibly parsing)
- Provider-specific parsing refinements as real-world format variations are discovered
- Export as PDF
- Share formatted tokens (Web Share API)

---

## 9. Open Items / Risks

- **Provider SMS formats are not publicly standardized.** Each provider (BPDB, BREB, DESCO, DPDC, NESCO, WZPDCL) likely has its own message template. Parser accuracy in the real world depends on collecting genuine sample messages from each provider (with sensitive digits redacted) before/during development, rather than assuming a single universal format.
- Decide whether copy actions use raw or spaced-formatted digit strings — should be consistent across the app and documented in the UI (e.g., a tooltip).
- Confirm target browser/OS support given the audience (older Android devices and default browsers are likely common — should inform polyfill/compatibility decisions).

---

## 10. Success Criteria

The application is considered production-ready for v1 when:
- A user can paste a real SMS from any of the six supported providers and get correctly split, validated, and formatted tokens without manual intervention
- Invalid or malformed input produces a clear, non-technical error message
- The full workflow — paste → detect → extract → validate → navigate → copy — works on a small mobile screen with one thumb
- No token or personal data ever leaves the browser