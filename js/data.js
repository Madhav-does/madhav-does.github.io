/**
 * Madhav Raj M — Professional Portfolio & Executive Resume Data
 * Grounded in verified Academic, Engineering, GitHub (@Madhav-does), and Leadership records.
 */

window.RESUME_DATA = {
  profile: {
    name: "Madhav Raj M",
    badgeId: "MRM-2025-CYBER",
    roles: [
      "AI Vibe Coder & Autonomous Agent Builder",
      "Video Editor & Digital Content Producer",
      "Full-Stack Web & 3D Interactive Developer",
      "Cybersecurity & IoT Researcher"
    ],
    tagline: "Engineering autonomous AI workflows, intelligent voice systems, and modern web architectures with rapid prototyping velocity.",
    institution: "Sri Ramachandra University (SRIHER)",
    degree: "B.Tech — Cyber Security & IoT",
    year: "2nd Year Student (2025 — 2029)",
    location: "Chennai, Tamil Nadu, India",
    email: "madhav.madathil@gmail.com",
    phone: "+91 9360989726",
    github: "https://github.com/Madhav-does",
    githubUser: "Madhav-does",
    linkedin: "https://www.linkedin.com/in/madhav-raj-633409375",
    linkedinUser: "madhav-raj-633409375",
    bio: `Motivated 2nd-year B.Tech scholar specializing in Cyber Security and IoT at Sri Ramachandra University. An enthusiastic AI vibe coder, video editor, and web developer dedicated to building real-time interactive experiences, intelligent voice assistants, and autonomous AI agents. Successfully engineered autonomous social media & LinkedIn posting pipelines with LLM reasoning. Passionate about rapid prototyping, modern frontend tooling, and expanding multilingual communication in Spanish, German, and Japanese.`,
    metrics: [
      { label: "Academic Standing", value: "2nd Year", sub: "SRIHER B.Tech" },
      { label: "Core Competencies", value: "AI · Web · Video", sub: "Multi-Disciplinary" },
      { label: "Active Repositories", value: "5+ Systems", sub: "GitHub Engineering" },
      { label: "High School Standing", value: "75% / 72%", sub: "The Schram Academy" },
      { label: "Leadership", value: "Sports Captain", sub: "Student Governance" }
    ]
  },

  experience: [
    {
      role: "B.Tech Cyber Security & IoT Scholar",
      organization: "Sri Ramachandra University (SRIHER)",
      period: "2025 — Present",
      status: "Currently Pursuing — 2nd Year",
      location: "Chennai, Tamil Nadu, India",
      type: "Academic & Systems Research",
      highlights: [
        "Specializing in cybersecurity fundamentals, IoT sensor networks, defensive security architectures, and system programming.",
        "Engineering practical software solutions bridging hardware sensors with cloud dashboards and AI backends.",
        "Participating in Smart India Hackathon (SIH 2026) innovation tracks and laboratory defensive security exercises."
      ],
      skills: ["Cyber Security", "IoT Architectures", "Networking", "C/C++", "Java", "Linux Utilities"]
    },
    {
      role: "AI Vibe Coder & Autonomous Agent Developer",
      organization: "Independent Open Source & Automation",
      period: "2024 — Present",
      status: "Active Developer",
      location: "Remote",
      type: "Engineering & Automation",
      highlights: [
        "Architected an Autonomous Multi-Platform AI Content & Social Media Posting Agent: integrated LLM agents (Gemini) for technical content drafting, image synthesis, and automated posting to LinkedIn and social channels via headless browser automation.",
        "Engineered 'ARIA', a Tony Stark JARVIS-style Windows voice assistant with animated 96-bar Arc-Reactor HUD, Google Gemini 2.0 Flash, and Microsoft Neural TTS.",
        "Developed automated background daemons for scheduled video snippet extraction, file backups, and desktop workflow triggers.",
        "Pioneered AI-assisted 'vibe coding' pipelines, shipping production-ready web applications and telemetry dashboards with unprecedented speed."
      ],
      skills: ["Autonomous Agents", "Gemini 2.0 Flash", "Python", "Playwright", "Neural TTS", "Prompt Engineering"]
    },
    {
      role: "Video Editor & Digital Content Producer",
      organization: "Creative Productions",
      period: "2023 — Present",
      status: "Creative Freelance",
      location: "Chennai, India",
      type: "Media & Post-Production",
      highlights: [
        "Crafting high-engagement short and long-form video edits using Wondershare Filmora 15 and CapCut Pro.",
        "Expertise in motion pacing, audio ducking, sound effect design, visual transitions, and dynamic typography.",
        "Delivered polished multimedia presentations, promotional reels, and engaging video content."
      ],
      skills: ["Wondershare Filmora 15", "CapCut Pro", "Sound Design", "Motion Pacing", "Video Direction"]
    },
    {
      role: "Sports Captain & Student Leader",
      organization: "The Schram Academy",
      period: "High School Tenure",
      status: "Completed",
      location: "Chennai, India",
      type: "Leadership & Athletics",
      highlights: [
        "Elected Sports Captain, leading school-wide sports events, athletic meets, and inter-school tournaments.",
        "Fostered disciplined teamwork, peer motivation, and crisis communication under competitive pressure.",
        "Competed actively in football, volleyball, and track events."
      ],
      skills: ["Team Leadership", "Event Coordination", "Crisis Communication", "Athletics"]
    }
  ],

  projects: [
    {
      id: "nexus-auto",
      title: "NexusAuto — Autonomous AI Posting & Task Agent",
      tagline: "Autonomous Multi-Platform Content Synthesizer & Social Dispatcher",
      category: "Autonomous AI & Automation",
      featured: true,
      github: "https://github.com/Madhav-does",
      badge: "Flagship Agent",
      tech: ["Python", "Gemini 2.0 Flash", "Playwright / Headless", "Cron / Daemon", "Prompt Engineering"],
      summary: "End-to-end autonomous AI agent system engineered to generate, format, verify, and auto-publish technical content and updates across LinkedIn and social channels, coupled with background desktop automation routines.",
      points: [
        "Agentic Content Synthesis: Ingests technical project milestones and commits, utilizing Gemini 2.0 to draft insightful, engagement-optimized LinkedIn posts.",
        "Headless Browser Dispatch: Fully automated browser pipeline (Playwright / Selenium) that authenticates, renders preview snippets, and dispatches posts at peak schedule windows.",
        "Automated Task Suite: Background daemon triggers automated video clipping, file synchronization, and PC automation routines without manual intervention.",
        "Self-Healing Telemetry: Error logging, automated retries on rate limits, and webhook confirmation notifications."
      ]
    },
    {
      id: "aria",
      title: "ARIA — JARVIS AI Voice Assistant",
      tagline: "Tony Stark JARVIS-style Desktop Assistant for Windows",
      category: "AI & System Automation",
      featured: true,
      github: "https://github.com/Madhav-does/AIRA",
      badge: "Voice Systems",
      tech: ["Python", "Gemini 2.0 Flash", "Microsoft Neural TTS", "Google STT", "CustomTkinter", "Pygame"],
      summary: "High-performance voice-controlled desktop assistant for Windows modeled after Tony Stark's JARVIS. Features an animated 96-bar Arc-Reactor HUD, multi-turn AI brain, live CPU/RAM meters, system-wide global hotkeys, and full PC control.",
      points: [
        "Centered 96-bar circular frequency visualizer that dances to speech frequencies in real time.",
        "Multi-turn conversational memory with witty, warm banter powered by Gemini 2.0 Flash.",
        "Full application launching, volume control, weather telemetry, and multi-timer management.",
        "Dual-pass SpeechRecognition with accent matching (en-IN and en-US) for zero-lag voice commands."
      ]
    },
    {
      id: "polargrid",
      title: "PolarGrid AI — Smart Energy Management",
      tagline: "Polar Research Station Energy Monitoring & Shortage Prediction",
      category: "Full Stack & Predictive Analytics",
      featured: true,
      github: "https://github.com/Madhav-does/polar-energy-dashboard",
      badge: "SIH 2026",
      tech: ["JavaScript (ES6+)", "Chart.js", "Glassmorphism UI", "SVG Telemetry", "AI Predictions"],
      summary: "Operational web dashboard engineered for remote polar stations. Tracks live telemetry for solar/wind/diesel generation, battery state of charge (SoC), weather blizzards, and runs predictive models to anticipate energy deficits.",
      points: [
        "Dynamic SVG circular gauges and 48-module battery cell health grid.",
        "Interactive scenario switcher: Normal Operations vs. Critical Polar Storm Mode.",
        "Real-time AI recommendations with one-click operational apply actions.",
        "Emissions avoided counter and live energy flow diagrams."
      ]
    },
    {
      id: "galphin",
      title: "GALPHIN — AI Receipt Intelligence",
      tagline: "Receipt Parsing & Financial Analytics Platform",
      category: "FinTech & Web Architecture",
      featured: true,
      github: "https://github.com/Madhav-does/GALPHIN",
      badge: "Financial AI",
      tech: ["HTML5/CSS3", "JavaScript", "Chart.js", "Financial Insights", "Multi-Language"],
      summary: "AI-driven financial management prototype that transforms receipts into structured accounting intelligence, expense classifications, and interactive portfolio performance visualizations.",
      points: [
        "Real-time expense categorization and simulated incoming transfer notifications.",
        "Multi-language localization support including English, Malayalam, Tamil, Hindi, and Spanish.",
        "Interactive portfolio trend charts and customizable transaction ledgers."
      ]
    },
    {
      id: "leave-mgmt",
      title: "Employee Leave Management System",
      tagline: "Modular Java Swing Desktop Application",
      category: "Desktop & OOP Architecture",
      featured: false,
      github: "https://github.com/Madhav-does/Leave-Management-System-",
      badge: "Java OOP",
      tech: ["Java", "Swing GUI", "File Persistence", "OOP Architecture"],
      summary: "Desktop enterprise tool for managing organizational leave applications with persistent text-file storage, role-based workflows, and tabbed administrative views.",
      points: [
        "Structured OOP hierarchy separating views, data access, and business logic.",
        "Persistent file storage ensuring data durability across application sessions.",
        "Clean tabbed interface for employees to submit and admins to approve leaves."
      ]
    },
    {
      id: "supermarket",
      title: "Mini Supermarket Billing & Inventory",
      tagline: "Simulated Retail Checkout & Stock Manager",
      category: "Object-Oriented Programming",
      featured: false,
      github: "https://github.com/Madhav-does",
      badge: "Java",
      tech: ["Java", "OOP", "Exception Handling", "Data Structures"],
      summary: "Java console application simulating supermarket checkout operations, inventory replenishment, and customer invoice generation with strict exception handling.",
      points: [
        "Implemented item catalogs, barcode lookups, and tax calculations.",
        "Reinforced core OOP inheritance, polymorphism, and edge-case validation."
      ]
    },
    {
      id: "bus-ticket",
      title: "Bus Ticket Management System",
      tagline: "Low-Level Structured Booking Terminal",
      category: "Systems & File I/O",
      featured: false,
      github: "https://github.com/Madhav-does",
      badge: "C Language",
      tech: ["C", "File I/O", "Memory Management", "Structured Programming"],
      summary: "High-efficiency console booking system developed in C utilizing binary file persistence, seat reservation matrices, and passenger records.",
      points: [
        "Low-level memory pointers and modular procedural design.",
        "Persistent record storage via direct binary file operations."
      ]
    }
  ],

  skills: {
    categories: [
      {
        id: "ai_automation",
        name: "AI & Autonomous Systems",
        icon: "robot",
        skills: [
          { name: "Autonomous AI Agents & Multi-Agent Workflows", level: 94, levelTag: "Advanced" },
          { name: "Automated Social Posting & Task Pipelines", level: 92, levelTag: "Advanced" },
          { name: "Google Gemini 2.0 Flash / LLM APIs", level: 93, levelTag: "Specialist" },
          { name: "Headless Browser Automation (Playwright / Selenium)", level: 89, levelTag: "Proficient" },
          { name: "AI Vibe Coding & Rapid Prototyping", level: 96, levelTag: "Expert" },
          { name: "Speech AI (Google STT / Microsoft Neural TTS)", level: 88, levelTag: "Proficient" }
        ]
      },
      {
        id: "web_development",
        name: "Web & 3D Interactive Development",
        icon: "code",
        skills: [
          { name: "Modern JavaScript (ES6+) & DOM APIs", level: 88, levelTag: "Advanced" },
          { name: "HTML5 Semantic Architecture", level: 94, levelTag: "Expert" },
          { name: "CSS3 / Modern Tailwind / Responsive Systems", level: 90, levelTag: "Advanced" },
          { name: "Three.js & 3D WebGL Experiences", level: 85, levelTag: "Proficient" },
          { name: "Data Visualization (Chart.js / SVG Dashboards)", level: 86, levelTag: "Proficient" }
        ]
      },
      {
        id: "video_media",
        name: "Video Editing & Post-Production",
        icon: "film",
        skills: [
          { name: "Wondershare Filmora 15", level: 93, levelTag: "Expert" },
          { name: "CapCut Pro", level: 95, levelTag: "Expert" },
          { name: "Sound Design & Audio Ducking", level: 86, levelTag: "Proficient" },
          { name: "Motion Transitions, Pacing & Typography", level: 90, levelTag: "Advanced" },
          { name: "Digital Storytelling & Creative Direction", level: 88, levelTag: "Advanced" }
        ]
      },
      {
        id: "core_programming",
        name: "Core Programming & Software Design",
        icon: "terminal",
        skills: [
          { name: "Python (Automation, DAEMONs, AI Scripting)", level: 92, levelTag: "Advanced" },
          { name: "Java (OOP, Swing GUI, Modular Design)", level: 82, levelTag: "Proficient" },
          { name: "C (Low-Level Systems, Pointers, Binary File I/O)", level: 78, levelTag: "Intermediate" },
          { name: "Git & GitHub Version Control", level: 88, levelTag: "Advanced" },
          { name: "VS Code & CLI Developer Tooling", level: 92, levelTag: "Advanced" }
        ]
      },
      {
        id: "cyber_iot",
        name: "Cybersecurity & IoT Systems",
        icon: "shield-halved",
        skills: [
          { name: "Cybersecurity Fundamentals & Threat Awareness", level: 85, levelTag: "Academic Core" },
          { name: "Defensive Security Concepts (Blue Team)", level: 80, levelTag: "Academic Core" },
          { name: "IoT Sensor Architectures & Microcontrollers", level: 82, levelTag: "Academic Core" },
          { name: "Network Protocols & Packet Inspection", level: 78, levelTag: "Intermediate" },
          { name: "Data Protection & Organizational Security", level: 84, levelTag: "Certified" }
        ]
      }
    ]
  },

  languages: [
    { name: "English", proficiency: "Fluent / Full Professional", flag: "🇬🇧", status: "Fluent" },
    { name: "Malayalam", proficiency: "Native Language", flag: "🇮🇳", status: "Native" },
    { name: "Tamil", proficiency: "Fluent / Regional", flag: "🇮🇳", status: "Fluent" },
    { name: "Hindi", proficiency: "Conversational Working Proficiency", flag: "🇮🇳", status: "Conversational" },
    { name: "Spanish", proficiency: "Elementary Proficiency", flag: "🇪🇸", status: "Currently Learning" },
    { name: "German", proficiency: "Elementary Proficiency", flag: "🇩🇪", status: "Currently Learning" },
    { name: "Japanese", proficiency: "Elementary Proficiency (Kana / N5)", flag: "🇯🇵", status: "Currently Learning" }
  ],

  education: [
    {
      institution: "Sri Ramachandra Institute of Higher Education and Research (SRIHER)",
      degree: "Bachelor of Technology — B.Tech",
      field: "Cyber Security and IoT",
      period: "2025 — 2029",
      status: "Currently Pursuing — 2nd Year Scholar",
      grade: "In Progress",
      location: "Chennai, Tamil Nadu, India",
      details: [
        "Comprehensive curriculum in Network Security, Cryptography, IoT Microcontrollers, Embedded Systems, and Database Architectures.",
        "Hands-on laboratory simulations with network packet inspection, Linux security utilities, and IoT device programming.",
        "Active contributor to student technical initiatives and developer hackathons."
      ],
      badge: "University Core"
    },
    {
      institution: "The Schram Academy",
      degree: "Class 12 — Higher Secondary Examination",
      field: "Computer Science Stream",
      period: "Completed",
      status: "75% Score",
      grade: "75%",
      location: "Chennai, Tamil Nadu, India",
      details: [
        "Specialized coursework in Computer Science, C++/Python fundamentals, Mathematics, and Physical Sciences.",
        "Served as elected school Sports Captain, organizing large-scale athletic tournaments and fostering team cohesion.",
        "Represented school in inter-institution sports competitions."
      ],
      badge: "75% Score"
    },
    {
      institution: "The Schram Academy",
      degree: "Class 10 — Secondary School Examination",
      field: "General Science & Mathematics",
      period: "Completed",
      status: "72% Score",
      grade: "72%",
      location: "Chennai, Tamil Nadu, India",
      details: [
        "Strong foundation across Mathematics, Science, and Languages.",
        "Consistent leadership in house sports teams and school cultural initiatives."
      ],
      badge: "72% Score"
    }
  ],

  certifications: [
    {
      title: "Introduction to Cybersecurity Awareness",
      issuer: "HP LIFE / HP Foundation",
      date: "Aug 2026",
      category: "Cybersecurity",
      summary: "Comprehensive training in identifying common cyber threats, online vulnerability mitigation, and organizational data security practices."
    },
    {
      title: "Basics of Finance",
      issuer: "HP LIFE / HP Foundation",
      date: "Aug 2026",
      category: "Finance & Analytics",
      summary: "Business expense categorization, break-even analysis modeling, and financial calculation spreadsheets."
    },
    {
      title: "AI Agent Orchestration & Autonomous Workflows",
      issuer: "LinkedIn Learning & Open Source",
      date: "2026",
      category: "Artificial Intelligence",
      summary: "Multi-agent systems, prompt engineering pipelines, and headless social media automation."
    },
    {
      title: "Cyber Security & IoT Specialization",
      issuer: "Sri Ramachandra University",
      date: "2025 — Present",
      category: "Cybersecurity",
      summary: "Ongoing university foundational specialization covering hardware IoT, network defense, and system architectures."
    },
    {
      title: "Digital Video Editing & Post-Production Masterclass",
      issuer: "Filmora & CapCut Certified Workflows",
      date: "2024",
      category: "Video Production",
      summary: "Rhythmic pacing, audio ducking, motion transitions, dynamic typography, and short-form storytelling."
    },
    {
      title: "Responsive Web Design & 3D Interactive WebGL",
      issuer: "Modern Web Engineering",
      date: "2025",
      category: "Web Development",
      summary: "Modern CSS grid/flexbox, WebGL 3D rendering with Three.js, and high-performance UI engineering."
    }
  ]
};
