'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/AuthProvider';
import { 
  Sparkles, Menu, X, ArrowRight, Brain, Target, 
  FileText, LineChart, CheckCircle2, ChevronDown, 
  Briefcase, Zap, LayoutDashboard, Shield, Globe, MessageCircle 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#083A4F] text-[#E5E1DD] selection:bg-[#A58D66]/30 font-sans">
      <Navbar />
      <main>
        <Hero />
        <ValueStrip />
        <HowItWorks />
        <Features />
        <AIPreview />
        <WorkflowPreview />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

// --------------------- SHARED COMPONENTS/EFFECTS ---------------------

function WordReveal({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function MagneticButton({ children, className = "", as: Component = "div", ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouse = (e) => {
    if (prefersReducedMotion || ('ontouchstart' in window)) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
      {...props}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </Component>
  );
}

function GlowCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group bg-[#407E8C]/20 border border-[#407E8C]/40 rounded-2xl transition-colors hover:border-[#407E8C]/60 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 hidden sm:block z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(165, 141, 102, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}

function MovingBorderCard({ children, className = "" }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden p-[1px] ${className}`}>
      <div 
        className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(165,141,102,0)_0%,rgba(165,141,102,0.8)_50%,rgba(165,141,102,0)_100%)] animate-spin" 
        style={{ animationDuration: '4s' }} 
      />
      <div className="absolute inset-[1px] rounded-2xl bg-[#083A4F] z-0" />
      <div className="relative z-10 h-full bg-[#407E8C]/20/90 backdrop-blur-xl rounded-2xl p-6 sm:p-10 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || ('ontouchstart' in window)) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --------------------- APP COMPONENTS ---------------------

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <header className="fixed top-0 w-full z-50 border-b border-[#407E8C]/50 bg-[#083A4F]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Sparkles className="w-5 h-5 text-[#A58D66]" />
            <span>AI Opportunity Finder</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-[#E5E1DD]/70 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-[#E5E1DD]/70 hover:text-white transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-sm text-[#E5E1DD]/70 hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm text-[#E5E1DD]/70 hover:text-white transition-colors">FAQ</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {!loading && user ? (
              <Link href="/dashboard">
                <Button variant="primary" size="sm">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-[#E5E1DD]/80 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-[#E5E1DD]/70 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 w-full bg-[#407E8C]/20 border-b border-[#407E8C]/40 shadow-2xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              <Link href="#features" className="text-[#E5E1DD]/80 py-2 border-b border-[#407E8C]/40" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="#how-it-works" className="text-[#E5E1DD]/80 py-2 border-b border-[#407E8C]/40" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
              <Link href="#pricing" className="text-[#E5E1DD]/80 py-2 border-b border-[#407E8C]/40" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              
              {!loading && user ? (
                <Link href="/dashboard" className="pt-4">
                  <Button className="w-full">Dashboard</Button>
                </Link>
              ) : (
                <div className="pt-4 flex flex-col gap-3">
                  <Link href="/login">
                    <Button variant="secondary" className="w-full">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      className="relative overflow-hidden group min-h-[90vh] flex items-center w-full"
      onMouseMove={handleMouseMove}
    >
      {/* 1. ANIMATED GRID BACKGROUND */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, #E5E1DD 1px, transparent 1px), linear-gradient(to bottom, #E5E1DD 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)'
        }}
        animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
      />
      
      {/* 2. SPOTLIGHT / MOUSE GLOW */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 hidden sm:block z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(165, 141, 102, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#A58D66]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#407E8C]/20/80 backdrop-blur-md border border-[#407E8C]/40 text-sm text-[#A58D66] mb-6 shadow-lg shadow-black/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Matching Engine 2.0</span>
          </motion.div>
          
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {/* 3. HEADLINE TEXT REVEAL */}
            <WordReveal text="Find freelance opportunities that " />
            {/* 4. GRADIENT / SHIMMER TEXT */}
            <motion.span 
              animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }} 
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#A58D66,45%,#E5E1DD,55%,#C1A77E)] bg-[length:200%_auto]"
            >
              match your skills.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-[#E5E1DD]/70 mb-8 max-w-xl leading-relaxed"
          >
            Stop wasting time on irrelevant gigs. Our AI analyzes opportunities against your profile, skills, and preferences to find your perfect match.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* 5. MAGNETIC CTA BUTTON */}
            <MagneticButton as="div" className="w-full sm:w-auto">
              <Link href="/signup" className="block w-full">
                <Button size="lg" className="w-full gap-2 shadow-lg shadow-[#A58D66]/20 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </Button>
              </Link>
            </MagneticButton>
            
            <MagneticButton as="div" className="w-full sm:w-auto">
              <Link href="#how-it-works" className="block w-full">
                <Button variant="secondary" size="lg" className="w-full bg-[#407E8C]/20/50 backdrop-blur-sm border-[#407E8C]/40 hover:bg-[#407E8C]/40 hover:border-[#407E8C]/60 transition-all">
                  See How It Works
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Hero Visual Preview - 6. FLOATING GLASS CARDS */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 lg:mt-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#A58D66]/20 to-transparent rounded-2xl blur-2xl" />
          
          <div className="relative z-10">
            <div 
              className="bg-[#083A4F]/90 border border-[#407E8C]/40 rounded-2xl p-6 shadow-2xl relative backdrop-blur-xl z-10"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-1">Senior React Developer</h3>
                  <p className="text-[#E5E1DD]/70 text-sm">Fintech Dashboard Refactor</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#A58D66]">$120/hr</div>
                  <p className="text-[#E5E1DD]/50 text-xs">Est. 4-6 weeks</p>
                </div>
              </div>

              <div className="bg-[#083A4F]/80 rounded-xl p-4 mb-6 border border-[#407E8C]/50 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#E5E1DD]/80">AI Match Score</span>
                  <span className="text-lg font-bold text-[#A58D66]">92%</span>
                </div>
                <div className="w-full bg-[#407E8C]/40 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '92%' }} 
                    transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                    className="bg-gradient-to-r from-[#A58D66] to-[#C1A77E] h-full rounded-full shadow-[0_0_10px_rgba(165,141,102,0.5)]" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-[#E5E1DD]/50 uppercase font-semibold tracking-wider">Matching Skills</span>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="px-2 py-1 bg-[#A58D66]/10 text-[#A58D66] rounded text-xs border border-[#A58D66]/20 font-medium">React</span>
                    <span className="px-2 py-1 bg-[#A58D66]/10 text-[#A58D66] rounded text-xs border border-[#A58D66]/20 font-medium">TypeScript</span>
                    <span className="px-2 py-1 bg-[#A58D66]/10 text-[#A58D66] rounded text-xs border border-[#A58D66]/20 font-medium">Tailwind</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[#E5E1DD]/50 uppercase font-semibold tracking-wider">Missing Skills</span>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs border border-red-500/20 font-medium">Web3.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
      </div>
    </section>
  );
}

function ValueStrip() {
  const values = [
    { icon: <Brain className="w-5 h-5 text-[#A58D66]" />, text: "AI-Powered Matching" },
    { icon: <Target className="w-5 h-5 text-[#A58D66]" />, text: "Skill Gap Analysis" },
    { icon: <FileText className="w-5 h-5 text-[#A58D66]" />, text: "Proposal Assistance" },
    { icon: <LineChart className="w-5 h-5 text-[#A58D66]" />, text: "Application Tracking" },
  ];

  // 11. INFINITE MARQUEE
  const marqueeItems = [...values, ...values, ...values, ...values];

  return (
    <div className="border-y border-[#407E8C]/50 bg-[#407E8C]/20 py-6 overflow-hidden relative flex group">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#083A4F] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#083A4F] to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex w-[200%] sm:w-max group-hover:[animation-play-state:paused]"
      >
        {marqueeItems.map((v, i) => (
          <div key={i} className="flex-none flex items-center justify-center gap-3 text-[#E5E1DD]/70 px-8">
            {v.icon}
            <span className="text-sm font-medium whitespace-nowrap">{v.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Discover", desc: "Find relevant freelance opportunities automatically aggregated." },
    { num: "02", title: "Analyze", desc: "Let AI analyze the opportunity requirements and complexity." },
    { num: "03", title: "Match", desc: "Understand your match score, strengths, and skill gaps." },
    { num: "04", title: "Apply", desc: "Generate a tailored proposal and track the application." },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl font-bold mb-4">How it works</h2>
        <p className="text-[#E5E1DD]/70 max-w-2xl mx-auto">A seamless workflow designed to help you land the perfect opportunities without the guesswork.</p>
      </motion.div>

      <div className="relative">
        {/* Background continuous line */}
        <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-[#407E8C]/50 z-0 rounded-full" />
        
        {/* Animated glowing progress line */}
        <motion.div 
          initial={{ width: "0%" }}
          whileInView={{ width: "80%" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="hidden md:block absolute top-[28px] left-[10%] h-[2px] bg-gradient-to-r from-[#A58D66]/0 via-[#A58D66] to-[#A58D66]/0 z-0"
        />

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="grid md:grid-cols-4 gap-8 md:gap-4 relative z-10"
        >
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              variants={{ 
                hidden: { opacity: 0, y: 30 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } 
              }} 
              className="flex flex-col items-center text-center group"
            >
              {/* Step Number Badge */}
              <div className="relative mb-8">
                {/* Outer Glow on hover */}
                <div className="absolute inset-0 bg-[#A58D66]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 bg-[#083A4F] border-2 border-[#407E8C]/40 group-hover:border-[#A58D66] text-[#E5E1DD]/70 group-hover:text-[#A58D66] font-bold flex items-center justify-center rounded-full shadow-lg transition-all duration-300 relative z-10 text-lg">
                  {step.num}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-[#E5E1DD]/90 group-hover:text-white transition-colors">{step.title}</h3>
              <p className="text-sm text-[#E5E1DD]/70 leading-relaxed max-w-[200px]">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-28 bg-[#083A4F]/60 border-y border-[#407E8C]/30 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#A58D66]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#A58D66] mb-4 px-4 py-1.5 rounded-full border border-[#A58D66]/30 bg-[#A58D66]/10">Features</span>
          <h2 className="text-4xl font-bold mb-4 text-[#E5E1DD]">Everything you need to win</h2>
          <p className="text-[#E5E1DD]/55 max-w-lg mx-auto text-base leading-relaxed">From finding gigs to closing contracts — AI handles the heavy lifting.</p>
        </motion.div>

        {/* ROW 1 — 3 equal cards */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        >
          {/* Card: AI Matching */}
          <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } }}>
            <GlowCard className="p-6 flex flex-col h-full min-h-[300px]">
              <div className="w-10 h-10 rounded-xl bg-[#A58D66]/15 text-[#A58D66] flex items-center justify-center mb-5">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#E5E1DD] mb-2">AI Opportunity Matching</h3>
              <p className="text-sm text-[#E5E1DD]/55 leading-relaxed mb-5">Scores every gig against your skills and preferences instantly.</p>
              {/* Mockup */}
              <div className="mt-auto space-y-2">
                {[{ t: "Senior React Dev", s: 94 }, { t: "SaaS Engineer", s: 87 }, { t: "Frontend Lead", s: 79 }].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#083A4F]/70 border border-[#407E8C]/40 rounded-lg px-3 py-2">
                    <span className="text-xs text-[#E5E1DD]/80 font-medium truncate mr-3">{item.t}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-14 h-1.5 bg-[#407E8C]/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#A58D66] to-[#C1A77E] rounded-full" style={{ width: `${item.s}%` }} />
                      </div>
                      <span className="text-[11px] font-bold text-[#A58D66] w-7 text-right">{item.s}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* Card: Smart Analysis */}
          <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } }}>
            <GlowCard className="p-6 flex flex-col h-full min-h-[300px]">
              <div className="w-10 h-10 rounded-xl bg-[#A58D66]/15 text-[#A58D66] flex items-center justify-center mb-5">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#E5E1DD] mb-2">Smart Analysis</h3>
              <p className="text-sm text-[#E5E1DD]/55 leading-relaxed mb-5">Understand complexity, skill gaps, and estimated effort before you apply.</p>
              {/* Mockup */}
              <div className="mt-auto space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#083A4F]/70 border border-[#407E8C]/40 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-[#A58D66]">92%</p>
                    <p className="text-[10px] text-[#E5E1DD]/45 mt-0.5">Match Score</p>
                  </div>
                  <div className="bg-[#083A4F]/70 border border-[#407E8C]/40 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-yellow-400">Med</p>
                    <p className="text-[10px] text-[#E5E1DD]/45 mt-0.5">Complexity</p>
                  </div>
                </div>
                <div className="bg-[#083A4F]/70 border border-[#407E8C]/40 rounded-lg p-3">
                  <p className="text-[10px] text-[#E5E1DD]/40 uppercase font-semibold tracking-wider mb-2">Skills</p>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 text-[10px] bg-[#A58D66]/10 text-[#A58D66] border border-[#A58D66]/25 rounded-md font-medium">React ✓</span>
                    <span className="px-2 py-0.5 text-[10px] bg-[#A58D66]/10 text-[#A58D66] border border-[#A58D66]/25 rounded-md font-medium">TS ✓</span>
                    <span className="px-2 py-0.5 text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 rounded-md font-medium">Web3 ✗</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Card: Proposal Generator */}
          <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } }}>
            <GlowCard className="p-6 flex flex-col h-full min-h-[300px]">
              <div className="w-10 h-10 rounded-xl bg-[#A58D66]/15 text-[#A58D66] flex items-center justify-center mb-5">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#E5E1DD] mb-2">AI Proposal Generator</h3>
              <p className="text-sm text-[#E5E1DD]/55 leading-relaxed mb-5">Personalized winning proposals drafted in seconds from your profile.</p>
              {/* Mockup */}
              <div className="mt-auto bg-[#083A4F]/70 border border-[#407E8C]/40 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#A58D66]" />
                  <span className="text-[11px] text-[#A58D66] font-semibold">AI is writing your proposal...</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-[#407E8C]/35 rounded-full w-full" />
                  <div className="h-2 bg-[#407E8C]/35 rounded-full w-5/6" />
                  <div className="h-2 bg-[#407E8C]/35 rounded-full w-full" />
                  <div className="h-2 bg-[#407E8C]/20 rounded-full w-3/5" />
                </div>
                <div className="mt-3 flex justify-end">
                  <span className="text-[10px] px-3 py-1 bg-[#A58D66]/20 text-[#A58D66] rounded-md border border-[#A58D66]/30 font-semibold cursor-pointer hover:bg-[#A58D66]/30 transition-colors">Copy Draft →</span>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>

        {/* ROW 2 — 2 equal cards */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Card: Application Tracker */}
          <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } }}>
            <GlowCard className="p-6 flex flex-col h-full min-h-[260px]">
              <div className="w-10 h-10 rounded-xl bg-[#A58D66]/15 text-[#A58D66] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#E5E1DD] mb-2">Application Tracker</h3>
              <p className="text-sm text-[#E5E1DD]/55 leading-relaxed mb-5">Your entire freelance pipeline — from saved to contract signed — in one place.</p>
              {/* Pipeline */}
              <div className="mt-auto grid grid-cols-4 gap-2">
                {[
                  { stage: "Saved", count: 12, bar: "bg-[#407E8C]/60" },
                  { stage: "Applied", count: 7, bar: "bg-[#A58D66]/70" },
                  { stage: "Interview", count: 3, bar: "bg-yellow-400/70" },
                  { stage: "Won", count: 1, bar: "bg-green-400/70" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#083A4F]/70 border border-[#407E8C]/40 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-[#E5E1DD]">{s.count}</p>
                    <div className={`w-full h-0.5 ${s.bar} rounded-full my-1.5`} />
                    <p className="text-[9px] text-[#E5E1DD]/45 font-medium uppercase tracking-wide">{s.stage}</p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* Card: Analytics */}
          <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } }}>
            <GlowCard className="p-6 flex flex-col h-full min-h-[260px]">
              <div className="w-10 h-10 rounded-xl bg-[#A58D66]/15 text-[#A58D66] flex items-center justify-center mb-5">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#E5E1DD] mb-2">Performance Analytics</h3>
              <p className="text-sm text-[#E5E1DD]/55 leading-relaxed mb-5">Track match rates, response rates, and earnings to sharpen your approach over time.</p>
              {/* Bar chart */}
              <div className="mt-auto bg-[#083A4F]/70 border border-[#407E8C]/40 rounded-lg p-4">
                <div className="flex items-end gap-1.5 h-16">
                  {[40, 60, 45, 75, 65, 90, 80].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                      style={{ height: `${h}%`, transformOrigin: "bottom" }}
                      className="flex-1 bg-gradient-to-t from-[#407E8C]/50 to-[#A58D66]/60 rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {["M","T","W","T","F","S","S"].map((d, i) => (
                    <span key={i} className="flex-1 text-center text-[9px] text-[#E5E1DD]/30">{d}</span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

      
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#A58D66] mb-4 px-3 py-1 rounded-full border border-[#A58D66]/30 bg-[#A58D66]/10">Features</span>
          <h2 className="text-4xl font-bold mb-4">Everything you need to win</h2>
          <p className="text-[#E5E1DD]/60 max-w-xl mx-auto text-lg">From finding to closing — AI handles the heavy lifting so you can focus on the work.</p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* CARD 1 — AI Matching (large, 2 cols) */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } }}
            className="md:col-span-2"
          >
            <GlowCard className="p-7 h-full flex flex-col min-h-[340px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-[#A58D66]/15 text-[#A58D66] rounded-lg flex items-center justify-center"><Brain className="w-5 h-5" /></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#A58D66]">AI Opportunity Matching</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#E5E1DD]">Find perfect-fit gigs instantly</h3>
              <p className="text-sm text-[#E5E1DD]/60 mb-6 leading-relaxed">Our AI scores every opportunity against your profile, skills, and preferences — no more guessing.</p>
              {/* Mini UI Mockup */}
              <div className="mt-auto bg-[#083A4F]/80 rounded-xl border border-[#407E8C]/40 overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#407E8C]/30">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-[#A58D66]/60" />
                  <span className="ml-2 text-[10px] text-[#E5E1DD]/40 font-mono">ai-matches.tsx</span>
                </div>
                <div className="p-4 space-y-2">
                  {[
                    { title: "Senior React Developer", score: 94, tag: "Upwork" },
                    { title: "Full-Stack SaaS Engineer", score: 87, tag: "Toptal" },
                    { title: "Frontend Architect", score: 81, tag: "Remote" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#407E8C]/20 rounded-lg px-3 py-2.5 border border-[#407E8C]/30">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-md bg-[#A58D66]/20 flex items-center justify-center">
                          <Briefcase className="w-3.5 h-3.5 text-[#A58D66]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#E5E1DD]">{item.title}</p>
                          <p className="text-[10px] text-[#E5E1DD]/50">{item.tag}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-[#407E8C]/40 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#A58D66] to-[#C1A77E] rounded-full" style={{ width: `${item.score}%` }} />
                        </div>
                        <span className="text-xs font-bold text-[#A58D66] w-8 text-right">{item.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* CARD 2 — Smart Analysis */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } }}
          >
            <GlowCard className="p-7 h-full flex flex-col min-h-[340px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-[#A58D66]/15 text-[#A58D66] rounded-lg flex items-center justify-center"><Target className="w-5 h-5" /></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#A58D66]">Smart Analysis</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#E5E1DD]">X-ray every job post</h3>
              <p className="text-sm text-[#E5E1DD]/60 mb-5 leading-relaxed">Know your strengths, skill gaps, complexity, and estimated effort before you apply.</p>
              {/* Mini Stat Grid */}
              <div className="mt-auto grid grid-cols-2 gap-2">
                <div className="bg-[#083A4F]/80 border border-[#407E8C]/40 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#A58D66]">92%</p>
                  <p className="text-[10px] text-[#E5E1DD]/50 mt-0.5">Match Score</p>
                </div>
                <div className="bg-[#083A4F]/80 border border-[#407E8C]/40 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-400">Med</p>
                  <p className="text-[10px] text-[#E5E1DD]/50 mt-0.5">Complexity</p>
                </div>
                <div className="col-span-2 bg-[#083A4F]/80 border border-[#407E8C]/40 rounded-xl p-3">
                  <p className="text-[10px] text-[#E5E1DD]/50 mb-1.5 uppercase font-semibold tracking-wider">Skill Gaps</p>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 rounded font-medium">Web3.js</span>
                    <span className="px-2 py-0.5 text-[10px] bg-[#A58D66]/10 text-[#A58D66] border border-[#A58D66]/20 rounded font-medium">React ✓</span>
                    <span className="px-2 py-0.5 text-[10px] bg-[#A58D66]/10 text-[#A58D66] border border-[#A58D66]/20 rounded font-medium">TS ✓</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* CARD 3 — AI Proposal Generator */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } }}
          >
            <GlowCard className="p-7 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-[#A58D66]/15 text-[#A58D66] rounded-lg flex items-center justify-center"><FileText className="w-5 h-5" /></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#A58D66]">Proposal Generator</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#E5E1DD]">Write winning proposals in seconds</h3>
              <p className="text-sm text-[#E5E1DD]/60 mb-4 leading-relaxed">AI drafts personalized proposals based on the job and your exact profile.</p>
              {/* Typewriter mockup */}
              <div className="mt-auto bg-[#083A4F]/80 rounded-xl border border-[#407E8C]/40 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-[#A58D66]/20 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-[#A58D66]" />
                  </div>
                  <span className="text-[10px] text-[#A58D66] font-semibold">AI generating proposal...</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-[#407E8C]/40 rounded-full w-full" />
                  <div className="h-2 bg-[#407E8C]/40 rounded-full w-4/5" />
                  <div className="h-2 bg-[#407E8C]/40 rounded-full w-full" />
                  <div className="h-2 bg-[#407E8C]/30 rounded-full w-3/5" />
                </div>
                <div className="mt-3 flex justify-end">
                  <span className="text-[10px] px-2 py-1 bg-[#A58D66]/20 text-[#A58D66] rounded-md border border-[#A58D66]/30 font-semibold">Copy Draft →</span>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* CARD 4 — Application Tracker */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } }}
            className="md:col-span-2"
          >
            <GlowCard className="p-7 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-[#A58D66]/15 text-[#A58D66] rounded-lg flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#A58D66]">Application Tracker</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#E5E1DD]">Your entire pipeline in one view</h3>
              <p className="text-sm text-[#E5E1DD]/60 mb-5 leading-relaxed">Track every application from saved → applied → interview → contract signed.</p>
              {/* Pipeline mockup */}
              <div className="mt-auto grid grid-cols-4 gap-2">
                {[
                  { stage: "Saved", count: 12, color: "border-[#407E8C]/60 bg-[#407E8C]/10" },
                  { stage: "Applied", count: 7, color: "border-[#A58D66]/60 bg-[#A58D66]/10" },
                  { stage: "Interview", count: 3, color: "border-yellow-500/60 bg-yellow-500/10" },
                  { stage: "Accepted", count: 1, color: "border-green-500/60 bg-green-500/10" },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl border ${s.color} p-3 text-center`}>
                    <p className="text-xl font-bold text-[#E5E1DD]">{s.count}</p>
                    <p className="text-[10px] text-[#E5E1DD]/50 mt-0.5">{s.stage}</p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* CARD 5 — Analytics (full width) */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } }}
            className="md:col-span-3"
          >
            <GlowCard className="p-7 flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-[#A58D66]/15 text-[#A58D66] rounded-lg flex items-center justify-center"><LineChart className="w-5 h-5" /></div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#A58D66]">Analytics</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#E5E1DD]">Data-driven freelancing</h3>
                <p className="text-sm text-[#E5E1DD]/60 leading-relaxed">Understand your match rates, response rates, and optimize your approach over time.</p>
              </div>
              {/* Bar chart mockup */}
              <div className="md:w-2/3 bg-[#083A4F]/80 rounded-xl border border-[#407E8C]/40 p-5">
                <div className="flex items-end gap-2 h-24 justify-between">
                  {[45, 65, 50, 80, 70, 92, 85].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div 
                        initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                        className="w-full rounded-t-md bg-gradient-to-t from-[#407E8C]/60 to-[#A58D66]/70"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                    <span key={d} className="flex-1 text-center text-[9px] text-[#E5E1DD]/30 font-medium">{d}</span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

function AIPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1 relative"
        >
          <div className="absolute inset-0 bg-[#A58D66]/5 rounded-3xl blur-3xl" />
          <GlowCard className="p-8 shadow-2xl">
            <h4 className="font-bold text-lg mb-6 border-b border-[#407E8C]/40 pb-4">AI Analysis Report</h4>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-[#A58D66]/5 p-4 rounded-xl border border-[#A58D66]/10">
                <span className="font-medium text-[#E5E1DD]/80">Match Score</span>
                <span className="text-2xl font-bold text-[#A58D66]">87%</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#407E8C]/20/50 p-4 rounded-xl border border-[#407E8C]/40">
                  <span className="text-xs text-[#E5E1DD]/50 uppercase font-semibold block mb-2">Complexity</span>
                  <span className="text-yellow-500 font-medium">Medium</span>
                </div>
                <div className="bg-[#407E8C]/20/50 p-4 rounded-xl border border-[#407E8C]/40">
                  <span className="text-xs text-[#E5E1DD]/50 uppercase font-semibold block mb-2">Estimated Effort</span>
                  <span className="text-[#E5E1DD]/80 font-medium">3-5 days</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-[#E5E1DD]/50 uppercase font-semibold block mb-3">AI Summary</span>
                <p className="text-sm text-[#E5E1DD]/70 leading-relaxed bg-[#407E8C]/20/50 p-4 rounded-xl border border-[#407E8C]/40">
                  Your React and JS skills are a perfect match. The client needs dashboard experience which aligns with your past 3 projects. You lack AWS exposure, but it's listed as a "nice-to-have".
                </p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <h2 className="text-3xl font-bold mb-6">Deep dive into every opportunity</h2>
          <p className="text-lg text-[#E5E1DD]/70 mb-8">
            Don't guess what the client wants. Our AI engine reads between the lines of job descriptions to tell you exactly how well you fit, what's missing, and how long the project will actually take.
          </p>
          <ul className="space-y-4">
            {[
              "Real-time skill gap analysis",
              "Hidden complexity detection",
              "Tailored application strategy"
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 text-[#E5E1DD]/80"
              >
                <CheckCircle2 className="w-5 h-5 text-[#A58D66]" /> {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function WorkflowPreview() {
  const steps = ["Saved", "Applied", "Interview", "Negotiation", "Accepted"];
  
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#407E8C]/50 overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">Master your pipeline</h2>
        <p className="text-[#E5E1DD]/70 max-w-2xl mx-auto">Track every application from the moment you find it until the contract is signed.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto [perspective:1200px]"
      >
        {/* 12. 3D TILT CARDS */}
        <TiltCard>
          {/* 9. MOVING BORDER */}
          <MovingBorderCard>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#A58D66]/10 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[600px] mb-12 relative">
                {/* Progress lines */}
                <div className="absolute top-5 left-10 right-10 h-1 bg-[#407E8C]/80 -translate-y-1/2 z-0 rounded-full" />
                <div className="absolute top-5 left-10 w-1/2 h-1 bg-[#A58D66] -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(165,141,102,0.5)] rounded-full" />
                
                <div className="flex justify-between items-start relative z-10">
                  {steps.map((step, i) => {
                    const isActive = i <= 2;
                    const isCurrent = i === 2;
                    return (
                      <div key={i} className="flex flex-col items-center gap-4 w-20">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ring-8 ring-[#083A4F]/90 ${isActive ? 'bg-[#A58D66] text-[#083A4F] shadow-[0_0_15px_rgba(165,141,102,0.4)]' : 'bg-[#407E8C]/40 text-[#E5E1DD]/50 border border-[#407E8C]/60'}`}>
                          {isActive ? <CheckCircle2 className="w-6 h-6" /> : <span className="text-sm font-medium">{i + 1}</span>}
                        </div>
                        <span className={`text-sm font-medium text-center transition-colors ${isCurrent ? 'text-[#A58D66] font-semibold' : isActive ? 'text-[#E5E1DD]/80' : 'text-[#E5E1DD]/50'}`}>{step}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="min-w-[600px]">
                <div className="bg-[#083A4F]/80 rounded-xl p-5 border border-[#407E8C]/80 flex items-center justify-between backdrop-blur-sm transition-colors hover:border-[#407E8C]/60 shadow-xl shadow-black/40 group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-[#407E8C]/20 border border-[#407E8C]/40 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <Zap className="w-6 h-6 text-[#A58D66]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#E5E1DD] text-lg mb-1">Acme Corp - Dashboard redesign</h4>
                      <p className="text-sm text-[#E5E1DD]/50 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#A58D66] inline-block animate-pulse shadow-[0_0_8px_rgba(165,141,102,0.8)]" />
                        Awaiting interview scheduling
                      </p>
                    </div>
                  </div>
                  <Button size="md" className="shadow-lg shadow-[#A58D66]/10 hover:shadow-[#A58D66]/20 transition-all">Schedule Interview</Button>
                </div>
              </div>
            </div>
          </MovingBorderCard>
        </TiltCard>
      </motion.div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for casual freelancers.",
      features: ["Limited opportunity analysis", "Basic matching", "3 proposals/month", "Community support"],
      cta: "Get Started",
      variant: "outline"
    },
    {
      name: "Pro",
      price: "$29",
      desc: "For serious professionals.",
      features: ["Unlimited AI analysis", "Advanced skill matching", "Unlimited proposal generation", "Application analytics"],
      cta: "Start Free Trial",
      variant: "primary",
      popular: true
    },
    {
      name: "Business",
      price: "$99",
      desc: "For agencies and teams.",
      features: ["Everything in Pro", "Higher usage limits", "Advanced team analytics", "Priority 24/7 support"],
      cta: "Contact Sales",
      variant: "secondary"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#407E8C]/30 border-y border-[#407E8C]/50 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-[#E5E1DD]/70 max-w-2xl mx-auto">Choose the plan that fits your freelance career.</p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto auto-rows-fr"
        >
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              variants={{ hidden: { opacity: 0, scale: 0.95, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} 
              whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              className="h-full"
            >
              <GlowCard className={`p-8 h-full flex flex-col ${plan.popular ? 'border-[#A58D66]/50 shadow-[0_0_30px_rgba(165,141,102,0.1)]' : 'border-[#407E8C]/40'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#A58D66] text-[#083A4F] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-20">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-medium text-[#E5E1DD]/80 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-[#E5E1DD]/50">/mo</span>
                </div>
                <p className="text-sm text-[#E5E1DD]/70 mb-8">{plan.desc}</p>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[#E5E1DD]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#A58D66] mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                
                <Button variant={plan.variant} className="w-full mt-auto">{plan.cta}</Button>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How does AI Opportunity Finder work?", a: "We aggregate freelance jobs and use LLMs to analyze the requirements against your profile to generate match scores and insights." },
    { q: "How is my match score calculated?", a: "The AI compares required skills, nice-to-haves, experience levels, and project domain against your verified profile data." },
    { q: "Can I customize my skills and preferences?", a: "Yes, you can build a comprehensive profile including skills, desired rates, timezones, and preferred project types." },
    { q: "Can AI generate proposals?", a: "Pro and Business users can generate highly tailored proposal drafts that address the specific pain points mentioned in the job post." },
    { q: "Does the platform automatically apply?", a: "No, we believe in high-quality manual applications. We give you the tools and proposals to apply faster, but you maintain control." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-[#407E8C]/40 bg-[#407E8C]/20/50 rounded-xl overflow-hidden transition-colors hover:border-[#407E8C]/60">
            <button 
              className="w-full text-left px-6 py-4 font-medium flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {faq.q}
              <ChevronDown className={`w-5 h-5 text-[#E5E1DD]/50 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-4 text-[#E5E1DD]/70 text-sm leading-relaxed border-t border-[#407E8C]/40 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-12 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="bg-gradient-to-br from-[#407E8C]/20 to-zinc-950 border border-[#407E8C]/40 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-[#A58D66]/10 group"
      >
        {/* 14. BACKGROUND BEAMS / LIGHT STREAKS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-50 mix-blend-screen">
          <motion.div 
            animate={{ 
              x: ["-100%", "200%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5, 
              ease: "easeInOut",
              delay: 0 
            }}
            className="absolute top-0 bottom-0 w-32 bg-[#A58D66]/20 skew-x-[-30deg] blur-2xl"
          />
          <motion.div 
            animate={{ 
              x: ["-100%", "200%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7, 
              ease: "easeInOut",
              delay: 2 
            }}
            className="absolute top-0 bottom-0 w-64 bg-cyan-500/10 skew-x-[-30deg] blur-3xl"
          />
        </div>

        <div className="absolute inset-0 bg-[#A58D66]/5 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Find opportunities built for your skills.</h2>
          <p className="text-[#E5E1DD]/70 mb-8 max-w-xl mx-auto">
            Stop searching, start matching. Join thousands of top freelancers finding their perfect gigs today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <MagneticButton as="div" className="w-full sm:w-auto">
              <Link href="/signup" className="block w-full">
                <Button size="lg" className="w-full shadow-lg shadow-[#A58D66]/20">Get Started</Button>
              </Link>
            </MagneticButton>
            <MagneticButton as="div" className="w-full sm:w-auto">
              <Link href="#features" className="block w-full">
                <Button variant="outline" size="lg" className="w-full bg-[#407E8C]/20/50 backdrop-blur-sm border-[#407E8C]/40 hover:bg-[#407E8C]/40 transition-colors">Explore Features</Button>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#407E8C]/40 bg-[#083A4F] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
            <Sparkles className="w-5 h-5 text-[#A58D66]" />
            <span>AI Opportunity Finder</span>
          </Link>
          <p className="text-sm text-[#E5E1DD]/50 mb-6 max-w-sm">
            The smart way to find, analyze, and land the best freelance opportunities using artificial intelligence.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-[#E5E1DD]/50 hover:text-[#A58D66] transition-colors"><MessageCircle className="w-5 h-5" /></a>
            <a href="#" className="text-[#E5E1DD]/50 hover:text-[#A58D66] transition-colors"><Globe className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-[#E5E1DD]">Product</h4>
          <ul className="space-y-3 text-sm text-[#E5E1DD]/50">
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#E5E1DD]">Company</h4>
          <ul className="space-y-3 text-sm text-[#E5E1DD]/50">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#E5E1DD]">Legal</h4>
          <ul className="space-y-3 text-sm text-[#E5E1DD]/50">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#407E8C]/40 text-sm text-[#E5E1DD]/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 AI Opportunity Finder. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" /> Secure Platform
        </div>
      </div>
    </footer>
  );
}
