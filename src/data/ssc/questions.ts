// ============================================================
// PLACE THIS FILE AT:
//   src/data/ssc/questions.ts
// ============================================================
// SSC-JE (Civil) demo question bank.
// ORIGINAL sample questions written to the SSC-JE pattern so the
// system works today. Replace with your real questions any time.
//
// SSC-JE Paper 1 uses three kinds of subjects:
//   reasoning  -> General Intelligence & Reasoning
//   gk         -> General Awareness
//   (technical) -> rcc, som, soil, fluid, estimation, etc.
//
// ── HOW TO ADD A QUESTION ───────────────────────────────────
//   {
//     id: 4,
//     type: "MCQ",
//     marks: 1,            // SSC Paper 1 = 1 mark each
//     neg: "1/4",          // SSC negative = 1/4
//     year: "SSC-JE 2022",
//     question: "....",
//     options: ["(a) ...", "(b) ...", "(c) ...", "(d) ..."],
//     correct: 0,          // 0 = first option is the answer
//     solution: "....",
//   },
// ============================================================

export interface SscQuestion {
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

// Helper for SSC rows (1 mark, neg 1/4, MCQ).
const Q = (
  id: number, year: string, question: string,
  options: string[], correct: number, solution: string
): SscQuestion => ({ id, type: "MCQ", marks: 1, neg: "1/4", year, question, options, correct, solution });

export const SSC_QUESTIONS: Record<string, SscQuestion[]> = {

  reasoning: [
    Q(1, "SSC — Demo", "Find the next number in the series: 2, 6, 12, 20, 30, ?",
      ["(a) 42", "(b) 40", "(c) 36", "(d) 44"], 0,
      "The differences are 4, 6, 8, 10, 12. So the next term = 30 + 12 = 42 (the pattern is n² + n)."),
    Q(2, "SSC — Demo", "Pointing to a photo, a man said, 'She is the daughter of my grandfather's only son.' How is the girl related to the man?",
      ["(a) Sister", "(b) Mother", "(c) Daughter", "(d) Aunt"], 0,
      "Grandfather's only son is the man's own father. The father's daughter is the man's sister."),
    Q(3, "SSC — Demo", "Choose the odd one out: 3, 5, 7, 9, 11.",
      ["(a) 9", "(b) 5", "(c) 7", "(d) 11"], 0,
      "All are prime numbers except 9 (which is 3 × 3), so 9 is the odd one out."),
  ],

  gk: [
    Q(1, "SSC — Demo", "The headquarters of the Indian Space Research Organisation (ISRO) is located in:",
      ["(a) Bengaluru", "(b) New Delhi", "(c) Hyderabad", "(d) Mumbai"], 0,
      "ISRO is headquartered in Bengaluru, Karnataka."),
    Q(2, "SSC — Demo", "Who is regarded as the 'Father of the Indian Constitution'?",
      ["(a) Dr. B. R. Ambedkar", "(b) Mahatma Gandhi", "(c) Jawaharlal Nehru", "(d) Sardar Patel"], 0,
      "Dr. B. R. Ambedkar chaired the Drafting Committee and is called the Father of the Indian Constitution."),
    Q(3, "SSC — Demo", "The largest freshwater lake in India is:",
      ["(a) Wular Lake", "(b) Chilika Lake", "(c) Dal Lake", "(d) Sambhar Lake"], 0,
      "Wular Lake in Jammu & Kashmir is the largest freshwater lake in India (Chilika is a brackish lagoon)."),
  ],

  som: [
    Q(1, "SSC — Demo", "The point in a loaded beam where the bending moment changes sign (is zero) is called the:",
      ["(a) point of contraflexure", "(b) neutral axis", "(c) centroid", "(d) shear centre"], 0,
      "A point of contraflexure is where the bending moment is zero and changes sign (sagging to hogging or vice-versa)."),
    Q(2, "SSC — Demo", "For most metals, Poisson's ratio lies in the range:",
      ["(a) 0.25 – 0.33", "(b) 0.50 – 0.70", "(c) 0.00 – 0.10", "(d) 0.80 – 1.00"], 0,
      "Poisson's ratio for common engineering metals is roughly 0.25 to 0.33."),
    Q(3, "SSC — Demo", "For a rectangular cross-section, the ratio of maximum shear stress to average shear stress is:",
      ["(a) 1.5", "(b) 1.33", "(c) 2.0", "(d) 1.0"], 0,
      "For a rectangular section the maximum (parabolic) shear stress is 1.5 times the average shear stress."),
  ],

  rcc: [
    Q(1, "SSC — Demo", "As per IS 456:2000, the maximum compressive strain in concrete in bending is:",
      ["(a) 0.0035", "(b) 0.0020", "(c) 0.0050", "(d) 0.0010"], 0,
      "IS 456 limits the maximum concrete compressive strain in flexure to 0.0035."),
    Q(2, "SSC — Demo", "In limit state design, the partial safety factor for steel reinforcement is:",
      ["(a) 1.15", "(b) 1.50", "(c) 1.00", "(d) 1.25"], 0,
      "IS 456 uses 1.15 for steel and 1.5 for concrete as partial material safety factors."),
    Q(3, "SSC — Demo", "The grade of concrete M25 means a characteristic compressive strength (28-day cube) of:",
      ["(a) 25 N/mm²", "(b) 25 kN/mm²", "(c) 2.5 N/mm²", "(d) 250 N/mm²"], 0,
      "M25 indicates a characteristic cube strength of 25 N/mm² (MPa) at 28 days."),
  ],

  soil: [
    Q(1, "SSC — Demo", "The Rankine coefficient of active earth pressure for φ = 30° is:",
      ["(a) 1/3", "(b) 3", "(c) 1/2", "(d) 2"], 0,
      "Ka = (1 − sin30°)/(1 + sin30°) = 0.5/1.5 = 1/3."),
    Q(2, "SSC — Demo", "A quick sand condition occurs when the effective stress becomes:",
      ["(a) zero", "(b) maximum", "(c) equal to total stress", "(d) negative"], 0,
      "Upward seepage can reduce effective stress to zero, causing the quick sand condition."),
    Q(3, "SSC — Demo", "The water content at which a soil changes from plastic to liquid state is the:",
      ["(a) liquid limit", "(b) plastic limit", "(c) shrinkage limit", "(d) plasticity index"], 0,
      "The liquid limit is the water content marking the boundary between the plastic and liquid states."),
  ],

  fluid: [
    Q(1, "SSC — Demo", "Flow in a circular pipe is generally laminar when the Reynolds number is below about:",
      ["(a) 2000", "(b) 4000", "(c) 500", "(d) 10000"], 0,
      "Pipe flow is laminar up to Re ≈ 2000, then transitional, and turbulent above ≈ 4000."),
    Q(2, "SSC — Demo", "Bernoulli's equation is a statement of the conservation of:",
      ["(a) energy", "(b) mass", "(c) momentum", "(d) force"], 0,
      "Bernoulli's equation expresses conservation of energy along a streamline for an ideal fluid."),
    Q(3, "SSC — Demo", "The hydraulic mean depth of a circular pipe of diameter D running full is:",
      ["(a) D/4", "(b) D/2", "(c) D", "(d) D/8"], 0,
      "Hydraulic mean depth = area/perimeter = (πD²/4)/(πD) = D/4."),
  ],

  estimation: [
    Q(1, "SSC — Demo", "The unit of measurement for earthwork in excavation is:",
      ["(a) cubic metre (m³)", "(b) square metre (m²)", "(c) metre (m)", "(d) kilogram (kg)"], 0,
      "Earthwork (excavation/filling) is a volume and is measured in cubic metres."),
    Q(2, "SSC — Demo", "The dead load of a building refers to:",
      ["(a) the self weight of the permanent structure", "(b) moving vehicle loads", "(c) wind load", "(d) earthquake load"], 0,
      "Dead load is the permanent self-weight of structural and non-structural components that stay fixed in place."),
    Q(3, "SSC — Demo", "Plinth area of a building is measured in:",
      ["(a) m²", "(b) m³", "(c) running metre", "(d) kg"], 0,
      "Plinth area is the built-up covered area measured at floor level and is expressed in square metres."),
  ],
};
