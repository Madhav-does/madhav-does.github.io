/**
 * 3D Interactive ID Card Badge
 * Procedural Three.js 3D Smart ID Badge with realistic front/back canvas textures,
 * mouse tilt tracking, lanyard clip, and 360° flip animation.
 */

class IDCard3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cardGroup = null;
    this.cardMesh = null;
    this.isFlipped = false;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.autoRotate = true;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 320;
    const height = this.container.clientHeight || 460;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7.6);

    // 3. Renderer with transparency
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting
    this.setupLighting();

    // 5. Build 3D Card
    this.buildCard();

    // 6. Event Listeners
    this.setupEventListeners();

    // 7. Animation Loop
    this.animate();
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    this.scene.add(ambientLight);

    // Dynamic front specular highlight
    this.pointLight = new THREE.PointLight(0x6366f1, 2.2, 20);
    this.pointLight.position.set(2, 3, 5);
    this.scene.add(this.pointLight);

    const backLight = new THREE.DirectionalLight(0x06b6d4, 1.2);
    backLight.position.set(-3, -2, -4);
    this.scene.add(backLight);
  }

  buildCard() {
    this.cardGroup = new THREE.Group();

    // Generate Front & Back Textures on HTML5 Canvas
    const frontTex = this.createFrontTexture();
    const backTex = this.createBackTexture();

    // Materials
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25
    });

    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      metalness: 0.2,
      roughness: 0.35
    });

    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      metalness: 0.2,
      roughness: 0.35
    });

    // Box Geometry: [Width: 2.8, Height: 4.4, Thickness: 0.08]
    // Material array: [right, left, top, bottom, front, back]
    const materials = [
      edgeMat, edgeMat, edgeMat, edgeMat,
      frontMat,
      backMat
    ];

    const cardGeo = new THREE.BoxGeometry(2.9, 4.5, 0.08);
    this.cardMesh = new THREE.Mesh(cardGeo, materials);
    this.cardGroup.add(this.cardMesh);

    // Top Metallic Lanyard Clip & Hole
    const clipGroup = new THREE.Group();
    clipGroup.position.set(0, 2.35, 0);

    const metalClipMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.2
    });

    // Clip holder
    const clipGeo = new THREE.BoxGeometry(0.7, 0.25, 0.16);
    const clipMesh = new THREE.Mesh(clipGeo, metalClipMat);
    clipGroup.add(clipMesh);

    // Lanyard ring
    const ringGeo = new THREE.TorusGeometry(0.2, 0.04, 8, 16);
    const ringMesh = new THREE.Mesh(ringGeo, metalClipMat);
    ringMesh.position.set(0, 0.22, 0);
    clipGroup.add(ringMesh);

    // Black woven strap snippet
    const strapGeo = new THREE.BoxGeometry(0.5, 0.6, 0.04);
    const strapMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const strapMesh = new THREE.Mesh(strapGeo, strapMat);
    strapMesh.position.set(0, 0.55, 0);
    clipGroup.add(strapMesh);

    this.cardGroup.add(clipGroup);

    this.scene.add(this.cardGroup);
  }

  // 1. Generate Front Side ID Card Texture
  createFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 580;
    canvas.height = 900;
    const ctx = canvas.getContext("2d");

    // Background Gradient (Sleek Slate-900 to Slate-950)
    const bgGrad = ctx.createLinearGradient(0, 0, 580, 900);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(0.5, "#0b1120");
    bgGrad.addColorStop(1, "#020617");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 580, 900);

    // Subtle Holographic / Circuit Grid Pattern
    ctx.strokeStyle = "rgba(99, 102, 241, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 580; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 900);
      ctx.stroke();
    }
    for (let y = 0; y < 900; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(580, y);
      ctx.stroke();
    }

    // Outer Edge Accent Border
    ctx.strokeStyle = "rgba(99, 102, 241, 0.5)";
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, 548, 868);

    // Header Badge: SRI RAMACHANDRA UNIVERSITY
    ctx.fillStyle = "#6366f1";
    ctx.fillRect(20, 20, 540, 68);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SRI RAMACHANDRA UNIVERSITY", 290, 50);

    ctx.font = "600 13px 'Inter', sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText("SRIHER · FACULTY OF ENGINEERING & TECH", 290, 72);

    // Gold Security Microchip (Realistic Smart Card Chip)
    this.drawSmartChip(ctx, 420, 115, 95, 75);

    // Verification Status Pill
    ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, 120, 160, 36, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(60, 138, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("VERIFIED // ACTIVE", 74, 142);

    // Avatar / Photo Area
    const avX = 60, avY = 195, avW = 200, avH = 225;
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(avX, avY, avW, avH, 12);
    ctx.fill();
    ctx.stroke();

    // Stylized Cyber Monogram / Profile Graphic
    const avGrad = ctx.createLinearGradient(avX, avY, avX + avW, avY + avH);
    avGrad.addColorStop(0, "#4f46e5");
    avGrad.addColorStop(1, "#06b6d4");
    ctx.fillStyle = avGrad;
    ctx.beginPath();
    ctx.arc(avX + avW / 2, avY + avH / 2 - 10, 54, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 48px 'Orbitron', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("MR", avX + avW / 2, avY + avH / 2 + 8);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.fillText("AUTHENTICATED", avX + avW / 2, avY + avH - 24);

    // Side Profile Metadata
    ctx.textAlign = "left";
    ctx.fillStyle = "#64748b";
    ctx.font = "bold 12px 'Inter', sans-serif";
    ctx.fillText("SPECIALIZATION", 285, 220);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px 'Inter', sans-serif";
    ctx.fillText("B.Tech Cyber Security", 285, 244);
    ctx.fillText("& IoT Systems", 285, 266);

    ctx.fillStyle = "#64748b";
    ctx.font = "bold 12px 'Inter', sans-serif";
    ctx.fillText("ACADEMIC STATUS", 285, 305);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 15px 'Inter', sans-serif";
    ctx.fillText("2nd Year Scholar", 285, 327);
    ctx.fillText("(2025 — 2029)", 285, 347);

    ctx.fillStyle = "#64748b";
    ctx.font = "bold 12px 'Inter', sans-serif";
    ctx.fillText("CLEARANCE ID", 285, 385);
    ctx.fillStyle = "#a855f7";
    ctx.font = "bold 16px 'Orbitron', sans-serif";
    ctx.fillText("MRM-2025-CYBER", 285, 410);

    // Divider Line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 445);
    ctx.lineTo(540, 445);
    ctx.stroke();

    // Primary Identity Name
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 36px 'Inter', sans-serif";
    ctx.fillText("Madhav Raj M", 40, 495);

    // Subtitle Roles
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 16px 'Inter', sans-serif";
    ctx.fillText("AI Vibe Coder · Web Developer · Video Editor", 40, 528);

    // Core Focus Pills
    const badges = ["Autonomous Agents", "Gemini 2.0", "Filmora 15", "CapCut Pro", "Three.js 3D", "Python"];
    let bx = 40, by = 560;
    badges.forEach((b, idx) => {
      ctx.font = "bold 13px 'Inter', sans-serif";
      const bw = ctx.measureText(b).width + 24;
      if (bx + bw > 540) {
        bx = 40;
        by += 38;
      }
      ctx.fillStyle = "rgba(30, 41, 59, 0.8)";
      ctx.strokeStyle = "rgba(99, 102, 241, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, 30, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#e2e8f0";
      ctx.fillText(b, bx + 12, by + 20);
      bx += bw + 10;
    });

    // QR Code & Barcode Area at Bottom
    const qrX = 40, qrY = 670, qrSize = 135;
    this.drawSimulatedQRCode(ctx, qrX, qrY, qrSize);

    ctx.fillStyle = "#64748b";
    ctx.font = "11px monospace";
    ctx.fillText("SCAN FOR LINKEDIN / REPOS", 40, 825);

    // Barcode on Bottom Right
    this.drawBarcode(ctx, 205, 685, 335, 75);
    ctx.fillStyle = "#64748b";
    ctx.font = "11px monospace";
    ctx.textAlign = "center";
    ctx.fillText("SECURITY TOKEN // 9360989726-SRIHER-AUTH", 372, 785);

    // Flip Hint at very bottom
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("↻ CLICK OR DRAG TO TURN CARD", 290, 855);

    return new THREE.CanvasTexture(canvas);
  }

  // 2. Generate Back Side ID Card Texture
  createBackTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 580;
    canvas.height = 900;
    const ctx = canvas.getContext("2d");

    // Background Gradient (Dark Navy)
    const bgGrad = ctx.createLinearGradient(0, 0, 580, 900);
    bgGrad.addColorStop(0, "#020617");
    bgGrad.addColorStop(0.5, "#0b1120");
    bgGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 580, 900);

    // Border
    ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, 548, 868);

    // Magnetic Stripe across top
    ctx.fillStyle = "#090d16";
    ctx.fillRect(16, 45, 548, 90);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.strokeRect(16, 45, 548, 90);

    // Official Back Header
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px 'Inter', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("SECURITY DOSSIER & OFFICIAL RECORD", 40, 175);

    // Section 1: Contact Direct Relay
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.fillText("DIRECT COMMUNICATIONS RELAY", 40, 215);

    const contacts = [
      { icon: "✉", label: "EMAIL", val: "madhav.madathil@gmail.com" },
      { icon: "☎", label: "PHONE", val: "+91 9360989726" },
      { icon: "⌖", label: "LOCATION", val: "Chennai, Tamil Nadu, India" },
      { icon: "⌥", label: "GITHUB", val: "github.com/Madhav-does" },
      { icon: "⌘", label: "LINKEDIN", val: "linkedin.com/in/madhav-raj-633409375" }
    ];

    let cy = 245;
    contacts.forEach(c => {
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.roundRect(40, cy - 18, 500, 32, 6);
      ctx.fill();

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 13px monospace";
      ctx.fillText(c.label + ":", 52, cy + 3);

      ctx.fillStyle = "#ffffff";
      ctx.font = "500 13px 'Inter', sans-serif";
      ctx.fillText(c.val, 160, cy + 3);
      cy += 38;
    });

    // Section 2: Multilingual Clearance
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.fillText("MULTILINGUAL PROFICIENCY & ACTIVE STUDIES", 40, cy + 18);
    cy += 38;

    const langs = [
      { name: "English", tag: "Fluent", flag: "🇬🇧" },
      { name: "Malayalam", tag: "Native", flag: "🇮🇳" },
      { name: "Tamil", tag: "Fluent", flag: "🇮🇳" },
      { name: "Hindi", tag: "Working", flag: "🇮🇳" },
      { name: "Spanish", tag: "Learning (A1)", flag: "🇪🇸" },
      { name: "German", tag: "Learning (A1)", flag: "🇩🇪" },
      { name: "Japanese", tag: "Learning (N5)", flag: "🇯🇵" }
    ];

    let lx = 40;
    langs.forEach((l, idx) => {
      const isLearning = l.tag.includes("Learning");
      const lw = 240;
      const rowY = cy + Math.floor(idx / 2) * 36;
      const colX = idx % 2 === 0 ? 40 : 300;

      ctx.fillStyle = isLearning ? "rgba(245, 158, 11, 0.15)" : "rgba(30, 41, 59, 0.7)";
      ctx.strokeStyle = isLearning ? "rgba(245, 158, 11, 0.5)" : "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(colX, rowY, lw, 30, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "14px 'Inter', sans-serif";
      ctx.fillText(`${l.flag} ${l.name}`, colX + 10, rowY + 20);

      ctx.fillStyle = isLearning ? "#fbbf24" : "#38bdf8";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "right";
      ctx.fillText(l.tag, colX + lw - 10, rowY + 20);
      ctx.textAlign = "left";
    });

    cy += Math.ceil(langs.length / 2) * 36 + 20;

    // Section 3: Verified Certifications & School Scores
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.fillText("ACADEMIC RECORD & VERIFIED ACCREDITATIONS", 40, cy);
    cy += 20;

    const credentials = [
      "The Schram Academy (12th CS: 75% | 10th: 72% | Sports Captain)",
      "HP LIFE Certified — Cybersecurity Awareness (Aug 2026)",
      "HP LIFE Certified — Basics of Finance (Aug 2026)",
      "LinkedIn Learning — AI Agent Workflows & Autonomous Systems",
      "Filmora 15 & CapCut Pro Certified Digital Video Post-Production"
    ];

    credentials.forEach(cred => {
      ctx.fillStyle = "#10b981";
      ctx.fillText("✓", 42, cy + 12);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "12px 'Inter', sans-serif";
      ctx.fillText(cred, 60, cy + 12);
      cy += 24;
    });

    // Return to Front Hint
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("↻ CLICK OR DRAG TO TURN BACK TO FRONT", 290, 855);

    return new THREE.CanvasTexture(canvas);
  }

  // Draw Smart Chip Graphic
  drawSmartChip(ctx, x, y, w, h) {
    ctx.fillStyle = "#d97706";
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fill();
    ctx.stroke();

    // Circuit lines inside chip
    ctx.strokeStyle = "#92400e";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.35, y);
    ctx.lineTo(x + w * 0.35, y + h);
    ctx.moveTo(x + w * 0.65, y);
    ctx.lineTo(x + w * 0.65, y + h);
    ctx.moveTo(x, y + h * 0.5);
    ctx.lineTo(x + w, y + h * 0.5);
    ctx.stroke();
  }

  // Draw Simulated Scannable QR Code
  drawSimulatedQRCode(ctx, x, y, size) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y, size, size);

    ctx.fillStyle = "#020617";
    // Corners
    this.drawQRPattern(ctx, x + 6, y + 6, 32);
    this.drawQRPattern(ctx, x + size - 38, y + 6, 32);
    this.drawQRPattern(ctx, x + 6, y + size - 38, 32);

    // Random data blocks
    const blockSize = 6;
    for (let r = 0; r < size - 16; r += blockSize) {
      for (let c = 0; c < size - 16; c += blockSize) {
        if (Math.random() > 0.65) {
          ctx.fillRect(x + 8 + c, y + 8 + r, blockSize, blockSize);
        }
      }
    }
  }

  drawQRPattern(ctx, x, y, s) {
    ctx.fillRect(x, y, s, s);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + 6, y + 6, s - 12, s - 12);
    ctx.fillStyle = "#020617";
    ctx.fillRect(x + 10, y + 10, s - 20, s - 20);
  }

  // Draw Barcode Lines
  drawBarcode(ctx, x, y, w, h) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = "#000000";
    let curX = x + 10;
    while (curX < x + w - 10) {
      const barW = Math.random() > 0.5 ? 4 : 2;
      ctx.fillRect(curX, y + 5, barW, h - 10);
      curX += barW + (Math.random() > 0.5 ? 3 : 2);
    }
  }

  setupEventListeners() {
    // Mouse Tilt Tracking
    this.container.addEventListener("mousemove", e => {
      if (this.isDragging) return;
      const rect = this.container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Subtle tilt: +/- 18 degrees
      const baseRotY = this.isFlipped ? Math.PI : 0;
      this.targetRotation.y = baseRotY + nx * 0.35;
      this.targetRotation.x = -ny * 0.25;

      // Update pointlight position for specular reflection
      if (this.pointLight) {
        this.pointLight.position.x = nx * 3;
        this.pointLight.position.y = ny * 3 + 2;
      }
    });

    this.container.addEventListener("mouseleave", () => {
      const baseRotY = this.isFlipped ? Math.PI : 0;
      this.targetRotation.x = 0;
      this.targetRotation.y = baseRotY;
    });

    // Drag to rotate / Click to flip
    let startX = 0, startY = 0, hasMoved = false;

    this.container.addEventListener("mousedown", e => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
      startX = e.clientX;
      startY = e.clientY;
      hasMoved = false;
      this.container.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", e => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
        hasMoved = true;
      }

      this.currentRotation.y += deltaX * 0.015;
      this.currentRotation.x += deltaY * 0.015;
      this.targetRotation.y = this.currentRotation.y;
      this.targetRotation.x = this.currentRotation.x;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.container.style.cursor = "grab";

        // If it was just a click (not a drag), flip the card
        if (!hasMoved) {
          this.flip();
        } else {
          // Snap to nearest face (Front: 0 or Back: PI)
          const angle = this.currentRotation.y % (Math.PI * 2);
          const normalized = (angle + Math.PI * 2) % (Math.PI * 2);
          this.isFlipped = (normalized > Math.PI * 0.5 && normalized < Math.PI * 1.5);
          this.targetRotation.y = this.isFlipped ? Math.PI : 0;
          this.targetRotation.x = 0;
        }
      }
    });

    // Touch events for mobile
    this.container.addEventListener("touchstart", e => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        hasMoved = false;
      }
    }, { passive: true });

    window.addEventListener("touchmove", e => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      if (Math.abs(e.touches[0].clientX - startX) > 6 || Math.abs(e.touches[0].clientY - startY) > 6) {
        hasMoved = true;
      }

      this.currentRotation.y += deltaX * 0.015;
      this.currentRotation.x += deltaY * 0.015;
      this.targetRotation.y = this.currentRotation.y;
      this.targetRotation.x = this.currentRotation.x;
      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener("touchend", () => {
      if (this.isDragging) {
        this.isDragging = false;
        if (!hasMoved) {
          this.flip();
        } else {
          const angle = this.currentRotation.y % (Math.PI * 2);
          const normalized = (angle + Math.PI * 2) % (Math.PI * 2);
          this.isFlipped = (normalized > Math.PI * 0.5 && normalized < Math.PI * 1.5);
          this.targetRotation.y = this.isFlipped ? Math.PI : 0;
          this.targetRotation.x = 0;
        }
      }
    });

    // Resize
    window.addEventListener("resize", () => this.onResize());
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    const targetY = this.isFlipped ? Math.PI : 0;

    if (window.gsap) {
      window.gsap.to(this.targetRotation, {
        y: targetY,
        x: 0,
        duration: 0.65,
        ease: "power2.out"
      });
    } else {
      this.targetRotation.y = targetY;
      this.targetRotation.x = 0;
    }

    // Update external UI button text if present
    const toggleBtn = document.getElementById("idcard-flip-btn");
    if (toggleBtn) {
      toggleBtn.innerHTML = this.isFlipped
        ? `<i class="fas fa-rotate-right mr-1.5"></i> VIEW FRONT BADGE`
        : `<i class="fas fa-rotate-left mr-1.5"></i> TURN CARD (BACK)`;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.cardGroup) {
      // Damped interpolation for smooth tilt & flip
      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.12;
      this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.12;

      this.cardGroup.rotation.x = this.currentRotation.x;
      this.cardGroup.rotation.y = this.currentRotation.y;

      // Gentle floating breathing motion when idle
      if (!this.isDragging) {
        const time = Date.now() * 0.002;
        this.cardGroup.position.y = Math.sin(time) * 0.06;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

window.IDCard3D = IDCard3D;
