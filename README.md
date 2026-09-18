# 💼 Madhav Raj M — Professional Executive Portfolio & 3D Interactive Resume

An executive, high-performance **Web Portfolio & 3D Interactive Resume** engineered for **Madhav Raj M** (AI Vibe Coder · Full-Stack Web Developer · Video Editor).

Features an interactive **3D Smart ID Card Badge** on the side that tilts, tracks mouse physics, and physically **turns/flips 360°** to reveal comprehensive academic, credential, and multilingual details, backed by an ambient 3D geometric background and a 1-click **ATS-compliant Download Resume (PDF)** system.

---

## 🌟 Key Features

- **🪪 Interactive 3D ID Card on the Side**:
  - **Front Face**: High-resolution digital security badge with photo avatar, verified status indicator, student affiliation at **Sri Ramachandra University (SRIHER)** (2nd Year B.Tech Cyber Security & IoT), scannable QR code, security microchip, and barcode.
  - **Back Face**: Magnetic stripe, direct contact communications (email, phone, location, GitHub, LinkedIn), multilingual proficiency (**Spanish 🇪🇸**, **German 🇩🇪**, **Japanese 🇯🇵**, English, Malayalam, Tamil, Hindi), and verified academic credentials.
  - **Physics & Motion**: Real-time 3D tilt tracking with specular light reflection, and smooth 180° flip animation on click, drag, or button toggle.
- **📑 Modern Executive Tabbed Interface**:
  - **Overview**: Executive summary, key metrics, and high-level technical highlights.
  - **Experience**: Detailed record of Sri Ramachandra University scholarship, autonomous AI agent engineering, video post-production, and sports leadership at The Schram Academy.
  - **Projects**: Flagship deployed systems (**NexusAuto** AI posting agent, **ARIA** JARVIS voice assistant, **PolarGrid AI** energy dashboard, **GALPHIN** receipt intelligence, **Leave Management System**).
  - **Skills & Languages**: Technical progress meters across AI, Web Development, Video Post-Production, Core Programming, and Cybersecurity.
  - **Education & Certifications**: Formal foundations at Sri Ramachandra University & The Schram Academy (75% in 12th, 72% in 10th), alongside verified HP LIFE & LinkedIn accreditations.
  - **Contact**: Direct communication form and quick-copy credentials.
- **📥 1-Click Resume Download (PDF)**:
  - Prominent "Download Resume (PDF)" button in the top navigation bar and sidebar.
  - Dedicated print-ready `@media print` layout engineered for multi-page ATS compliance, clean typography, and instant PDF export via standard browser print.
- **✨ Ambient 3D Constellation Background**:
  - Lightweight, non-distracting geometric particle network with dynamic connecting lines that reacts smoothly to mouse movement.

---

## 🚀 Quick Launch

### Option 1: Direct Local Open (Zero Setup)
Double-click **`index.html`** to open the portfolio immediately in any web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Opera GX, Safari)!

### Option 2: Local HTTP Server
```powershell
# Using Python:
python -m http.server 3000

# Or using Node / npx:
cmd.exe /c "npx serve ."
```
Then navigate to `http://localhost:3000`.

---

## ⌨️ Interactive Controls & Shortcuts

| Action | Result |
|---|---|
| **Hover on 3D ID Card** | Smooth 3D tilt and specular highlight tracking |
| **Click / Drag 3D ID Card** | Turns/flips the card 180° to reveal the back / front side |
| **Turn Card Button** | 1-click animated flip between front badge and back credentials |
| **Navigation Tabs** | Switch seamlessly between Overview, Experience, Projects, Skills, Education, and Contact |
| **Download Resume (PDF)** | Opens ATS-formatted document and launches browser print-to-PDF dialog |

---

## 📁 Project Architecture

```
RESUME/
├── index.html            # Semantic layout, top navbar, 3D ID card sidebar & tab panels
├── README.md             # Documentation & feature guide
├── css/
│   └── style.css         # Modern dark slate styling, glassmorphism, 3D canvas viewport & ATS print CSS
└── js/
    ├── data.js           # Structured profile, experience, project, skill & academic records
    ├── idcard.js         # Three.js 3D Smart ID Card badge (textures, mouse tilt & flip animations)
    ├── scene.js          # Ambient 3D particle constellation & neural grid background
    └── app.js            # Tab navigation controller, ID card flip triggers & PDF download engine
```

---

*Designed and engineered for Madhav Raj M.*
