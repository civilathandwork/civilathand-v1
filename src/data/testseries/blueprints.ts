// ============================================================
// PLACE THIS FILE AT:
//   src/data/testseries/blueprints.ts
// ============================================================
// This file defines the FULL-LENGTH test "blueprints" for every
// exam (GATE / ESE / SSC-JE). A blueprint is just a recipe that
// says: "pull this many 1-mark and 2-mark questions from this
// subject". The assembler (src/lib/assembleTest.ts) reads a
// blueprint + your question bank and builds a real shuffled paper.
//
// YOU NEVER NEED TO EDIT THE EXAM ENGINE TO ADD A NEW TEST.
// To add "Full Length Test 4", just add an entry to the relevant
// FULL_TESTS array below. The list page and runner pick it up
// automatically.
// ============================================================

export type ExamId = "gate" | "ese" | "ssc-je";

// One row of a blueprint = how many Q to take from one subject.
export interface BlueprintSection {
  subjectId: string;   // must match a key in your question bank (e.g. "soil")
  label: string;       // display name in the section header
  oneMark: number;     // how many 1-mark questions to pull
  twoMark: number;     // how many 2-mark questions to pull
  // For exams where every question carries the same marks (e.g. SSC),
  // put the count in `oneMark` and set markValue below.
}

export interface FullTestBlueprint {
  id: string;              // url-safe, e.g. "gate-full-1"
  exam: ExamId;
  name: string;            // "Full Length Test 1"
  subtitle: string;        // "GATE CE · 65 Questions · 100 Marks"
  durationSec: number;     // exam timer
  totalQuestions: number;  // expected total (for display + validation)
  totalMarks: number;      // expected total marks (for display)
  markValue?: number;      // if set, EVERY question is worth this many marks
                           // (used by SSC-JE where Q are uniform). When set,
                           // the assembler treats `oneMark` as the full count
                           // for that subject and ignores `twoMark`.
  negative: string;        // negative-mark fraction string, e.g. "1/3", "1/4", "0"
  free: boolean;           // false => locked (wire payment here later)
  sections: BlueprintSection[];
}

// ════════════════════════════════════════════════════════════
// GATE CE  —  65 questions, 100 marks, 3 hours
// Pattern: General Aptitude = 5×1 + 5×2 (15 marks).
//          Technical + Maths = 25×1 + 30×2 (85 marks).
//          Negative: 1/3 of marks for MCQ.
// The per-subject split below sums to EXACTLY 65 Q / 100 marks.
// ════════════════════════════════════════════════════════════
const GATE_SECTIONS: BlueprintSection[] = [
  { subjectId: "aptitude",      label: "General Aptitude",                 oneMark: 5, twoMark: 5 },
  { subjectId: "math",          label: "Engineering Mathematics",         oneMark: 4, twoMark: 5 },
  { subjectId: "soil",          label: "Geotechnical Engineering",        oneMark: 4, twoMark: 5 },
  { subjectId: "environmental", label: "Environmental Engineering",       oneMark: 3, twoMark: 4 },
  { subjectId: "transport",     label: "Transportation Engineering",      oneMark: 3, twoMark: 3 },
  { subjectId: "fluid",         label: "Fluid Mechanics & Hydraulics",    oneMark: 2, twoMark: 3 },
  { subjectId: "structural",    label: "Structural Analysis",             oneMark: 2, twoMark: 2 },
  { subjectId: "rcc",           label: "RCC & Prestressed Concrete",      oneMark: 1, twoMark: 2 },
  { subjectId: "geomatics",     label: "Surveying / Geomatics",           oneMark: 1, twoMark: 1 },
  { subjectId: "som",           label: "Strength of Materials",           oneMark: 1, twoMark: 1 },
  { subjectId: "hydrology",     label: "Engineering Hydrology",           oneMark: 1, twoMark: 1 },
  { subjectId: "irrigation",    label: "Irrigation Engineering",          oneMark: 1, twoMark: 0 },
  { subjectId: "steel",         label: "Design of Steel Structures",      oneMark: 1, twoMark: 1 },
  { subjectId: "eng-mech",      label: "Engineering Mechanics",           oneMark: 0, twoMark: 1 },
  { subjectId: "const-mat",     label: "Construction Materials & Mgmt",   oneMark: 1, twoMark: 1 },
];

