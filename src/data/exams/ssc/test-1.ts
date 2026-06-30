// ============================================================
// PLACE THIS FILE AT:  src/data/exams/ssc/test-1.ts
// ============================================================
// SSC-JE (Civil) — Full Length Test 1 (Paper-1 pattern).
// Sections: General Intelligence & Reasoning, General Awareness,
//           Civil & Structural Engineering.
// SSC-JE Paper-1 = 200 Q / 200 marks / 2 hours (1 mark each, −1/4 each wrong).
//
// ── HOW TO ADD MORE QUESTIONS ───────────────────────────────
// Copy a block, paste it inside `questions: [ ... ]`, give it the
// next `id`, and set the right `sectionLabel`. The real paper is
// 50 Reasoning + 50 General Awareness + 100 Civil. The test works
// with any number of questions — add yours until you reach 200.
// ============================================================

import { MockTest } from "../types";

export const sscTest1: MockTest = {
  id: "test-1",
  name: "Full Length Test 1",
  subtitle: "Reasoning + General Awareness + Civil & Structural",
  durationSec: 7200, // 2 hours
  totalMarks: 20,
  free: true,
  questions: [
    // ───────── GENERAL INTELLIGENCE & REASONING ─────────
    {
      id: 1, type: "MCQ", marks: 1, neg: "1/4", year: "Reasoning", sectionLabel: "General Intelligence & Reasoning",
      question: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
      options: ["(a) 38", "(b) 40", "(c) 42", "(d) 44"],
      correct: 2,
      solution: "Differences are 4, 6, 8, 10 — next is 12, so 30 + 12 = 42."
    },
    {
      id: 2, type: "MCQ", marks: 1, neg: "1/4", year: "Reasoning", sectionLabel: "General Intelligence & Reasoning",
      question: "If each letter is shifted by +1, the word BIRD is coded as:",
      options: ["(a) CJSE", "(b) AHQC", "(c) CJSF", "(d) DKSE"],
      correct: 0,
      solution: "B→C, I→J, R→S, D→E gives CJSE."
    },
    {
      id: 3, type: "MCQ", marks: 1, neg: "1/4", year: "Reasoning", sectionLabel: "General Intelligence & Reasoning",
      question: "Find the odd one out: 3, 5, 7, 9, 11",
      options: ["(a) 3", "(b) 5", "(c) 9", "(d) 11"],
      correct: 2,
      solution: "All are prime numbers except 9 (= 3 × 3)."
    },
    {
      id: 4, type: "MCQ", marks: 1, neg: "1/4", year: "Reasoning", sectionLabel: "General Intelligence & Reasoning",
      question: "Find the next number: 7, 14, 28, 56, ?",
      options: ["(a) 84", "(b) 98", "(c) 112", "(d) 120"],
      correct: 2,
      solution: "Each term is doubled: 56 × 2 = 112."
    },
    {
      id: 5, type: "MCQ", marks: 1, neg: "1/4", year: "Reasoning", sectionLabel: "General Intelligence & Reasoning",
      question: "If A = 1, B = 2, C = 3 … then the sum of the letters of the word 'CAB' is:",
      options: ["(a) 5", "(b) 6", "(c) 7", "(d) 9"],
      correct: 1,
      solution: "C + A + B = 3 + 1 + 2 = 6."
    },

    // ───────── GENERAL AWARENESS ─────────
    {
      id: 6, type: "MCQ", marks: 1, neg: "1/4", year: "General Awareness", sectionLabel: "General Awareness",
      question: "The SI unit of electric current is the:",
      options: ["(a) Volt", "(b) Ampere", "(c) Ohm", "(d) Watt"],
      correct: 1,
      solution: "Electric current is measured in amperes (A)."
    },
    {
      id: 7, type: "MCQ", marks: 1, neg: "1/4", year: "General Awareness", sectionLabel: "General Awareness",
      question: "The largest planet in the Solar System is:",
      options: ["(a) Saturn", "(b) Earth", "(c) Jupiter", "(d) Neptune"],
      correct: 2,
      solution: "Jupiter is the largest planet in the Solar System."
    },
    {
      id: 8, type: "MCQ", marks: 1, neg: "1/4", year: "General Awareness", sectionLabel: "General Awareness",
      question: "The chemical symbol for gold is:",
      options: ["(a) Go", "(b) Gd", "(c) Au", "(d) Ag"],
      correct: 2,
      solution: "Gold's symbol is Au (from Latin 'aurum'). Ag is silver."
    },
    {
      id: 9, type: "MCQ", marks: 1, neg: "1/4", year: "General Awareness", sectionLabel: "General Awareness",
      question: "Who is regarded as the chief architect of the Indian Constitution?",
      options: ["(a) Mahatma Gandhi", "(b) Dr B. R. Ambedkar", "(c) Jawaharlal Nehru", "(d) Sardar Patel"],
      correct: 1,
      solution: "Dr B. R. Ambedkar chaired the drafting committee and is called the chief architect of the Constitution."
    },
    {
      id: 10, type: "MCQ", marks: 1, neg: "1/4", year: "General Awareness", sectionLabel: "General Awareness",
      question: "The SI unit of force is the:",
      options: ["(a) Joule", "(b) Pascal", "(c) Newton", "(d) Watt"],
      correct: 2,
      solution: "Force is measured in newtons (N); 1 N = 1 kg·m/s²."
    },

    // ───────── CIVIL & STRUCTURAL ENGINEERING ─────────
    {
      id: 11, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "The slump test on concrete is used to measure its:",
      options: ["(a) Strength", "(b) Workability", "(c) Durability", "(d) Soundness"],
      correct: 1,
      solution: "The slump test measures the workability (consistency) of fresh concrete."
    },
    {
      id: 12, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "The standard consistency and setting time of cement are determined using the:",
      options: ["(a) Slump cone", "(b) Vicat apparatus", "(c) Le Chatelier apparatus", "(d) Compaction factor test"],
      correct: 1,
      solution: "The Vicat apparatus is used for standard consistency and initial/final setting time of cement."
    },
    {
      id: 13, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "Bulking of sand is maximum at a moisture content of about:",
      options: ["(a) 1%", "(b) 4–5%", "(c) 10%", "(d) 20%"],
      correct: 1,
      solution: "Sand bulks most (about 20–30% volume increase) at roughly 4–5% moisture content."
    },
    {
      id: 14, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "The Indian Standard code of practice for general construction in steel is:",
      options: ["(a) IS 456", "(b) IS 800", "(c) IS 1343", "(d) IS 383"],
      correct: 1,
      solution: "IS 800 is the code for general construction in structural steel."
    },
    {
      id: 15, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "As per IS 456, the minimum grade of concrete generally used for reinforced concrete work is:",
      options: ["(a) M10", "(b) M15", "(c) M20", "(d) M30"],
      correct: 2,
      solution: "For reinforced concrete, the minimum grade is M20 (mild exposure)."
    },
    {
      id: 16, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "The process of removing entrapped air and compacting fresh concrete is called:",
      options: ["(a) Curing", "(b) Compaction", "(c) Finishing", "(d) Batching"],
      correct: 1,
      solution: "Compaction (often by vibration) removes air voids and densifies the concrete."
    },
    {
      id: 17, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "For a given workability, the strength of concrete is governed mainly by the:",
      options: ["(a) Aggregate colour", "(b) Water–cement ratio", "(c) Mixing time", "(d) Curing temperature only"],
      correct: 1,
      solution: "By Abrams' law, strength depends primarily on the water–cement ratio — lower w/c gives higher strength."
    },
    {
      id: 18, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "A flat slab is a reinforced concrete slab that is:",
      options: ["(a) Supported on beams on all sides", "(b) Supported directly on columns without beams", "(c) Cast on the ground", "(d) Always one-way"],
      correct: 1,
      solution: "A flat slab transfers load directly to columns (often through drops/capitals) without intermediate beams."
    },
    {
      id: 19, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "Lacey's theory is used in the design of:",
      options: ["(a) Retaining walls", "(b) Stable alluvial irrigation channels", "(c) Steel trusses", "(d) Pile foundations"],
      correct: 1,
      solution: "Lacey's regime theory is used to design stable channels in alluvial soil."
    },
    {
      id: 20, type: "MCQ", marks: 1, neg: "1/4", year: "SSC-JE", sectionLabel: "Civil & Structural",
      question: "The safe bearing capacity of a soil at site is commonly determined by the:",
      options: ["(a) Slump test", "(b) Plate load test", "(c) Vicat test", "(d) Marshall test"],
      correct: 1,
      solution: "The plate load test is a field test used to estimate the safe bearing capacity and settlement of soil."
    },
  ],
};
