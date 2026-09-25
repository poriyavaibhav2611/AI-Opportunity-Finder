'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/AuthProvider';
import { 
  Sparkles, Menu, X, ArrowRight, Brain, Target, 
  FileText, LineChart, CheckCircle2, ChevronDown, 
  Briefcase, Zap, LayoutDashboard, Shield, Globe, MessageCircle 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 font-sans">
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

// --------------------- COMPONENTS ---------------------

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <header className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>AI Opportunity Finder</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {!loading && user ? (
              <Link href="/dashboard">
                <Button variant="primary" size="sm">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="md:hidden absolute top-16 w-full bg-zinc-900 border-b border-zinc-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              <Link href="#features" className="text-zinc-300 py-2 border-b border-zinc-800" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="#how-it-works" className="text-zinc-300 py-2 border-b border-zinc-800" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
              <Link href="#pricing" className="text-zinc-300 py-2 border-b border-zinc-800" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              
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
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-emerald-400 mb-6 shadow-lg shadow-black/20">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Matching Engine 2.0</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Find freelance opportunities that <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">match your skills.</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
            Stop wasting time on irrelevant gigs. Our AI analyzes opportunities against your profile, skills, and preferences to find your perfect match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-emerald-500/20">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Visual Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-2xl blur-2xl" />
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative backdrop-blur-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Senior React Developer</h3>
                <p className="text-zinc-400 text-sm">Fintech Dashboard Refactor</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-400">$120/hr</div>
                <p className="text-zinc-500 text-xs">Est. 4-6 weeks</p>
              </div>
            </div>

            <div className="bg-zinc-950/80 rounded-xl p-4 mb-6 border border-zinc-800/50 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-zinc-300">AI Match Score</span>
                <span className="text-lg font-bold text-emerald-400">92%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '92%' }} 
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Matching Skills</span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs border border-emerald-500/20 font-medium">React</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs border border-emerald-500/20 font-medium">TypeScript</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs border border-emerald-500/20 font-medium">Tailwind</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Missing Skills</span>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs border border-red-500/20 font-medium">Web3.js</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ValueStrip() {
  const values = [
    { icon: <Brain className="w-5 h-5 text-emerald-500" />, text: "AI-Powered Matching" },
    { icon: <Target className="w-5 h-5 text-emerald-500" />, text: "Skill Gap Analysis" },
    { icon: <FileText className="w-5 h-5 text-emerald-500" />, text: "Proposal Assistance" },
    { icon: <LineChart className="w-5 h-5 text-emerald-500" />, text: "Application Tracking" },
  ];

  return (
    <div className="border-y border-zinc-800/50 bg-zinc-900/20 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {values.map((v, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} className="flex items-center gap-3 justify-center text-zinc-400">
              {v.icon}
              <span className="text-sm font-medium">{v.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
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
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">How it works</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">A seamless workflow designed to help you land the perfect opportunities without the guesswork.</p>
      </motion.div>

      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
        className="grid md:grid-cols-4 gap-8 relative"
      >
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-zinc-800 -translate-y-1/2 z-0" />
        {steps.map((step, i) => (
          <motion.div key={i} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} className="relative z-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 text-emerald-400 font-bold flex items-center justify-center rounded-full mb-6 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {step.num}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-zinc-400">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Brain className="w-6 h-6" />, title: "AI Opportunity Matching", desc: "Analyze opportunities against your profile and skills instantly." },
    { icon: <Target className="w-6 h-6" />, title: "Smart Analysis", desc: "Understand requirements, strengths, gaps and project complexity." },
    { icon: <FileText className="w-6 h-6" />, title: "AI Proposal Generator", desc: "Generate proposal drafts based on the opportunity and your profile." },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: "Application Tracker", desc: "Track opportunities from saved to completed in one dashboard." },
    { icon: <Briefcase className="w-6 h-6" />, title: "Opportunity Management", desc: "Save, organize and prioritize the best opportunities easily." },
    { icon: <LineChart className="w-6 h-6" />, title: "Analytics", desc: "Understand your applications, match rates and performance." },
  ];

  return (
    <section id="features" className="py-24 bg-zinc-900/30 border-y border-zinc-800/50 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Everything you need to turn freelance hunting into a streamlined, high-converting process.</p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              variants={{ hidden: { opacity: 0, scale: 0.95, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} 
              whileHover={{ y: -5, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              className="bg-zinc-900 border border-zinc-800/80 p-6 rounded-2xl hover:border-emerald-500/30 hover:bg-zinc-800/50 transition-all group shadow-lg shadow-black/20"
            >
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
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
          <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl blur-3xl" />
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 relative shadow-2xl">
            <h4 className="font-bold text-lg mb-6 border-b border-zinc-800 pb-4">AI Analysis Report</h4>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                <span className="font-medium text-zinc-300">Match Score</span>
                <span className="text-2xl font-bold text-emerald-400">87%</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase font-semibold block mb-2">Complexity</span>
                  <span className="text-yellow-500 font-medium">Medium</span>
                </div>
                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase font-semibold block mb-2">Estimated Effort</span>
                  <span className="text-zinc-300 font-medium">3-5 days</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-zinc-500 uppercase font-semibold block mb-3">AI Summary</span>
                <p className="text-sm text-zinc-400 leading-relaxed bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                  Your React and JS skills are a perfect match. The client needs dashboard experience which aligns with your past 3 projects. You lack AWS exposure, but it's listed as a "nice-to-have".
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <h2 className="text-3xl font-bold mb-6">Deep dive into every opportunity</h2>
          <p className="text-lg text-zinc-400 mb-8">
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
                className="flex items-center gap-3 text-zinc-300"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/50 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">Master your pipeline</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">Track every application from the moment you find it until the contract is signed.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 overflow-x-auto pb-4 custom-scrollbar">
            <div className="min-w-[600px] mb-12 relative">
              {/* Progress lines - perfectly aligned to centers */}
              <div className="absolute top-5 left-10 right-10 h-1 bg-zinc-800 -translate-y-1/2 z-0" />
              <div className="absolute top-5 left-10 w-1/2 h-1 bg-emerald-500 -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              
              <div className="flex justify-between items-start relative z-10">
                {steps.map((step, i) => {
                  const isActive = i <= 2;
                  const isCurrent = i === 2;
                  return (
                    <div key={i} className="flex flex-col items-center gap-4 w-20">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ring-8 ring-zinc-900/80 ${isActive ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'}`}>
                        {isActive ? <CheckCircle2 className="w-6 h-6" /> : <span className="text-sm font-medium">{i + 1}</span>}
                      </div>
                      <span className={`text-sm font-medium text-center transition-colors ${isCurrent ? 'text-emerald-400 font-semibold' : isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>{step}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="min-w-[600px]">
              <div className="bg-zinc-950/80 rounded-xl p-5 border border-zinc-800/80 flex items-center justify-between backdrop-blur-sm transition-colors hover:border-zinc-700 shadow-xl shadow-black/20">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center shadow-inner">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-100 text-lg mb-1">Acme Corp - Dashboard redesign</h4>
                    <p className="text-sm text-zinc-500 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      Awaiting interview scheduling
                    </p>
                  </div>
                </div>
                <Button size="md" className="shadow-lg shadow-emerald-500/10">Schedule Interview</Button>
              </div>
            </div>
          </div>
        </div>
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
    <section id="pricing" className="py-24 bg-zinc-900/30 border-y border-zinc-800/50 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Choose the plan that fits your freelance career.</p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              variants={{ hidden: { opacity: 0, scale: 0.95, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} 
              whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              className={`bg-zinc-950 rounded-2xl p-8 border ${plan.popular ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative' : 'border-zinc-800'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-medium text-zinc-300 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <p className="text-sm text-zinc-400 mb-8">{plan.desc}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              
              <Button variant={plan.variant} className="w-full">{plan.cta}</Button>
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
          <div key={i} className="border border-zinc-800 bg-zinc-900/50 rounded-xl overflow-hidden">
            <button 
              className="w-full text-left px-6 py-4 font-medium flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {faq.q}
              <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="px-6 pb-4 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4">
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
        className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-emerald-500/10"
      >
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Find opportunities built for your skills.</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Stop searching, start matching. Join thousands of top freelancers finding their perfect gigs today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-emerald-500/20">Get Started</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto hover:bg-zinc-800 transition-colors">Explore Features</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>AI Opportunity Finder</span>
          </Link>
          <p className="text-sm text-zinc-500 mb-6 max-w-sm">
            The smart way to find, analyze, and land the best freelance opportunities using artificial intelligence.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-zinc-500 hover:text-emerald-400"><MessageCircle className="w-5 h-5" /></a>
            <a href="#" className="text-zinc-500 hover:text-emerald-400"><Globe className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-800 text-sm text-zinc-600 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 AI Opportunity Finder. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" /> Secure Platform
        </div>
      </div>
    </footer>
  );
}