// ════════════════════════════════════════════════════════════
// SSC-JE CIVIL — Paper 1 (Prelims): 200 Q, 200 marks, 2 hours
// Reasoning 50 + GK 50 + Civil Technical 100. 1 mark each, neg 1/4.
// (Reasoning & GK use their own banks: "reasoning", "gk".)
// ════════════════════════════════════════════════════════════
const SSCJE_P1_SECTIONS: BlueprintSection[] = [
  { subjectId: "reasoning",     label: "General Intelligence & Reasoning", oneMark: 50, twoMark: 0 },
  { subjectId: "gk",            label: "General Awareness",                oneMark: 50, twoMark: 0 },
  { subjectId: "rcc",           label: "RCC & Structures",                 oneMark: 16, twoMark: 0 },
  { subjectId: "som",           label: "Strength of Materials",            oneMark: 12, twoMark: 0 },
  { subjectId: "soil",          label: "Soil Mechanics",                   oneMark: 12, twoMark: 0 },
  { subjectId: "fluid",         label: "Fluid Mechanics & Hydraulics",     oneMark: 12, twoMark: 0 },
  { subjectId: "geomatics",     label: "Surveying",                        oneMark: 10, twoMark: 0 },
  { subjectId: "transport",     label: "Highway / Transportation",         oneMark: 10, twoMark: 0 },
  { subjectId: "environmental", label: "Environmental Engineering",        oneMark: 8,  twoMark: 0 },
  { subjectId: "const-mat",     label: "Building Materials",               oneMark: 7,  twoMark: 0 },
  { subjectId: "estimation",    label: "Estimation & Costing",             oneMark: 7,  twoMark: 0 },
  { subjectId: "irrigation",    label: "Irrigation & Hydrology",           oneMark: 6,  twoMark: 0 },
];
// Civil technical above = 16+12+12+12+10+10+8+7+7+6 = 100 Q. Total = 200.

// SSC-JE CIVIL — Paper 2 (Mains): 100 Q, 300 marks, 2 hours
// All Civil. 3 marks each, neg 1.
const SSCJE_P2_SECTIONS: BlueprintSection[] = [
  { subjectId: "rcc",           label: "RCC & Structures",            oneMark: 18, twoMark: 0 },
  { subjectId: "soil",          label: "Soil Mechanics",              oneMark: 13, twoMark: 0 },
  { subjectId: "fluid",         label: "Fluid Mechanics",             oneMark: 13, twoMark: 0 },
  { subjectId: "som",           label: "Strength of Materials",       oneMark: 12, twoMark: 0 },
  { subjectId: "geomatics",     label: "Surveying",                   oneMark: 10, twoMark: 0 },
  { subjectId: "transport",     label: "Highway Engineering",         oneMark: 10, twoMark: 0 },
  { subjectId: "environmental", label: "Environmental Engineering",   oneMark: 8,  twoMark: 0 },
  { subjectId: "estimation",    label: "Estimation & Costing",        oneMark: 8,  twoMark: 0 },
  { subjectId: "const-mat",     label: "Building Materials",          oneMark: 8,  twoMark: 0 },
];
// = 18+13+13+12+10+10+8+8+8 = 100 Q.

