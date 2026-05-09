# Rashtra Bhushan Portfolio — Professional Design v2

## 1. Design Overview

**Project Name:** Rashtra Bhushan Portfolio — Professional Edition  
**Type:** Personal portfolio for an Electronics & Communication Engineering student  
**Visual Style:** Corporate-modern, clean, sophisticated, premium dark  
**Primary Headline:** **Engineering Tomorrow's Solutions**

---

## 2. Visual Identity

### Color System

Background Primary:   `#0a0a0f` (deep black)  
Background Secondary: `#12121a` (elevated charcoal)  
Background Tertiary:  `#1a1a25` (card surfaces)  
Accent Primary:       `#6366f1` (indigo violet)  
Accent Secondary:     `#8b5cf6` (purple)  
Accent Gradient:      `linear-gradient(135deg, #6366f1, #8b5cf6)`  
Text Primary:         `#fafafa` (pure white)  
Text Secondary:       `#a1a1aa` (muted gray)  
Text Tertiary:        `#71717a` (subtle gray)  
Border:               `rgba(255,255,255,0.08)`  
Success:              `#22c55e`  

### Typography

**Headings:** `Plus Jakarta Sans` (700/800)  
- H1: `clamp(48px, 8vw, 96px)`, line-height `1.0`, letter-spacing `-0.03em`  
- H2: `clamp(36px, 5vw, 64px)`, line-height `1.1`, letter-spacing `-0.02em`  
- H3: `clamp(24px, 3vw, 36px)`, line-height `1.2`

**Body:** `Inter` (400/500/600)  
- Base: `16px`, line-height `1.6`  
- Small: `14px`, line-height `1.5`

**Mono/Labels:** `JetBrains Mono` (500)  
- Uppercase labels, letter-spacing `0.12em`, size `12px`

### Visual Elements

- **Card radius:** `24px` (large), `16px` (medium), `12px` (small)  
- **Card shadow:** `0 0 0 1px rgba(255,255,255,0.08), 0 20px 50px rgba(0,0,0,0.5)`  
- **Glow effects:** `0 0 40px rgba(99,102,241,0.3)` for accent elements  
- **Border style:** 1px subtle borders with low opacity  
- **Gradients:** Soft mesh gradients for backgrounds

---

## 3. Section Structure

**Total Sections:** 8

1. **Hero** — Animated intro with name, role, CTA — `pin: false`
2. **About** — Professional summary with stats — `pin: false`
3. **Skills** — Technical skills with animated progress bars — `pin: false`
4. **Projects** — Detailed project cards with tech stack — `pin: false`
5. **Experience** — Timeline of work experience — `pin: false`
6. **Education** — Academic background — `pin: false`
7. **Certifications** — Credentials with verification — `pin: false`
8. **Contact** — Contact form + info — `pin: false`

---

## 4. Tech Stack

- Build Tool: **Vite**
- Framework: **React + TypeScript**
- Animation: **GSAP + ScrollTrigger**
- Icons: **Lucide React**
- Styling: **Tailwind CSS**

---

## 5. Section-by-Section Design

### Section 1: Hero

**Purpose:** First impression — bold, professional, memorable

#### Composition
- Full viewport height (100vh)
- **Background:** Animated gradient mesh (dark purple/indigo tones)
- **Floating particles:** Subtle animated dots
- **Content centered vertically**

#### Elements
- **Label (top):** "ELECTRONICS & COMMUNICATION ENGINEER" — mono, accent color
- **Name:** "Rashtra Bhushan" — massive display font
- **Tagline:** "Building bridges between hardware and software" — secondary text
- **CTA Buttons:** "View Projects" (primary) + "Download CV" (secondary)
- **Social links:** Bottom right corner
- **Scroll indicator:** Bottom center (animated)

#### Animations
- Name: Character-by-character reveal with stagger (0.03s)
- Label: Fade in + slide up
- Tagline: Fade in with blur removal
- Buttons: Scale up with spring
- Background: Subtle gradient animation (infinite, slow)
- Particles: Float animation with random delays

---

### Section 2: About

**Purpose:** Professional introduction with key stats

#### Composition
- Two-column layout on desktop
- Left: Large portrait image with gradient border
- Right: Text content + stats cards

#### Content
- **Heading:** "About Me"
- **Body:** Professional summary (3 paragraphs)
- **Stats Row (4 cards):**
  - "3+" Years of Learning
  - "10+" Projects Completed
  - "5+" Certifications
  - "100%" Dedication

#### Animations
- Image: Reveal from left with mask wipe
- Text: Fade in + slide up with stagger
- Stats: Counter animation (0 → value) with easing
- Cards: Hover lift effect

---

### Section 3: Skills

**Purpose:** Showcase technical competencies

#### Composition
- Section heading centered
- Two-column grid: Programming | Hardware/Tools
- Each skill has: Name + Progress bar + Percentage

#### Skill Categories

**Programming & Development:**
- Python (90%)
- C/C++ (85%)
- JavaScript (80%)
- React.js (75%)
- HTML/CSS (85%)

**Hardware & Engineering:**
- Circuit Design (80%)
- PCB Layout (75%)
- Signal Processing (85%)
- Embedded Systems (70%)
- MATLAB (75%)

**Tools & Platforms:**
- Git/GitHub (85%)
- VS Code (90%)
- Jupyter Notebook (80%)
- Arduino (75%)

#### Animations
- Progress bars: Animate width from 0 to value on scroll
- Numbers: Count up animation
- Cards: Stagger reveal from bottom

---

### Section 4: Projects

**Purpose:** Detailed project showcase

