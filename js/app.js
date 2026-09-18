/**
 * Professional Portfolio & Executive Resume Controller
 * Manages tab switching, 3D ID Card interaction, contact dispatching, and 1-click PDF resume download.
 */

class PortfolioApp {
  constructor() {
    this.data = window.RESUME_DATA;
    this.activeTab = "overview";
    this.bgScene = null;
    this.idCard = null;

    // DOM Elements
    this.tabButtons = document.querySelectorAll(".nav-tab-btn");
    this.tabSections = document.querySelectorAll(".tab-content-panel");
    this.downloadButtons = document.querySelectorAll(".btn-download-resume");
    this.idCardFlipBtn = document.getElementById("idcard-flip-btn");
    this.contactForm = document.getElementById("contact-dispatch-form");
    this.atsModal = document.getElementById("ats-preview-modal");
    this.atsCloseBtn = document.getElementById("ats-modal-close");

    this.init();
  }

  init() {
    // 1. Initialize 3D Ambient Background
    if (document.getElementById("canvas-bg")) {
      this.bgScene = new AmbientBackgroundScene("canvas-bg");
    }

    // 2. Initialize 3D ID Card on the Side
    if (document.getElementById("idcard-viewport")) {
      this.idCard = new IDCard3D("idcard-viewport");
    }

    // 3. Setup Navigation Tabs
    this.setupNavigation();

    // 4. Setup ID Card Interactions
    this.setupIDCardControls();

    // 5. Setup Resume Download & Print
    this.setupDownloadResume();

    // 6. Setup Contact Form
    this.setupContactForm();

    // 7. Render Dynamic Sections
    this.renderAllSections();

    // 8. Handle URL Hash
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash === "download" || hash === "pdf" || hash === "ats") {
      setTimeout(() => this.openATSPreview(), 200);
    } else if (hash === "flip" || hash === "back") {
      setTimeout(() => { if (this.idCard) this.idCard.flip(); }, 150);
    } else if (hash && document.getElementById(`tab-${hash}`)) {
      this.switchTab(hash);
    }
  }

  setupNavigation() {
    this.tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabId = btn.dataset.tab;
        if (tabId) {
          this.switchTab(tabId);
        }
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;

    // Update active tab buttons
    this.tabButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    // Update tab panels
    this.tabSections.forEach(section => {
      const isTarget = section.id === `tab-${tabId}`;
      section.classList.toggle("active", isTarget);
      if (isTarget) {
        // Scroll container to top
        const mainContent = document.getElementById("main-scroll-pane");
        if (mainContent) mainContent.scrollTop = 0;
      }
    });

    // Update hash quietly
    window.history.replaceState(null, "", `#${tabId}`);
  }

  setupIDCardControls() {
    if (this.idCardFlipBtn && this.idCard) {
      this.idCardFlipBtn.addEventListener("click", () => {
        this.idCard.flip();
      });
    }
  }

  setupDownloadResume() {
    this.downloadButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        this.triggerResumeDownload();
      });
    });

    if (this.atsCloseBtn && this.atsModal) {
      this.atsCloseBtn.addEventListener("click", () => {
        this.atsModal.classList.remove("active");
      });
    }
  }

  triggerResumeDownload() {
    // Populate and open printable ATS view then launch print-to-PDF
    this.populateATSModal();
    window.print();
  }

  openATSPreview() {
    this.populateATSModal();
    if (this.atsModal) {
      this.atsModal.classList.add("active");
    }
  }

  populateATSModal() {
    const container = document.getElementById("ats-doc-content");
    if (!container) return;

    const p = this.data.profile;
    const exp = this.data.experience;
    const projs = this.data.projects;
    const edu = this.data.education;
    const certs = this.data.certifications;
    const cats = this.data.skills.categories;
    const langs = this.data.languages;

    container.innerHTML = `
      <div class="ats-print-sheet">
        <!-- ATS Header -->
        <header class="ats-print-header">
          <h1 class="ats-name">${p.name}</h1>
          <div class="ats-roles">${p.roles.join("  |  ")}</div>
          <div class="ats-contacts">
            <span>${p.location}</span> •
            <span>${p.phone}</span> •
            <span><a href="mailto:${p.email}">${p.email}</a></span> •
            <span><a href="${p.github}" target="_blank">github.com/${p.githubUser}</a></span> •
            <span><a href="${p.linkedin}" target="_blank">linkedin.com/in/${p.linkedinUser}</a></span>
          </div>
        </header>

        <!-- Executive Summary -->
        <section class="ats-section">
          <h2 class="ats-title">PROFESSIONAL SUMMARY</h2>
          <p class="ats-text">${p.bio}</p>
        </section>

        <!-- Technical & Specialized Skills -->
        <section class="ats-section">
          <h2 class="ats-title">TECHNICAL & SPECIALIZED COMPETENCIES</h2>
          <div class="ats-skills-list">
            ${cats.map(c => `
              <div class="ats-skill-line">
                <strong>${c.name}:</strong> ${c.skills.map(s => s.name).join(", ")}
              </div>
            `).join("")}
            <div class="ats-skill-line">
              <strong>Languages:</strong> ${langs.map(l => `${l.name} (${l.status})`).join(", ")}
            </div>
          </div>
        </section>

        <!-- Featured Projects -->
        <section class="ats-section">
          <h2 class="ats-title">KEY TECHNICAL PROJECTS</h2>
          ${projs.map(proj => `
            <div class="ats-entry">
              <div class="ats-entry-head">
                <span class="ats-entry-title">${proj.title}</span> — <em>${proj.tagline}</em>
                <span class="ats-entry-date">${proj.tech.slice(0, 3).join(", ")}</span>
              </div>
              <p class="ats-text">${proj.summary}</p>
              <ul class="ats-list">
                ${proj.points.map(pt => `<li>${pt}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </section>

        <!-- Experience -->
        <section class="ats-section">
          <h2 class="ats-title">WORK EXPERIENCE & ROLES</h2>
          ${exp.map(e => `
            <div class="ats-entry">
              <div class="ats-entry-head">
                <span class="ats-entry-title">${e.role}</span> | <span class="ats-org">${e.organization}</span>
                <span class="ats-entry-date">${e.period}</span>
              </div>
              <ul class="ats-list">
                ${e.highlights.map(h => `<li>${h}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </section>

        <!-- Education -->
        <section class="ats-section">
          <h2 class="ats-title">EDUCATION & ACADEMIC CREDENTIALS</h2>
          ${edu.map(ed => `
            <div class="ats-entry">
              <div class="ats-entry-head">
                <span class="ats-entry-title">${ed.institution}</span> — <span>${ed.degree} (${ed.field})</span>
                <span class="ats-entry-date">${ed.period} (${ed.status})</span>
              </div>
              <ul class="ats-list">
                ${ed.details.map(d => `<li>${d}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </section>

        <!-- Verified Certifications -->
        <section class="ats-section">
          <h2 class="ats-title">VERIFIED CERTIFICATIONS</h2>
          <ul class="ats-list">
            ${certs.map(c => `
              <li><strong>${c.title}</strong> — ${c.issuer} (${c.date}): ${c.summary}</li>
            `).join("")}
          </ul>
        </section>
      </div>
    `;
  }

  setupContactForm() {
    if (this.contactForm) {
      this.contactForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("cf-name")?.value || "Colleague";
        const email = document.getElementById("cf-email")?.value || "";
        const subject = document.getElementById("cf-subject")?.value || "Portfolio Connection";
        const message = document.getElementById("cf-message")?.value || "";

        const mailto = `mailto:${this.data.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Sender: " + name + " (" + email + ")\n\n" + message)}`;
        window.open(mailto, "_blank");
      });
    }
  }

  renderAllSections() {
    this.renderOverview();
    this.renderExperience();
    this.renderProjects();
    this.renderSkills();
    this.renderEducation();
  }

  renderOverview() {
    const p = this.data.profile;
    const container = document.getElementById("overview-container");
    if (!container) return;

    container.innerHTML = `
      <!-- Hero Card -->
      <div class="glass-card p-6 md:p-8 mb-6 border-l-4 border-indigo-500">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Available for AI Engineering & Internships
            </div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">${p.name}</h1>
            <p class="text-base font-medium text-cyan-400 mt-1">${p.roles.join(" · ")}</p>
          </div>
          <div class="flex gap-2.5">
            <button class="btn-download-resume btn-primary">
              <i class="fas fa-file-pdf mr-1.5"></i> Download Resume (PDF)
            </button>
          </div>
        </div>

        <p class="text-slate-300 text-sm md:text-base leading-relaxed mt-5">
          ${p.bio}
        </p>

        <!-- Metric Cards -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-800">
          ${p.metrics.map(m => `
            <div class="metric-box">
              <div class="metric-label">${m.label}</div>
              <div class="metric-value">${m.value}</div>
              <div class="metric-sub">${m.sub}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Quick Highlights Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="glass-card p-6">
          <h3 class="card-heading text-indigo-400 mb-3">
            <i class="fas fa-brain mr-2"></i> Autonomous AI & Vibe Coding Core
          </h3>
          <p class="text-sm text-slate-300 leading-relaxed">
            Pioneering automated social dispatchers and voice assistant architectures. Successfully deployed <strong>NexusAuto</strong>, an autonomous AI pipeline that crafts, formats, and publishes technical LinkedIn updates using Gemini 2.0 and headless browser automation, and <strong>ARIA</strong>, a Tony Stark JARVIS desktop voice assistant with neural audio.
          </p>
          <div class="flex flex-wrap gap-2 mt-4">
            <span class="badge-chip">Autonomous Workflows</span>
            <span class="badge-chip">Gemini 2.0 Flash</span>
            <span class="badge-chip">Playwright</span>
            <span class="badge-chip">Neural TTS</span>
          </div>
        </div>

        <div class="glass-card p-6">
          <h3 class="card-heading text-cyan-400 mb-3">
            <i class="fas fa-shield-halved mr-2"></i> Academic & Defensive Security
          </h3>
          <p class="text-sm text-slate-300 leading-relaxed">
            Pursuing B.Tech in <strong>Cyber Security and IoT</strong> at <strong>Sri Ramachandra University (SRIHER)</strong>. Strong foundations in defensive network architecture, embedded IoT sensors, Linux systems, and cryptographic protocols, complemented by verified HP LIFE Cybersecurity credentials.
          </p>
          <div class="flex flex-wrap gap-2 mt-4">
            <span class="badge-chip">Sri Ramachandra University</span>
            <span class="badge-chip">IoT Microcontrollers</span>
            <span class="badge-chip">The Schram Academy</span>
            <span class="badge-chip">HP LIFE Certified</span>
          </div>
        </div>
      </div>
    `;

    // Re-bind download button in overview card
    container.querySelectorAll(".btn-download-resume").forEach(b => {
      b.addEventListener("click", () => this.triggerResumeDownload());
    });
  }

  renderExperience() {
    const container = document.getElementById("experience-container");
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-4">
        ${this.data.experience.map(exp => `
          <div class="glass-card p-6 transition hover:border-indigo-500/50">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">${exp.type}</span>
                <h3 class="text-xl font-bold text-white mt-0.5">${exp.role}</h3>
                <div class="text-sm font-medium text-cyan-400">${exp.organization} • ${exp.location}</div>
              </div>
              <span class="status-pill">${exp.period}</span>
            </div>

            <ul class="mt-4 text-sm text-slate-300 space-y-2 list-disc list-inside">
              ${exp.highlights.map(h => `<li>${h}</li>`).join("")}
            </ul>

            <div class="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800/80">
              ${exp.skills.map(s => `<span class="tech-tag">${s}</span>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${this.data.projects.map(proj => `
          <div class="glass-card p-6 flex flex-col justify-between transition hover:border-cyan-500/50">
            <div>
              <div class="flex justify-between items-start gap-2">
                <span class="badge-pill-indigo">${proj.badge}</span>
                <span class="text-xs text-slate-400 font-mono">${proj.category}</span>
              </div>
              <h3 class="text-lg font-bold text-white mt-2.5">${proj.title}</h3>
              <p class="text-xs font-medium text-cyan-400 mt-0.5">${proj.tagline}</p>
              <p class="text-sm text-slate-300 mt-3 leading-relaxed">${proj.summary}</p>

              <ul class="text-xs text-slate-400 space-y-1.5 mt-3 pl-3 border-l-2 border-indigo-500/40">
                ${proj.points.slice(0, 2).map(pt => `<li>${pt}</li>`).join("")}
              </ul>
            </div>

            <div class="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div class="flex flex-wrap gap-1">
                ${proj.tech.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join("")}
              </div>
              ${proj.github ? `
                <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn-link" title="View Source">
                  <i class="fab fa-github"></i> Repository
                </a>
              ` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container) return;

    const cats = this.data.skills.categories;
    const langs = this.data.languages;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Skill Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${cats.map(c => `
            <div class="glass-card p-6">
              <h3 class="card-heading text-indigo-400 mb-4 flex items-center gap-2">
                <i class="fas fa-${c.icon}"></i> ${c.name}
              </h3>
              <div class="space-y-3.5">
                ${c.skills.map(s => `
                  <div>
                    <div class="flex justify-between text-xs font-medium mb-1">
                      <span class="text-white">${s.name}</span>
                      <span class="text-slate-400">${s.levelTag} • <strong class="text-cyan-400">${s.level}%</strong></span>
                    </div>
                    <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div class="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" style="width: ${s.level}%"></div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Multilingual Communication -->
        <div class="glass-card p-6">
          <h3 class="card-heading text-cyan-400 mb-2 flex items-center gap-2">
            <i class="fas fa-globe"></i> Multilingual Communication & Active Foreign Studies
          </h3>
          <p class="text-xs text-slate-400 mb-4">Dedicated to expanding international engineering collaboration and cross-cultural communication.</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            ${langs.map(l => `
              <div class="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                <div class="text-2xl mb-1">${l.flag}</div>
                <div class="text-sm font-bold text-white">${l.name}</div>
                <div class="text-xs font-semibold ${l.status.includes('Learning') ? 'text-amber-400' : 'text-cyan-400'} mt-0.5">
                  ${l.status}
                </div>
                <div class="text-[11px] text-slate-400 mt-1">${l.proficiency}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  renderEducation() {
    const container = document.getElementById("education-container");
    if (!container) return;

    const edu = this.data.education;
    const certs = this.data.certifications;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Academic Foundations -->
        <div>
          <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <i class="fas fa-graduation-cap"></i> Academic Foundations
          </h3>
          <div class="space-y-3">
            ${edu.map(ed => `
              <div class="glass-card p-6">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h4 class="text-lg font-bold text-white">${ed.institution}</h4>
                    <p class="text-sm text-cyan-400 font-medium">${ed.degree} — ${ed.field}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="badge-pill-indigo">${ed.badge}</span>
                    <span class="text-xs text-slate-400 font-mono">${ed.period}</span>
                  </div>
                </div>
                <ul class="text-xs md:text-sm text-slate-300 space-y-1.5 mt-3 list-disc list-inside">
                  ${ed.details.map(d => `<li>${d}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Verified Certifications -->
        <div>
          <h3 class="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <i class="fas fa-certificate"></i> Verified Accreditations & Certifications
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${certs.map(c => `
              <div class="glass-card p-5">
                <div class="flex justify-between items-start">
                  <span class="text-xs font-semibold text-indigo-400 uppercase">${c.category}</span>
                  <span class="text-xs text-slate-400 font-mono">${c.date}</span>
                </div>
                <h4 class="text-base font-bold text-white mt-1.5">${c.title}</h4>
                <p class="text-xs font-medium text-cyan-400 mt-0.5">${c.issuer}</p>
                <p class="text-xs text-slate-300 mt-2 leading-relaxed">${c.summary}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }
}

// Instantiate on DOM load
window.addEventListener("DOMContentLoaded", () => {
  window.portfolioApp = new PortfolioApp();
});
