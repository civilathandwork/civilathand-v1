// ============================================================
// PLACE THIS FILE AT:
//   src/data/ese/subjects.ts
// ============================================================
// The subjects shown on the ESE PYQ page. Each id MUST match a
// key in src/data/ese/questions.ts. To add a subject later, add
// a row here and an array with the same id in questions.ts.
// ============================================================

import type { ExamSubjectMeta } from "@/data/testseries/examTypes";

export const ESE_SUBJECTS: ExamSubjectMeta[] = [
  { id: "structural",    name: "Structural Analysis & Design", short: "Structural",     num: "01", color: "#0f2244", free: true },
  { id: "rcc",           name: "RCC & Steel Design",           short: "RCC / Steel",    num: "02", color: "#1a5fb4", free: true },
  { id: "soil",          name: "Geotechnical Engineering",     short: "Soil Mechanics", num: "03", color: "#283593", free: true },
  { id: "fluid",         name: "Fluid Mechanics & Hydraulics", short: "Fluid",          num: "04", color: "#1565c0", free: true },
  { id: "environmental", name: "Environmental Engineering",    short: "Environmental",  num: "05", color: "#00796b", free: true },
  { id: "transport",     name: "Transportation Engineering",   short: "Transport",      num: "06", color: "#ef6c00", free: true },
  { id: "geomatics",     name: "Surveying & Geomatics",        short: "Surveying",      num: "07", color: "#5d4037", free: true },
  { id: "irrigation",    name: "Irrigation & Hydrology",       short: "Irrigation",     num: "08", color: "#0277bd", free: true },
  { id: "const-mat",     name: "Construction & Materials",     short: "Materials",      num: "09", color: "#455a64", free: true },
];
