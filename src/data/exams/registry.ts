// ============================================================
// PLACE THIS FILE AT:  src/data/exams/registry.ts
// ============================================================
// Central list of the three exams. The pages read from here.
// ESE is marked comingSoon = true (no tests yet).
// ============================================================

import { MockTest } from "./types";
import { GATE_TESTS } from "./gate";
import { SSC_TESTS } from "./ssc";

export interface ExamMeta {
  id: string;            // "gate" | "ese" | "ssc"
  code: string;
  name: string;
  desc: string;
  accent: string;
  patternLabel: string;
  durationLabel: string;
  comingSoon: boolean;
  tests: MockTest[];
  fullHref: string;
}

export const EXAMS: ExamMeta[] = [
  {
    id: "gate",
    code: "GATE CE",
    name: "GATE — Civil Engineering",
    desc: "Full-length mock tests built to the exact GATE Civil pattern — General Aptitude, Engineering Maths and core Civil, in a real CBT interface with timer, calculator and detailed solutions.",
    accent: "#1a5fb4",
    patternLabel: "65 Q · 100 marks · 3 hours",
    durationLabel: "3 hours",
    comingSoon: false,
    tests: GATE_TESTS,
    fullHref: "/education/test-series/gate-full-length",
  },
  {
    id: "ese",
    code: "ESE / IES",
    name: "ESE — Civil (IES)",
    desc: "Full-length ESE (IES) Prelims mock tests built to the official Civil pattern. Launching soon.",
    accent: "#0f2244",
    patternLabel: "150 Q · 300 marks · 3 hours",
    durationLabel: "3 hours",
    comingSoon: true,
    tests: [],
    fullHref: "/education/test-series/ese-full-length",
  },
  {
    id: "ssc",
    code: "SSC-JE",
    name: "SSC-JE — Civil",
    desc: "Full-length SSC-JE Paper-1 mock tests — General Intelligence & Reasoning, General Awareness and Civil & Structural — in a real exam interface with timer and solutions.",
    accent: "#6a1b9a",
    patternLabel: "200 Q · 200 marks · 2 hours",
    durationLabel: "2 hours",
    comingSoon: false,
    tests: SSC_TESTS,
    fullHref: "/education/test-series/ssc-full-length",
  },
];

export function getExam(id: string): ExamMeta | undefined {
  return EXAMS.find((e) => e.id === id);
}

export function getTest(examId: string, testId: string): MockTest | undefined {
  return getExam(examId)?.tests.find((t) => t.id === testId);
}
