export interface ProjectCaseStudy {
  context: string;
  problem: string;
  insight: string;
  systemArchitecture: string[];
  productDetails: string;
  technologies: string[];
  challenges: string[];
  decisions: string[];
  results: string;
  learnings: string[];
}

export interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  year: string;
  summary: string;
  visualTheme: {
    accent: string;
    glow: string;
    tag: string;
    badge: string;
  };
  metrics: { label: string; value: string }[];
  stack: string[];
  highlights: string[];
  caseStudy: ProjectCaseStudy;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Experiment {
  id: string;
  title: string;
  type: string;
  description: string;
  status: "ACTIVE" | "PROTOTYPE" | "STABLE";
  tech: string[];
  interactiveKind: "canvas-mesh" | "agent-flow" | "audio-synth" | "data-tree";
}

export interface TechCategory {
  title: string;
  description: string;
  accent: string;
  skills: { name: string; level: string; focus: string; relatedProjectIds: string[] }[];
}

export const PORTFOLIO_DATA = {
  meta: {
    name: "Amit Kumar Gupta",
    role: "Founder • Builder • Systems Architect",
    tagline: "I don't just build digital products. I create systems, experiences, and businesses.",
    headline: "I BUILD WHAT'S NEXT.",
    location: "India",
    timezone: "Asia/Kolkata",
    year: "2026",
    status: "AVAILABLE FOR SELECT VENTURES & ADVISORY",
    initials: "AKG",
  },
  
  // Direct communication channels. Replace placeholder values with verified links.
  contact: {
    email: "contact@amitgupta.dev", // REPLACE_WITH_REAL_DATA
    github: "https://github.com/amit-gupta", // REPLACE_WITH_REAL_DATA
    linkedin: "https://linkedin.com/in/amit-kumar-gupta", // REPLACE_WITH_REAL_DATA
    x: "https://x.com/amit_gupta", // REPLACE_WITH_REAL_DATA
    telegram: "https://t.me/amit_gupta", // REPLACE_WITH_REAL_DATA
  },

  manifesto: {
    lead: "I'M INTERESTED IN THE SPACE BETWEEN AN IDEA AND A WORKING PRODUCT.",
    body: "Most digital products fail not from lack of ambition, but from fragmented execution. I engineer autonomous intelligence, living software systems, and bespoke digital experiences where architectural rigor meets creative art direction.",
    pillars: [
      {
        num: "01",
        title: "Autonomous Intelligence",
        detail: "Designing agentic pipelines, LLM orchestration layers, and computer vision workflows that act independently.",
      },
      {
        num: "02",
        title: "SaaS & Systems Architecture",
        detail: "Building resilient distributed backends, streaming event buses, and real-time state synchronization.",
      },
      {
        num: "03",
        title: "Creative Engineering",
        detail: "Crafting bespoke WebGL environments, 60fps kinetic motion, and tactile interactive micro-interactions.",
      },
      {
        num: "04",
        title: "Product & Venture Building",
        detail: "Bridging technical capability with market urgency to turn raw research into defensible products.",
      },
    ],
  },

  philosophy: {
    quote: "I'M NOT INTERESTED IN MAKING MORE SOFTWARE. I'M INTERESTED IN MAKING BETTER SYSTEMS.",
    statement: "Software is ephemeral. Systems that compound leverage, liberate human attention, and operate with surgical elegance endure.",
    principles: [
      { label: "01 / AUTONOMY", text: "Systems should reduce human cognitive overhead, not invent new busywork." },
      { label: "02 / CRAFT", text: "Visual beauty without architectural stability is decoration. Stability without beauty is forgettable." },
      { label: "03 / VELOCITY", text: "Rapid validation through working prototypes beats months of speculative deck writing." },
    ],
  },

  projects: [
    {
      id: "revenue-os-ai",
      num: "001",
      title: "RevenueOS AI",
      subtitle: "Autonomous Revenue Infrastructure",
      category: "AI / SaaS / Automation",
      role: "Founder / Product / Engineering",
      year: "2026",
      summary: "An autonomous multi-agent operating system orchestrating lead intelligence, signal-based enrichment, and dynamic conversion loops without manual bottlenecks.",
      visualTheme: {
        accent: "#00F0FF",
        glow: "rgba(0, 240, 255, 0.25)",
        tag: "PIPELINE INTELLIGENCE",
        badge: "AUTONOMOUS REVENUE ENGINE",
      },
      metrics: [
        { label: "DECISION LATENCY", value: "< 180ms" },
        { label: "PIPELINE EFFICIENCY", value: "99.4%" },
        { label: "AGENT NODES", value: "12 Distributed" },
      ],
      stack: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis", "Vector Embeddings", "Tailwind CSS"],
      highlights: [
        "Autonomous multi-agent signal mesh monitoring market intent data",
        "Deterministic fallbacks guaranteeing compliance and zero hallucinated contracts",
        "Real-time event streaming interface built with WebSockets & reactive graphs",
      ],
      caseStudy: {
        context: "Modern B2B revenue teams drown in fragmented data silos, stitching together dozens of disconnected tools while leads decay in queue.",
        problem: "Sales and revenue pipelines require continuous manual qualification, copy generation, and data enrichment—leading to high drop-off and sluggish response times.",
        insight: "Revenue generation isn't a collection of disparate tasks; it is an interconnected reactive state machine that can execute autonomously when given reliable deterministic guardrails.",
        systemArchitecture: [
          "Event Ingestion Engine: High-throughput ingestion of intent signals, CRM webhooks, and behavioral triggers.",
          "Cognitive Dispatcher: Multi-agent LLM arbitration layer that determines qualification criteria and enrichment priority.",
          "Action Execution Matrix: Automated outreach, meeting booking, and pipeline routing with human-in-the-loop escalation.",
          "Telemetry & Audit Ledger: Complete tamper-evident event log recording agent reasoning traces and conversion outcomes.",
        ],
        productDetails: "Designed as a sleek mission-control dashboard with real-time particle data streams, dynamic node graphs, and deep drill-down analytics for every automated interaction.",
        technologies: ["Next.js 15", "React 19", "Python / AsyncIO", "Redis Pub/Sub", "PostgreSQL", "Framer Motion", "Tailwind CSS"],
        challenges: [
          "Preventing agent hallucinations during high-stakes commercial correspondence.",
          "Maintaining sub-200ms latency across distributed vector search operations.",
          "Designing an intuitive UI that visualizes complex multi-step agent decisions without overwhelming operators.",
        ],
        decisions: [
          "Implemented strict JSON schema enforcement with dual-pass validation before any external action is executed.",
          "Adopted an in-memory Redis state cache paired with persistent PostgreSQL write-ahead logs.",
          "Built a dark, high-contrast HUD visual system inspired by aerospace mission telemetry.",
        ],
        results: "Demonstrated full end-to-end autonomous pipeline orchestration with zero manual intervention required for 85% of standard inbound cycles.",
        learnings: [
          "Autonomous systems require clear trust surfaces: users need to see why an agent made a decision, not just the output.",
          "Speed is a feature—instantaneous UI feedback dramatically increases operator trust.",
        ],
      },
    },
    {
      id: "ai-computer-operator",
      num: "002",
      title: "AI Computer Operator",
      subtitle: "Autonomous Desktop & GUI Execution Agent",
      category: "Automation / Vision / Desktop Systems",
      role: "Creator / Systems Architect",
      year: "2026",
      summary: "A multimodal neural vision agent executing complex multi-application desktop workflows, bridging legacy enterprise interfaces with modern autonomous intelligence.",
      visualTheme: {
        accent: "#3B82F6",
        glow: "rgba(59, 130, 246, 0.25)",
        tag: "DESKTOP AUTOMATION",
        badge: "GUI VISION AGENT",
      },
      metrics: [
        { label: "VISUAL ACCURACY", value: "98.7%" },
        { label: "ACTION SPEED", value: "60 FPS Track" },
        { label: "CROSS-PLATFORM", value: "Win / Mac / Linux" },
      ],
      stack: ["Python", "PyTorch", "OpenCV", "Electron", "TypeScript", "FastAPI", "Custom Vision Models"],
      highlights: [
        "Real-time visual screen grounding without requiring native application APIs",
        "Self-healing execution paths adapting to unexpected UI changes and dialog popups",
        "Deterministic safety sandbox with instant user override via hotkey or mouse grab",
      ],
      caseStudy: {
        context: "Enterprise software contains billions of dollars in mission-critical operations trapped behind legacy GUIs that lack modern REST or GraphQL APIs.",
        problem: "Traditional RPA scripts break whenever a button shifts by two pixels, and humans waste millions of hours copying data between disparate desktop windows.",
        insight: "By treating the computer screen as a visual canvas and reasoning over UI geometry with multimodal vision, an agent can operate any software exactly as a human does.",
        systemArchitecture: [
          "Screen Capture Stream: Ultra-low-overhead frame buffer capture operating at 60 FPS.",
          "Spatial Perception Model: Lightweight vision model identifying interactable bounding boxes, inputs, buttons, and text fields.",
          "Planning & Trajectory Engine: Hierarchical task decomposition mapping high-level instructions into precise click and keystroke sequences.",
          "Safety & Verification Sandbox: Visual state verification confirming that each action produced the intended outcome before proceeding.",
        ],
        productDetails: "Features a floating glass HUD overlay indicating agent intent, upcoming execution steps, and live confidence scores with instantaneous pause/resume controls.",
        technologies: ["Python 3.12", "C++ Native Screen Grabbers", "TypeScript", "Electron", "ONNX Runtime", "WebSockets"],
        challenges: [
          "Balancing high-frequency frame capture with low CPU/GPU resource consumption.",
          "Handling dynamic UI elements, dropdown menus, and loading states without getting stuck.",
          "Providing ironclad safety guarantees so the agent never touches restricted applications or credentials.",
        ],
        decisions: [
          "Developed custom native screen diffing in C++ so the vision model is only queried when screen regions actually change.",
          "Introduced a 'Virtual Keyboard & Mouse Boundary' requiring explicit cryptographic confirmation for credential fields.",
        ],
        results: "Successfully executed multi-app operational workflows across CRM, spreadsheets, and custom desktop databases with 98.7% task completion fidelity.",
        learnings: [
          "Human-in-the-loop fallback is not an admission of defeat; it is the cornerstone of trustworthy automation.",
          "Local model inference is essential for desktop agent responsiveness and privacy.",
        ],
      },
    },
    {
      id: "super-jarvis",
      num: "003",
      title: "SUPER JARVIS",
      subtitle: "Multimodal Cognitive Voice & Vision Engine",
      category: "AI / HCI / Multimodal Intelligence",
      role: "Lead Architect & Developer",
      year: "2025 - 2026",
      summary: "A real-time voice-driven cognitive system combining active screen comprehension, local LLM execution, neural audio synthesis, and contextual system orchestration.",
      visualTheme: {
        accent: "#8B5CF6",
        glow: "rgba(139, 92, 246, 0.25)",
        tag: "HUMAN × MACHINE",
        badge: "COGNITIVE ASSISTANT",
      },
      metrics: [
        { label: "VOICE ROUNDTRIP", value: "< 320ms" },
        { label: "LOCAL INFERENCE", value: "Zero Cloud Lag" },
        { label: "MULTIMODAL CONTEXT", value: "Audio + Vision" },
      ],
      stack: ["Python", "Rust", "WebSockets", "Whisper", "Local LLM", "Kokoro TTS", "React", "Tailwind CSS"],
      highlights: [
        "Full conversational interruption handling with natural turn-taking dynamics",
        "Persistent context memory retaining project state across multi-hour development sessions",
        "Hands-free terminal command execution with automated verification checks",
      ],
      caseStudy: {
        context: "Voice assistants have stagnated as robotic weather-announcers rather than deeply integrated intellectual collaborators.",
        problem: "Developers and creators work with their hands full of code and thoughts; switching to typing queries fractures flow states.",
        insight: "A cognitive assistant must see what you see, listen with continuous low latency, and have permission to execute real actions inside your development environment.",
        systemArchitecture: [
          "Acoustic Pipeline: Streaming VAD (Voice Activity Detection) and ultra-fast Whisper speech-to-text with partial hypothesis streaming.",
          "Cognitive Core: Hybrid LLM router querying low-latency local quantized models for immediate feedback and deep reasoning models for complex refactors.",
          "Neural Synthesis: Low-latency streaming TTS that begins playback within 120ms of token generation.",
          "Contextual Peripheral: Live screen OCR and AST code parser keeping the assistant aware of current code lines and errors.",
        ],
        productDetails: "A clean, tactile soundwave visualization that pulses with emotional resonance, paired with a slide-out scratchpad showing live transcription and executed terminal outputs.",
        technologies: ["Rust Audio Pipeline", "Python Async Engine", "WebAudio API", "FastAPI", "React", "Next.js"],
        challenges: [
          "Eliminating the awkward 1-2 second delay inherent in traditional chained voice APIs.",
          "Handling speech barge-in seamlessly so the user can interrupt the assistant mid-sentence.",
        ],
        decisions: [
          "Built a direct streaming audio socket directly in Rust to bypass Node/Python audio latency buffers.",
          "Implemented semantic turn-taking heuristics predicting when a speaker has paused versus finished an utterance.",
        ],
        results: "Achieved sub-320ms voice roundtrip latency, creating a dialogue experience that feels indistinguishable from human conversation.",
        learnings: [
          "Latency is the difference between an awkward novelty and an indispensable thinking partner.",
        ],
      },
    },
    {
      id: "localgrowth-ai",
      num: "004",
      title: "LocalGrowth AI",
      subtitle: "Hyperlocal Business Intelligence & Growth Engine",
      category: "SaaS / Geo-Data / Automation",
      role: "Product & Engineering",
      year: "2025",
      summary: "An automated discovery, reputation intelligence, and outreach automation platform for local businesses powered by geospatial graphs and market sentiment signals.",
      visualTheme: {
        accent: "#10B981",
        glow: "rgba(16, 185, 129, 0.25)",
        tag: "GEO-SPATIAL GRAPH",
        badge: "MARKET INTELLIGENCE",
      },
      metrics: [
        { label: "DATA POINTS / SEC", value: "2,400+" },
        { label: "OUTREACH AUTOMATION", value: "10x Lift" },
        { label: "GEO COVERAGE", value: "Pan-India / Global" },
      ],
      stack: ["Next.js", "TypeScript", "PostGIS", "Supabase", "Tailwind CSS", "Cheerio", "OpenAI API"],
      highlights: [
        "Automated discovery engine parsing regional business directories and map clusters",
        "Algorithmic reputation health audit generating instant actionable growth blueprints",
        "Multi-channel automated notification system connecting local operators with clients",
      ],
      caseStudy: {
        context: "Small and medium local businesses struggle to maintain visibility, track competitor pricing, and convert nearby digital traffic into loyal customers.",
        problem: "Enterprise marketing platforms are too complex and expensive for local service providers, while manual audits take hours per merchant.",
        insight: "By synthesizing public geospatial data, review velocity, and localized keyword search rankings, an automated platform can deliver tailored growth playbooks in seconds.",
        systemArchitecture: [
          "Geospatial Crawler: Distributed scrapers collecting real-time presence data from map services and local directories.",
          "Scoring Engine: Proprietary algorithm calculating digital visibility, customer sentiment score, and local competitive density.",
          "Playbook Generator: AI synthesis translating raw metrics into high-converting website improvements, SEO fixes, and automated campaigns.",
          "Merchant Portal: Lightweight mobile-optimized command center for business owners.",
        ],
        productDetails: "An interactive radar and map interface visualizing competitor clusters, digital blindspots, and step-by-step revenue opportunities.",
        technologies: ["Next.js App Router", "PostGIS", "Prisma", "Tailwind CSS", "Redis Queue", "SendGrid"],
        challenges: [
          "Managing rate limits and anti-scraping protections across diverse regional portals.",
          "Presenting technical SEO and data concepts in language immediately intuitive to non-technical business owners.",
        ],
        decisions: [
          "Implemented intelligent residential proxy rotation and exponential backoff retry policies.",
          "Designed a 'Single-Metric Health Score' (0-100) that gives instant clarity before expanding into granular action items.",
        ],
        results: "Delivered actionable growth diagnostics to hundreds of local merchants with automated report generation under 4 seconds.",
        learnings: [
          "Simplicity of presentation is what unlocks the value of complex underlying data pipelines.",
        ],
      },
    },
  ],

  experiments: [
    {
      id: "lab-01",
      title: "NeuroMesh Vector Field",
      type: "WebGL / Compute Shader",
      description: "Interactive particle lattice simulating gravitational lensing and cursor velocity displacement.",
      status: "ACTIVE",
      tech: ["Three.js", "GLSL", "WebGL"],
      interactiveKind: "canvas-mesh",
    },
    {
      id: "lab-02",
      title: "Agentic Consensus Loop",
      type: "Distributed Multi-Agent Simulation",
      description: "Live visualization of 5 autonomous agents negotiating resource allocation via Byzantine fault-tolerant voting.",
      status: "ACTIVE",
      tech: ["TypeScript", "State Machines", "Web Workers"],
      interactiveKind: "agent-flow",
    },
    {
      id: "lab-03",
      title: "MicroSynth Web Audio",
      type: "Generative Audio Engine",
      description: "Procedural sound design engine synthesizing harmonic sine waves and haptic audio clicks in real-time.",
      status: "STABLE",
      tech: ["Web Audio API", "DSP", "Sound Design"],
      interactiveKind: "audio-synth",
    },
    {
      id: "lab-04",
      title: "HyperGraph Visualizer",
      type: "Spatial Graph Topology",
      description: "Physics-based node repulsion network mapping complex architectural dependencies.",
      status: "PROTOTYPE",
      tech: ["HTML5 Canvas", "Verlet Integration", "Math"],
      interactiveKind: "data-tree",
    },
  ],

  capabilities: [
    {
      title: "BUILD",
      description: "Production software engineering across frontend, backend, and distributed systems.",
      accent: "#3B82F6",
      skills: [
        { name: "React / Next.js", level: "EXPERT", focus: "App Router, Server Actions, React 19", relatedProjectIds: ["revenue-os-ai", "localgrowth-ai"] },
        { name: "TypeScript", level: "EXPERT", focus: "Strict typing, generics, AST tooling", relatedProjectIds: ["revenue-os-ai", "ai-computer-operator"] },
        { name: "Python", level: "ADVANCED", focus: "AsyncIO, FastAPI, PyTorch, LangChain", relatedProjectIds: ["revenue-os-ai", "ai-computer-operator", "super-jarvis"] },
        { name: "Node.js & Edge", level: "ADVANCED", focus: "Microservices, streaming, worker runtimes", relatedProjectIds: ["revenue-os-ai", "localgrowth-ai"] },
      ],
    },
    {
      title: "INTELLIGENCE",
      description: "Engineering autonomous models, agentic pipelines, and computer vision systems.",
      accent: "#00F0FF",
      skills: [
        { name: "Autonomous Agents", level: "CORE", focus: "Multi-agent orchestration, state machines", relatedProjectIds: ["revenue-os-ai", "ai-computer-operator"] },
        { name: "Computer Vision", level: "CORE", focus: "Screen grounding, OpenCV, real-time OCR", relatedProjectIds: ["ai-computer-operator"] },
        { name: "LLM Orchestration", level: "EXPERT", focus: "Prompt pipelines, RAG, tool calling", relatedProjectIds: ["revenue-os-ai", "super-jarvis"] },
        { name: "Multimodal Voice", level: "ADVANCED", focus: "Whisper, streaming TTS, low-latency audio", relatedProjectIds: ["super-jarvis"] },
      ],
    },
    {
      title: "EXPERIENCE",
      description: "Art direction, 60fps kinetic motion, and tactile digital interfaces.",
      accent: "#8B5CF6",
      skills: [
        { name: "Three.js & WebGL", level: "ADVANCED", focus: "Custom shaders, particle simulations, 3D math", relatedProjectIds: ["lab-01"] },
        { name: "Framer Motion", level: "EXPERT", focus: "Complex layout animations, gesture physics", relatedProjectIds: ["revenue-os-ai", "localgrowth-ai"] },
        { name: "Editorial Typography", level: "EXPERT", focus: "Bespoke grid layouts, variable typography", relatedProjectIds: ["revenue-os-ai"] },
        { name: "Web Audio API", level: "ADVANCED", focus: "Procedural sound effects, audio synthesis", relatedProjectIds: ["lab-03", "super-jarvis"] },
      ],
    },
    {
      title: "INFRASTRUCTURE",
      description: "Cloud architecture, databases, streaming data, and security boundaries.",
      accent: "#10B981",
      skills: [
        { name: "PostgreSQL & Supabase", level: "EXPERT", focus: "Schema design, PostGIS, indexing", relatedProjectIds: ["revenue-os-ai", "localgrowth-ai"] },
        { name: "Redis & In-Memory", level: "ADVANCED", focus: "Caching, Pub/Sub, queue arbitration", relatedProjectIds: ["revenue-os-ai"] },
        { name: "Docker & Containerization", level: "ADVANCED", focus: "Isolated execution environments", relatedProjectIds: ["ai-computer-operator"] },
        { name: "Security & Guardrails", level: "ADVANCED", focus: "Deterministic validation, sandbox isolation", relatedProjectIds: ["revenue-os-ai", "ai-computer-operator"] },
      ],
    },
  ],

  inquiryOptions: {
    projectTypes: [
      { id: "ai-product", label: "AI Product / Agent" },
      { id: "saas-system", label: "SaaS Platform" },
      { id: "automation", label: "Autonomous Workflow" },
      { id: "creative-eng", label: "Interactive 3D / Brand Experience" },
      { id: "advisory", label: "Technical Advisory / Systems Audit" },
    ],
    budgetRanges: [
      { id: "tier-1", label: "$5k - $15k / ₹4L - ₹12L" },
      { id: "tier-2", label: "$15k - $30k / ₹12L - ₹25L" },
      { id: "tier-3", label: "$30k+ / ₹25L+" },
      { id: "tier-advisory", label: "Advisory / Retainer" },
    ],
    timelines: [
      { id: "immediate", label: "< 1 Month (Fast Track)" },
      { id: "quarter", label: "1 - 3 Months" },
      { id: "flexible", label: "Strategic / Flexible" },
    ],
  },
};
