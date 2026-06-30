// ============================================================
// PLACE THIS FILE AT:
//   src/lib/assembleTest.ts
// ============================================================
// Pure logic. Takes your question bank + a full-length blueprint
// and builds one real exam paper: it pulls the right number of
// 1-mark / 2-mark questions from each subject, shuffles them with
// a fixed seed (so each test id is reproducible), and reports any
// subject where the bank doesn't yet have enough questions.
// ============================================================

import type { FullTestBlueprint, BlueprintSection } from "@/data/testseries/blueprints";

// Minimal shape the engine needs. Matches GateQuestion in
// src/data/gate/questions.ts so banks plug in directly.
export interface BankQuestion {
  id: number;
  type: "MCQ" | "MSQ" | "NAT";
  marks: 1 | 2;
  neg: string;
  year: string;
  question: string;
  options: string[];
  correct: number;
  natAnswer?: string;
  solution: string;
}

// A question as it appears inside an assembled paper (marks/neg may
// be overridden by the blueprint, e.g. SSC-JE uniform marks).
export interface AssembledQuestion extends BankQuestion {
  sectionLabel: string;
}

export interface SectionShortfall {
  subjectId: string;
  label: string;
  requested: number;
  delivered: number;
}

export interface AssembledTest {
  blueprintId: string;
  name: string;
  subtitle: string;
  durationSec: number;
  negative: string;
  questions: AssembledQuestion[];
  totalMarks: number;
  expectedQuestions: number;
  expectedMarks: number;
  complete: boolean;            // true if no subject was short
  shortfalls: SectionShortfall[];
}

type Bank = Record<string, BankQuestion[]>;

// ── tiny seeded RNG (mulberry32) — deterministic across reloads ──
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pull `n` questions of a target mark value from a pool, without
// reusing any already-taken question. `used` holds composite keys
// ("subjectId#id") because each subject numbers its questions from 1,
// so ids collide across subjects and must be namespaced.
function take(
  subjectId: string,
  pool: BankQuestion[],
  n: number,
  markFilter: 1 | 2 | null,
  used: Set<string>,
  rand: () => number
): BankQuestion[] {
  if (n <= 0) return [];
  const key = (q: BankQuestion) => `${subjectId}#${q.id}`;
  let candidates = pool.filter((q) => !used.has(key(q)) && (markFilter === null || q.marks === markFilter));
  // Fallback: if not enough of the requested mark, allow any mark.
  if (candidates.length < n && markFilter !== null) {
    candidates = pool.filter((q) => !used.has(key(q)));
  }
  const picked = shuffle(candidates, rand).slice(0, n);
  picked.forEach((q) => used.add(key(q)));
  return picked;
}

/**
 * Build a full-length paper from the bank using a blueprint.
 * Questions across the whole paper are renumbered 1..N and shuffled
 * within each section so two attempts of the same test id match.
 */
export function assembleTest(blueprint: FullTestBlueprint, bank: Bank): AssembledTest {
  const rand = mulberry32(hashSeed(blueprint.id));
  const used = new Set<string>();
  const out: AssembledQuestion[] = [];
  const shortfalls: SectionShortfall[] = [];

  const uniform = blueprint.markValue; // SSC-JE etc.

  for (const sec of blueprint.sections) {
    const pool = bank[sec.subjectId] ?? [];
    let collected: BankQuestion[] = [];

    if (uniform) {
      // every question worth the same — total count lives in oneMark
      collected = take(sec.subjectId, pool, sec.oneMark, null, used, rand);
    } else {
      collected = [
        ...take(sec.subjectId, pool, sec.twoMark, 2, used, rand),
        ...take(sec.subjectId, pool, sec.oneMark, 1, used, rand),
      ];
    }

    const requested = uniform ? sec.oneMark : sec.oneMark + sec.twoMark;
    if (collected.length < requested) {
      shortfalls.push({
        subjectId: sec.subjectId,
        label: sec.label,
        requested,
        delivered: collected.length,
      });
    }

    for (const q of collected) {
      out.push({
        ...q,
        marks: (uniform ? uniform : q.marks) as 1 | 2,
        neg: blueprint.negative,
        sectionLabel: sec.label,
        type: q.type,
      });
    }
  }

  // renumber sequentially for clean palette display
  const questions = out.map((q, i) => ({ ...q, id: i + 1 }));
  const totalMarks = questions.reduce((s, q) => s + (q.marks as number), 0);

  return {
    blueprintId: blueprint.id,
    name: blueprint.name,
    subtitle: blueprint.subtitle,
    durationSec: blueprint.durationSec,
    negative: blueprint.negative,
    questions,
    totalMarks,
    expectedQuestions: blueprint.totalQuestions,
    expectedMarks: blueprint.totalMarks,
    complete: shortfalls.length === 0,
    shortfalls,
  };
}
