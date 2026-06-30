# Civil At Hand — Developer README (v2 · Final)

> **Full-stack Next.js application** for **Civil At Hand** — a civil engineering
> design & consultancy firm and learning platform.
> Covers business services, a client portal, IS-code calculators, blog, portfolio,
> and a complete **Education platform** (GATE / ESE / SSC-JE test series, courses,
> and mentorship).
>
> 🌐 Live: https://www.civilathand.in · 📍 Haryana, India
>
> **This v2 README replaces the old one.** It documents the current code after the
> Education platform expansion, the homepage trust update, the payment-ready
> config, and the SEO (sitemap) additions. Sections marked 🆕 are new in v2.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Environment Setup](#3-environment-setup)
4. [Folder Structure — Every File Explained](#4-folder-structure)
5. [Page Routes — What Every URL Renders](#5-page-routes)
6. [🆕 Education Platform (Test Series · Mentorship · Courses)](#6-education-platform)
7. [🆕 Test-Series Engine — How Exams Are Built](#7-test-series-engine)
8. [🆕 Central Config & Payments (site.ts + Cashfree)](#8-central-config--payments)
9. [API Routes & MongoDB](#9-api-routes--mongodb)
10. [Authentication & Protected Routes](#10-authentication--protected-routes)
11. [Redirects & Rewrites](#11-redirects--rewrites)
12. [Components](#12-components)
13. [Context & State](#13-context--state)
14. [Data Files](#14-data-files)
15. [🆕 Homepage Trust Update (what changed & why)](#15-homepage-trust-update)
16. [🆕 SEO — Sitemap, Robots, Titles](#16-seo)
17. [Styling System](#17-styling-system)
18. [Dependency Map](#18-dependency-map)
19. [Developer Cheatsheet — Common Tasks](#19-developer-cheatsheet)
20. [Known Issues & TODO](#20-known-issues--todo)
21. [Deploying & Uploading Safely](#21-deploying--uploading-safely)
22. [Business Info](#22-business-info)

---

## 1. Project Overview

| Side | What it does |
|---|---|
| **Business** | Services (structural design, BOQ, BIM, PDF→AutoCAD…), portfolio, blog, contact |
| **Client Portal** | Logged-in clients see projects, invoices, drawings, support chat (`/dashboard`) |
| **Calculators** | IS-code concrete, brick, steel, BOQ, cost calculators |
| **🆕 Education** | GATE / ESE / SSC-JE test series, software courses, 1-on-1 mentorship |
| **Admin** | Hidden panel at `/cah-expert-control` to manage leads, projects, blogs, etc. |

---

## 2. Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.7 | App Router, SSR, API routes |
| React | 19.2.4 | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | v4 | Styling (custom tokens) |
| MongoDB | 7.2.0 | Dynamic data (auth, leads, projects…) |
| Framer Motion | 12.40.0 | Animations |
| Lucide React | 1.17.0 | Icons |
| Google Analytics | G-4N1HBTWPR4 | Analytics |
| Google AdSense | ca-pub-6032648001379559 | Ads |

**Hosting:** Vercel (auto-deploys on every GitHub commit). Build command `next build`.

---

## 3. Environment Setup

```bash
npm install
```

Create `.env.local` in the project root:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/
MONGODB_DB=civil-at-hand
NODE_ENV=development
```

> The Education platform, calculators, and all static pages render **without** a
> database. Only the portal/admin/API features need `MONGODB_URI`.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (this is what Vercel runs)
npm run start   # run the production build
npm run lint    # ESLint
```

---

## 4. Folder Structure

> The **path is the route**. Folders with `[brackets]` are dynamic segments.
> 🆕 = added/changed in v2.

```
src/
├── app/
│   ├── layout.tsx                     ← root layout (wraps every page)
│   ├── globals.css                    ← Tailwind theme + custom classes
│   ├── page.tsx                       ← 🆕 homepage (trust update)
│   │
│   ├── about/ contact/ faq/ blog/ portfolio/ services/ calculators/ …  ← business pages
│   │
│   ├── education/                     ← 🆕 EDUCATION PLATFORM
│   │   ├── page.tsx                   ← /education (landing)
│   │   ├── mentorship/page.tsx        ← /education/mentorship (Google Form)
│   │   ├── courses/
│   │   │   ├── page.tsx               ← /education/courses (list of 5)
│   │   │   └── [course]/page.tsx      ← /education/courses/autocad … (detail)
│   │   └── test-series/
│   │       ├── page.tsx               ← /education/test-series (GATE/ESE/SSC hub)
│   │       ├── gate-pyq/page.tsx          + [subject]/page.tsx
│   │       ├── gate-full-length/page.tsx  + [testId]/page.tsx
│   │       ├── ese-pyq/page.tsx           + [subject]/page.tsx
│   │       ├── ese-full-length/page.tsx   + [testId]/page.tsx
│   │       ├── ssc-pyq/page.tsx           + [subject]/page.tsx
│   │       └── ssc-full-length/page.tsx   + [testId]/page.tsx
│   │
│   └── api/ …                         ← backend (MongoDB) — unchanged
│
├── components/
│   ├── Header.tsx                     ← 🆕 nav now includes "Education"
│   ├── Footer.tsx  AuthGuard.tsx  FloatingSocials.tsx  AdminView.tsx  DashboardView.tsx
│   ├── education/                     ← 🆕
│   │   ├── EnrollButton.tsx           ← smart Free / Pay / Coming-Soon button
│   │   └── MentorshipForm.tsx         ← embeds the Google Form
│   ├── testseries/                    ← 🆕 shared exam engine
│   │   ├── ExamRunner.tsx             ← the exam screen (timer, palette, calc, scoring)
│   │   ├── ExamPyqList.tsx            ← subject grid (ESE/SSC)
│   │   ├── ExamPyqRunner.tsx          ← runs one subject (ESE/SSC)
│   │   ├── ExamFullList.tsx           ← full-test list (ESE/SSC)
│   │   └── ExamFullRunner.tsx         ← builds + runs one full test (ESE/SSC)
│   └── gate/ScientificCalculator.tsx  ← draggable calculator popup
│
├── context/ProjectContext.tsx         ← global data store (portal/admin)
│
├── data/
│   ├── education/
│   │   ├── site.ts                    ← 🆕 form link, payment links, WhatsApp, price
│   │   └── courses.ts                 ← 🆕 the 5 courses + getCourse()
│   ├── testseries/
│   │   ├── blueprints.ts              ← 🆕 full-test "recipes" (GATE/ESE/SSC)
│   │   └── examTypes.ts               ← 🆕 ExamSubjectMeta type
│   ├── gate/    subjects.ts  questions.ts     ← GATE (real questions)
│   ├── ese/     subjects.ts  questions.ts     ← 🆕 ESE (demo questions)
│   ├── ssc/     subjects.ts  questions.ts     ← 🆕 SSC-JE (demo questions)
│   ├── portfolio.ts                   ← portfolio items (see §15 note)
│   └── services.ts                    ← services offered
│
├── lib/
│   ├── assembleTest.ts                ← 🆕 builds a full paper from blueprint + bank
│   ├── mongodb.ts                     ← MongoDB singleton
│   └── utils.ts                       ← generateSlug()
│
└── public/
    ├── sitemap.xml                    ← 🆕 SEO sitemap
    └── robots.txt                     ← 🆕 points crawlers to the sitemap
```

---

## 5. Page Routes

| URL | Auth | Type |
|---|---|---|
| `/` | No | Client |
| `/about` `/privacy-policy` `/terms-and-conditions` `/engineering-disclaimer` | No | Server |
| `/auth` | redirects if logged in | Client |
| `/blog` `/blog/[slug]` `/portfolio` `/portfolio/[id]` | No | Client |
| `/services/all-services` | No | Client |
| `/services/all-services/[slug]` | **Yes** | Client |
| `/calculators` | No | Client |
| `/calculators/{concrete,brick,steel,cost,boq}` | **Yes** | Client |
| `/contact` `/faq` | No | Client |
| `/dashboard` `/profile` | **Yes** | Client |
| **`/education`** | No | Server |
| **`/education/test-series`** | No | Server |
| **`/education/test-series/{gate,ese,ssc}-pyq`** | No | Client |
| **`/education/test-series/{gate,ese,ssc}-pyq/[subject]`** | No | Client |
| **`/education/test-series/{gate,ese,ssc}-full-length`** | No | Client |
| **`/education/test-series/{gate,ese,ssc}-full-length/[testId]`** | No | Client |
| **`/education/mentorship`** | No | Client |
| **`/education/courses`** | No | Server |
| **`/education/courses/[course]`** | No | Client |
| `/cah-expert-control` | No (unprotected) | Client |

> **Server vs Client:** pages that export `metadata` are Server Components
> (landing, test-series hub, courses list). Pages using `useParams()` / hooks are
> Client Components (`"use client"` at the top) — e.g. mentorship, course detail,
> and all the exam pages.

Dynamic segment values:
- `[subject]` → an `id` from the exam's `subjects.ts` (e.g. `soil`, `rcc`, `reasoning`)
- `[testId]` → an `id` from `blueprints.ts` (e.g. `gate-full-1`, `ssc-je-p1-1`, `ese-full-1`)
- `[course]` → a `slug` from `courses.ts` (`autocad`, `revit`, `bim`, `staad-pro`, `iitpave`)

---

## 6. Education Platform

Three programs, all under `/education`:

### 🏆 Test Series — `/education/test-series`
Hub with three exam cards (GATE, ESE/IES, SSC-JE). Each links to:
- **Practice by Subject (PYQ)** — one subject at a time
- **Full-Length Tests** — assembled mock papers

All run inside one engine (see §7): timer, question palette, mark-for-review,
MCQ/MSQ/NAT support, negative marking, draggable scientific calculator, instant
scoring, and per-question solutions.

| Exam | Pattern | Question source |
|---|---|---|
| GATE CE | 65 Q · 100 marks · 3 h | `data/gate/questions.ts` (real) |
| ESE / IES Civil | 150 Q · 300 marks · 3 h | `data/ese/questions.ts` (demo — replace) |
| SSC-JE Civil | Paper 1: 200 Q · Paper 2: 100 Q | `data/ssc/questions.ts` (demo — replace) |

### 👥 Mentorship — `/education/mentorship`
Students **apply via a Google Form** (embedded on the page + linked on buttons).
Shows the mentor, price **₹999**, and is **free for now**. Mentor details live in
the `MENTORS` array at the top of `mentorship/page.tsx` (currently a demo name —
replace with the real one).

### 📚 Courses — `/education/courses`
Five courses, each with its own detail page (`/education/courses/[course]`):
AutoCAD, **Revit (Live)**, BIM, STAAD Pro, **IITPAVE (Live)**. All defined in
`data/education/courses.ts`. Buy buttons show **"Coming Soon"** and are
payment-ready (see §8).

---

## 7. Test-Series Engine

The engine means **you never edit page code to add a test or a question** — you
only edit data files.

### The pieces
| File | Role |
|---|---|
| `data/<exam>/subjects.ts` | subjects shown on the PYQ page |
| `data/<exam>/questions.ts` | the questions for each subject |
| `data/testseries/blueprints.ts` | how many Q each full-length test pulls per subject |
| `lib/assembleTest.ts` | pure function: blueprint + question bank → one shuffled paper (reports shortfalls if a subject lacks enough Q) |
| `components/testseries/ExamRunner.tsx` | the actual exam UI (used by ALL exams) |
| `ExamPyqList / ExamPyqRunner` | generic PYQ pages (ESE & SSC use these) |
| `ExamFullList / ExamFullRunner` | generic full-length pages (ESE & SSC use these) |

GATE keeps its own PYQ list page and full-length pages (they import
`assembleTest` + `GATE_QUESTIONS` directly); ESE and SSC use the generic
components above. All paths end at the same `ExamRunner`.

### Question shape (identical across GATE / ESE / SSC)
```ts
{
  id: 4,
  type: "MCQ",            // "MCQ" | "MSQ" | "NAT"
  marks: 2,               // GATE 1 or 2 · ESE 2 · SSC 1
  neg: "1/3",             // negative-mark fraction · "0" for none
  year: "ESE-2022",
  question: "Question text. HTML allowed: x<sub>2</sub>",
  options: ["(a) …", "(b) …", "(c) …", "(d) …"],  // [] for NAT
  correct: 0,             // 0-based index (0=a, 1=b, 2=c, 3=d)
  natAnswer: "12.5",      // for NAT instead of `correct`
  solution: "Why it's correct. HTML allowed."
}
```

### Add a full-length test
Raise the count in `blueprints.ts` (e.g. GATE `makeTests(..., 5)` → `6`). The list
page and runner pick it up automatically. `free: true/false` controls lock state.

---

## 8. Central Config & Payments

**One file controls links + payment for the whole Education section:**
`src/data/education/site.ts`

```ts
export const MENTORSHIP_FORM_URL   = "https://forms.gle/…";    // apply buttons
export const MENTORSHIP_FORM_EMBED = "https://docs.google.com/forms/d/e/…/viewform?embedded=true";

export const PAYMENT_LINKS = {
  mentorship: "",   // paste Cashfree link to start charging
  testSeries: "",
  course: "",
};

export const WHATSAPP_NUMBER = "917703977002";
export const MENTORSHIP_PRICE = "₹999";
```

### How the EnrollButton behaves (`components/education/EnrollButton.tsx`)
| Condition | Button shows |
|---|---|
| `paymentLink` is `""` (empty) | **green "Free"** → goes to the form / WhatsApp |
| `paymentLink` is set (Cashfree URL) | **orange "Pay & Enroll"** → opens Cashfree |
| `comingSoon: true` | grey **"Coming Soon"** (disabled) |

So to **go paid**: paste a Cashfree payment-link URL into the matching
`PAYMENT_LINKS` field. No page edits needed. Courses also have `comingSoon` flags
in `courses.ts`.

---

## 9. API Routes & MongoDB

*(Unchanged from v1 — summarised.)* All endpoints live under `/api/...`, use
`export const dynamic = "force-dynamic"`, and connect to MongoDB via
`lib/mongodb.ts`. Collections seed themselves from hardcoded `initialXxx` arrays
on first call.

**Endpoints:** `auth/{signin,signup}`, `blogs`, `projects`, `leads`, `invoices`,
`drawings`, `portfolio`, `notifications`, `support-messages`, `upload`,
`user/profile`, `calculator`, `debug-db`.
**Collections:** `users, blogs, projects, leads, invoices, drawings, portfolio,
notifications, chats, settings`.

```ts
import clientPromise from "@/lib/mongodb";
const db = (await clientPromise).db(process.env.MONGODB_DB || "civil-at-hand");
const leads = db.collection("leads");
```

> ⚠️ Passwords are plain text; `/api/debug-db` is public; uploads go to local disk
> (wiped on Vercel redeploy). See §20.

---

## 10. Authentication & Protected Routes

LocalStorage-based. Sign-in → `POST /api/auth/signin` → stores user in
`localStorage["cah_user"]`. `AuthGuard` (in `layout.tsx`) runs on every page and
redirects protected routes to `/auth`.

**Protected:** `/dashboard`, `/profile`, `/calculators/{concrete,brick,steel,cost,boq}`,
`/services/all-services/[slug]`.
**Always public:** home, all info pages, blog, portfolio, `/contact`, `/faq`,
**and the entire `/education/*` section** (no login to practise).

Google sign-in is currently a mock popup (not real OAuth).

---

## 11. Redirects & Rewrites

Defined in `next.config.ts`.
- **301 redirects:** old `/calculator/<name>` URLs → `/calculators/<name>`.
- **Rewrites:** `/services` → renders home; `/calculator` → renders `/calculators`;
  `/calculator/all-calculators/*` → matching calculator pages.

---

## 12. Components

| Component | Used by | Purpose |
|---|---|---|
| `Header.tsx` | every page | nav — 🆕 now includes **Education**; reads `cah_user` |
| `Footer.tsx` | every page | footer links + contact |
| `AuthGuard.tsx` | layout | route protection |
| `FloatingSocials.tsx` | layout | floating WhatsApp/Call/Email button |
| `AdminView.tsx` | `/cah-expert-control` | full admin dashboard (~2000 lines) |
| `DashboardView.tsx` | `/dashboard` | client portal |
| `gate/ScientificCalculator.tsx` | exam pages | draggable scientific calculator |
| 🆕 `education/EnrollButton.tsx` | mentorship, courses | Free/Pay/Coming-Soon button |
| 🆕 `education/MentorshipForm.tsx` | mentorship | embedded Google Form |
| 🆕 `testseries/ExamRunner.tsx` | all exams | the exam screen |
| 🆕 `testseries/ExamPyqList / ExamPyqRunner` | ESE/SSC PYQ | subject grid + runner |
| 🆕 `testseries/ExamFullList / ExamFullRunner` | ESE/SSC full-length | list + runner |

---

## 13. Context & State

`src/context/ProjectContext.tsx` — global store for portal/admin data
(`leads, projects, drawings, invoices, portfolio, notifications, chatMessages,
blogs`) with `add/update/delete` functions. Wrapped around the app in
`layout.tsx`. Access via `useProjects()`.

> The Education platform does **not** use this context — it is fully static/in-memory
> (questions, courses, config are TS files), which is why it works without a DB.

---

## 14. Data Files

| File | Exports | Notes |
|---|---|---|
| `data/services.ts` | `servicesData[]` | `id` → `/services/all-services/[slug]` |
| `data/portfolio.ts` | `portfolioItems[]` | see §15 trust note |
| `data/gate/subjects.ts` | `GATE_SUBJECTS`, `CATEGORY_LABELS` | 16 subjects |
| `data/gate/questions.ts` | `GATE_QUESTIONS` | real questions |
| 🆕 `data/ese/subjects.ts`, `questions.ts` | `ESE_SUBJECTS`, `ESE_QUESTIONS` | demo |
| 🆕 `data/ssc/subjects.ts`, `questions.ts` | `SSC_SUBJECTS`, `SSC_QUESTIONS` | demo |
| 🆕 `data/testseries/blueprints.ts` | `GATE_FULL_TESTS`, `SSCJE_FULL_TESTS`, `ESE_FULL_TESTS`, `getFullTest()` | full-test recipes |
| 🆕 `data/testseries/examTypes.ts` | `ExamSubjectMeta` | shared subject type |
| 🆕 `data/education/site.ts` | form/payment/whatsapp/price | edit links here |
| 🆕 `data/education/courses.ts` | `COURSES`, `getCourse()` | 5 courses |

---

## 15. Homepage Trust Update

`src/app/page.tsx` was updated to remove fake/placeholder content and look genuine:

| Before (problem) | After (fixed) |
|---|---|
| 5 fabricated testimonials with stock-photo faces | Replaced with **honest company promises** (IS-code compliance, direct engineer access, transparent pricing, fast delivery), logo image, "Civil At Hand Promise" badge instead of fake stars. Heading → **"Built On Standards & Trust"**. Ready to hold real reviews later (format kept). |
| "0% Commitment" / "-0%" stats (count-up numbers that show 0 on load & to Google) | Replaced with **static, real facts** (24–48 HR Turnaround, 100% Transparent, Structural Efficiency, Water Conscious) — no animation-from-zero, no invented percentages. |
| Hero CTAs forced login (`/auth`) | **"Get a Free Quote" → WhatsApp**, **"Explore Services" → /services** |

> ⚠️ **`data/portfolio.ts` note:** it contains sample projects naming big firms
> (Tata, L&T) with stock photos. The live `/portfolio` is empty (portal/DB-driven).
> Do **not** publish that sample data as real work — replace with genuine projects.

---

## 16. SEO

🆕 Two files added in `public/`:
- `public/sitemap.xml` → live at `/sitemap.xml` (lists all ~39 public pages incl. Education).
- `public/robots.txt` → allows crawling, blocks `/auth /dashboard /profile /cah-expert-control`, points to the sitemap.

**One-time:** submit `https://www.civilathand.in/sitemap.xml` in Google Search Console.

**Still to do:** every page currently shares the **same `<title>` / meta description**.
Give each page a unique title (in each page's `metadata` export or `layout.tsx`) —
biggest remaining SEO win.

---

## 17. Styling System

`src/app/globals.css`, Tailwind v4 with custom `@theme` tokens.

Brand tokens: `--color-navy-900 #0f2244`, `--color-orange-500 #ff6b00`,
`--color-wix-dark #111`, `--color-wix-gray #f4f4f4`.
Custom classes: `.text-gradient-orange`, `.bg-glass`, `.shadow-premium`,
`.shadow-orange-glow`, `.animate-float`, `.wix-btn-solid`, etc.
Fonts: **Inter** (`font-sans`), **Outfit** (`font-display`).
Education pages use the same tokens (`bg-wix-dark`, `text-orange-500`,
`font-display`) so the look matches the rest of the site.

---

## 18. Dependency Map

```
layout.tsx
├── globals.css
├── <ProjectProvider>  → context → /api/* → MongoDB   (portal/admin only)
├── <AuthGuard>        → localStorage("cah_user")
├── <FloatingSocials />
└── {page}
        ├── Header.tsx (+ Education link) / Footer.tsx
        └── page content

Education exam page (e.g. ESE full-length):
[testId]/page.tsx
└── ExamFullRunner
      ├── getFullTest(testId)      ← data/testseries/blueprints.ts
      ├── assembleTest(bp, bank)   ← lib/assembleTest.ts
      ├── ESE_QUESTIONS            ← data/ese/questions.ts
      └── ExamRunner               ← components/testseries/ExamRunner.tsx
                                      └── gate/ScientificCalculator.tsx

Course detail:
[course]/page.tsx
├── getCourse(slug)   ← data/education/courses.ts
├── EnrollButton      ← components/education/EnrollButton.tsx
└── PAYMENT_LINKS     ← data/education/site.ts
```

---

## 19. Developer Cheatsheet

**Add a page** → create `src/app/<route>/page.tsx` (`"use client"` if it uses hooks).
**Add an API route** → `src/app/api/<name>/route.ts` with `GET/POST` exports.
**Add a service** → append to `servicesData[]` in `data/services.ts`.
**Add GATE/ESE/SSC questions** → append to the subject array in the matching
`data/<exam>/questions.ts` (`correct` is 0-based; NAT uses `natAnswer`).
**Add a full-length test** → raise the count in `data/testseries/blueprints.ts`.
**Add/edit a course** → edit `data/education/courses.ts`; open it for sale with
`comingSoon: false`.
**Change the mentorship form** → `MENTORSHIP_FORM_*` in `data/education/site.ts`.
**Change the mentor** → `MENTORS` array in `app/education/mentorship/page.tsx`.
**Turn on payments** → paste a Cashfree link into `PAYMENT_LINKS` in `site.ts`.
**Add a protected route** → add a condition in `components/AuthGuard.tsx`.

---

## 20. Known Issues & TODO

| Priority | Issue | Fix |
|---|---|---|
| 🔴 | Passwords stored in plain text | add `bcrypt` to auth routes |
| 🔴 | Admin `/cah-expert-control` has no password | rename `proxy.ts` → `middleware.ts`, add token check |
| 🔴 | Uploads go to local disk (wiped on Vercel redeploy) | use S3 / Cloudinary / Vercel Blob |
| 🟡 | `/api/debug-db` is public | remove before production |
| 🟡 | Google sign-in is a mock | integrate `next-auth` Google provider |
| 🟡 | ESE & SSC-JE questions are **demo** | replace with real questions in `data/ese|ssc/questions.ts` |
| 🟡 | Mentor name is a **demo** ("Naveen Kumar") | update `MENTORS` array |
| 🟡 | Live `/portfolio` is empty; sample data looks fabricated | add real projects to `data/portfolio.ts` |
| 🟡 | Every page shares the same `<title>` | add unique titles per page |
| 🟢 | No real payment yet | paste Cashfree links into `PAYMENT_LINKS` (hook is ready) |
| 🟢 | No lead email alerts | add Resend/Nodemailer on lead create |

---

## 21. Deploying & Uploading Safely

Vercel rebuilds on every commit. A build **fails if a page imports a file that is
missing or has wrong content** — the error names the exact file and line.

When uploading via GitHub web:
- **Upload files → drag the whole `src` folder**, and **count the files** before
  committing (drag-drop can silently skip files, especially in `[bracket]` folders).
- For a single file, use **Create new file** and type the full path (never drops files).
- Never paste one file's code into another file's name.

Verify locally before pushing big changes:
```bash
npm run build      # must end with "Compiled successfully"
```

---

## 22. Business Info

| Detail | Value |
|---|---|
| Business | Civil At Hand : Design & Consultancy |
| Location | Haryana, India |
| Phone / WhatsApp | +91 77039 77002 |
| Email | info.civilathand@zohomail.in |
| Site | https://www.civilathand.in |
| Google Analytics | G-4N1HBTWPR4 |
| Google AdSense | ca-pub-6032648001379559 |
| Admin URL | `/cah-expert-control` |
| MongoDB DB | `civil-at-hand` |

---

*v2 — updated after the Education platform, homepage trust update, payment-ready
config, and SEO additions. Generated from full source-code analysis · June 2026.*
