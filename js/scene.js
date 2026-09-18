/**
 * Ambient Executive 3D Background Scene
 * Lightweight, high-performance particle constellation & geometric neural grid.
 */

class AmbientBackgroundScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particleSystem = null;
    this.lineMesh = null;
    this.particlesData = [];
    this.particleCount = 120;
    this.r = 800;
    this.maxConnections = 24;
    this.minDistance = 140;

    this.mouseX = 0;
    this.mouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
    this.camera.position.z = 1100;

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 4. Build Constellation Grid
    this.buildConstellation();

    // 5. Event Listeners
    window.addEventListener("resize", () => this.onWindowResize(), false);
    document.addEventListener("mousemove", e => this.onMouseMove(e), false);

    // 6. Animation Loop
    this.animate();
  }

  buildConstellation() {
    this.particlesGroup = new THREE.Group();
    this.scene.add(this.particlesGroup);

    const segments = this.particleCount * this.particleCount;
    this.positions = new Float32Array(segments * 3);
    this.colors = new Float32Array(segments * 3);

    // Particle Points
    const pMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 3.5,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85
    });

    const particlePositions = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      const x = (Math.random() - 0.5) * 1400;
      const y = (Math.random() - 0.5) * 900;
      const z = (Math.random() - 0.5) * 600;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      this.particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.45,
          (Math.random() - 0.5) * 0.45,
          (Math.random() - 0.5) * 0.45
        ),
        numConnections: 0
      });
    }

    this.particlesGeo = new THREE.BufferGeometry();
    this.particlesGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    this.particleSystem = new THREE.Points(this.particlesGeo, pMaterial);
    this.particlesGroup.add(this.particleSystem);

    // Connecting Lines
    this.linesGeo = new THREE.BufferGeometry();
    this.linesGeo.setAttribute("position", new THREE.BufferAttribute(this.positions, 3).setUsage(THREE.DynamicDrawUsage));
    this.linesGeo.setAttribute("color", new THREE.BufferAttribute(this.colors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.35
    });

    this.lineMesh = new THREE.LineSegments(this.linesGeo, lineMat);
    this.particlesGroup.add(this.lineMesh);
  }

  onMouseMove(event) {
    this.mouseX = (event.clientX - this.windowHalfX) * 0.12;
    this.mouseY = (event.clientY - this.windowHalfY) * 0.12;
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Gentle camera parallax
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.03;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.03;
    this.camera.lookAt(this.scene.position);

    const pos = this.particlesGeo.attributes.position.array;
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < this.particleCount; i++) {
      this.particlesData[i].numConnections = 0;
    }

    for (let i = 0; i < this.particleCount; i++) {
      const pData = this.particlesData[i];

      pos[i * 3] += pData.velocity.x;
      pos[i * 3 + 1] += pData.velocity.y;
      pos[i * 3 + 2] += pData.velocity.z;

      // Bounce boundaries
      if (pos[i * 3] < -700 || pos[i * 3] > 700) pData.velocity.x = -pData.velocity.x;
      if (pos[i * 3 + 1] < -450 || pos[i * 3 + 1] > 450) pData.velocity.y = -pData.velocity.y;
      if (pos[i * 3 + 2] < -300 || pos[i * 3 + 2] > 300) pData.velocity.z = -pData.velocity.z;

      // Connect nearby particles
      for (let j = i + 1; j < this.particleCount; j++) {
        const pDataB = this.particlesData[j];
        if (pData.numConnections >= this.maxConnections || pDataB.numConnections >= this.maxConnections) continue;

        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < this.minDistance) {
          pData.numConnections++;
          pDataB.numConnections++;

          const alpha = 1.0 - dist / this.minDistance;

          this.positions[vertexpos++] = pos[i * 3];
          this.positions[vertexpos++] = pos[i * 3 + 1];
          this.positions[vertexpos++] = pos[i * 3 + 2];

          this.positions[vertexpos++] = pos[j * 3];
          this.positions[vertexpos++] = pos[j * 3 + 1];
          this.positions[vertexpos++] = pos[j * 3 + 2];

          // Indigo to cyan gradient
          this.colors[colorpos++] = 0.38 * alpha;
          this.colors[colorpos++] = 0.40 * alpha;
          this.colors[colorpos++] = 0.95 * alpha;

          this.colors[colorpos++] = 0.02 * alpha;
          this.colors[colorpos++] = 0.71 * alpha;
          this.colors[colorpos++] = 0.83 * alpha;

          numConnected++;
        }
      }
    }

    this.lineMesh.geometry.setDrawRange(0, numConnected * 2);
    this.lineMesh.geometry.attributes.position.needsUpdate = true;
    this.lineMesh.geometry.attributes.color.needsUpdate = true;
    this.particlesGeo.attributes.position.needsUpdate = true;

    // Slow planetary group rotation
    this.particlesGroup.rotation.y += 0.0008;

    this.renderer.render(this.scene, this.camera);
  }
}

window.AmbientBackgroundScene = AmbientBackgroundScene;
