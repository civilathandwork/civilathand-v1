// ============================================================
// PLACE THIS FILE AT:  src/data/exams/gate/test-1.ts
// ============================================================
// GATE Civil — Full Length Test 1.
// Sections: General Aptitude, Engineering Mathematics, Civil Engineering.
//
// ── HOW TO ADD MORE QUESTIONS ───────────────────────────────
// Copy any block below, paste it inside the `questions: [ ... ]`
// array, give it the next `id` number, and set its `sectionLabel`.
// MCQ  -> options has 4 entries, `correct` is the 0-based index.
// NAT  -> options: [],  set `natAnswer: "12.5"` (a typed number).
// MSQ  -> like MCQ (this schema stores one correct index).
// The real GATE paper is 65 Q / 100 marks; add questions until you
// reach that. The test works with any number of questions.
// ============================================================

import { MockTest } from "../types";

export const gateTest1: MockTest = {
  id: "test-1",
  name: "Full Length Test 1",
  subtitle: "General Aptitude + Engineering Maths + Core Civil",
  durationSec: 10800, // 3 hours
  totalMarks: 55,
  free: true,
  questions: [
    // ───────── GENERAL APTITUDE ─────────
    {
      id: 1, type: "MCQ", marks: 1, neg: "1/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "A train 300 m long overtakes a man walking at 3 km/h (in the same direction) in 30 seconds. The speed of the train is:",
      options: ["(a) 33 km/h", "(b) 36 km/h", "(c) 39 km/h", "(d) 42 km/h"],
      correct: 2,
      solution: "Relative speed = 300 m / 30 s = 10 m/s = 36 km/h. Train speed = 36 + 3 = 39 km/h."
    },
    {
      id: 2, type: "MCQ", marks: 1, neg: "1/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "The sum of the infinite geometric series 1 + 1/3 + 1/9 + 1/27 + … is:",
      options: ["(a) 1.5", "(b) 2.0", "(c) 2.5", "(d) 3.0"],
      correct: 0,
      solution: "Sum = a/(1−r) = 1/(1−1/3) = 1/(2/3) = 3/2 = 1.5."
    },
    {
      id: 3, type: "MCQ", marks: 2, neg: "2/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "P is 2 years older than Q, Q is 3 years younger than R, and S is 1 year older than P. Who is the youngest?",
      options: ["(a) P", "(b) Q", "(c) R", "(d) S"],
      correct: 1,
      solution: "Let Q = x. Then P = x+2, R = x+3, S = x+3. The smallest is Q."
    },
    {
      id: 4, type: "MCQ", marks: 1, neg: "1/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "Which word is the odd one out? CYLINDER, CONE, CUBE, CIRCUMFERENCE",
      options: ["(a) CYLINDER", "(b) CONE", "(c) CUBE", "(d) CIRCUMFERENCE"],
      correct: 3,
      solution: "Cylinder, cone and cube are 3-D solids; circumference is a measurement, not a shape."
    },
    {
      id: 5, type: "MCQ", marks: 1, neg: "1/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "If a + b = 10 and ab = 21, then a² + b² equals:",
      options: ["(a) 42", "(b) 58", "(c) 100", "(d) 121"],
      correct: 1,
      solution: "a² + b² = (a+b)² − 2ab = 100 − 42 = 58."
    },
    {
      id: 6, type: "MCQ", marks: 2, neg: "2/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "A bag contains 5 red, 3 blue and 2 green balls. Two balls are drawn at random. The probability that both are red is:",
      options: ["(a) 1/5", "(b) 2/9", "(c) 4/15", "(d) 5/18"],
      correct: 1,
      solution: "P = C(5,2)/C(10,2) = 10/45 = 2/9."
    },
    {
      id: 7, type: "MCQ", marks: 1, neg: "1/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "The number of distinct ways to arrange the letters of the word 'CIVIL' is:",
      options: ["(a) 60", "(b) 120", "(c) 30", "(d) 20"],
      correct: 0,
      solution: "'CIVIL' has 5 letters with I repeated twice: 5!/2! = 120/2 = 60."
    },
    {
      id: 8, type: "MCQ", marks: 1, neg: "1/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "Choose the word most OPPOSITE in meaning to 'METICULOUS':",
      options: ["(a) Careful", "(b) Thorough", "(c) Careless", "(d) Precise"],
      correct: 2,
      solution: "'Meticulous' means very careful and precise; its antonym is 'careless'."
    },
    {
      id: 9, type: "MCQ", marks: 1, neg: "1/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "The idiom 'to burn the midnight oil' means:",
      options: ["(a) To work very late into the night", "(b) To waste fuel", "(c) To cause a fire", "(d) To light candles"],
      correct: 0,
      solution: "It means to work or study late into the night."
    },
    {
      id: 10, type: "MCQ", marks: 1, neg: "1/3", year: "General Aptitude", sectionLabel: "General Aptitude",
      question: "Choose the correctly spelled word meaning 'a pledge or obligation':",
      options: ["(a) Comitment", "(b) Commitment", "(c) Commitement", "(d) Comitmment"],
      correct: 1,
      solution: "The correct spelling is 'commitment' — double m, single t before -ment."
    },

    // ───────── ENGINEERING MATHEMATICS ─────────
    {
      id: 11, type: "MCQ", marks: 1, neg: "1/3", year: "Engineering Mathematics", sectionLabel: "Engineering Mathematics",
      question: "The value of ∫₀^π sin(x) dx is:",
      options: ["(a) 0", "(b) 1", "(c) 2", "(d) π"],
      correct: 2,
      solution: "∫₀^π sin x dx = [−cos x]₀^π = −cos π + cos 0 = 1 + 1 = 2."
    },
    {
      id: 12, type: "MCQ", marks: 1, neg: "1/3", year: "Engineering Mathematics", sectionLabel: "Engineering Mathematics",
      question: "The Laplace transform of f(t) = e^(at) is:",
      options: ["(a) 1/(s+a)", "(b) 1/(s−a)", "(c) a/(s²+a²)", "(d) s/(s²+a²)"],
      correct: 1,
      solution: "L{e^(at)} = 1/(s−a), valid for s > a."
    },
    {
      id: 13, type: "MCQ", marks: 1, neg: "1/3", year: "Engineering Mathematics", sectionLabel: "Engineering Mathematics",
      question: "A square matrix A is orthogonal if:",
      options: ["(a) AAᵀ = 0", "(b) AAᵀ = I", "(c) AAᵀ = A²", "(d) AAᵀ = A⁻¹"],
      correct: 1,
      solution: "An orthogonal matrix satisfies AAᵀ = AᵀA = I, so A⁻¹ = Aᵀ."
    },
    {
      id: 14, type: "MCQ", marks: 1, neg: "1/3", year: "Engineering Mathematics", sectionLabel: "Engineering Mathematics",
      question: "The trace of the matrix [[1, 1], [1, −1]] is:",
      options: ["(a) 2", "(b) −2", "(c) 0", "(d) 1"],
      correct: 2,
      solution: "Trace = sum of diagonal elements = 1 + (−1) = 0."
    },
    {
      id: 15, type: "MCQ", marks: 2, neg: "2/3", year: "Engineering Mathematics", sectionLabel: "Engineering Mathematics",
      question: "For an arbitrary real n×n matrix M, which matrix is guaranteed to have only non-negative eigenvalues?",
      options: ["(a) M²", "(b) M + Mᵀ", "(c) MᵀM", "(d) M − Mᵀ"],
      correct: 2,
      solution: "MᵀM is symmetric positive semi-definite: xᵀ(MᵀM)x = ‖Mx‖² ≥ 0, so all its eigenvalues are ≥ 0."
    },

    // ───────── CIVIL ENGINEERING (Engineering Mechanics + Free Vibrations) ─────────
    {
      id: 16, type: "MCQ", marks: 1, neg: "1/3", year: "GATE-2016 SHIFT-II", sectionLabel: "Civil Engineering",
      question: "An assembly is made of a rigid L-shaped arm A–B–C, pinned to a wall at end A and supported by an elastic rope C–D at end C (members are weightless). The vertical member AB has length L and the horizontal member BC has length L. The rope CD runs upward from C at 45° to a support D. Under a downward concentrated load P at C, the tension developed in the rope is:",
      options: ["(a) 3P/√2", "(b) P/√2", "(c) 3P/8", "(d) √2·P"],
      correct: 1,
      solution: "Taking moments about pin A with the rope tension at 45°: √2·T·L = P·L, hence T = P/√2."
    },
    {
      // MSQ — both (a) and (c) are correct. The schema stores one index.
      id: 17, type: "MSQ", marks: 2, neg: "0", year: "GATE-2016 SHIFT-II", sectionLabel: "Civil Engineering",
      question: "A horizontal force P (kN) is applied at the top of a homogeneous block of weight 25 kN (width 1 m, height 2 m) resting on a floor with coefficient of friction 0.3. Which statement(s) is/are correct?",
      options: ["(a) The motion will occur by overturning", "(b) Sliding never occurs", "(c) No motion occurs for P ≤ 6 kN", "(d) The motion will occur by sliding only"],
      correct: 0,
      solution: "Sliding needs P = 0.3×25 = 7.5 kN; overturning needs P×2 = 25×0.5 → 6.25 kN. Tipping happens first, so for P<6.25 no motion and the block overturns before it slides. Correct: (a) and (c)."
    },
    {
      id: 18, type: "NAT", marks: 2, neg: "0", year: "GATE-2022 SHIFT-II", sectionLabel: "Civil Engineering",
      question: "A uniform rod KJ of weight w = 10 kN rests against a frictionless vertical wall at its upper end K and on a rough floor at its lower end J. The height of K is a = 4 m and the horizontal distance of J from the wall is b = 3 m. The minimum coefficient of static friction required at J is ____ (three decimals).",
      options: [],
      correct: 0,
      natAnswer: "0.375",
      solution: "N_J = w = 10 kN. Moments about K: 10×1.5 + μN_J×4 − N_J×3 = 0 → μ = (30 − 15)/40 = 0.375."
    },
    {
      id: 19, type: "MCQ", marks: 2, neg: "2/3", year: "GATE-2021 SHIFT-I", sectionLabel: "Civil Engineering",
      question: "A wedge M (angle 30°) drives a block N upward by a horizontal force P. The block is guided by frictionless vertical and top surfaces and carries a load Q. Friction along the inclined wedge–block interface is 0.2; all other surfaces are frictionless; weights are negligible. The limiting force is P = αQ. The value of α (one decimal) is:",
      options: ["(a) 2.0", "(b) 0.5", "(c) 0.9", "(d) 0.6"],
      correct: 2,
      solution: "Block: N₂sin60° − 0.2N₂sin30° = Q → Q = 0.766N₂. Wedge: P = 0.2N₂cos30° + N₂cos60° = 0.875Q ≈ 0.9Q."
    },
    {
      id: 20, type: "MCQ", marks: 2, neg: "2/3", year: "GATE-2020 SHIFT-I", sectionLabel: "Civil Engineering",
      question: "A rigid weightless platform PQRS slides only vertically, held by a weightless two-force member OJ (pinned at O and J) and four frictionless rollers (horizontal reactions only). A block of weight W = 90 kN rests on the platform. Member OJ has a 3 (vertical) : 4 (horizontal) slope. The horizontal component of the reaction at pin O is (kN):",
      options: ["(a) 120", "(b) 180", "(c) 150", "(d) 90"],
      correct: 0,
      solution: "Only OJ carries vertical load: F_OJ·(3/5) = 90 → F_OJ = 150 kN. Horizontal component = 150×(4/5) = 120 kN."
    },
    {
      id: 21, type: "MCQ", marks: 2, neg: "2/3", year: "GATE-2020 SHIFT-II", sectionLabel: "Civil Engineering",
      question: "In a pin-jointed frame (members IQ–LJ pinned at N; JM–KQ pinned at P; hinge supports at R and S; 1 m panels), 10 kN downward loads act at I, J, K and 10 kN horizontal loads act at L and M. The horizontal component of the reaction at S is (kN):",
      options: ["(a) 15", "(b) 20", "(c) 10", "(d) 5"],
      correct: 0,
      solution: "By virtual work on the linkage, the horizontal reaction at S = 900/60 = 15 kN."
    },
    {
      id: 22, type: "MCQ", marks: 2, neg: "2/3", year: "GATE-2018 SHIFT-I", sectionLabel: "Civil Engineering",
      question: "A cylinder of radius 250 mm and weight 10 kN is rolled over an obstacle of height 50 mm by a horizontal force P at its centre. All surfaces are frictionless. The minimum P is:",
      options: ["(a) 4.5 kN", "(b) 5.0 kN", "(c) 6.0 kN", "(d) 7.5 kN"],
      correct: 3,
      solution: "Moments about the corner: horizontal arm = √(250²−200²) = 150, vertical arm for P = 200. P×200 = 10×150 → P = 7.5 kN."
    },
    {
      id: 23, type: "MCQ", marks: 2, neg: "2/3", year: "GATE-2018 SHIFT-II", sectionLabel: "Civil Engineering",
      question: "Two bodies of mass 5 kg and 4 kg rest in contact on a frictionless surface. A 36 N horizontal force is applied to the 5 kg body. The contact force between them is:",
      options: ["(a) 4.0 N", "(b) 7.2 N", "(c) 9.0 N", "(d) 16.0 N"],
      correct: 3,
      solution: "a = 36/9 = 4 m/s²; contact force = 4 kg × 4 m/s² = 16 N."
    },
    {
      id: 24, type: "NAT", marks: 2, neg: "0", year: "GATE-2017 SHIFT-I", sectionLabel: "Civil Engineering",
      question: "A particle of mass 2 kg moving at 1.5 m/s is acted upon by a force f(t) = 3t² N (t in seconds) along its motion for 2 s. The velocity just after the force is removed is ____ m/s (one decimal).",
      options: [],
      correct: 0,
      natAnswer: "5.5",
      solution: "Impulse = ∫₀² 3t² dt = 8 N·s. Δv = 8/2 = 4 m/s. v = 1.5 + 4 = 5.5 m/s."
    },
    {
      id: 25, type: "MCQ", marks: 1, neg: "1/3", year: "GATE-2019 SHIFT-I", sectionLabel: "Civil Engineering",
      question: "For a mass-spring system m·z̈ + k·z = 0, the natural frequency is:",
      options: ["(a) √(k/m)", "(b) √(m/k)", "(c) k/m", "(d) m/k"],
      correct: 0,
      solution: "Comparing with z̈ + ω²z = 0 gives ω = √(k/m)."
    },
    {
      id: 26, type: "MCQ", marks: 2, neg: "2/3", year: "GATE-2024 SHIFT-II", sectionLabel: "Civil Engineering",
      question: "A simply-supported beam of length 2l (flexural rigidity EI, negligible mass) carries a rigid block of mass m at mid-span; a massless spring of stiffness k also supports the block in parallel with the beam. The natural frequency is:",
      options: ["(a) √((kl³+6EI)/(ml³))", "(b) √((kl³+48EI)/(ml³))", "(c) √(6EIk/((kl³+6EI)m))", "(d) √(48EIk/((kl³+48EI)m))"],
      correct: 0,
      solution: "Beam mid-span stiffness = 48EI/(2l)³ = 6EI/l³. Spring and beam are in parallel: k_eq = k + 6EI/l³ → ω = √((kl³+6EI)/(ml³))."
    },
    {
      id: 27, type: "MCQ", marks: 2, neg: "2/3", year: "GATE-2022 SHIFT-II", sectionLabel: "Civil Engineering",
      question: "An undamped spring-mass system has natural frequency ω and period T. If the stiffness is doubled and the mass halved, the new frequency and period are:",
      options: ["(a) 2ω and T/2", "(b) ω/2 and 2T", "(c) 4ω and T/4", "(d) ω and T"],
      correct: 0,
      solution: "ω' = √(2k/(m/2)) = √(4k/m) = 2ω, so T' = T/2."
    },
    {
      id: 28, type: "NAT", marks: 2, neg: "0", year: "GATE-2021 SHIFT-II", sectionLabel: "Civil Engineering",
      question: "A fixed-fixed beam is modelled as an SDOF system of total lumped mass 10 kg. If the flexural stiffness is 4π² kN/m, the natural frequency in the flexural mode is ____ Hz (integer).",
      options: [],
      correct: 0,
      natAnswer: "10",
      solution: "ω = √(4π²×1000/10) = 20π rad/s; f = ω/2π = 10 Hz."
    },
    {
      id: 29, type: "MCQ", marks: 2, neg: "2/3", year: "GATE-2021 SHIFT-II", sectionLabel: "Civil Engineering",
      question: "A single-storey building is a rigid bar of mass m on three identical massless columns, each fixed against rotation, with lateral deflection δ = PL³/(12EI). The natural frequency for horizontal oscillation is:",
      options: ["(a) (2/L)√(EI/m)", "(b) 2√(6EI/mL³)", "(c) (1/L)√(2EI/m)", "(d) 6√(EI/mL³)"],
      correct: 3,
      solution: "Each column stiffness = 12EI/L³; three in parallel = 36EI/L³. ω = √(36EI/mL³) = 6√(EI/mL³)."
    },

    // ───────── CIVIL ENGINEERING (core concepts) ─────────
    {
      id: 30, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "The Indian Standard code of practice for Plain and Reinforced Concrete is:",
      options: ["(a) IS 383", "(b) IS 432", "(c) IS 456", "(d) IS 875"],
      correct: 2,
      solution: "IS 456:2000 covers plain and reinforced concrete. (IS 383 = aggregates, IS 875 = loads.)"
    },
    {
      id: 31, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "The grade designation M25 indicates:",
      options: ["(a) Mix ratio 1:2:5", "(b) Characteristic compressive strength 25 N/mm² at 28 days", "(c) Modulus of elasticity 25 GPa", "(d) Maximum aggregate size 25 mm"],
      correct: 1,
      solution: "M25 means a characteristic 28-day cube compressive strength of 25 N/mm²."
    },
    {
      id: 32, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "The workability of fresh concrete is commonly measured by the:",
      options: ["(a) Vicat apparatus", "(b) Le Chatelier apparatus", "(c) Slump cone test", "(d) Tensile splitting test"],
      correct: 2,
      solution: "The slump cone test (IS 1199) measures workability. Vicat = setting time, Le Chatelier = soundness."
    },
    {
      id: 33, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "The standard cube size used for the compressive strength test of concrete is:",
      options: ["(a) 100 mm cube", "(b) 150 mm cube", "(c) 200 mm cube", "(d) 75 mm cube"],
      correct: 1,
      solution: "As per IS 516, the standard cube is 150 mm × 150 mm × 150 mm, tested at 28 days."
    },
    {
      id: 34, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "In a thin cylinder under internal pressure, the hoop stress is how many times the longitudinal stress?",
      options: ["(a) 0.5 times", "(b) Equal", "(c) 2 times", "(d) 4 times"],
      correct: 2,
      solution: "Hoop stress = pd/2t and longitudinal stress = pd/4t, so the ratio is 2."
    },
    {
      id: 35, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "As per IS 456, the partial safety factor for steel (γs) in the limit state method is:",
      options: ["(a) 1.0", "(b) 1.15", "(c) 1.5", "(d) 1.87"],
      correct: 1,
      solution: "γs = 1.15 (and γc = 1.5), giving the design steel stress 0.87fy."
    },
    {
      id: 36, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "The ratio of Euler crippling loads of a column with both ends fixed to one (same length) with both ends hinged is:",
      options: ["(a) 1:2", "(b) 2:1", "(c) 4:1", "(d) 1:4"],
      correct: 2,
      solution: "Effective lengths: L/2 (fixed-fixed) and L (hinged-hinged). Pcr ∝ 1/Le², giving a ratio of 4:1."
    },
    {
      id: 37, type: "MCQ", marks: 2, neg: "2/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "The shape factor for a rectangular cross-section is:",
      options: ["(a) 1.0", "(b) 1.5", "(c) 1.7", "(d) 2.0"],
      correct: 1,
      solution: "Shape factor = Zp/Ze = (bd²/4)/(bd²/6) = 1.5 for a rectangle."
    },
    {
      id: 38, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "As per IS 800:2007, the partial safety factor for yielding of structural steel (γm0) is:",
      options: ["(a) 1.0", "(b) 1.10", "(c) 1.25", "(d) 1.50"],
      correct: 1,
      solution: "γm0 = 1.10 for yielding; γm1 = 1.25 for ultimate (rupture) strength."
    },
    {
      id: 39, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering", sectionLabel: "Civil Engineering",
      question: "The California Bearing Ratio (CBR) test is primarily used for:",
      options: ["(a) Foundation bearing capacity", "(b) Flexible pavement design / subgrade strength", "(c) Rigid pavement slab thickness", "(d) Soil compaction control"],
      correct: 1,
      solution: "The CBR test evaluates subgrade strength and is used in flexible pavement thickness design (IRC:37)."
    },
  ],
};
