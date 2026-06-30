This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Civil At Hand — Developer README

> **Full-stack Next.js web application** for Civil At Hand — a civil engineering services firm.
> Covers business services, client portal, engineering calculators, blog, portfolio, education & GATE exam prep.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Environment Setup](#3-environment-setup)
4. [Folder Structure — Every File Explained](#4-folder-structure--every-file-explained)
5. [Page Routes — What Every URL Renders](#5-page-routes--what-every-url-renders)
6. [API Routes — All Endpoints](#6-api-routes--all-endpoints)
7. [MongoDB — Database & Collections](#7-mongodb--database--collections)
8. [Authentication System](#8-authentication-system)
9. [Protected vs Public Routes](#9-protected-vs-public-routes)
10. [URL Redirects & Rewrites](#10-url-redirects--rewrites)
11. [Components — What Each Does](#11-components--what-each-does)
12. [Context & State Management](#12-context--state-management)
13. [Data Files — Static Content](#13-data-files--static-content)
14. [Utility Functions](#14-utility-functions)
15. [GATE PYQ Exam System](#15-gate-pyq-exam-system)
16. [Admin Panel](#16-admin-panel)
17. [CSS & Styling System](#17-css--styling-system)
18. [How Files Connect — Dependency Map](#18-how-files-connect--dependency-map)
19. [Adding New Features — Developer Cheatsheet](#19-adding-new-features--developer-cheatsheet)
20. [Known Issues & TODO](#20-known-issues--todo)
21. [Contacts & Business Info](#21-contacts--business-info)

---

## 1. Project Overview

**Civil At Hand** is a professional civil engineering services website that does two things:

| Side | What it does |
|---|---|
| **Business** | Showcases services (structural design, BOQ, BIM), portfolio, contact, blog |
| **Client Portal** | Logged-in clients see project status, invoices, drawings, support chat |
| **Education** | GATE PYQ exam portal, courses, mentorship, test series |
| **Calculators** | IS-code compliant concrete, brick, steel, BOQ, cost calculators |
| **Admin** | Hidden admin panel at `/cah-expert-control` to manage all leads, projects, blogs |

---

## 2. Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.7 | Framework — App Router, SSR, API Routes |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type safety across all files |
| **Tailwind CSS** | v4 | Utility-first styling |
| **MongoDB** | 7.2.0 | Database for all dynamic data |
| **Framer Motion** | 12.40.0 | Page & component animations |
| **Lucide React** | 1.17.0 | Icon library |
| **Google Analytics** | G-4N1HBTWPR4 | Traffic analytics |
| **Google AdSense** | ca-pub-6032648001379559 | Ad monetisation (setup done) |

---

## 3. Environment Setup

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Create `.env.local` file in the project root
```env
# MongoDB connection string (required for ALL dynamic data)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/

# Database name (optional — defaults to "civil-at-hand" if not set)
MONGODB_DB=civil-at-hand

# Node environment
NODE_ENV=development
```

> Without `MONGODB_URI`, the app still renders all pages but all API calls fail.
> The app uses fallback seed data so pages do not crash — but data is not saved.

### Step 3 — Run locally
```bash
npm run dev          # starts on http://localhost:3000
npm run build        # build for production
npm run start        # run production build
npm run lint         # ESLint check
```

---

## 4. Folder Structure — Every File Explained

```
civilathand-v1-main/
├── next.config.ts              ← URL redirects, rewrites, cache headers
├── package.json                ← Dependencies & npm scripts
├── README.md                   ← This file
│
└── src/
    ├── app/                    ← Next.js App Router (every folder = a URL route)
    │   ├── layout.tsx          ← ROOT LAYOUT — wraps ALL pages
    │   ├── globals.css         ← Global CSS, Tailwind theme, custom classes
    │   ├── page.tsx            ← Homepage "/"
    │   ├── icon.jpg            ← Favicon
    │   │
    │   ├── about/
    │   │   └── page.tsx        ← /about
    │   │
    │   ├── auth/
    │   │   └── page.tsx        ← /auth — Sign In / Sign Up page
    │   │
    │   ├── blog/
    │   │   ├── page.tsx        ← /blog — Blog listing page
    │   │   └── [slug]/
    │   │       └── page.tsx    ← /blog/[slug] — Individual blog post (slug from title)
    │   │
    │   ├── cah-expert-control/
    │   │   └── page.tsx        ← /cah-expert-control — HIDDEN ADMIN PANEL
    │   │
    │   ├── calculator/
    │   │   └── page.tsx        ← /calculator — Redirects to /calculators (see rewrites)
    │   │
    │   ├── calculators/
    │   │   ├── page.tsx        ← /calculators — Calculator hub listing (public)
    │   │   ├── concrete/
    │   │   │   └── page.tsx    ← /calculators/concrete — Concrete mix calculator (auth)
    │   │   ├── brick/
    │   │   │   └── page.tsx    ← /calculators/brick — Brick masonry calculator (auth)
    │   │   ├── steel/
    │   │   │   └── page.tsx    ← /calculators/steel — Steel rebar weight (auth)
    │   │   ├── cost/
    │   │   │   └── page.tsx    ← /calculators/cost — Construction cost estimator (auth)
    │   │   └── boq/
    │   │       └── page.tsx    ← /calculators/boq — BOQ AI estimator (auth)
    │   │
    │   ├── contact/
    │   │   └── page.tsx        ← /contact — Contact form (saves lead to MongoDB)
    │   │
    │   ├── dashboard/
    │   │   └── page.tsx        ← /dashboard — CLIENT PORTAL (auth required)
    │   │
    │   ├── education/
    │   │   ├── page.tsx        ← /education — Education hub landing
    │   │   ├── courses/
    │   │   │   └── page.tsx    ← /education/courses
    │   │   ├── mentorship/
    │   │   │   └── page.tsx    ← /education/mentorship
    │   │   └── test-series/
    │   │       ├── page.tsx    ← /education/test-series — Plans & pricing
    │   │       └── gate-pyq/
    │   │           ├── page.tsx       ← /education/test-series/gate-pyq — Subject grid
    │   │           └── [subject]/
    │   │               └── page.tsx   ← /education/test-series/gate-pyq/soil etc.
    │   │
    │   ├── engineering-disclaimer/
    │   │   └── page.tsx        ← /engineering-disclaimer
    │   │
    │   ├── faq/
    │   │   └── page.tsx        ← /faq
    │   │
    │   ├── portfolio/
    │   │   ├── page.tsx        ← /portfolio — Portfolio grid
    │   │   └── [id]/
    │   │       └── page.tsx    ← /portfolio/[id] — Project detail (id from portfolio.ts)
    │   │
    │   ├── privacy-policy/
    │   │   └── page.tsx        ← /privacy-policy
    │   │
    │   ├── profile/
    │   │   └── page.tsx        ← /profile — User profile (auth required)
    │   │
    │   ├── services/
    │   │   ├── page.tsx        ← /services — Redirects to homepage (see rewrites)
    │   │   └── all-services/
    │   │       ├── page.tsx    ← /services/all-services — Services listing
    │   │       └── [slug]/
    │   │           └── page.tsx ← /services/all-services/[slug] — Service detail (auth)
    │   │
    │   ├── terms-and-conditions/
    │   │   └── page.tsx        ← /terms-and-conditions
    │   │
    │   └── api/                ← ALL BACKEND API ROUTES (connect to MongoDB)
    │       ├── auth/
    │       │   ├── signin/route.ts    ← POST /api/auth/signin
    │       │   └── signup/route.ts    ← POST /api/auth/signup
    │       ├── blogs/
    │       │   ├── route.ts           ← GET + POST /api/blogs
    │       │   └── [id]/route.ts      ← PUT + DELETE /api/blogs/[id]
    │       ├── calculator/
    │       │   └── route.ts           ← GET + POST /api/calculator
    │       ├── debug-db/
    │       │   └── route.ts           ← GET /api/debug-db (dev tool, remove in prod)
    │       ├── drawings/
    │       │   ├── route.ts           ← GET + POST /api/drawings
    │       │   └── [id]/route.ts      ← PUT + DELETE /api/drawings/[id]
    │       ├── invoices/
    │       │   ├── route.ts           ← GET + POST /api/invoices
    │       │   └── [id]/route.ts      ← PUT + DELETE /api/invoices/[id]
    │       ├── leads/
    │       │   ├── route.ts           ← GET + POST /api/leads
    │       │   └── [id]/route.ts      ← PUT + DELETE /api/leads/[id]
    │       ├── notifications/
    │       │   └── route.ts           ← GET + POST + PUT /api/notifications
    │       ├── portfolio/
    │       │   ├── route.ts           ← GET + POST /api/portfolio
    │       │   └── [id]/route.ts      ← PUT + DELETE /api/portfolio/[id]
    │       ├── projects/
    │       │   ├── route.ts           ← GET + POST /api/projects
    │       │   └── [id]/route.ts      ← PUT + DELETE /api/projects/[id]
    │       ├── support-messages/
    │       │   └── route.ts           ← GET + POST /api/support-messages
    │       ├── upload/
    │       │   └── route.ts           ← POST /api/upload (saves file to public/uploads/)
    │       └── user/
    │           └── profile/route.ts   ← PUT /api/user/profile
    │
    ├── components/
    │   ├── Header.tsx          ← Site nav (used on every page, imported per-page)
    │   ├── Footer.tsx          ← Site footer (used on every page, imported per-page)
    │   ├── AuthGuard.tsx       ← Route protection (in layout.tsx — runs on every page)
    │   ├── FloatingSocials.tsx ← Floating WhatsApp/Call/Email button (in layout.tsx)
    │   ├── AdminView.tsx       ← Admin dashboard UI — only used on /cah-expert-control
    │   ├── DashboardView.tsx   ← Client portal UI — only used on /dashboard
    │   └── gate/
    │       └── ScientificCalculator.tsx ← Draggable calc popup for GATE exam
    │
    ├── context/
    │   └── ProjectContext.tsx  ← Global React Context — all dynamic data + CRUD functions
    │
    ├── data/
    │   ├── portfolio.ts        ← Static portfolio project cards (16+ real projects)
    │   ├── services.ts         ← Static services offered (6+ engineering services)
    │   └── gate/
    │       ├── subjects.ts     ← 16 GATE CE subjects config (id, name, free/locked, color)
    │       └── questions.ts    ← 160+ real PYQ questions with full solutions
    │
    ├── lib/
    │   ├── mongodb.ts          ← MongoDB singleton client (HMR-safe)
    │   └── utils.ts            ← generateSlug() utility function
    │
    └── proxy.ts                ← Admin route middleware (currently allows all — see TODO)
```

---

## 5. Page Routes — What Every URL Renders

| URL | File | Auth Required | Component Type |
|---|---|---|---|
| `/` | `app/page.tsx` | No | Client |
| `/about` | `app/about/page.tsx` | No | Server |
| `/auth` | `app/auth/page.tsx` | Redirects if logged in | Client |
| `/blog` | `app/blog/page.tsx` | No | Client |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | No | Client |
| `/calculators` | `app/calculators/page.tsx` | No | Client |
| `/calculators/concrete` | `app/calculators/concrete/page.tsx` | **Yes** | Client |
| `/calculators/brick` | `app/calculators/brick/page.tsx` | **Yes** | Client |
| `/calculators/steel` | `app/calculators/steel/page.tsx` | **Yes** | Client |
| `/calculators/cost` | `app/calculators/cost/page.tsx` | **Yes** | Client |
| `/calculators/boq` | `app/calculators/boq/page.tsx` | **Yes** | Client |
| `/contact` | `app/contact/page.tsx` | No | Client |
| `/dashboard` | `app/dashboard/page.tsx` | **Yes** | Client |
| `/education` | `app/education/page.tsx` | No | Server |
| `/education/courses` | `app/education/courses/page.tsx` | No | Server |
| `/education/mentorship` | `app/education/mentorship/page.tsx` | No | Server |
| `/education/test-series` | `app/education/test-series/page.tsx` | No | Server |
| `/education/test-series/gate-pyq` | `app/education/test-series/gate-pyq/page.tsx` | No | Client |
| `/education/test-series/gate-pyq/[subject]` | `app/education/test-series/gate-pyq/[subject]/page.tsx` | No | Client |
| `/faq` | `app/faq/page.tsx` | No | Client |
| `/portfolio` | `app/portfolio/page.tsx` | No | Client |
| `/portfolio/[id]` | `app/portfolio/[id]/page.tsx` | No | Client |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | No | Server |
| `/profile` | `app/profile/page.tsx` | **Yes** | Client |
| `/services/all-services` | `app/services/all-services/page.tsx` | No | Client |
| `/services/all-services/[slug]` | `app/services/all-services/[slug]/page.tsx` | **Yes** | Client |
| `/terms-and-conditions` | `app/terms-and-conditions/page.tsx` | No | Server |
| `/engineering-disclaimer` | `app/engineering-disclaimer/page.tsx` | No | Server |
| `/cah-expert-control` | `app/cah-expert-control/page.tsx` | No (unprotected) | Client |

### Understanding `[subject]`, `[slug]`, `[id]`
These are **Next.js dynamic segments** — NOT literal folder names. The value in the URL gets passed to the page via `useParams()`:

| URL visited | Folder name | Value captured |
|---|---|---|
| `/blog/soil-bearing-capacity` | `[slug]` | `{ slug: "soil-bearing-capacity" }` |
| `/portfolio/tata-projects` | `[id]` | `{ id: "tata-projects" }` |
| `/services/all-services/structural-design` | `[slug]` | `{ slug: "structural-design" }` |
| `/education/test-series/gate-pyq/soil` | `[subject]` | `{ subject: "soil" }` |

Valid values for `[subject]` are the `id` fields in `src/data/gate/subjects.ts`.

---

## 6. API Routes — All Endpoints

All live at `/api/...` and connect to MongoDB. All use `export const dynamic = "force-dynamic"` to prevent caching.

### Authentication
| Endpoint | Method | Request Body | Response |
|---|---|---|---|
| `/api/auth/signin` | POST | `{ email, password }` or `{ email, isGoogle: true, name }` | User object (no password field) |
| `/api/auth/signup` | POST | `{ name, email, password }` | Created user object |

> Passwords are stored in plain text currently. Add `bcrypt` before production scale.

### Blogs
| Endpoint | Method | What it does |
|---|---|---|
| `/api/blogs` | GET | Returns all blogs from `blogs` collection |
| `/api/blogs` | POST | Creates new blog post, auto-generates `slug` using `generateSlug()` |
| `/api/blogs/[id]` | PUT | Updates a blog post |
| `/api/blogs/[id]` | DELETE | Deletes a blog post |

### Projects
| Endpoint | Method | What it does |
|---|---|---|
| `/api/projects` | GET | Returns all projects |
| `/api/projects` | POST | Creates new project |
| `/api/projects/[id]` | PUT | Updates project (status, progress, drawings, etc.) |
| `/api/projects/[id]` | DELETE | Deletes project |

### Leads (Sales CRM)
| Endpoint | Method | What it does |
|---|---|---|
| `/api/leads` | GET | Returns all leads |
| `/api/leads` | POST | Creates lead (called from contact form and calculators) |
| `/api/leads/[id]` | PUT | Updates lead status: `new → contacted → converted → archived` |
| `/api/leads/[id]` | DELETE | Deletes lead |

### Invoices
| Endpoint | Method | What it does |
|---|---|---|
| `/api/invoices` | GET | Returns all invoices |
| `/api/invoices` | POST | Creates invoice |
| `/api/invoices/[id]` | PUT | Marks invoice `Paid` or `Unpaid` |
| `/api/invoices/[id]` | DELETE | Deletes invoice |

### Drawings
| Endpoint | Method | What it does |
|---|---|---|
| `/api/drawings` | GET | Returns all drawing file records |
| `/api/drawings` | POST | Creates drawing record |
| `/api/drawings/[id]` | PUT | Updates drawing status |
| `/api/drawings/[id]` | DELETE | Deletes drawing record |

### Portfolio
| Endpoint | Method | What it does |
|---|---|---|
| `/api/portfolio` | GET | Returns all portfolio items |
| `/api/portfolio` | POST | Creates portfolio item |
| `/api/portfolio/[id]` | PUT | Updates portfolio item |
| `/api/portfolio/[id]` | DELETE | Deletes portfolio item |

### Other
| Endpoint | Method | What it does |
|---|---|---|
| `/api/notifications` | GET | Returns all notifications |
| `/api/notifications` | POST | Creates notification |
| `/api/notifications` | PUT | Marks notification as read |
| `/api/support-messages` | GET | Returns support chat messages |
| `/api/support-messages` | POST | Sends support chat message |
| `/api/upload` | POST | Accepts `multipart/form-data`, saves to `public/uploads/`, returns `{ url }` |
| `/api/user/profile` | PUT | Updates logged-in user name/email |
| `/api/calculator` | GET/POST | IS-code quantity calculations (concrete/brick/steel/BOQ/cost) |
| `/api/debug-db` | GET | Tests MongoDB connection — **remove before production** |

---

## 7. MongoDB — Database & Collections

**Database name**: `civil-at-hand` (or `MONGODB_DB` env var)

| Collection | What's stored | Key fields |
|---|---|---|
| `users` | User accounts | `id`, `name`, `email`, `password`, `createdAt` |
| `blogs` | Blog posts | `id`, `title`, `summary`, `content`, `category`, `date`, `author`, `image`, `status`, `slug` |
| `projects` | Client projects | `id`, `title`, `clientName`, `service`, `areaSqFt`, `location`, `status`, `progress`, `drawings[]`, `quoteAmount`, `invoicePaid` |
| `leads` | Sales enquiries | `id`, `name`, `email`, `phone`, `service`, `source`, `details`, `status`, `date` |
| `invoices` | Project invoices | `id`, `projectId`, `projectTitle`, `amount`, `dueDate`, `status`, `dateGenerated` |
| `drawings` | Drawing file records | `id`, `name`, `size`, `uploadDate`, `status`, `serviceType`, `url` |
| `portfolio` | Showcase items | mirrors `data/portfolio.ts` structure |
| `notifications` | In-app notifications | `id`, `title`, `message`, `type`, `timestamp`, `read`, `isAdmin` |
| `chats` | Support messages | `id`, `text`, `sender`, `timestamp` |
| `settings` | App config | (reserved for future use) |

### Seed data behaviour
Every API route has hardcoded `initialXxx` arrays. On first API call:
1. Checks if MongoDB collection is empty
2. If empty → seeds with initial data automatically
3. All future calls use MongoDB exclusively

To reset any collection: delete all documents in MongoDB Atlas and reload the page.

### MongoDB connection singleton
`src/lib/mongodb.ts` exports `clientPromise`. In development, the connection survives hot module reloads via a global variable. In production, a fresh connection is made per serverless function cold start.

Usage in any API route:
```typescript
import clientPromise from "@/lib/mongodb";

const client = await clientPromise;
const db = client.db(process.env.MONGODB_DB || "civil-at-hand");
const collection = db.collection("leads");
```

---

## 8. Authentication System

### Sign-in flow
1. User submits email + password at `/auth`
2. Frontend calls `POST /api/auth/signin`
3. API queries MongoDB `users` collection
4. On match → returns user object (no password)
5. Frontend stores it: `localStorage.setItem("cah_user", JSON.stringify(user))`
6. AuthGuard on next navigation sees the key and allows protected routes

### Sign-out
```javascript
localStorage.removeItem("cah_user");
// AuthGuard automatically redirects to /auth on next protected route visit
```

### Reading auth state anywhere
```typescript
const userJson = localStorage.getItem("cah_user");
const user = userJson ? JSON.parse(userJson) : null;
const isLoggedIn = !!user;
```

### Google Sign-In
Currently a simulated popup — not real OAuth. To implement real Google OAuth, add `next-auth` with the Google provider.

### LocalStorage key
| Key | Value | Used by |
|---|---|---|
| `cah_user` | JSON string of user object | AuthGuard, Header, ProjectContext |

---

## 9. Protected vs Public Routes

`AuthGuard` in `src/components/AuthGuard.tsx` runs on every page (via `layout.tsx`).

### Requires login (redirects to `/auth` if not logged in)
- `/calculators/concrete`
- `/calculators/brick`
- `/calculators/steel`
- `/calculators/cost`
- `/calculators/boq`
- `/services/all-services/[slug]`
- `/dashboard`
- `/profile`

### Always public
- `/` and all static info pages
- `/calculators` (listing only — individual calc pages need login)
- `/services/all-services` (listing only)
- `/blog/*`, `/portfolio/*`
- `/education/*` including all GATE PYQ pages
- `/contact`, `/faq`, `/about`

### `/cah-expert-control`
Currently open to anyone who knows the URL. See TODO section to add password protection.

---

## 10. URL Redirects & Rewrites

Defined in `next.config.ts`. All happen server-side before the page loads.

### Permanent Redirects (301 — browser updates URL)
```
/calculator/construction-cost-estimator  →  /calculators/cost
/calculator/concrete-volumetrics         →  /calculators/concrete
/calculator/steel-rebar-weight           →  /calculators/steel
/calculator/brick-masonry-wall           →  /calculators/brick
/calculator/ai-boq-takeoff               →  /calculators/boq
```

### Rewrites (URL stays the same, different page renders underneath)
```
/services                   →  renders /  (homepage)
/calculator                 →  renders /calculators
/calculator/all-calculators →  renders /calculators
/calculator/all-calculators/construction-cost-estimator  →  renders /calculators/cost
/calculator/all-calculators/concrete-volumetrics         →  renders /calculators/concrete
/calculator/all-calculators/steel-rebar-weight           →  renders /calculators/steel
/calculator/all-calculators/brick-masonry-wall           →  renders /calculators/brick
/calculator/all-calculators/ai-boq-takeoff               →  renders /calculators/boq
/calculator/:path*          →  renders /calculators/:path*
```

---

## 11. Components — What Each Does

### `Header.tsx`
Main navigation bar. Imported individually by pages that need it. Contains logo, nav links, mobile hamburger. Reads `localStorage` for `cah_user` to show user name when logged in.

### `Footer.tsx`
Site footer. Imported individually by pages. Contains nav links, contact info, social links, copyright.

### `AuthGuard.tsx`
Wraps all pages via `layout.tsx`. Runs on every navigation. Reads `localStorage("cah_user")`. If user is not logged in and the path is a protected route, redirects to `/auth`. Shows loading spinner during check to prevent flash of protected content.

### `FloatingSocials.tsx`
Fixed bottom-right floating button on every page (added in `layout.tsx`). Opens a panel with WhatsApp, phone, and email links. Has click-outside-to-close. Delays mounting by 0ms to avoid SSR mismatch.

### `AdminView.tsx`
Large (~2000+ line) admin dashboard component. Used exclusively on `/cah-expert-control`. Has tabs for: Leads, Projects, Invoices, Drawings, Blogs, Portfolio, Notifications, Support, Analytics. All data through `useProjects()` from ProjectContext. All mutations via API fetch calls.

### `DashboardView.tsx`
Client portal dashboard component. Used exclusively on `/dashboard`. Shows projects, invoices, drawings, notifications, support chat for the logged-in client. Data through `useProjects()`.

### `gate/ScientificCalculator.tsx`
Draggable scientific calculator popup. Used only inside the GATE exam page. Supports: sin/cos/tan (inverse too), sinh/cosh/tanh, log/ln, x²/x³/√x/xʸ, π/e/n!, memory buttons (MC/MR/MS/M+/M−), Deg/Rad mode toggle. Draggable by mouse on the title bar. Closes with × button.

---

## 12. Context & State Management

### `src/context/ProjectContext.tsx`

Central data store for all dynamic content. Wraps entire app in `layout.tsx` via `<ProjectProvider>`.

**Data managed:**
- `leads` — all sales leads
- `projects` — all client projects
- `drawings` — all drawing files
- `invoices` — all invoices
- `portfolio` — portfolio items (MongoDB + static fallback)
- `notifications` — in-app notifications
- `chatMessages` — support chat
- `blogs` — all blog posts

**Functions exposed:**
- `addLead`, `updateLead`, `deleteLead`
- `addProject`, `updateProject`, `deleteProject`
- `addDrawing`, `updateDrawing`, `deleteDrawing`
- `addInvoice`, `updateInvoice`, `deleteInvoice`
- `addNotification`, `markNotificationRead`
- `addChatMessage`
- `addBlog`, `updateBlog`, `deleteBlog`
- `addPortfolioItem`, `updatePortfolioItem`, `deletePortfolioItem`

**How to use in any component:**
```typescript
import { useProjects } from "@/context/ProjectContext";

export default function MyComponent() {
  const { leads, addLead, updateProject } = useProjects();
  // ...
}
```

Only works in components inside `<ProjectProvider>` — which is everything, since it is in `layout.tsx`.

---

## 13. Data Files — Static Content

### `src/data/services.ts`
Exports `servicesData: ServiceItem[]`. Contains all engineering services. Each service: `id`, `title`, `desc`, `fullDetails`, `features[]`, `standards[]`, `deliverables[]`. The `id` becomes the URL slug for `/services/all-services/[slug]`.

### `src/data/portfolio.ts`
Exports `portfolioItems: PortfolioItem[]`. Static portfolio data, also synced to MongoDB. Each item has `id`, `title`, `category`, `area`, `loc`, `img`, `status`, `description`, `fullDetails`, `specs[]`, `challenges[]`, `solutions[]`, `gallery[]`. The `id` is what appears in `/portfolio/[id]`.

### `src/data/gate/subjects.ts`
Exports `GATE_SUBJECTS: GateSubject[]` and `CATEGORY_LABELS`. Defines all 16 GATE CE subjects. Key fields: `id` (used in URL), `name`, `free` (controls lock/unlock), `color` (hex card color), `totalQuestions`, `bookPages`.

Valid subject IDs (used in URL `/education/test-series/gate-pyq/[id]`):
`eng-mech`, `som`, `structural`, `const-mat`, `rcc`, `steel`, `soil`, `fluid`, `hydrology`, `irrigation`, `environmental`, `transport`, `geomatics`, `math`, `aptitude`, `english`

### `src/data/gate/questions.ts`
Exports `GATE_QUESTIONS: Record<string, GateQuestion[]>`. Keys are subject IDs. Currently 10 questions per subject = 160 total. Each question: `id`, `type` (MCQ/MSQ/NAT), `marks` (1 or 2), `neg` (e.g. "2/3"), `year`, `question` (HTML ok), `options[]`, `correct` (0-based), `solution` (HTML ok).

---

## 14. Utility Functions

### `src/lib/utils.ts`
```typescript
generateSlug(title: string): string
// "Soil Bearing Capacity" → "soil-bearing-capacity"
// Used for blog post URLs
```

### `src/lib/mongodb.ts`
```typescript
export default clientPromise: Promise<MongoClient>
// Import this in any API route to get a MongoDB connection
```

---

## 15. GATE PYQ Exam System

Complete GATE CBT (Computer Based Test) replica. No backend — all state is in-memory React. Free for students currently.

### User flow
```
/education/test-series
    → Click "Solve PYQ — Free" on GATE CE card
/education/test-series/gate-pyq
    → 16 subject cards with category filter tabs
/education/test-series/gate-pyq/soil  (any subject ID)
    → Full GATE exam: timer + palette + questions + calculator
    → Submit
Result page (same URL, exam "phase" state switches to "result")
```

### Files involved
| File | Role |
|---|---|
| `data/gate/subjects.ts` | Subject metadata, which are free, colors |
| `data/gate/questions.ts` | All PYQ questions with solutions |
| `app/education/test-series/gate-pyq/page.tsx` | Subject selection grid |
| `app/education/test-series/gate-pyq/[subject]/page.tsx` | Full exam interface |
| `components/gate/ScientificCalculator.tsx` | Calculator popup |

### Exam interface features
- 3-hour countdown timer (auto-submits at 0)
- Question palette with colour states: Grey=not visited, Red=visited+unanswered, Green=answered, Purple=marked for review, Purple+green border=answered+marked
- Mark for Review / Clear Response / Save & Next / Submit buttons
- Show/Hide Solution per question (PYQ answers visible for practice)
- Scientific calculator popup (draggable)
- Instructions modal
- Submit confirmation with attempt summary
- Result screen: score, percentage, correct/wrong/unattempted, full answer key

### To add more questions
```typescript
// In src/data/gate/questions.ts
"soil": [
  // ...existing questions...
  {
    id: 21,
    type: "MCQ",
    marks: 2,
    neg: "2/3",
    year: "GATE-2024",
    question: "Question text. HTML allowed: x<sub>2</sub>",
    options: ["(a) Option A", "(b) Option B", "(c) Option C", "(d) Option D"],
    correct: 1,   // 0 = A, 1 = B, 2 = C, 3 = D
    solution: "Solution text. HTML allowed.",
  },
],
```

### To lock a subject for payment
```typescript
// In src/data/gate/subjects.ts
{ id: "steel", name: "Design of Steel Structure", free: false, ... }
// UI automatically shows "Coming Soon" button
// Wire payment by replacing that button with a Link to your payment page
```

---

## 16. Admin Panel

**URL**: `/cah-expert-control` — Not linked publicly. Access by direct URL only.

| Tab | What you can do |
|---|---|
| Leads | View all enquiries, change status, delete |
| Projects | Create/edit/delete projects, update progress |
| Invoices | Create invoices, mark paid/unpaid, delete |
| Drawings | Upload and manage drawing files |
| Blogs | Write, edit, publish, delete blog posts |
| Portfolio | Add/edit/delete portfolio showcase items |
| Notifications | View and clear notifications |
| Support | Reply to client support messages |
| Analytics | Leads count, active projects, revenue summary |

### Security — currently no password
`src/proxy.ts` is configured as middleware for this route but allows all traffic through (`return NextResponse.next()`). To add a password, rename `proxy.ts` to `middleware.ts` and add a real token check.

---

## 17. CSS & Styling System

File: `src/app/globals.css`

Uses Tailwind CSS v4 with custom `@theme` design tokens.

### Brand colour tokens
```css
--color-navy-950: #0a192f     ← Deep dark navy (primary brand dark)
--color-navy-900: #0f2244     ← Main dark background
--color-orange-500: #ff6b00   ← Primary accent / CTA colour
--color-orange-600: #e05e00   ← Hover for orange buttons
--color-wix-dark: #111111     ← Near-black for Wix-style UI
--color-wix-gray: #f4f4f4     ← Light grey section backgrounds
--color-wix-cream: #faf9f6    ← Warm off-white backgrounds
```

### Custom utility classes
| Class | Purpose |
|---|---|
| `.text-gradient-navy` | Navy gradient text clipped to the text shape |
| `.text-gradient-orange` | Orange gradient text |
| `.bg-glass` | Frosted glass card (blur + white semi-transparent) |
| `.bg-glass-dark` | Dark frosted glass (for dark section cards) |
| `.shadow-premium` | Subtle multi-layer shadow for elevated cards |
| `.shadow-premium-lg` | Larger version of premium shadow |
| `.shadow-orange-glow` | Orange glow drop shadow for CTAs |
| `.animate-float` | Gentle up-down float animation (4s loop) |
| `.animate-pulse-slow` | Slow opacity pulse (6s loop) |
| `.wix-btn-solid` | Black uppercase Wix-style solid button |
| `.wix-btn-outline` | Outlined version of the Wix button |
| `.prose-invert` | Dark-theme blog/markdown content styles |
| `.prose-wix` | Light-theme blog/markdown content styles |

### Fonts
- **Body**: `Inter` (from Google Fonts) — `font-sans`
- **Headings/Display**: `Outfit` (from Google Fonts) — `font-display`

---

## 18. How Files Connect — Dependency Map

```
src/app/layout.tsx
├── globals.css                          ← styles for everything
├── <ProjectProvider>                    ← wraps everything, provides data
│     └── context/ProjectContext.tsx
│           └── calls /api/leads, /api/projects, etc.
│                   └── lib/mongodb.ts → MongoDB Atlas
├── <AuthGuard>                          ← runs on every page load
│     └── reads localStorage("cah_user")
│     └── redirects protected routes
├── <FloatingSocials />                  ← always visible
└── {children}                           ← every page below

Every typical page:
page.tsx
├── components/Header.tsx
├── [page-specific content]
│   ├── useProjects()                    ← data from ProjectContext
│   ├── fetch("/api/...")                ← mutations
│   ├── data/portfolio.ts                ← static data
│   └── data/services.ts                ← static data
└── components/Footer.tsx

GATE exam pages:
gate-pyq/page.tsx
└── data/gate/subjects.ts               ← 16 subjects config

gate-pyq/[subject]/page.tsx
├── useParams() → { subject: "soil" }
├── data/gate/subjects.ts               ← find subject by id
├── data/gate/questions.ts              ← get questions for subject
└── components/gate/ScientificCalculator.tsx  ← popup calculator
```

---

## 19. Adding New Features — Developer Cheatsheet

### Add a new page
```bash
mkdir src/app/your-page
# create src/app/your-page/page.tsx
# Page is live at /your-page — no routing config needed
```
Add `"use client"` at top if you use React hooks. Import `Header` and `Footer`.

### Add a new API endpoint
```bash
mkdir src/app/api/your-endpoint
# create src/app/api/your-endpoint/route.ts
# export async function GET(request: Request) { ... }
# export async function POST(request: Request) { ... }
```

### Add a new MongoDB collection
```typescript
// In any route.ts file:
const db = client.db(dbName);
const myCollection = db.collection("my-new-collection");
```

### Add a blog post
Admin panel → `/cah-expert-control` → Blogs tab → Write → Publish.

### Add a portfolio item
Admin panel → `/cah-expert-control` → Portfolio tab → Add item.

### Add a new service
Edit `src/data/services.ts` — add object to `servicesData[]`. Detail page at `/services/all-services/your-id` auto-generates.

### Add GATE questions
Edit `src/data/gate/questions.ts` → find subject key → append to array.

### Unlock a GATE subject
Edit `src/data/gate/subjects.ts` → set `free: true` on that subject.

### Add new protected route
Edit `src/components/AuthGuard.tsx` → add condition to `isProtectedPage` check.

### Add a new calculator
Create `src/app/calculators/your-calc/page.tsx`. AuthGuard automatically protects it. Optionally call `/api/calculator` with a `type` parameter for IS-code calculations.

---

## 20. Known Issues & TODO

| Priority | Issue | Fix |
|---|---|---|
| 🔴 High | Passwords stored in plain text | Add `bcrypt` to `/api/auth/signup` and `/signin` |
| 🔴 High | Admin panel has no password protection | Rename `proxy.ts` → `middleware.ts`, add token check |
| 🔴 High | File uploads go to local disk (`public/uploads/`) | On Vercel, local files are wiped on redeploy. Use S3, Cloudinary, or Vercel Blob |
| 🟡 Medium | Google Sign-In is a mock popup | Integrate `next-auth` with Google provider |
| 🟡 Medium | No payment gateway for locked GATE subjects | Add Razorpay or Stripe, link to locked subject buttons |
| 🟡 Medium | `/api/debug-db` is publicly accessible | Remove or add auth check before going to production |
| 🟡 Medium | No rate limiting on auth endpoints | Add rate limiter to `/api/auth/signin` to prevent brute force |
| 🟡 Medium | GATE questions are sample data (10 per subject) | Add full 1000+ questions from IES Master book to `questions.ts` |
| 🟢 Low | No email notifications for new leads | Add Nodemailer or Resend to send alert emails when a lead is created |
| 🟢 Low | `localStorage("cah_user")` never expires | Add expiry timestamp and check on AuthGuard |

---

## 21. Contacts & Business Info

| Detail | Value |
|---|---|
| Business | Civil At Hand |
| Phone | +91 77039 77002 |
| WhatsApp | https://wa.me/message/JNVZ7YY6BQJ3L1 |
| Email | info.civilathand@zohomail.in |
| Google Analytics | G-4N1HBTWPR4 |
| Google AdSense | ca-pub-6032648001379559 |
| Admin URL | `/cah-expert-control` |
| MongoDB DB Name | `civil-at-hand` |

---

*README generated from full source code analysis — Civil At Hand v1 · June 2026*
