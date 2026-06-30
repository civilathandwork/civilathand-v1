// ============================================================
// PLACE THIS FILE AT:
//   src/data/education/courses.ts
// ============================================================
// All Civil At Hand courses live here. The list page and each
// detail page read from this one file. To edit a course, change
// it here. To add a course, copy one block and change the slug.
//
// While a course is not yet on sale, keep comingSoon: true — the
// enroll button shows "Coming Soon". When you are ready to sell,
// set comingSoon: false and paste your Cashfree link into
// PAYMENT_LINKS.course in src/data/education/site.ts.
// ============================================================

export interface Course {
  slug: string;          // url, e.g. "autocad"
  name: string;
  sub: string;           // one-line subtitle
  mode: "Live" | "Self-Paced";
  level: string;
  duration: string;
  priceLabel: string;    // display only, e.g. "₹999" or "Lowest Price"
  badge: string;
  badgeColor: string;    // tailwind bg class
  accent: string;        // hex for the card stripe / header
  summary: string;       // 2–3 sentence intro
  learn: string[];       // "what you will learn" bullets
  modules: string[];     // course outline
  whoFor: string[];      // who should take it
  comingSoon: boolean;   // true => button shows "Coming Soon"
}

export const COURSES: Course[] = [
  {
    slug: "autocad",
    name: "AutoCAD for Civil Engineers",
    sub: "2D Drafting + 3D Civil Basics",
    mode: "Self-Paced",
    level: "Beginner to Advanced",
    duration: "20+ hours",
    priceLabel: "Lowest Price",
    badge: "Most Demanded",
    badgeColor: "bg-orange-500",
    accent: "#ef6c00",
    summary:
      "Master AutoCAD the way it is actually used in civil engineering offices. Start from a blank screen and build up to complete, plot-ready structural and architectural drawings.",
    learn: [
      "Draw civil drawings from scratch with confidence",
      "Site plans, floor plans, sections and elevations",
      "Structural drawings and rebar detailing",
      "Dimensioning, annotation and title blocks",
      "Layouts, scales and plotting to clean PDFs",
      "Industry-standard layers and file management",
    ],
    modules: [
      "AutoCAD interface, navigation and setup",
      "Drawing and modifying tools (line, trim, offset, array…)",
      "Layers, line types, blocks and templates",
      "Civil drawing: plans, sections, elevations",
      "Rebar detailing and bar bending basics",
      "Plotting, scaling and PDF/print output",
      "3D civil basics and final project",
    ],
    whoFor: [
      "Students who want job-ready drafting skills",
      "Site engineers who need to read and make drawings",
      "Anyone starting a civil design / detailing career",
    ],
    comingSoon: true,
  },
  {
    slug: "revit",
    name: "Revit Structure — BIM Modelling",
    sub: "Live Course · Structural BIM from Scratch",
    mode: "Live",
    level: "Beginner to Intermediate",
    duration: "25+ hours · Live",
    priceLabel: "Lowest Price",
    badge: "Live Classes",
    badgeColor: "bg-red-600",
    accent: "#c62828",
    summary:
      "Learn Revit Structure live, with full doubt support. Model real structural elements and generate drawings and quantities automatically — the exact workflow used on modern BIM projects.",
    learn: [
      "Set up Revit Structure project templates",
      "Model columns, beams, slabs and foundations",
      "Generate structural drawings directly from the model",
      "Create schedules and quantities from the model",
      "Coordinate and detect basic clashes",
      "Work to LOD standards used in real projects",
    ],
    modules: [
      "Revit basics, interface and project setup",
      "Grids, levels and structural templates",
      "Modelling RCC and steel members",
      "Reinforcement and structural detailing",
      "Drawings, sheets and annotations from BIM",
      "Schedules, quantities and exports",
      "Live project walkthrough + doubt sessions",
    ],
    whoFor: [
      "Students moving into BIM / modern design roles",
      "Draftsmen upgrading from 2D to BIM",
      "Engineers targeting international project work",
    ],
    comingSoon: true,
  },
  {
    slug: "bim",
    name: "BIM Coordination Course",
    sub: "Modelling, Coordination & LOD",
    mode: "Self-Paced",
    level: "Intermediate",
    duration: "22+ hours",
    priceLabel: "Lowest Price",
    badge: "Career Skill",
    badgeColor: "bg-slate-700",
    accent: "#37474f",
    summary:
      "Go beyond modelling and learn how BIM actually runs on a project — coordination, levels of detail (LOD), clash detection, and how disciplines work together on one model.",
    learn: [
      "Understand the full BIM workflow end to end",
      "Levels of Detail (LOD 100 to 400) explained simply",
      "Discipline coordination (structure, MEP, architecture)",
      "Clash detection and resolution basics",
      "BIM execution and folder/file standards",
      "How BIM saves cost and rework on site",
    ],
    modules: [
      "What BIM really is (and what it is not)",
      "LOD stages and what each means",
      "Federated models and coordination",
      "Clash detection workflow",
      "BIM standards and naming conventions",
      "Case study: a coordinated building model",
    ],
    whoFor: [
      "Engineers aiming for BIM coordinator roles",
      "Modellers who want the bigger picture",
      "Anyone working with design + construction teams",
    ],
    comingSoon: true,
  },
  {
    slug: "staad-pro",
    name: "STAAD Pro — Structural Analysis",
    sub: "Analysis & Design to IS Codes",
    mode: "Self-Paced",
    level: "Beginner to Intermediate",
    duration: "18+ hours",
    priceLabel: "Lowest Price",
    badge: "In Demand",
    badgeColor: "bg-emerald-600",
    accent: "#2e7d32",
    summary:
      "Learn STAAD Pro for real RCC and steel structures. Build models, apply loads to IS codes, run the analysis, read the results, and design members — the practical skills design offices expect.",
    learn: [
      "Build 2D and 3D structural models in STAAD Pro",
      "Apply dead, live, wind and seismic loads (IS codes)",
      "Run analysis and read deflections and forces",
      "Design RCC and steel members to IS 456 / IS 800",
      "Interpret and present STAAD design reports",
      "Avoid common modelling mistakes",
    ],
    modules: [
      "STAAD interface and modelling basics",
      "Supports, properties and materials",
      "Load cases and load combinations (IS 875 / IS 1893)",
      "Running analysis and checking results",
      "RCC design to IS 456",
      "Steel design to IS 800",
      "Reports and a complete worked example",
    ],
    whoFor: [
      "Students targeting structural design jobs",
      "Engineers who want hands-on analysis skills",
      "Anyone preparing for design-role interviews",
    ],
    comingSoon: true,
  },
  {
    slug: "iitpave",
    name: "IITPAVE — Flexible Pavement Design",
    sub: "Live Course · IRC:37 · Lowest Price",
    mode: "Live",
    level: "Beginner to Intermediate",
    duration: "Live · Full doubt support",
    priceLabel: "Most Affordable",
    badge: "Live · Top Mentor",
    badgeColor: "bg-orange-600",
    accent: "#e65100",
    summary:
      "A live, fully-supported course on flexible pavement design using IITPAVE software as per IRC:37. Taught by a top mentor at the most affordable price, with complete doubt solving so nobody gets left behind.",
    learn: [
      "Flexible pavement design as per IRC:37",
      "Use IITPAVE software confidently, step by step",
      "Traffic and CBR inputs and how to get them right",
      "Layer thickness design and checking strains",
      "Reading and interpreting IITPAVE output",
      "Live doubt solving until every concept is clear",
    ],
    modules: [
      "Pavement types and IRC:37 overview",
      "Traffic estimation and design inputs",
      "Subgrade, CBR and material characterisation",
      "Running IITPAVE: inputs and analysis",
      "Strain checks and thickness finalisation",
      "Worked design example, end to end",
      "Live Q&A and full doubt clearing",
    ],
    whoFor: [
      "Highway / transportation engineering students",
      "Engineers working on road projects",
      "Anyone needing practical IRC:37 design skills",
    ],
    comingSoon: true,
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