// ════════════════════════════════════════════════════════════
// ESE / IES CIVIL — Prelims Paper 2 (Civil): 150 Q, 300 marks, 3 hrs
// 2 marks each, neg 1/3. (Paper 1 GS & Aptitude lives in its own bank.)
// NOTE: ESE question banks still need to be populated — see roadmap.
// ════════════════════════════════════════════════════════════
const ESE_CIVIL_SECTIONS: BlueprintSection[] = [
  { subjectId: "structural",    label: "Structural Analysis & Design", oneMark: 0, twoMark: 24 },
  { subjectId: "rcc",           label: "RCC & Steel Design",           oneMark: 0, twoMark: 20 },
  { subjectId: "soil",          label: "Geotechnical Engineering",     oneMark: 0, twoMark: 18 },
  { subjectId: "fluid",         label: "Fluid Mechanics & Hydraulics", oneMark: 0, twoMark: 18 },
  { subjectId: "environmental", label: "Environmental Engineering",    oneMark: 0, twoMark: 16 },
  { subjectId: "transport",     label: "Transportation Engineering",   oneMark: 0, twoMark: 14 },
  { subjectId: "geomatics",     label: "Surveying & Geomatics",        oneMark: 0, twoMark: 12 },
  { subjectId: "irrigation",    label: "Irrigation & Hydrology",       oneMark: 0, twoMark: 12 },
  { subjectId: "const-mat",     label: "Construction & Materials",     oneMark: 0, twoMark: 16 },
];
// = 24+20+18+18+16+14+12+12+16 = 150 Q × 2 = 300 marks.

// ────────────────────────────────────────────────────────────
// Build N full-length tests for an exam from one section recipe.
// Each test uses the same recipe but a different `seed`, so the
// assembler picks/shuffles a different slice of the bank per test.
// ────────────────────────────────────────────────────────────
function makeTests(
  base: Omit<FullTestBlueprint, "id" | "name" | "subtitle">,
  examLabel: string,
  count: number
): FullTestBlueprint[] {
  return Array.from({ length: count }, (_, i) => ({
    ...base,
    id: `${base.exam}-full-${i + 1}`,
    name: `Full Length Test ${i + 1}`,
    subtitle: `${examLabel} · ${base.totalQuestions} Questions · ${base.totalMarks} Marks`,
  }));
}

// ── GATE: 5 full-length mocks (add more by bumping the number) ──
export const GATE_FULL_TESTS: FullTestBlueprint[] = makeTests(
  {
    exam: "gate",
    durationSec: 3 * 3600,
    totalQuestions: 65,
    totalMarks: 100,
    negative: "1/3",
    free: true, // first one(s) free; set false to lock for payment
    sections: GATE_SECTIONS,
  },
  "GATE CE",
  5
).map((t, i) => ({ ...t, free: i < 2 })); // first 2 free, rest locked

// ── SSC-JE: Paper 1 (Prelims) and Paper 2 (Mains), 3 each ──
export const SSCJE_FULL_TESTS: FullTestBlueprint[] = [
  ...makeTests(
    {
      exam: "ssc-je", durationSec: 2 * 3600, totalQuestions: 200, totalMarks: 200,
      markValue: 1, negative: "1/4", free: true, sections: SSCJE_P1_SECTIONS,
    },
    "SSC-JE Paper 1 (Prelims)", 3
  ).map((t, i) => ({ ...t, id: `ssc-je-p1-${i + 1}`, name: `Paper 1 — Mock ${i + 1}`, free: i < 1 })),
  ...makeTests(
    {
      exam: "ssc-je", durationSec: 2 * 3600, totalQuestions: 100, totalMarks: 300,
      markValue: 3, negative: "1", free: false, sections: SSCJE_P2_SECTIONS,
    },
    "SSC-JE Paper 2 (Mains)", 3
  ).map((t, i) => ({ ...t, id: `ssc-je-p2-${i + 1}`, name: `Paper 2 — Mock ${i + 1}` })),
];

// ── ESE: Civil Prelims Paper 2, 3 mocks (locked until bank ready) ──
export const ESE_FULL_TESTS: FullTestBlueprint[] = makeTests(
  {
    exam: "ese", durationSec: 3 * 3600, totalQuestions: 150, totalMarks: 300,
    negative: "1/3", free: false, sections: ESE_CIVIL_SECTIONS,
  },
  "ESE Civil Prelims", 3
);

export const ALL_FULL_TESTS: Record<ExamId, FullTestBlueprint[]> = {
  gate: GATE_FULL_TESTS,
  "ssc-je": SSCJE_FULL_TESTS,
  ese: ESE_FULL_TESTS,
};

export function getFullTest(id: string): FullTestBlueprint | undefined {
  for (const list of Object.values(ALL_FULL_TESTS)) {
    const found = list.find((t) => t.id === id);
    if (found) return found;
  }
  return undefined;
}
