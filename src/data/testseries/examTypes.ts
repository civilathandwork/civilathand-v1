// ============================================================
// PLACE THIS FILE AT:
//   src/data/testseries/examTypes.ts
// ============================================================
// Shared shape for a subject shown on a PYQ list page.
// Used by ESE and SSC subject lists (and any exam you add later).
// ============================================================

export interface ExamSubjectMeta {
  id: string;        // must match a key in that exam's question bank
  name: string;      // full display name
  short: string;     // short label for the card
  num: string;       // "01", "02" … (just for the badge)
  color: string;     // accent colour for the card stripe
  free: boolean;     // true = open now; false = locked (payment later)
}