#### Composition
- Section heading with "View All" link
- 3 project cards in a row (desktop), stacked (mobile)
- Each card: Image + Title + Description + Tech stack + Links

#### Projects

**1. JWST MIRI Data Analysis**
- Description: Analyzed James Webb Space Telescope MIRI data for spectral line identification. Performed data preprocessing and scientific visualization.
- Tech: Python, Astropy, NumPy, Matplotlib
- Links: GitHub, Live Demo
- Image: Space/astronomy themed

**2. Smart Home Dashboard**
- Description: Full-stack IoT monitoring dashboard with real-time device control, responsive design, and data visualization.
- Tech: React, Node.js, Express, MongoDB, Socket.io
- Links: GitHub, Live Demo
- Image: Tech dashboard UI

**3. Signal Visualizer**
- Description: Web-based DSP tool for FFT analysis, filter simulation, and signal processing experiments.
- Tech: JavaScript, Web Audio API, Canvas, React
- Links: GitHub, Live Demo
- Image: Waveform visualization

**4. Library Management System**
- Description: Python-based library system with add, issue, return, and view operations. Clean CLI interface.
- Tech: Python, SQLite, OOP
- Links: GitHub
- Image: Code/terminal themed

#### Animations
- Cards: Stagger reveal with 3D tilt on hover
- Images: Zoom on hover
- Tech tags: Pop-in animation
- Links: Underline slide animation

---

### Section 5: Experience

**Purpose:** Professional timeline

#### Composition
- Vertical timeline with alternating left/right cards
- Each entry: Date range | Role | Company | Description | Skills

#### Experience Entries

**1. ISA Summer School 2025**
- Role: Astronomy & Astrophysics Intern
- Company: Indian Space Agency (ISA)
- Duration: Summer 2025
- Description: Worked on JWST MIRI data analysis, learned fundamentals of spectroscopy, enhanced scientific programming skills.
- Skills: Data Analysis, Python, Astrophysics

**2. Teaching Assistant**
- Role: Digital Design Lab TA
- Company: University
- Duration: 2024
- Description: Conducted lab sessions and debugging clinics for 60+ students. Helped with circuit design and troubleshooting.
- Skills: Teaching, Digital Electronics, Communication

#### Animations
- Timeline line: Draw animation on scroll
- Cards: Slide in from respective sides
- Dots: Pulse animation

---

### Section 6: Education

**Purpose:** Academic background

#### Composition
- Timeline-style cards
- Each: Institution | Degree | Year | Details

#### Education Entries

**1. B.Tech — Electronics & Communication Engineering**
- Institution: [University Name]
- Duration: 2023 – 2027 (Expected)
- Details: Pursuing undergraduate degree with focus on embedded systems and signal processing.
- Coursework: Signals & Systems, Digital Electronics, Communication Theory, Microcontrollers, VLSI Design

**2. Class 12th**
- Institution: Kendriya Vidyalaya, Katihar
- Year: 2023
- Details: Completed senior secondary education with Science stream

**3. Class 10th**
- Institution: Kendriya Vidyalaya, Katihar
- Year: 2021
- Details: Completed secondary education

#### Animations
- Cards: Fade in + slide up with stagger
- Institution: Highlight on hover

---

### Section 7: Certifications

**Purpose:** Showcase credentials

#### Composition
- Grid of certification cards
- Each card: Logo/Icon | Name | Issuer | Year | Verify link

#### Certifications
1. **Embedded Systems** — Coursera (UC Irvine) — 2024
2. **PCB Design Essentials** — Altium — 2024
3. **Signal Processing** — MIT OCW — 2025
4. **Python for Data Science** — DataCamp — 2024
5. **Web Development Bootcamp** — Udemy — 2024

#### Animations
- Cards: Flip-in animation on scroll
- Hover: Glow effect + lift

---

### Section 8: Contact

**Purpose:** Get in touch

#### Composition
- Two-column layout
- Left: Contact info + social links
- Right: Contact form (Name, Email, Message, Submit)

#### Content
- Heading: "Let's Work Together"
- Subtext: "Open to internships, collaborations, and interesting projects."
- Email: krashtrabhushan@gmail.com
- Phone: +91 9263137206
- Location: Katihar, Bihar, India

#### Form Fields
- Name (required)
- Email (required)
- Subject
- Message (required)
- Submit button: "Send Message"

#### Animations
- Form fields: Focus glow effect
- Submit button: Loading state animation
- Success: Checkmark + confetti

---

## 6. Animation System

### Global Animations
- **Page load:** Staggered reveal of navigation, then hero content
- **Scroll reveal:** Elements fade in + slide up when entering viewport
- **Hover states:** Subtle lift, glow, or underline effects
- **Smooth scroll:** Lenis or native smooth scroll

### ScrollTrigger Config
- Default: `start: "top 80%"`, `end: "top 20%"`
- Scrub: `false` (trigger-based, not continuous)
- Markers: `false` (production)

### Easing Functions
- Default: `power3.out`
- Bounce: `back.out(1.7)`
- Smooth: `power2.inOut`

---

## 7. Responsive Breakpoints

- **Desktop:** 1280px+ (full layout)
- **Laptop:** 1024px - 1279px (slightly reduced spacing)
- **Tablet:** 768px - 1023px (2-column → 1-column)
- **Mobile:** < 768px (single column, stacked)

---

## 8. Accessibility

- Reduced motion support via `prefers-reduced-motion`
- Focus states on all interactive elements
- Semantic HTML structure
- Alt text on all images
- Color contrast ratio > 4.5:1
