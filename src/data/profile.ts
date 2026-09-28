// ─────────────────────────────────────────────
// Emi Kobayashi – Profile Data
// Edit this file to update ALL site content.
// ─────────────────────────────────────────────

export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ProjectArtifact {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  org?: string;
  dates: string;
  summary: string;
  bullets: string[];
  skills: string[];
  tags: string[];
  artifacts: ProjectArtifact[];
  highlights?: string[];
  featured: boolean;
}

export interface Experience {
  title: string;
  company: string;
  type?: string;
  dates: string;
  location: string;
  logo?: string;
  bullets: string[];
  skills: string[];
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Education {
  school: string;
  degree: string;
  dates: string;
  logo?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

export interface Profile {
  name: string;
  headline: string;
  summary: string;
  location: string;
  specialties: string[];
  socialLinks: SocialLink[];
  skills: Skill[];
  certifications: Certification[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  projects: Project[];
}

const profile: Profile = {
  name: "Emi Kobayashi",
  headline: "Where deep tech meets global growth.",
  summary:
    "Global marketing and business strategy professional with 7+ years driving B2B revenue growth across North America, Europe, and Asia. Owned product launches, positioning, differentiation, and lifecycle management for a global semiconductor portfolio, driving 140% revenue growth over three years, including a cooling filter line supplied into MRI machines with full ownership of pricing, contract terms, and the key account relationship. Consulting experience spans market sizing, competitive assessment, and U.S. market entry, plus cross-market analysis for life sciences software. Trilingual in English, Japanese, and Mandarin.",
  location: "San Diego, CA",
  specialties: [
    "Semiconductors",
    "Life Sciences",
    "AI & Advanced Manufacturing",
    "B2B",
  ],
  socialLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/emi-kobayashi/", icon: "linkedin" },
  ],

  // ── Skills ──────────────────────────────────
  skills: [
    {
      category: "Product Marketing",
      items: [
        "Positioning",
        "Messaging",
        "Differentiation",
        "Segmentation",
        "Value Propositions",
        "Go-to-Market Strategy",
        "Product Launch",
        "New Product Development (NPD)",
        "Lifecycle Management",
        "Sales Enablement",
        "Pricing & Value Strategy",
        "Competitive Analysis",
        "Technical Storytelling",
      ],
    },
    {
      category: "Research & Analysis",
      items: [
        "Market Sizing",
        "Primary & Secondary Research",
        "Voice of Customer (VOC)",
        "Customer Insight Generation",
        "Business Case Development",
        "KPI Tracking",
        "ROI Analysis",
      ],
    },
    {
      category: "Cross-Functional",
      items: [
        "Stakeholder Alignment",
        "Sales Partnership",
        "Cross-Functional Execution",
        "Budget Management",
      ],
    },
    {
      category: "Tools",
      items: [
        "Excel",
        "Tableau",
        "PowerPoint",
        "Office 365",
        "CRM Systems",
      ],
    },
  ],

  // ── Certifications ─────────────────────────
  certifications: [
    {
      name: "Data Modeling in Power BI",
      issuer: "Microsoft",
      date: "Jun 2026",
      credentialId: "I6MU2M7OTGCN",
      credentialUrl: "https://www.coursera.org/account/accomplishments/records/I6MU2M7OTGCN",
      skills: ["Power BI", "Data Modeling", "Data Analysis", "Business Intelligence"],
    },
    {
      name: "Adobe Marketing Specialist",
      issuer: "Adobe",
      date: "Jun 2026",
      credentialId: "0JTYHEWUZCX3",
      credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/0JTYHEWUZCX3",
      skills: ["Digital Marketing Strategy", "Marketing Analytics", "Content Creation", "Adobe Analytics"],
    },
    {
      name: "Google Project Management Specialization",
      issuer: "Google",
      date: "May 2026",
      credentialId: "J04REFMDB4TC",
      credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/J04REFMDB4TC",
      skills: ["Project Management", "Agile Project Management", "Agile Methodologies", "Cross-functional Collaboration"],
    },
    {
      name: "IBM AI Product Manager Specialization",
      issuer: "IBM",
      date: "May 2026",
      credentialId: "KB3PL0HID9B5",
      credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/KB3PL0HID9B5",
      skills: ["Artificial Intelligence (AI)", "Product Management", "AI Strategy", "Agile Project Management"],
    },
    {
      name: "Google AI Professional Certificate",
      issuer: "Google",
      date: "Feb 2026",
      credentialId: "UETBA9K11NEN",
      credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/UETBA9K11NEN",
      skills: ["App Building", "Data Analysis", "Content Creation", "Research", "Artificial Intelligence (AI)"],
    },
    {
      name: "CFI Financial Analysis and Modeling Professional Certificate",
      issuer: "Corporate Finance Institute (CFI)",
      date: "Feb 2026",
      credentialUrl: "https://www.linkedin.com/learning/certificates/59ab53f938a9b2b076efd83709f844d7fb80d0913831a19c6f52a2c5bb00bce1",
      skills: ["Financial Analysis", "Financial Forecasting"],
    },
    {
      name: "CFI Corporate Finance Foundations Professional Certificate",
      issuer: "Corporate Finance Institute (CFI)",
      date: "Feb 2026",
      credentialUrl: "https://www.linkedin.com/learning/certificates/b74a7540c280cbede47a83c17cff23d9fad6992769e54e14847d5fd0d2134e4c",
      skills: ["Financial Statement Analysis", "ESG", "Microsoft Excel", "Corporate Finance", "Financial Modeling"],
    },
    {
      name: "Atlassian Agile Project Management Professional Certificate",
      issuer: "Atlassian",
      date: "Jan 2026",
      credentialUrl: "https://www.linkedin.com/learning/certificates/0c1744dbcf169017a3034fc044f0af37f8fa6e3dc87a5abc4c60def86badcac0",
      skills: ["Jira", "Agile Methodologies", "Agile Project Management"],
    },
  ],

  // ── Experience ──────────────────────────────
  experience: [
    {
      title: "MBA Marketing Intern",
      company: "BIOVIA, Dassault Systèmes",
      type: "Internship",
      dates: "Jun 2025 – Present",
      location: "San Diego, CA · Hybrid",
      logo: "/logos/dassault.jpeg",
      bullets: [
        "Mapped the competitive and cross-market landscape across life sciences, materials science, and informatics segments, turning competitor positioning, white space, and unmet needs into a segment prioritization view used in annual marketing planning and GTM targeting.",
        "Directed end-to-end strategy for global campaigns and industry events (trade shows, conferences, webinars), covering messaging, vendor and budget management, and timelines; drove cross-functional alignment with sales and technical stakeholders to convert event contacts into qualified pipeline.",
        "Developed Excel-based performance dashboards tying campaign and event spend to pipeline contribution, informing reallocation of budget toward higher-yield channels and an increased allocation for the following cycle.",
      ],
      skills: [
        "Digital Marketing Strategy",
        "Market Research & Competitive Analysis",
        "Biotech & Pharma Strategy",
        "Life Sciences",
        "Materials Science",
        "Scientific Informatics",
        "Quality & Regulatory Marketing",
        "Content Development",
        "Cross-Functional Project Coordination",
        "Event Planning & Logistics Management",
      ],
    },
    {
      title: "Strategy Consultant (Rady Action Project)",
      company: "Intel Corporation",
      type: "Consulting Project",
      dates: "Mar 2025 – Jun 2025",
      location: "Santa Clara, CA",
      bullets: [
        "Sized the global physical AI and robotics opportunity across North America, Europe, and Asia to identify where AI-driven demand inflects.",
        "Led primary and secondary research, translating fragmented expert input into a structured view of adoption barriers: capex, data availability, safety certification, and regulatory lag.",
        "Recommended a partnership-led entry strategy targeting niche robotics startups over general-purpose humanoids; presented to Intel Corporate Strategy leadership, who adopted the recommended direction.",
      ],
      skills: [
        "Market Sizing",
        "Strategic Analysis",
        "Primary & Secondary Research",
        "Go-to-Market Strategy",
        "Artificial Intelligence (AI)",
        "Robotics",
      ],
    },
    {
      title: "Global Marketing & Business Strategy Manager",
      company: "Moretec, Inc.",
      type: "Permanent",
      dates: "May 2022 – Jul 2024",
      location: "Tokyo, Japan",
      logo: "/logos/moretec.jpeg",
      bullets: [
        "Grew revenue 140% over three years, owning international revenue planning and market strategy across North America, Europe, and Asia, and building the segmentation, positioning, differentiation, and demand-generation plan behind it.",
        "Drove marketing input to new product development (NPD), partnering with R&D and engineering to translate market requirements and unmet needs into product specifications and the innovation roadmap.",
        "Launched products across North America, Europe, and Asia, taking plans from concept through commercialization, including timelines, deliverables, and stakeholder alignment.",
        "Owned the cooling filter product line supplied into MRI machines, launching a new product, setting pricing and contract terms, and managing the key account relationship with the primary customer in Asia.",
        "Managed portfolio health through lifecycle management, including repositioning and sunsetting decisions on existing products.",
        "Delivered quarterly performance analysis and strategic recommendations directly to the CEO, including marketing budget allocation across regions and channels.",
      ],
      skills: [
        "Product Marketing",
        "Positioning & Differentiation",
        "New Product Development (NPD)",
        "Product Launch",
        "Lifecycle Management",
        "Pricing & Value Strategy",
        "Demand Generation",
        "Business Strategy",
      ],
    },
    {
      title: "Global Marketing & Business Strategy Associate",
      company: "Moretec, Inc.",
      dates: "Apr 2018 – Apr 2022",
      location: "Tokyo, Japan",
      logo: "/logos/moretec.jpeg",
      bullets: [
        "Executed global B2B campaigns across Japan, China, the U.S., and Europe, driving 30% revenue growth through data-driven customer acquisition.",
        "Exceeded sales targets by 25% by rebalancing channel mix, refining value propositions, and tightening lead qualification across trade shows, digital, and outbound.",
        "Coordinated with engineering, manufacturing, and quality on joint customer visits and technical support, resolving spec, quality, and supply issues affecting key accounts.",
        "Equipped regional sales teams with enablement toolkits, training programs, and messaging that drove adoption.",
        "Built the marketing KPI tracking that became the basis for regional GTM planning, working cross-functionally to optimize funnel performance through KPI and ROI analysis.",
      ],
      skills: [
        "B2B Marketing",
        "Demand Generation",
        "Sales Enablement",
        "Lead Qualification",
        "KPI & ROI Analysis",
        "Cross-Functional Collaboration",
      ],
    },
  ],

  // ── Languages ───────────────────────────────
  languages: [
    { name: "Japanese", proficiency: "Native" },
    { name: "Mandarin Chinese", proficiency: "Native" },
    { name: "Shanghainese", proficiency: "Native" },
    { name: "English", proficiency: "Fluent" },
  ],

  // ── Education ───────────────────────────────
  education: [
    {
      school: "University of California, San Diego – Rady School of Management",
      degree: "Master of Business Administration (MBA)",
      dates: "Aug 2024 – Jun 2026",
      logo: "/logos/ucsandiego_rady_school_of_management_logo.jpeg",
    },
    {
      school: "Temple University, Japan Campus",
      degree: "Bachelor of Arts, Economics",
      dates: "Sep 2016 – Apr 2019",
      logo: "/logos/templeuniversity_logo.jpeg",
    },
  ],

  // ── Projects ────────────────────────────────
  projects: [
    {
      id: "carbonate-monitoring-sensor",
      title: "Real-Time Carbonate Monitoring for Shellfish Hatcheries",
      dates: "Jan 2026 – Mar 2026",
      summary:
        "This project explores a product solution to address ocean acidification in shellfish hatcheries. Partnering with an MBA team, I helped design a real-time, continuous carbonate monitoring sensor that enables early detection of harmful water conditions during critical larval stages. The project integrates customer research, design thinking, and product strategy to reduce larval loss, improve operational reliability, and support more sustainable aquaculture systems.",
      bullets: [
        "Designed a real-time carbonate monitoring sensor for early detection of harmful water conditions in shellfish hatcheries.",
        "Integrated customer research and design thinking to develop a product addressing ocean acidification challenges.",
        "Developed product strategy to reduce larval loss, improve operational reliability, and support sustainable aquaculture.",
      ],
      skills: [
        "Product Design",
        "Design Thinking",
        "Customer Research",
        "Product Strategy",
        "Sustainability",
      ],
      tags: ["Product & IoT", "Strategy"],
      artifacts: [
        { label: "View Project", url: "/carbonate-monitoring-sensor.pdf" },
      ],
      featured: true,
    },
    {
      id: "google-wiz-ma",
      title: "Google × Wiz – M&A Strategic & Valuation Analysis",
      dates: "Sep 2025 – Dec 2025",
      summary:
        "Co-analyzed Google's $32B acquisition of Wiz, evaluating M&A deal structure, strategic multicloud security positioning, valuation multiples, and competitive implications within the evolving cloud security (CNAPP/CSPM) market.",
      bullets: [
        "Evaluated M&A deal structure and strategic rationale behind Google's $32B acquisition of Wiz.",
        "Analyzed valuation multiples and competitive positioning within the CNAPP/CSPM cloud security market.",
        "Assessed multicloud security strategy implications and competitive dynamics for Google Cloud.",
      ],
      skills: [
        "Mergers & Acquisitions (M&A)",
        "Strategic Financial Analysis",
        "Business Strategy",
        "Market Research",
      ],
      tags: ["M&A", "Strategy"],
      artifacts: [
        { label: "View Project", url: "/google-wiz-ma.pdf" },
      ],
      featured: false,
    },
    {
      id: "blockchain-bitcoin-analysis",
      title: "Blockchain & Bitcoin – AI Technology Industry Analysis (S-Curve & TOE Framework)",
      dates: "Sep 2025 – Dec 2025",
      summary:
        "Co-developed an AI-focused industry analysis of blockchain and Bitcoin using S-curve theory and the TOE framework, evaluating technological disruption, organizational transformation, regulatory constraints, and long-term digital infrastructure implications.",
      bullets: [
        "Applied S-curve theory to analyze blockchain's technological lifecycle and potential disruption trajectories.",
        "Used the TOE framework to evaluate technological, organizational, and environmental factors driving adoption.",
        "Assessed regulatory constraints and long-term digital infrastructure implications for blockchain and Bitcoin.",
      ],
      skills: [
        "Strategic Analysis",
        "Artificial Intelligence (AI)",
        "Market Research",
        "Business Strategy",
      ],
      tags: ["AI & Deep Tech", "Industry Analysis"],
      artifacts: [
        { label: "View Project", url: "/blockchain-bitcoin-analysis.pdf" },
      ],
      featured: false,
    },
    {
      id: "deep-tech-industrial-policy",
      title:
        "How Deep Tech and AI Reshape Sustainable Growth and Industrial Strategy",
      dates: "Jun 2025 – Sep 2025",
      summary:
        "Collaborated with a financial advisory firm, academic faculty, and a cross-functional MBA team to analyze how recent U.S. tech-industrial policies, such as the CHIPS Act, Inflation Reduction Act (IRA), and Stargate Project, are transforming capital flows into Deep Tech, AI, and advanced manufacturing.",
      bullets: [
        "Assessed how CHIPS, IRA, and Stargate influence strategic industry planning and public-private investment alignment.",
        "Evaluated how policy signals trigger vertical integration, recapitalization, and consolidation across AI and Deep Tech sectors.",
        "Identified emerging investment zones and strategic bottlenecks in supply chains and infrastructure.",
        "Examined ripple effects of federal incentives on M&A strategy, private equity trends, and real estate investment patterns.",
      ],
      skills: [
        "Industrial Policy Analysis",
        "Mergers & Acquisitions (M&A)",
        "Strategic Financial Analysis",
        "AI and Advanced Manufacturing",
        "Cross-functional Collaboration",
      ],
      tags: ["AI & Deep Tech", "M&A", "Strategy"],
      artifacts: [
        { label: "View Project", url: "/deep-tech-ai-capital-flow.pdf" },
      ],
      featured: true,
    },
    {
      id: "physical-ai-robotics-intel",
      title: "Physical AI and Robotics Consulting Project",
      dates: "Mar 2025 – Jun 2025",
      summary:
        "Partnered with a cross-functional MBA team to support Intel in exploring how AI will transform the global robotics industry over the next five years.",
      bullets: [
        "Conducted industry research on AI + robotics convergence: key trends, enabling technologies, and competitive dynamics across industrial and consumer sectors.",
        "Evaluated global growth opportunities and potential market inflection points using stakeholder insights and secondary research.",
        "Used consulting frameworks and strategic modeling to deliver data-driven recommendations to senior leadership.",
        "Strengthened expertise at the intersection of AI, semiconductors, and automation.",
      ],
      skills: [
        "Strategic Analysis",
        "Artificial Intelligence (AI)",
        "Technology Consulting",
        "Market Research",
        "Robotics",
      ],
      tags: ["AI & Deep Tech", "Consulting", "Strategy"],
      artifacts: [
        { label: "View Project", url: "/intel-physical-ai.pdf" },
      ],
      featured: true,
    },
    {
      id: "levels-biosensor",
      title: "Levels Biosensor – Product Adoption & Go-to-Market Strategy Analysis",
      dates: "Mar 2025 – Jun 2025",
      summary:
        "Co-developed an ACCORD-based adoption strategy for Levels, a continuous glucose monitoring platform, proposing UX simplification, trial-based entry options, and targeted innovator/early-adopter marketing to reduce behavioral barriers and accelerate adoption in the digital health market.",
      bullets: [
        "Developed an ACCORD-based adoption strategy to reduce behavioral barriers for a continuous glucose monitoring platform.",
        "Proposed UX simplification and trial-based entry options to accelerate user adoption.",
        "Designed targeted marketing strategies for innovator and early-adopter segments in the digital health market.",
      ],
      skills: [
        "Go-to-Market Strategy",
        "Market Research",
        "Business Strategy",
        "Digital Marketing Strategy",
      ],
      tags: ["Go-to-Market", "Strategy"],
      artifacts: [
        { label: "View Project", url: "/levels-biosensor.pdf" },
      ],
      featured: false,
    },
    {
      id: "san-diego-consulting-competition",
      title: "San Diego Immersion Consulting Competition – 1st Place",
      dates: "Mar 2025 – Apr 2025",
      summary:
        "Collaborated with Israeli startup Bzigo to develop a U.S. market entry strategy for its AI mosquito detection device.",
      bullets: [
        "Combined short-term B2C targeting with a long-term B2B expansion plan.",
        "Conducted market research and modeling; delivered 1st place-winning pitch recognized for innovation and strategic impact.",
      ],
      skills: [
        "Strategic Marketing",
        "Market Research",
        "Go-to-Market Strategy",
        "Business Modeling",
        "Cross-Cultural Collaboration",
      ],
      tags: ["Go-to-Market", "Consulting"],
      artifacts: [
        { label: "View Project", url: "/bzigo-canopy-project.pdf" },
      ],
      highlights: ["1st Place Winner"],
      featured: false,
    },
    {
      id: "nokia-strategy-analysis",
      title: "Failure at Nokia – Organizational & Strategy Analysis Case Study",
      dates: "Jan 2025 – Mar 2025",
      summary:
        "Co-authored a strategic analysis of Nokia's decline, evaluating leadership misalignment, structural inefficiencies, and software strategy failures during the smartphone transition, and proposed a culture- and ecosystem-driven turnaround strategy grounded in innovation and platform theory.",
      bullets: [
        "Analyzed Nokia's organizational failures including leadership misalignment and structural inefficiencies during the smartphone era.",
        "Evaluated software strategy missteps and competitive dynamics that contributed to Nokia's market decline.",
        "Proposed a turnaround strategy grounded in innovation theory, platform ecosystems, and culture transformation.",
      ],
      skills: [
        "Business Strategy",
        "Strategic Analysis",
        "Market Research",
      ],
      tags: ["Strategy", "Industry Analysis"],
      artifacts: [
        { label: "View Project", url: "/nokia-project.pdf" },
      ],
      featured: false,
    },
    {
      id: "boeing-competitive-strategy",
      title: "Boeing – Competitive Strategy & Value Creation Analysis",
      dates: "Jan 2025 – Mar 2025",
      summary:
        "Co-authored a strategic evaluation of Boeing's value creation model, analyzing its differentiation-driven competitive advantage, global supply chain scale, R&D investment, and diversified commercial and defense revenue streams.",
      bullets: [
        "Evaluated Boeing's competitive advantage through differentiation strategy, R&D investment, and global supply chain scale.",
        "Analyzed diversified revenue streams across commercial aviation and defense segments.",
        "Assessed value creation drivers and strategic positioning within the aerospace industry.",
      ],
      skills: [
        "Business Strategy",
        "Strategic Financial Analysis",
        "Market Research",
      ],
      tags: ["Strategy", "Industry Analysis"],
      artifacts: [
        { label: "View Project", url: "/boeing-strategy.pdf" },
      ],
      featured: false,
    },
    {
      id: "greensense-smart-plant-care",
      title: "GreenSense – Smart Plant Care Startup Concept",
      dates: "Oct 2024 – Dec 2024",
      summary:
        "Developed a go-to-market and financial strategy for a sensor-enabled smart plant pot featuring app connectivity and subscription-based plant care services, targeting urban Gen Z and Millennial consumers in the growing indoor plant market.",
      bullets: [
        "Designed a go-to-market strategy combining D2C e-commerce with retail partnerships to reach urban plant enthusiasts.",
        "Built a financial model including revenue projections, unit economics, and subscription pricing for plant care services.",
        "Conducted market research on the indoor plant and smart home device sectors to identify target segments and competitive positioning.",
      ],
      skills: [
        "Go-to-Market Strategy",
        "Financial Modeling",
        "Market Research",
        "Business Strategy",
      ],
      tags: ["Go-to-Market", "Product & IoT", "Strategy"],
      artifacts: [
        { label: "View Project", url: "/greensense-smartpot.pdf" },
      ],
      featured: false,
    },
  ],
};

export default profile;
