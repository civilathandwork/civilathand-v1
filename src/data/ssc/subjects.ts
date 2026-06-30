// ============================================================
// PLACE THIS FILE AT:
//   src/data/ssc/subjects.ts
// ============================================================
// The subjects shown on the SSC-JE PYQ page. Each id MUST match a
// key in src/data/ssc/questions.ts.
// ============================================================

import type { ExamSubjectMeta } from "@/data/testseries/examTypes";

export const SSC_SUBJECTS: ExamSubjectMeta[] = [
  { id: "reasoning",  name: "General Intelligence & Reasoning", short: "Reasoning",   num: "01", color: "#6a1b9a", free: true },
  { id: "gk",         name: "General Awareness",                short: "GK / GA",     num: "02", color: "#ad1457", free: true },
  { id: "som",        name: "Strength of Materials",            short: "SOM",         num: "03", color: "#1a5fb4", free: true },
  { id: "rcc",        name: "RCC & Structures",                 short: "RCC",         num: "04", color: "#0f2244", free: true },
  { id: "soil",       name: "Soil Mechanics",                   short: "Soil",        num: "05", color: "#283593", free: true },
  { id: "fluid",      name: "Fluid Mechanics & Hydraulics",     short: "Fluid",       num: "06", color: "#1565c0", free: true },
  { id: "estimation", name: "Estimation & Costing",             short: "Estimation",  num: "07", color: "#ef6c00", free: true },
];
