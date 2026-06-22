export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  area: string;
  loc: string;
  img: string;
  status: string;
  description: string;
  fullDetails: string;
  specs: string[];
  challenges: string[];
  solutions: string[];
  gallery: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "tata-projects-industrial-shed",
    title: "Tata Projects Industrial Shed",
    category: "Industrial",
    area: "45,000 sq.ft",
    loc: "Taloja MIDC, Mumbai",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    status: "Completed",
    description: "An optimized BIM coordinated PEB structural plan for a heavy engineering manufacturing shed built to sustain massive dynamic overhead crane loads.",
    fullDetails: "This project involved the design and dynamic detailing of a heavy-duty industrial fabrication shed. The building features an expansive single-span portal frame measuring 35 meters in clear span. The primary engineering focus was addressing dynamic vibrations and heavy load transfers from twin 20-tonne overhead traveling cranes. Using advanced BIM coordination (LOD 400), we successfully resolved 40+ structural/MEP layout clashes before fabrication, reducing site work modifications to absolute zero.",
    specs: [
      "Design Code: IS 800:2007 (Steel Structures)",
      "BIM Integration: LOD 400 Detailed Model",
      "Dynamic Loading: Dual 20T Overhead Cranes",
      "Main Structural Frame: PEB Portal Truss",
      "Foundation System: Heavy Deep Pile Foundation",
      "Wind Design Speed: 44 m/s (Seismic Zone III)"
    ],
    challenges: [
      "Mitigating severe dynamic vibration stresses in columns caused by rapid crane acceleration and braking forces.",
      "Optimizing total structural steel weight while maintaining extreme horizontal structural rigidity.",
      "Preventing differential settlement on highly clayey, low load-bearing MIDC reclaimed land."
    ],
    solutions: [
      "Designed a customized built-up plate box column configuration with tapered crane runway girder supports.",
      "Conducted finite element analysis (FEA) to place high-strength cross-bracings only at key stiffness load points.",
      "Implemented a deep pile foundation layout anchored 14 meters deep into hard rock basalt layers."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "g3-smart-commercial-hub",
    title: "G+3 Smart Commercial Hub",
    category: "Commercial",
    area: "12,400 sq.ft",
    loc: "Viman Nagar, Pune",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    status: "Completed",
    description: "A premium RCC frame structure with optimized column scheduling, smart space planning, and strict seismic load compliance.",
    fullDetails: "A G+3 commercial office complex optimized for high spatial flexibility and premium structural durability. The building design integrates open-plan workspaces and a smart curtain wall envelope. By utilizing high-strength concrete mixes and precise spacing models, the structural engineering team minimized interior column footprints, leaving maximum usable area for corporate fit-outs.",
    specs: [
      "Design Code: IS 456:2000 & IS 1893:2016",
      "Structural System: Ductile RCC Moment Resisting Frame",
      "Concrete Grade: M30 & M35 Ready Mix",
      "Steel Grade: Fe 550D TMT Reinforcement",
      "Foundation System: Combined Raft Foundation",
      "MEP Setup: Integrated VRF Air Duct Channels"
    ],
    challenges: [
      "Accommodating narrow municipal boundary setbacks while ensuring safe structural excavation depths.",
      "Providing large pillar-free corporate zones for flexible layout partition plans.",
      "Designing cantilevered corner balcony slabs without vertical columns."
    ],
    solutions: [
      "Deployed a retaining pile wall design to protect adjacent building foundations during excavation.",
      "Used a continuous flat slab floor structure with drop panels to eliminate beam-drops and improve height clearances.",
      "Engineered high-performance tension rebar tie-backs anchored deep within internal column connections."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "residential-villa-complex",
    title: "Residential Villa Complex",
    category: "Residential",
    area: "18,500 sq.ft (5 units)",
    loc: "Whitefield, Bengaluru",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
    status: "Ongoing",
    description: "An elegant architectural planning and premium interior layout integrating modern concrete load-bearing designs.",
    fullDetails: "This luxurious residential enclave consists of five high-end modern villas. The design blends glass facades, natural stone walls, and cantilevering roofs. The engineering challenge centered on supporting architectural features (such as floor-to-ceiling glass panel openings) while maintaining high structural load pathways. Work is ongoing with regular site concrete quality control checklists.",
    specs: [
      "Design Code: IS 456:2000 & NBC 2016 Guidelines",
      "Structural Material: RCC Frame & Load Bearing Shear Walls",
      "Concrete Cover Limit: 30mm for High Durability",
      "Design Style: Modern Minimalist / Glass Face",
      "Foundation System: Spread Isolated Footings",
      "Special Focus: Integrated Hydraulic Swimming Pool Slab"
    ],
    challenges: [
      "Achieving stable load paths with wide open perimeter glass facades (no peripheral columns).",
      "Ensuring complete waterproofing for high-load cantilevered infinity swimming pools on upper levels.",
      "Routing concealed mechanical ductwork through low-profile horizontal structural voids."
    ],
    solutions: [
      "Designed a central stiffened RCC core layout containing shear walls to bear all structural lateral wind forces.",
      "Specified polyurethane elastomeric coatings coupled with crystalline waterproofing admixtures for pool slabs.",
      "Utilized custom beam-sleeve design openings verified through detailed finite element shear calculations."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "steel-portal-frame-warehouse",
    title: "Steel Portal Frame Warehouse",
    category: "PEB Steel",
    area: "60,000 sq.ft",
    loc: "Sanand GIDC, Gujarat",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    status: "Completed",
    description: "A colossal logistics hub featuring pre-engineered portal steel frames designed to withstand heavy wind uplift pressures.",
    fullDetails: "A state-of-the-art regional warehousing facility designed for large-scale shipping logistics. The main structure utilizes pre-engineered building (PEB) web-tapered members to span 42 meters without any intermediate support columns. Detailed structural analysis was conducted to resist extreme wind uplift forces, a critical design factor for high-clearance structures located in the windy plains of Sanand.",
    specs: [
      "Design Code: IS 800:2007 & Wind Load IS 875 Part 3",
      "Clear Span Dimensions: 42 meters column-free span",
      "Main Frames: Web-Tapered Portal Frame Config",
      "Roofing Sheet: Galvalume Double-Lock Standing Seam",
      "Foundation System: Combined Footing with Tie Beams",
      "Wind Design Speed: Up to 50 m/s wind limits"
    ],
    challenges: [
      "Preventing vertical roof uplift and frame instability under high-velocity seasonal dust storm wind pressures.",
      "Optimizing PEB member thickness to control overall fabrication budgets without compromising steel safety.",
      "Designing heavy-duty joint connection nodes to accommodate rapid thermal expansion and contraction cycles."
    ],
    solutions: [
      "Engineered standing seam roof locks equipped with high-grip wind clamps to distribute localized upward suction.",
      "Created an automated member-sizing script using STAAD.Pro to calculate steel thickness requirements dynamically.",
      "Incorporated oversized slotted anchor-bolt connections to allow free lateral movement during thermal adjustments."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
