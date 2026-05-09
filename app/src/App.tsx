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
  BookOpen, 
  Code2, 
  Cpu,
  Send,
  Copy,
  MapPin,
  Phone,
  Calendar,
  Briefcase,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import './App.css';

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

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use QuickTo for better performance
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const handleHover = () => {
      gsap.to(follower, { scale: 1.5, backgroundColor: 'rgba(99, 102, 241, 0.1)', duration: 0.3 });
      gsap.to(cursor, { scale: 0, duration: 0.3 });
    };

    const handleHoverOut = () => {
      gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
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
function Navigation() {
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
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
          src="/images/hero_gradient.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/50 via-transparent to-[#0a0a0f]" />
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
        
        <h1 ref={nameRef} className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6 flex flex-wrap justify-center gap-[0.3em]">
          {name.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIndex) => (
                <span 
                  key={`${wordIndex}-${charIndex}`} 
                  className="char inline-block transition-all duration-200 hover:-translate-y-3 hover:scale-110 hover:text-indigo-400 cursor-default"
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
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
              <img 
                src="/images/about_portrait.jpg" 
                alt="Rashtra Bhushan" 
                className="w-full aspect-[3/4] object-cover contrast-[1.1] brightness-[0.9] grayscale-[0.5] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
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
                I'm an Electronics & Communication Engineering student with a passion for creating 
                innovative solutions that bridge the gap between hardware and software. My journey 
                in engineering has equipped me with a diverse skill set spanning embedded systems, 
                signal processing, and full-stack development.
              </p>
              <p>
                Through hands-on projects and internships, I've developed a strong foundation in 
                circuit design, programming, and data analysis. I'm particularly fascinated by 
                space technology and have had the opportunity to work with JWST data during my 
                internship at ISA Summer School.
              </p>
              <p>
                When I'm not coding or designing circuits, you'll find me exploring new technologies, 
                contributing to open-source projects, or capturing the beauty of city lights through 
                my lens.
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
      skills: [
        { name: 'Python', level: 90 },
        { name: 'C/C++', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'React.js', level: 75 },
        { name: 'HTML/CSS', level: 85 },
      ]
    },
    {
      title: 'Hardware & Engineering',
      icon: <Cpu className="w-5 h-5" />,
      skills: [
        { name: 'Circuit Design', level: 80 },
        { name: 'Signal Processing', level: 85 },
        { name: 'Embedded Systems', level: 70 },
        { name: 'MATLAB', level: 75 },
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: <Briefcase className="w-5 h-5" />,
      skills: [
        { name: 'Git/GitHub', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Jupyter Notebook', level: 80 },
        { name: 'Arduino', level: 75 },
      ]
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
            <div key={catIndex} className="skills-card glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400">
                  {category.icon}
                </div>
                <h3 className="font-display font-semibold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} name={skill.name} level={skill.level} delay={catIndex * 0.1 + skillIndex * 0.05} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Skill Bar Component
function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={barRef}>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-zinc-300">{name}</span>
        <span className="text-zinc-500">{level}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill"
          style={{ width: isVisible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

// Projects Section
function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15,
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

  const projects = [
    {
      title: 'JWST MIRI Data Analysis',
      description: 'Analyzed James Webb Space Telescope MIRI data for spectral line identification. Performed data preprocessing and scientific visualization using Python.',
      image: '/images/project_jwst.jpg',
      tech: ['Python', 'Astropy', 'NumPy', 'Matplotlib'],
      links: { github: '#', demo: '#' }
    },
    {
      title: 'E-commerce Web Page',
      description: 'A modern, responsive e-commerce web application with product listings and interactive UI components.',
      image: '/images/project_ecommerce.jpg',
      tech: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind'],
      links: { github: '#', demo: '#' }
    },
    {
      title: 'Library Management System',
      description: 'Python-based library system with add, issue, return, and view operations. Features clean CLI interface and SQLite database.',
      image: '/images/project_library.jpg',
      tech: ['Python', 'SQLite', 'OOP'],
      links: { github: '#', demo: null }
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6">
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

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="project-card group glass-card rounded-2xl overflow-hidden hover:glow-indigo-sm transition-all duration-500">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="font-display font-semibold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a href={project.links.github} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {project.links.demo && (
                    <a href={project.links.demo} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-item', 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.2,
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

  const experiences = [
    {
      role: 'Astronomy & Astrophysics Intern',
      company: 'ISA Summer School',
      duration: 'Summer 2025',
      description: 'Worked on JWST MIRI data analysis, learned fundamentals of spectroscopy, and enhanced scientific programming skills. Collaborated with researchers on spectral line identification projects.',
      skills: ['Data Analysis', 'Python', 'Astrophysics', 'Spectroscopy'],
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 bg-[#12121a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-4">My Journey</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent md:-translate-x-1/2" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`timeline-item relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-4 border-[#12121a] md:-translate-x-1/2 z-10" />
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="glass-card rounded-2xl p-6 hover:glow-indigo-sm transition-all duration-300">
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : ''} mb-3`}>
                      <span className="font-mono text-xs text-indigo-400 mb-1">{exp.duration}</span>
                      <h3 className="font-display font-semibold text-lg text-white">{exp.role}</h3>
                      <p className="text-zinc-400 text-sm">{exp.company}</p>
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">{exp.description}</p>
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-md bg-indigo-500/10 text-indigo-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
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
      gsap.fromTo('.education-card', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15,
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

  const education = [
    {
      degree: 'B.Tech - Electronics & Communication Engineering',
      institution: 'Pursuing',
      duration: '2023 - 2027 (Expected)',
      description: 'Undergraduate degree with focus on embedded systems, signal processing, and communication systems.',
      coursework: ['Signals & Systems', 'Digital Electronics', 'Communication Theory', 'Microcontrollers', 'VLSI Design'],
    },
    {
      degree: 'Class 12th - Science Stream',
      institution: 'Kendriya Vidyalaya, Katihar',
      duration: '2023',
      description: 'Completed senior secondary education with Physics, Chemistry, and Mathematics.',
      coursework: ['Physics', 'Chemistry', 'Mathematics'],
    },
    {
      degree: 'Class 10th',
      institution: 'Kendriya Vidyalaya, Katihar',
      duration: '2021',
      description: 'Completed secondary education with distinction.',
      coursework: ['Science', 'Mathematics', 'Computer Science'],
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] text-indigo-400 uppercase mb-4">Academic Background</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="education-card glass-card rounded-2xl p-6 hover:glow-indigo-sm transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white">{edu.degree}</h3>
                      <p className="text-zinc-400 text-sm">{edu.institution}</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mt-3">{edu.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {edu.coursework.map((course, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-md bg-white/5 text-zinc-400">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {edu.duration}
                </div>
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
    { name: 'Google Workspace', issuer: 'Google', year: '2024' },
    { name: 'Software Engineer Intern', issuer: 'HackerRank', year: '2024' },
    { name: 'Astronomy & Astrophysics Intern', issuer: 'ISA Summer School', year: '2025' },
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <CustomCursor />
      <div className="noise-overlay" />
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navigation />
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
