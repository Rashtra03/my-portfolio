import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown, 
  Download, 
  ExternalLink, 
  Award, 
  Code2, 
  Cpu,
  Send,
  Copy,
  MapPin,
  Phone,
  Briefcase,
  CheckCircle2,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import './App.css';
import LiveDemoModal from './components/LiveDemoModal';

gsap.registerPlugin(ScrollTrigger);

// Preloader Component
function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut"
      })
      .to('.preloader-char', {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      .to('.preloader-char', {
        y: -20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: "power2.in",
        delay: 0.5
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const text = "Rashtra.";

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0f]">
      <div ref={textRef} className="opacity-0 font-display font-bold text-4xl md:text-6xl text-white flex overflow-hidden">
        {text.split('').map((char, i) => (
          <span key={i} className="preloader-char translate-y-10 opacity-0 inline-block">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

// Custom Cursor Component
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const glow = glowRef.current;
    if (!cursor || !follower || !glow) return;

    // Use QuickTo for better performance
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3" });

    const xToGlow = gsap.quickTo(glow, "x", { duration: 1.5, ease: "power3" });
    const yToGlow = gsap.quickTo(glow, "y", { duration: 1.5, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
      xToGlow(e.clientX);
      yToGlow(e.clientY);
    };

    const handleHover = () => {
      gsap.to(follower, { scale: 1.5, backgroundColor: 'rgba(99, 102, 241, 0.1)', duration: 0.3 });
      gsap.to(cursor, { scale: 0, duration: 0.3 });
      gsap.to(glow, { scale: 1.2, opacity: 0.8, duration: 0.3 });
    };

    const handleHoverOut = () => {
      gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(glow, { scale: 1, opacity: 0.5, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);

    // Setup mutation observer to handle dynamically added elements
    const setupListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleHoverOut);
      });
    };

    setupListeners();
    
    // Fallback for dynamic content: re-query occasionally or rely on static pages.
    // For this portfolio, static query is mostly fine, but let's observe body
    const observer = new MutationObserver(() => {
      setupListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={glowRef} className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none z-[-1] -translate-x-1/2 -translate-y-1/2 mix-blend-screen hidden md:block transition-opacity duration-300 opacity-50" />
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-indigo-400/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors hidden md:block" />
    </>
  );
}

// Magnetic Component wrapper
function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children as React.ReactElement<any>, { ref } as any);
}


// Navigation Component
function Navigation({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: (e: React.MouseEvent) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display font-bold text-xl text-white">
            RB<span className="gradient-text">.</span>
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-zinc-400 hover:text-white transition-colors link-underline"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors ml-4"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0f]/98 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl text-zinc-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Name character animation
      const chars = nameRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(chars, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.03, 
            duration: 0.8, 
            ease: 'power3.out',
            delay: 0.3
          }
        );
      }

      // Other elements
      gsap.fromTo('.hero-label', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
      );

      gsap.fromTo('.hero-tagline', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.8 }
      );

      gsap.fromTo('.hero-buttons', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1 }
      );

      gsap.fromTo('.hero-socials', 
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const name = "Rashtra Bhushan";

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="images/hero_gradient.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-60 light-hero-img"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/50 via-transparent to-[#0a0a0f] light-hero-overlay" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-indigo-500/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="hero-label font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-6">
          Electronics & Communication Engineer
        </p>
        
        <h1 ref={nameRef} className="relative font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6 flex flex-wrap justify-center gap-[0.3em] group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          {name.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIndex) => (
                <span 
                  key={`${wordIndex}-${charIndex}`} 
                  className="char inline-block cursor-default"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -20,
                      scale: 1.2,
                      color: '#818cf8',
                      textShadow: '0 0 20px rgba(129, 140, 248, 0.8)',
                      duration: 0.3,
                      ease: 'power2.out',
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      scale: 1,
                      color: '',
                      textShadow: 'none',
                      duration: 0.8,
                      ease: 'elastic.out(1, 0.3)',
                    });
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        
        <p className="hero-tagline text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Building bridges between hardware and software. 
          Passionate about embedded systems, signal processing, and full-stack development.
        </p>
        
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <Magnetic>
            <a href="#projects" className="btn-primary flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              View Projects
            </a>
          </Magnetic>
          <Magnetic>
            <button className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Social Links */}
      <div className="hero-socials absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
        <Magnetic>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
            <Github className="w-5 h-5" />
          </a>
        </Magnetic>
        <Magnetic>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
            <Linkedin className="w-5 h-5" />
          </a>
        </Magnetic>
        <Magnetic>
          <a href="mailto:krashtrabhushan@gmail.com"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
            <Mail className="w-5 h-5" />
          </a>
        </Magnetic>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-zinc-500 font-mono">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-zinc-500 animate-bounce" />
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image', 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo('.about-content > *', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => setCountersStarted(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 3, suffix: '+', label: 'Years Learning' },
    { value: 10, suffix: '+', label: 'Projects Completed' },
    { value: 5, suffix: '+', label: 'Certifications' },
    { value: 100, suffix: '%', label: 'Dedication' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="about-image relative group">
            <div className="relative rounded-2xl overflow-hidden gradient-border">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
              <img 
                src="images/about_portrait.jpg" 
                alt="Rashtra Bhushan" 
                className="w-full aspect-[3/4] object-cover contrast-[1.1] brightness-[0.9] grayscale-[0.5] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
                onMouseEnter={(e) => {
                  gsap.killTweensOf(e.currentTarget);
                  gsap.to(e.currentTarget, {
                    rotation: 3,
                    scale: 1.05,
                    duration: 0.15,
                    yoyo: true,
                    repeat: 5,
                    ease: "sine.inOut",
                    onComplete: () => {
                      gsap.to(e.currentTarget, { rotation: 0, scale: 1, duration: 0.2 });
                    }
                  });
                }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl -z-10 transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-indigo-500/30 rounded-2xl -z-10 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />
          </div>

          {/* Content */}
          <div className="about-content">
            <p className="font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-4">About Me</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              Engineering the <span className="gradient-text">Future</span>
            </h2>
            
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
              <p>
                I'm an Electronics & Communication Engineering student with a passion for bridging the gap between hardware and software. I specialize in embedded systems, signal processing, and full-stack development.
              </p>
              <p>
                Through hands-on projects and an internship at ISA Summer School working with JWST data, I've built a strong foundation in circuit design, programming, and data analysis.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card rounded-xl p-4 text-center">
                  <div className="font-display font-bold text-2xl md:text-3xl gradient-text">
                    <Counter value={stat.value} suffix={stat.suffix} started={countersStarted} />
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Counter Component
function Counter({ value, suffix, started }: { value: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    
    let startTime: number;
    const duration = 1500;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [started, value]);

  return <span>{count}{suffix}</span>;
}

// Skills Section
function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-card', 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: 'Programming & Development',
      icon: <Code2 className="w-5 h-5" />,
      skills: ['Python', 'C/C++', 'JavaScript', 'React.js', 'HTML/CSS', 'TypeScript', 'Node.js']
    },
    {
      title: 'Hardware & Engineering',
      icon: <Cpu className="w-5 h-5" />,
      skills: ['Circuit Design', 'Signal Processing', 'Embedded Systems', 'MATLAB']
    },
    {
      title: 'Tools & Platforms',
      icon: <Briefcase className="w-5 h-5" />,
      skills: ['Git/GitHub', 'VS Code', 'Jupyter Notebook', 'Arduino', 'Linux', 'Docker']
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 bg-[#12121a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-4">My Expertise</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skills-card glass-card rounded-2xl p-6 hover:glow-indigo-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400">
                  {category.icon}
                </div>
                <h3 className="font-display font-semibold text-white">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-zinc-300 border border-white/10 hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDemo, setActiveDemo] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card-wrapper');
      
      cards.forEach((card, index) => {
        // Skip animating the last card since there is nothing following it to stack on top of it
        if (index === cards.length - 1) return;
        
        const innerCard = card.querySelector('.project-card-inner');
        
        gsap.to(innerCard, {
          scale: 0.92,
          opacity: 0.4,
          filter: "blur(2px)",
          scrollTrigger: {
            trigger: card,
            start: 'top 15vh', // Starts when the card gets stuck at top-[15vh]
            end: () => `bottom 15vh`, // Ends when the card's wrapper bottom reaches the sticky top point
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  interface Project {
    title: string;
    description: string;
    image: string;
    video?: string;
    tech: string[];
    links: {
      github: string;
      demo: string | null;
    };
  }

  const projects: Project[] = [
    {
      title: 'SHIV CSC CENTER',
      description: 'A professional digital services portal built for a government-authorized CSC center, offering 20+ citizen services including Aadhaar, PAN, certificates, and passports with a modern UI.',
      image: 'images/shivecsccenter.mp4',
      tech: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
      links: { github: 'https://github.com/rashtra03/sagar-csc-frontend', demo: 'https://sagar-csc-frontend.vercel.app/' }
    },
    {
      title: 'Refokus Clone',
      description: 'A pixel-perfect clone of the award-winning Refokus website, featuring complex GSAP animations, smooth scrolling, and dynamic interactions.',
      image: 'images/rufokus.mp4',
      tech: ['React', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
      links: { github: 'https://github.com/rashtra03/refokus_clone', demo: 'https://rashtra03.github.io/refokus_clone/' }
    },
    {
      title: 'E-commerce Web Page',
      description: 'A modern, responsive e-commerce web application with product listings and interactive UI components.',
      image: 'images/e-commerce.mp4',
      tech: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind'],
      links: { github: 'https://github.com/rashtra03/E-Commerce-Store', demo: 'https://rashtra03.github.io/E-Commerce-Store/' }
    },
    {
      title: 'Library Management System',
      description: 'Python-based library system with add, issue, return, and view operations. Features clean CLI interface and SQLite database.',
      image: 'images/project_library.jpg',
      tech: ['Python', 'SQLite', 'OOP'],
      links: { github: '#', demo: null }
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-4">My Work</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <a href="#" className="mt-4 md:mt-0 text-indigo-400 hover:text-indigo-300 flex items-center gap-2 transition-colors">
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="flex flex-col gap-[8vh] pb-[10vh]">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card-wrapper sticky top-[15vh] w-full"
              style={{ 
                paddingTop: `${index * 20}px`,
                zIndex: index + 1 
              }}
            >
              <div className="project-card-inner glass-card !rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[60vh] lg:h-[70vh] transition-all duration-500 hover:border-indigo-500/30 transform-gpu">
                {/* Left Side: Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-between flex-[1] z-10 relative">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono text-5xl font-extrabold text-indigo-500/10 tracking-widest">
                        0{index + 1}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-4 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-auto">
                    <a 
                      href={project.links.github} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-sm text-zinc-300 hover:text-white transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      Code Repository
                    </a>
                    {project.links.demo && (
                      <a 
                        href={project.links.demo} 
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (project.title === 'E-commerce Web Page' || project.title === 'Refokus Clone' || project.title === 'Sagar CSC Digital Seva') {
                            e.preventDefault();
                            setActiveDemo({ url: project.links.demo!, title: project.title });
                          }
                        }}
                        className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-600/20"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live Preview
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Right Side: Visual Image/Video */}
                <div className="flex-[1.2] relative overflow-hidden min-h-[300px] lg:min-h-0 border-t lg:border-t-0 lg:border-l border-white/10 group">
                  {project.video ? (
                    <video 
                      src={project.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : project.image && (project.image.endsWith('.mp4') || project.image.endsWith('.webm') || project.image.endsWith('.ogg')) ? (
                    <video 
                      src={project.image} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#12121a] via-transparent to-transparent opacity-90 lg:opacity-70" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeDemo && (
        <LiveDemoModal 
          demoUrl={activeDemo.url}
          projectTitle={activeDemo.title}
          onClose={() => setActiveDemo(null)} 
        />
      )}
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate on desktop (lg viewport)
      if (window.innerWidth >= 1024) {
        const visualBlocks = gsap.utils.toArray<HTMLElement>('.experience-visual-block');
        const textBlocks = gsap.utils.toArray<HTMLElement>('.experience-text-block');
        
        // Initial state: first text block is active
        gsap.set(textBlocks[0], { opacity: 1, y: 0, pointerEvents: 'auto' });
        
        visualBlocks.forEach((block, index) => {
          ScrollTrigger.create({
            trigger: block,
            start: 'top 50%',
            end: 'bottom 50%',
            onToggle: (self) => {
              if (self.isActive) {
                // Fade in corresponding text block
                gsap.to(textBlocks[index], { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.5, 
                  pointerEvents: 'auto',
                  overwrite: 'auto',
                  ease: 'power2.out' 
                });
                
                // Fade out others
                textBlocks.forEach((tb, i) => {
                  if (i !== index) {
                    gsap.to(tb, { 
                      opacity: 0, 
                      y: -20, 
                      duration: 0.5, 
                      pointerEvents: 'none',
                      overwrite: 'auto',
                      ease: 'power2.in' 
                    });
                  }
                });
              }
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      role: 'Astronomy & Astrophysics Intern',
      company: 'ISA Summer School',
      duration: 'Summer 2025',
      description: 'Worked on JWST MIRI data analysis, learned fundamentals of spectroscopy, and enhanced scientific programming skills. Collaborated with researchers on spectral line identification projects.',
      skills: ['Data Analysis', 'Python', 'Astrophysics', 'Spectroscopy'],
      image: 'images/project_jwst.jpg'
    },
    {
      role: 'Web Development Intern',
      company: 'Invigo Infotech',
      duration: 'Summer 2025',
      description: 'Completed an intensive internship focusing on modern front-end and web technologies. Developed responsive user interfaces, implemented dynamic UI features, and enhanced web application interactivity and design.',
      skills: ['Web Development', 'React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'],
      image: 'images/project_webdev_new.png'
    },
    {
      role: 'Embedded Systems Intern',
      company: 'InternBee Training',
      duration: 'Summer 2026',
      description: 'Completed hands-on practical training in Embedded Systems. Designed and programmed microcontroller circuits, worked with sensor integration, and developed functional IoT hardware-software systems.',
      skills: ['Embedded Systems', 'IoT', 'Microcontrollers', 'C/C++', 'Circuit Design'],
      image: 'images/project_smart_home.jpg'
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 bg-[#12121a] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center lg:text-left mb-16">
          <p className="font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-4">My Journey</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        {/* Desktop Split Scroll Layout */}
        <div className="hidden lg:flex lg:flex-row gap-16 items-start justify-between relative min-h-[140vh]">
          {/* Left Side: Sticky Text Block */}
          <div className="lg:sticky lg:top-[25vh] lg:w-[45%] h-[50vh] relative">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="experience-text-block absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none transition-all duration-300"
                style={{ transform: 'translateY(20px)' }}
              >
                <span className="font-mono text-xs text-indigo-400 mb-2 block">{exp.duration}</span>
                <h3 className="font-display font-bold text-3xl text-white mb-2">{exp.role}</h3>
                <p className="text-zinc-500 font-medium text-lg mb-6">{exp.company}</p>
                <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Scrolling Image Cards */}
          <div className="lg:flex lg:flex-col lg:w-[50%] gap-[25vh] py-[10vh]">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="experience-visual-block w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group h-[40vh] min-h-[300px]"
              >
                <img 
                  src={exp.image} 
                  alt={exp.role} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121a]/95 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <p className="font-mono text-sm text-zinc-400">{exp.company}</p>
                    <p className="font-display font-semibold text-lg text-white">{exp.role}</p>
                  </div>
                  <span className="font-mono text-5xl font-extrabold text-indigo-500/10 tracking-wider">
                    0{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Card Stack Layout */}
        <div className="lg:hidden space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-xl flex flex-col">
              <div className="aspect-video w-full relative overflow-hidden">
                <img src={exp.image} alt={exp.role} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121a]/95 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-4xl font-extrabold text-white/20">0{index + 1}</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <span className="font-mono text-xs text-indigo-400 mb-2 block">{exp.duration}</span>
                <h3 className="font-display font-bold text-2xl text-white mb-1">{exp.role}</h3>
                <p className="text-zinc-400 font-medium text-sm mb-4">{exp.company}</p>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// Education Section
function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate on desktop (lg viewport)
      if (window.innerWidth >= 1024) {
        const visualBlocks = gsap.utils.toArray<HTMLElement>('.edu-visual-block');
        const textBlocks = gsap.utils.toArray<HTMLElement>('.edu-text-block');
        
        // Initial state: first text block is active
        gsap.set(textBlocks[0], { opacity: 1, y: 0, pointerEvents: 'auto' });
        
        visualBlocks.forEach((block, index) => {
          ScrollTrigger.create({
            trigger: block,
            start: 'top 50%',
            end: 'bottom 50%',
            onToggle: (self) => {
              if (self.isActive) {
                // Fade in corresponding text block
                gsap.to(textBlocks[index], { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.5, 
                  pointerEvents: 'auto',
                  overwrite: 'auto',
                  ease: 'power2.out' 
                });
                
                // Fade out others
                textBlocks.forEach((tb, i) => {
                  if (i !== index) {
                    gsap.to(tb, { 
                      opacity: 0, 
                      y: -20, 
                      duration: 0.5, 
                      pointerEvents: 'none',
                      overwrite: 'auto',
                      ease: 'power2.in' 
                    });
                  }
                });
              }
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const education = [
    {
      degree: 'B.Tech — Electronics & Communication Engineering',
      institution: 'University Name',
      duration: '2023 – 2027 (Expected)',
      details: 'Pursuing undergraduate degree with focus on embedded systems and signal processing.',
      coursework: ['Signals & Systems', 'Digital Electronics', 'Communication Theory', 'Microcontrollers', 'VLSI Design'],
      image: 'images/edu_btech_new.png'
    },
    {
      degree: 'Class 12th',
      institution: 'Kendriya Vidyalaya, Katihar',
      duration: '2023',
      details: 'Completed senior secondary education with Science stream.',
      coursework: [],
      image: 'images/edu_class12_new.png'
    },
    {
      degree: 'Class 10th',
      institution: 'Kendriya Vidyalaya, Katihar',
      duration: '2021',
      details: 'Completed secondary education.',
      coursework: [],
      image: 'images/edu_class10_new.png'
    }
  ];

  return (
    <section id="education" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center lg:text-left mb-16">
          <p className="font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-4">Academic Background</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            <span className="gradient-text">Education</span>
          </h2>
        </div>

        {/* Desktop Split Scroll Layout */}
        <div className="hidden lg:flex lg:flex-row gap-16 items-start justify-between relative min-h-[140vh]">
          {/* Left Side: Sticky Text Block */}
          <div className="lg:sticky lg:top-[25vh] lg:w-[45%] h-[50vh] relative">
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="edu-text-block absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none transition-all duration-300"
                style={{ transform: 'translateY(20px)' }}
              >
                <span className="font-mono text-xs text-indigo-400 mb-2 block">{edu.duration}</span>
                <h3 className="font-display font-bold text-3xl text-white mb-2">{edu.degree}</h3>
                <p className="text-zinc-500 font-medium text-lg mb-6">{edu.institution}</p>
                <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">{edu.details}</p>
                
                {edu.coursework.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-zinc-500 mr-2 flex items-center">Coursework:</span>
                    {edu.coursework.map((course, i) => (
                      <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/10">
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Scrolling Image Cards */}
          <div className="lg:flex lg:flex-col lg:w-[50%] gap-[25vh] py-[10vh]">
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="edu-visual-block w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group h-[40vh] min-h-[300px]"
              >
                <img 
                  src={edu.image} 
                  alt={edu.degree} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121a]/95 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <p className="font-mono text-sm text-zinc-400">{edu.institution}</p>
                    <p className="font-display font-semibold text-lg text-white">{edu.degree}</p>
                  </div>
                  <span className="font-mono text-5xl font-extrabold text-indigo-500/10 tracking-wider">
                    0{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Card Stack Layout */}
        <div className="lg:hidden space-y-12">
          {education.map((edu, index) => (
            <div key={index} className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-xl flex flex-col">
              <div className="aspect-video w-full relative overflow-hidden">
                <img src={edu.image} alt={edu.degree} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121a]/95 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-4xl font-extrabold text-white/20">0{index + 1}</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <span className="font-mono text-xs text-indigo-400 mb-2 block">{edu.duration}</span>
                <h3 className="font-display font-bold text-2xl text-white mb-1">{edu.degree}</h3>
                <p className="text-zinc-400 font-medium text-sm mb-4">{edu.institution}</p>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{edu.details}</p>
                {edu.coursework.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-zinc-500 mr-2 flex items-center">Coursework:</span>
                    {edu.coursework.map((course, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/10">
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Certifications Section
function CertificationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-card', 
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const certifications = [
    { name: 'Google Workspace', issuer: 'Google', year: '2025' },
    { name: 'Software Engineer Intern', issuer: 'HackerRank', year: '2025' },
    { name: 'Astronomy & Astrophysics Intern', issuer: 'ISA Summer School', year: '2025' },
    { name: 'Google AI', issuer: 'Coursera', year: '2026' },
    { name: 'JavaScript Developer', issuer: 'freeCodeCamp', year: '2026' },
    { name: 'Python Essentials 1', issuer: 'Cisco', year: '2026' },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[#12121a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-4">Credentials</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            <span className="gradient-text">Certifications</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card glass-card rounded-xl p-5 hover:glow-indigo-sm transition-all duration-300 group">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-medium text-white text-sm">{cert.name}</h3>
                  <p className="text-zinc-400 text-xs">{cert.issuer}</p>
                  <p className="text-indigo-400 text-xs mt-1">{cert.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-content', 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the mailto link with form data
    const subject = encodeURIComponent(formState.subject || 'New Contact from Portfolio');
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    
    // Open the user's default email client
    window.location.href = `mailto:krashtrabhushan@gmail.com?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
    
    // Reset form after a few seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('krashtrabhushan@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="contact-content grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-4">Get In Touch</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-zinc-400 mb-8">
              Open to internships, collaborations, and interesting projects. 
              Feel free to reach out if you'd like to connect!
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-zinc-500 text-sm">Email</p>
                  <p className="text-white">krashtrabhushan@gmail.com</p>
                </div>
                <button onClick={copyEmail} className="text-zinc-400 hover:text-white transition-colors">
                  {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Phone</p>
                  <p className="text-white">+91 9263137206</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Location</p>
                  <p className="text-white">Katihar, Bihar, India</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Magnetic>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                  <Github className="w-5 h-5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="mailto:krashtrabhushan@gmail.com"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-2">Message Sent!</h3>
                <p className="text-zinc-400">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Name</label>
                    <input 
                      type="text" 
                      required
                      className="form-input"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      required
                      className="form-input"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Subject</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="What's this about?"
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Your message..."
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>
                <Magnetic>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-500 text-sm">
          © 2026 Rashtra Bhushan. Built with passion.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">Privacy</a>
          <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    if (!document.startViewTransition) {
      setIsDark(!isDark);
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setIsDark(!isDark);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 1000,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white transition-colors duration-300">
      <CustomCursor />
      <div className="noise-overlay" />
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navigation isDark={isDark} toggleTheme={toggleTheme} />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <CertificationsSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
