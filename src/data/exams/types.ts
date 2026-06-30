// ============================================================
// PLACE THIS FILE AT:  src/data/exams/types.ts
// ============================================================
// Shared shapes for the test series. ONE question shape, ONE test shape.
// ============================================================

export type QType = "MCQ" | "MSQ" | "NAT";

export interface ExamQuestion {
  id: number;
  type: QType;            // MCQ = 1 correct | MSQ = 1+ correct | NAT = typed number
  marks: 1 | 2;
  neg: string;            // negative marking, e.g. "1/3", "2/3", "1/4", "0"
  year: string;           // e.g. "GATE-2021" or "SSC-JE 2022"
  question: string;       // HTML allowed (<sup>, <sub> etc.)
  options: string[];      // 4 options for MCQ/MSQ; [] for NAT
  correct: number;        // 0-based index of the correct option; 0 for NAT
  natAnswer?: string;     // the numeric answer for NAT questions
  solution: string;       // HTML allowed
  sectionLabel: string;   // e.g. "General Aptitude", "Civil Engineering", "Reasoning"
}

export interface MockTest {
  id: string;             // URL id, e.g. "test-1"
  name: string;           // e.g. "Full Length Test 1"
  subtitle: string;       // small line under the title
  durationSec: number;    // total time in seconds
  totalMarks: number;
  free: boolean;          // true = anyone can take it
  questions: ExamQuestion[];
}
