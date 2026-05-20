import React, { useState, useEffect } from "react";
import { 
  Check, 
  ArrowRight, 
  Shield, 
  Zap, 
  BarChart3, 
  Target, 
  Mail, 
  Bell, 
  Menu, 
  X, 
  FileText, 
  Database, 
  Award, 
  TrendingUp, 
  Sparkles, 
  ChevronDown, 
  DollarSign, 
  Globe, 
  Lock, 
  CheckCircle2, 
  Send,
  Linkedin,
  Twitter,
  PhoneCall,
  Calendar,
  Layers,
  Search,
  MessageSquare
} from "lucide-react";

// Types for Lead Estimator
type Sector = "it_cyber" | "construction" | "professional_services" | "logistics_supply";
type AgencyGroup = "dod" | "hhs" | "dhs" | "nasa" | "doe";

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sticky nav shadow on scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Pricing mode state
  const [pricingPeriod, setPricingPeriod] = useState<"monthly" | "onetime">("monthly");

  // Lead estimator state
  const [sector, setSector] = useState<Sector>("it_cyber");
  const [agency, setAgency] = useState<AgencyGroup>("dod");
  const [estimating, setEstimating] = useState(false);
  const [estimatedPool, setEstimatedPool] = useState<{
    contacts: number;
    value: string;
    subcontractors: number;
  } | null>({
    contacts: 840,
    value: "$142M",
    subcontractors: 62
  });

  // Booking modal state
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Lead capture success state
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  // FAQ open states (index list of open accordions)
  const [openFaq, setOpenFaq] = useState<number[]>([0]);

  // Handle sticky nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate stat counters from 0 on mount
  const [counters, setCounters] = useState({
    spend: 0,
    agencies: 0,
    leads: 0,
    turnaround: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fast incremental tick for numeric satisfaction
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setCounters({
          spend: Math.min(8, Math.floor(count * 0.4)),
          agencies: Math.min(500, count * 25),
          leads: Math.min(12000, count * 600),
          turnaround: Math.min(48, count * 3),
        });
        if (count >= 20) {
          clearInterval(interval);
          setCounters({
            spend: 8,
            agencies: 500,
            leads: 12000,
            turnaround: 48,
          });
        }
      }, 50);
      return () => clearInterval(interval);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Estimator data mapping
  const estimatorPresets: Record<Sector, Record<AgencyGroup, { contacts: number; value: string; subcontractors: number }>> = {
    it_cyber: {
      dod: { contacts: 940, value: "$210M", subcontractors: 84 },
      hhs: { contacts: 640, value: "$134M", subcontractors: 32 },
      dhs: { contacts: 450, value: "$98M", subcontractors: 24 },
      nasa: { contacts: 310, value: "$65M", subcontractors: 18 },
      doe: { contacts: 280, value: "$54M", subcontractors: 15 },
    },
    construction: {
      dod: { contacts: 1200, value: "$420M", subcontractors: 140 },
      hhs: { contacts: 150, value: "$32M", subcontractors: 12 },
      dhs: { contacts: 390, value: "$110M", subcontractors: 45 },
      nasa: { contacts: 180, value: "$85M", subcontractors: 19 },
      doe: { contacts: 520, value: "$195M", subcontractors: 58 },
    },
    professional_services: {
      dod: { contacts: 870, value: "$115M", subcontractors: 95 },
      hhs: { contacts: 920, value: "$160M", subcontractors: 74 },
      dhs: { contacts: 510, value: "$75M", subcontractors: 38 },
      nasa: { contacts: 240, value: "$45M", subcontractors: 21 },
      doe: { contacts: 330, value: "$52M", subcontractors: 26 },
    },
    logistics_supply: {
      dod: { contacts: 1450, value: "$380M", subcontractors: 110 },
      hhs: { contacts: 340, value: "$85M", subcontractors: 22 },
      dhs: { contacts: 640, value: "$140M", subcontractors: 54 },
      nasa: { contacts: 150, value: "$40M", subcontractors: 12 },
      doe: { contacts: 220, value: "$62M", subcontractors: 19 },
    },
  };

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setEstimating(true);
    setEstimatedPool(null);
    setTimeout(() => {
      setEstimatedPool(estimatorPresets[sector][agency]);
      setEstimating(false);
    }, 900);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitting(true);
    setTimeout(() => {
      setLeadSubmitted(true);
      setLeadSubmitting(false);
      // Automatically prefill the booking parameters or store email
      localStorage.setItem("feddata_lead_email", leadEmail);
    }, 1200);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingOpen(false);
      setBookingSubmitted(false);
      alert(`Meeting successfully scheduled! We will contact you at your provided email workspace.`);
    }, 1500);
  };

  const toggleFaq = (index: number) => {
    if (openFaq.includes(index)) {
      setOpenFaq(openFaq.filter((i) => i !== index));
    } else {
      setOpenFaq([...openFaq, index]);
    }
  };

  return (
    <div className="font-sans bg-navy-deep text-white selection:bg-teal-accent selection:text-navy-deep min-h-screen relative overflow-x-hidden">
      
      {/* Glow Orbs background */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-accent/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-accent/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-blue-accent/5 blur-[150px] pointer-events-none" />

      {/* 1. STICKY NAVIGATION */}
      <nav id="navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-navy-deep/95 backdrop-blur-md py-4 border-b border-white/10 shadow-lg" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-teal-accent to-blue-accent flex items-center justify-center font-syne font-extrabold text-[#0a1628] text-lg select-none shadow-[0_0_15px_rgba(0,212,170,0.3)] duration-300 group-hover:scale-105">
              FD
            </div>
            <div>
              <span className="font-syne text-xl font-extrabold tracking-tight text-white block">
                FEDDATA <span className="text-teal-accent group-hover:text-blue-accent transition-colors">PRO</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-muted block -mt-1">
                spending intelligence
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-muted hover:text-white transition-colors duration-200">Services</a>
            <a href="#process" className="text-sm font-medium text-slate-muted hover:text-white transition-colors duration-200">Process</a>
            <a href="#results" className="text-sm font-medium text-slate-muted hover:text-white transition-colors duration-200">Results</a>
            <a href="#pricing" className="text-sm font-medium text-slate-muted hover:text-white transition-colors duration-200">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-slate-muted hover:text-white transition-colors duration-200 font-mono text-teal-accent/95 hover:text-teal-accent">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setBookingOpen(true)}
              className="px-5 py-2.5 rounded text-xs font-bold font-syne uppercase tracking-wider bg-gradient-to-r from-teal-accent to-teal-accent/90 text-navy-deep hover:from-white hover:to-white hover:text-navy-deep transition-all duration-300 shadow-[0_4px_20px_rgba(0,212,170,0.2)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
            >
              Book a Free Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-white hover:text-teal-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[100%] left-0 right-0 bg-navy-accent border-b border-white/10 py-6 px-6 shadow-2xl animate-fadeIn">
            <div className="flex flex-col gap-4">
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-muted hover:text-white transition-colors py-2"
              >
                Services
              </a>
              <a 
                href="#process" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-muted hover:text-white transition-colors py-2"
              >
                Process
              </a>
              <a 
                href="#results" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-muted hover:text-white transition-colors py-2"
              >
                Results
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-muted hover:text-white transition-colors py-2"
              >
                Pricing
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-teal-accent font-semibold py-2"
              >
                FAQ
              </a>
              <hr className="border-white/10 my-1" />
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingOpen(true);
                }}
                className="w-full py-3 rounded font-syne font-extrabold uppercase text-xs tracking-wider bg-teal-accent text-navy-deep text-center block shadow-[0_4px_20px_rgba(0,212,170,0.2)]"
              >
                Book a Free Call
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Animated grid lines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f223a_1px,transparent_1px),linear-gradient(to_bottom,#0f223a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center z-10 relative">
          
          {/* Animated trust badge */}
          <div className="inline-flex items-center gap-2 bg-teal-accent/10 border border-teal-accent/30 px-3.5 py-1.5 rounded-full mb-8 animate-pulse hover:border-teal-accent/60 transition-colors">
            <Award className="w-4 h-4 text-teal-accent" />
            <span className="text-[11px] uppercase tracking-wider font-extrabold font-mono text-teal-accent">
              USAspending.gov Certified Specialist
            </span>
          </div>

          <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[0.95] max-w-5xl mx-auto mb-6">
            Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-accent via-emerald-400 to-blue-accent">$8 Trillion</span> in Federal Spending Data
          </h1>

          <p className="font-sans text-base sm:text-lg lg:text-xl text-slate-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            We transform raw federal transaction data into actionable lead databases & hyper-targeted, compliant outbound campaigns. Win prime awards and bypass the gatekeepers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#lead-builder" 
              className="w-full sm:w-auto px-8 py-4 rounded text-sm font-bold font-syne uppercase tracking-wider bg-gradient-to-r from-teal-accent to-emerald-400 text-navy-deep shadow-[0_4px_30px_rgba(0,212,170,0.25)] hover:shadow-[0_4px_35px_rgba(0,212,170,0.45)] hover:-translate-y-0.5 transition-all text-center"
            >
              Get Your Free Lead Sample
            </a>
            <a 
              href="#process" 
              className="w-full sm:w-auto px-8 py-4 rounded text-sm font-bold font-syne uppercase tracking-wider border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all text-center"
            >
              See How It Works
            </a>
          </div>

          {/* 4 Stat counters with manual animation triggers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto pt-10 border-t border-white/10">
            <div className="p-4 rounded-xl bg-navy-accent/40 border border-white/5 hover:border-teal-accent/20 transition-all duration-300">
              <div className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-accent mb-1">
                ${counters.spend}T+
              </div>
              <div className="text-[10px] sm:text-xs tracking-widest text-slate-muted uppercase font-mono font-bold">
                Federal Spend Tracked
              </div>
            </div>
            <div className="p-4 rounded-xl bg-navy-accent/40 border border-white/5 hover:border-teal-accent/20 transition-all duration-300">
              <div className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1">
                {counters.agencies}+
              </div>
              <div className="text-[10px] sm:text-xs tracking-widest text-slate-muted uppercase font-mono font-bold">
                Agencies Monitored
              </div>
            </div>
            <div className="p-4 rounded-xl bg-navy-accent/40 border border-white/5 hover:border-teal-accent/20 transition-all duration-300">
              <div className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-accent mb-1">
                {counters.leads.toLocaleString()}+
              </div>
              <div className="text-[10px] sm:text-xs tracking-widest text-slate-muted uppercase font-mono font-bold">
                Leads Delivered
              </div>
            </div>
            <div className="p-4 rounded-xl bg-navy-accent/40 border border-white/5 hover:border-teal-accent/20 transition-all duration-300">
              <div className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1">
                {counters.turnaround}h
              </div>
              <div className="text-[10px] sm:text-xs tracking-widest text-slate-muted uppercase font-mono font-bold">
                Avg Turnaround Time
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SOCIAL PROOF / LOGO BAR */}
      <div className="bg-navy-accent border-y border-white/5 overflow-hidden py-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs uppercase tracking-widest text-slate-muted font-mono font-bold mb-6">
          ⚙️ Trusted by teams bidding at federal entities
        </div>
        
        {/* Infinite scrolling marquee of GovCon giants */}
        <div className="relative flex overflow-x-hidden w-full">
          <div className="animate-marquee whitespace-nowrap flex gap-12 text-sm sm:text-base font-syne font-extrabold tracking-widest text-slate-muted/30">
            <span>DEFENSE LOGISTICS AGENCY</span>
            <span className="text-teal-accent/25">•</span>
            <span>NASA JET PROPULSION</span>
            <span className="text-teal-accent/25">•</span>
            <span>U.S. DEPT OF ENERGY</span>
            <span className="text-teal-accent/25">•</span>
            <span>BOEING GLOBAL SYSTEMS</span>
            <span className="text-teal-accent/25">•</span>
            <span>LOCKHEED MARTIN AEROSPACE</span>
            <span className="text-teal-accent/25">•</span>
            <span>HEALTH & HUMAN SERVICES</span>
            <span className="text-teal-accent/25">•</span>
            <span>GENERAL DYNAMICS BIDS</span>
            <span className="text-teal-accent/25">•</span>
          </div>

          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 text-sm sm:text-base font-syne font-extrabold tracking-widest text-slate-muted/30">
            <span>DEFENSE LOGISTICS AGENCY</span>
            <span className="text-teal-accent/25">•</span>
            <span>NASA JET PROPULSION</span>
            <span className="text-teal-accent/25">•</span>
            <span>U.S. DEPT OF ENERGY</span>
            <span className="text-teal-accent/25">•</span>
            <span>BOEING GLOBAL SYSTEMS</span>
            <span className="text-teal-accent/25">•</span>
            <span>LOCKHEED MARTIN AEROSPACE</span>
            <span className="text-teal-accent/25">•</span>
            <span>HEALTH & HUMAN SERVICES</span>
            <span className="text-teal-accent/25">•</span>
            <span>GENERAL DYNAMICS BIDS</span>
            <span className="text-teal-accent/25">•</span>
          </div>
        </div>
      </div>

      {/* Custom Global Animation Styles for Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 35s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-teal-accent uppercase font-mono px-3 py-1 rounded bg-teal-accent/10 border border-teal-accent/20">
              What We Do
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4 mb-5">
              Federal Data Expertise That Drives Revenue
            </h2>
            <p className="text-slate-muted text-base sm:text-lg">
              We mine the raw, unstructured transactions on USAspending, align them with programmatic needs, and feed them into standard contractor sales funnels.
            </p>
          </div>

          {/* 6 Grid Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="p-8 rounded-xl bg-navy-accent border-t-4 border-t-teal-accent/20 border-x border-b border-white/5 hover:border-t-teal-accent hover:border-white/10 hover:bg-[#122741] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-teal-accent/10 flex items-center justify-center text-teal-accent mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-teal-accent bg-teal-accent/10 py-1 px-2.5 rounded">
                CORE DATA MINING
              </span>
              <h3 className="font-syne text-xl font-bold text-white mt-4 mb-3 group-hover:text-teal-accent transition-colors">
                USAspending.gov Data Mining
              </h3>
              <p className="text-sm text-slate-muted leading-relaxed mb-4">
                Deep-dive queries on prime and sub-award structures. We map agency spending flows, identifying hidden target contracts and awardee relationships.
              </p>
              <div className="text-xs font-semibold text-white/50 group-hover:text-white flex items-center gap-1">
                Learn our query methods <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-xl bg-navy-accent border-t-4 border-t-blue-accent/20 border-x border-b border-white/5 hover:border-t-blue-accent hover:border-white/10 hover:bg-[#122741] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-blue-accent/10 flex items-center justify-center text-blue-accent mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-blue-accent bg-blue-accent/10 py-1 px-2.5 rounded">
                SALES PIPELINE
              </span>
              <h3 className="font-syne text-xl font-bold text-white mt-4 mb-3 group-hover:text-blue-accent transition-colors">
                Targeted Lead Generation
              </h3>
              <p className="text-sm text-slate-muted leading-relaxed mb-4">
                We extract, clean, and enrich contact files of active Contracting Officers, Program Managers, and Bidding Executives relevant to your exact NAICS.
              </p>
              <div className="text-xs font-semibold text-white/50 group-hover:text-white flex items-center gap-1">
                View sample structures <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-xl bg-navy-accent border-t-4 border-t-teal-accent/20 border-x border-b border-white/5 hover:border-t-teal-accent hover:border-white/10 hover:bg-[#122741] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-teal-accent/10 flex items-center justify-center text-teal-accent mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-teal-accent bg-teal-accent/10 py-1 px-2.5 rounded">
                COMPLIANT OUTBOUND
              </span>
              <h3 className="font-syne text-xl font-bold text-white mt-4 mb-3 group-hover:text-teal-accent transition-colors">
                Email Marketing Campaigns
              </h3>
              <p className="text-sm text-slate-muted leading-relaxed mb-4">
                We design and launch cold outreach sequences tailored for GovCon trust. Standardized verification safeguards delivery to valid .gov/mil targets.
              </p>
              <div className="text-xs font-semibold text-white/50 group-hover:text-white flex items-center gap-1">
                See cold sequence rules <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-xl bg-navy-accent border-t-4 border-t-blue-accent/20 border-x border-b border-white/5 hover:border-t-blue-accent hover:border-white/10 hover:bg-[#122741] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-blue-accent/10 flex items-center justify-center text-blue-accent mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-blue-accent bg-blue-accent/10 py-1 px-2.5 rounded">
                PROCURMENT INTEL
              </span>
              <h3 className="font-syne text-xl font-bold text-white mt-4 mb-3 group-hover:text-blue-accent transition-colors">
                Grant & Contract Intelligence
              </h3>
              <p className="text-sm text-slate-muted leading-relaxed mb-4">
                Anticipate agency requirements. We track contract expirations, recompete forecasts, and identify potential sub-contracting entry points.
              </p>
              <div className="text-xs font-semibold text-white/50 group-hover:text-white flex items-center gap-1">
                Explore tracking systems <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 5 */}
            <div className="p-8 rounded-xl bg-navy-accent border-t-4 border-t-teal-accent/20 border-x border-b border-white/5 hover:border-t-teal-accent hover:border-white/10 hover:bg-[#122741] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-teal-accent/10 flex items-center justify-center text-teal-accent mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-teal-accent bg-teal-accent/10 py-1 px-2.5 rounded">
                COMPOSITE AUDIT
              </span>
              <h3 className="font-syne text-xl font-bold text-white mt-4 mb-3 group-hover:text-teal-accent transition-colors">
                Agency & Awardee Profiling
              </h3>
              <p className="text-sm text-slate-muted leading-relaxed mb-4">
                Rich data briefs showing exact procurement behavior of target agencies, including vehicle preferences (e.g., OASIS, GSA Schedule) and spending velocity.
              </p>
              <div className="text-xs font-semibold text-white/50 group-hover:text-white flex items-center gap-1">
                Download a sample brief <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 6 */}
            <div className="p-8 rounded-xl bg-navy-accent border-t-4 border-t-blue-accent/20 border-x border-b border-white/5 hover:border-t-blue-accent hover:border-white/10 hover:bg-[#122741] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-blue-accent/10 flex items-center justify-center text-blue-accent mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-blue-accent bg-blue-accent/10 py-1 px-2.5 rounded">
                CRITICAL NOTICES
              </span>
              <h3 className="font-syne text-xl font-bold text-white mt-4 mb-3 group-hover:text-blue-accent transition-colors">
                Opportunity Monitoring & Alerts
              </h3>
              <p className="text-sm text-slate-muted leading-relaxed mb-4">
                Never miss an RFP or Sources Sought. Get automated immediate notifications configured to trigger when high-probability opportunities match your profile.
              </p>
              <div className="text-xs font-semibold text-white/50 group-hover:text-white flex items-center gap-1">
                Configure your criteria <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (PROCESS) */}
      <section id="process" className="py-24 bg-navy-accent/50 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold tracking-widest text-teal-accent uppercase font-mono px-3 py-1 rounded bg-teal-accent/10 border border-teal-accent/20">
              The Engine
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4 mb-5">
              From Raw Transactions to Direct Booked Meetings
            </h2>
            <p className="text-slate-muted text-base sm:text-lg">
              Our systematic data pipelines cleanse governmental feeds and convert them into warm sales relationships.
            </p>
          </div>

          {/* Connected timeline steps */}
          <div className="relative">
            
            {/* Horizontal Line connector (hidden on desktop mobile) */}
            <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[100px] h-0.5 bg-gradient-to-r from-teal-accent/20 via-blue-accent/30 to-teal-accent/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              
              {/* Step 1 */}
              <div className="text-center flex flex-col items-center group">
                <div className="relative mb-6">
                  <div className="w-[180px] h-[180px] rounded-full border border-white/10 flex items-center justify-center bg-navy-deep group-hover:border-teal-accent/40 duration-300 relative">
                    <span className="absolute font-syne text-7xl font-extrabold text-[#1a2c42] select-none -top-4 -left-2 z-0">
                      01
                    </span>
                    <div className="z-10 text-center px-4">
                      <Layers className="w-8 h-8 mx-auto mb-2 text-teal-accent" />
                      <h4 className="font-syne text-xs tracking-wider uppercase font-bold text-white">
                        Define Target
                      </h4>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-teal-accent/10 scale-95 duration-500 group-hover:scale-105 pointer-events-none" />
                </div>
                <p className="text-sm text-slate-muted leading-relaxed max-w-[240px]">
                  We isolate your target agency, contract size, ideal NAICS, PSC codes, and agency vehicles.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center flex flex-col items-center group">
                <div className="relative mb-6">
                  <div className="w-[180px] h-[180px] rounded-full border border-white/10 flex items-center justify-center bg-navy-deep group-hover:border-blue-accent/40 duration-300 relative">
                    <span className="absolute font-syne text-7xl font-extrabold text-[#1a2c42] select-none -top-4 -left-2 z-0">
                      02
                    </span>
                    <div className="z-10 text-center px-4">
                      <Search className="w-8 h-8 mx-auto mb-2 text-blue-accent" />
                      <h4 className="font-syne text-xs tracking-wider uppercase font-bold text-white">
                        Mine the Data
                      </h4>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-blue-accent/10 scale-95 duration-500 group-hover:scale-105 pointer-events-none" />
                </div>
                <p className="text-sm text-slate-muted leading-relaxed max-w-[240px]">
                  Our proprietary scripts query USAspending API feeds to analyze historical pricing, upcoming recompetes, and award structures.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center flex flex-col items-center group">
                <div className="relative mb-6">
                  <div className="w-[180px] h-[180px] rounded-full border border-white/10 flex items-center justify-center bg-navy-deep group-hover:border-teal-accent/40 duration-300 relative">
                    <span className="absolute font-syne text-7xl font-extrabold text-[#1a2c42] select-none -top-4 -left-2 z-0">
                      03
                    </span>
                    <div className="z-10 text-center px-4">
                      <Database className="w-8 h-8 mx-auto mb-2 text-teal-accent" />
                      <h4 className="font-syne text-xs tracking-wider uppercase font-bold text-white">
                        Build the List
                      </h4>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-teal-accent/10 scale-95 duration-500 group-hover:scale-105 pointer-events-none" />
                </div>
                <p className="text-sm text-slate-muted leading-relaxed max-w-[240px]">
                  We compile verified emails, phone lines, and corporate profiles for key personnel and Contracting Officers.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center flex flex-col items-center group">
                <div className="relative mb-6">
                  <div className="w-[180px] h-[180px] rounded-full border border-white/10 flex items-center justify-center bg-navy-deep group-hover:border-blue-accent/40 duration-300 relative">
                    <span className="absolute font-syne text-7xl font-extrabold text-[#1a2c42] select-none -top-4 -left-2 z-0">
                      04
                    </span>
                    <div className="z-10 text-center px-4">
                      <Zap className="w-8 h-8 mx-auto mb-2 text-blue-accent" />
                      <h4 className="font-syne text-xs tracking-wider uppercase font-bold text-white">
                        Launch Campaign
                      </h4>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-blue-accent/10 scale-95 duration-500 group-hover:scale-105 pointer-events-none" />
                </div>
                <p className="text-sm text-slate-muted leading-relaxed max-w-[240px]">
                  We deploy hyper-personalized federal bid campaigns. The replies routes directly to you to schedule warm strategy discussions.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* LEAD ESTIMATOR INTERACTIVE HOOK (CRO ADVANCED COMPONENT) */}
      <section id="lead-builder" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-navy-accent p-8 md:p-12 lg:p-16 rounded-3xl border border-white/10 relative z-10 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.6)]">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-accent/10 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Col left: explanations */}
            <div className="lg:col-span-5">
              <span className="text-xs font-mono tracking-widest text-[#00d4aa] font-bold block mb-3 uppercase">
                ⚙️ REAL-TIME LEAD FORECAST
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
                Map Your Federal Lead Pool
              </h2>
              <p className="text-slate-muted text-sm sm:text-base leading-relaxed mb-6">
                Tell us your primary focus sector and target agencies. Our data model will instantaneously estimate the volume of active decision-makers with contract influence.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-muted">
                  <CheckCircle2 className="w-4 h-4 text-teal-accent mt-0.5 flex-shrink-0" />
                  <span>Cross-referenced with verified SAM.gov registries</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-muted">
                  <CheckCircle2 className="w-4 h-4 text-teal-accent mt-0.5 flex-shrink-0" />
                  <span>Real-time spending updates updated weekly</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-muted">
                  <CheckCircle2 className="w-4 h-4 text-teal-accent mt-0.5 flex-shrink-0" />
                  <span>Filters matching subcontracts and prime award hierarchies</span>
                </li>
              </ul>
            </div>

            {/* Col right: Interactive Selector form */}
            <div className="lg:col-span-7 bg-navy-deep p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl">
              <form onSubmit={handleEstimate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-muted tracking-wider uppercase mb-2">
                      Core Bidding Sector
                    </label>
                    <select 
                      value={sector}
                      onChange={(e) => setSector(e.target.value as Sector)}
                      className="w-full bg-navy-accent border border-white/10 rounded px-4 py-3 text-sm focus:border-teal-accent focus:outline-none transition-colors"
                    >
                      <option value="it_cyber">IT & Cybersecurity (NAICS 5415)</option>
                      <option value="construction">Construction & Rehab (NAICS 2362)</option>
                      <option value="professional_services">Professional & Advisory (NAICS 5416)</option>
                      <option value="logistics_supply">Logistics & Supply Chains (NAICS 541614)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-muted tracking-wider uppercase mb-2">
                      Primary Target Department
                    </label>
                    <select
                      value={agency}
                      onChange={(e) => setAgency(e.target.value as AgencyGroup)}
                      className="w-full bg-navy-accent border border-white/10 rounded px-4 py-3 text-sm focus:border-teal-accent focus:outline-none transition-colors"
                    >
                      <option value="dod">Dept. of Defense (DoD)</option>
                      <option value="hhs">Health & Human Services (HHS)</option>
                      <option value="dhs">Dept. of Homeland Security (DHS)</option>
                      <option value="nasa">NASA / Aerospace Control</option>
                      <option value="doe">Dept. of Energy (DOE)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={estimating}
                  className="w-full py-4 rounded text-xs font-syne font-extrabold uppercase tracking-wide bg-gradient-to-r from-teal-accent to-blue-accent text-navy-deep shadow-[0_4px_15px_rgba(0,212,170,0.15)] hover:shadow-[0_4px_25px_rgba(0,212,170,0.35)] hover:-translate-y-0.5 duration-300 disabled:opacity-50"
                >
                  {estimating ? "Analyzing USAspending Registry..." : "Analyse Lead Pool Potential"}
                </button>
              </form>

              {estimating && (
                <div className="mt-8 pt-8 border-t border-white/5 text-center animate-pulse">
                  <div className="w-10 h-10 border-t-2 border-teal-accent border-r-2 border-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-xs font-mono text-slate-muted">Connecting directly to USAspending API queries...</p>
                </div>
              )}

              {estimatedPool && !estimating && (
                <div className="mt-8 pt-8 border-t border-white/10 animate-fadeIn">
                  <h4 className="font-syne text-xs tracking-wider uppercase text-teal-accent font-bold text-center mb-6">
                    🚀 ESTIMATED OPPORTUNITY FOR YOUR PROFILE
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-navy-accent rounded-lg border border-white/5">
                      <div className="text-xl sm:text-2xl font-syne font-extrabold text-white">
                        {estimatedPool.contacts}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-muted font-bold block mt-1">
                        Contracting Leads
                      </div>
                    </div>

                    <div className="p-3 bg-navy-accent rounded-lg border border-white/5">
                      <div className="text-xl sm:text-2xl font-syne font-extrabold text-teal-accent">
                        {estimatedPool.value}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-muted font-bold block mt-1">
                        Active Contracts
                      </div>
                    </div>

                    <div className="p-3 bg-navy-accent rounded-lg border border-white/5">
                      <div className="text-xl sm:text-2xl font-syne font-extrabold text-[#0099ff]">
                        {estimatedPool.subcontractors}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-muted font-bold block mt-1">
                        Historic Primes
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded bg-teal-accent/5 border border-teal-accent/20 text-center">
                    <p className="text-xs text-slate-soft leading-relaxed mb-3">
                      We have compiled <strong>50 free verified lead records</strong> mapping these exact parameters ready to send.
                    </p>
                    <a 
                      href="#lead-capture" 
                      className="text-xs font-extrabold text-teal-accent uppercase tracking-wider inline-flex items-center gap-1.5 hover:text-white duration-200"
                    >
                      Retrieve My Free Lead File Now <ArrowRight className="w-3" />
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* 6. RESULTS / METRICS */}
      <section id="results" className="py-24 relative bg-navy-accent/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0099ff] uppercase font-mono px-3 py-1 rounded bg-blue-accent/10 border border-blue-accent/20">
              Validated Metric Success
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4 mb-4">
              Real Impact in Federal Bidding Cycles
            </h2>
            <p className="text-slate-muted text-base">
              Raw figures and benchmarks backed by rigorous outreach analytics for GovCon specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-navy-accent p-8 rounded-xl border border-white/5 text-center relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/5 rounded-full blur-2xl group-hover:bg-teal-accent/10 transition-colors pointer-events-none" />
              <div className="font-syne text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-teal-accent to-[#0099ff] bg-clip-text text-transparent mb-2">
                3.8×
              </div>
              <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider mb-2">
                Reply Rate Lift
              </h4>
              <p className="text-xs text-slate-muted leading-relaxed">
                Compared directly to organic non-researched cold lists, thanks to deep alignment with USAspending incumbent timelines.
              </p>
            </div>

            <div className="bg-navy-accent p-8 rounded-xl border border-white/5 text-center relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-accent/5 rounded-full blur-2xl group-hover:bg-blue-accent/10 transition-colors pointer-events-none" />
              <div className="font-syne text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-teal-accent to-[#0099ff] bg-clip-text text-transparent mb-2">
                92%
              </div>
              <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider mb-2">
                Deliverability
              </h4>
              <p className="text-xs text-slate-muted leading-relaxed">
                Ongoing SMTP tests and double-clearing of inactive addresses maintain flawless deliverability to .gov and .mil servers.
              </p>
            </div>

            <div className="bg-navy-accent p-8 rounded-xl border border-white/5 text-center relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/5 rounded-full blur-2xl group-hover:bg-teal-accent/10 transition-colors pointer-events-none" />
              <div className="font-syne text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-teal-accent to-[#0099ff] bg-clip-text text-transparent mb-2">
                12k+
              </div>
              <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider mb-2">
                Leads Delivered
              </h4>
              <p className="text-xs text-slate-muted leading-relaxed">
                Meticulously verified email inboxes, direct lines, and award histories logged for top US bidding directories.
              </p>
            </div>

            <div className="bg-navy-accent p-8 rounded-xl border border-white/5 text-center relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-accent/5 rounded-full blur-2xl group-hover:bg-blue-accent/10 transition-colors pointer-events-none" />
              <div className="font-syne text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-teal-accent to-[#0099ff] bg-clip-text text-transparent mb-2">
                48h
              </div>
              <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider mb-2">
                Turnaround
              </h4>
              <p className="text-xs text-slate-muted leading-relaxed">
                Once targeting parameters are set, lists are compiled and double-cleared manually in under 48 hours.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section id="testimonials" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-teal-accent uppercase font-mono px-3 py-1 rounded bg-teal-accent/10 border border-teal-accent/20">
              Success Stories
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4 mb-4">
              Proven Impact in GovCon
            </h2>
            <p className="text-slate-muted text-base">
              Read how fellow contractors use FedData Pro to unlock multi-million dollar opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-navy-accent p-8 rounded-2xl border border-white/5 relative flex flex-col justify-between hover:border-teal-accent/20 duration-300">
              <div>
                <span className="text-5xl font-serif text-teal-accent/10 block mb-2 leading-none">“</span>
                <p className="text-sm italic text-slate-muted leading-relaxed mb-6">
                  "FedData Pro identified three sub-contracting opportunities we completely missed on SAM. Their raw transaction analysis and incumbent tracking are incredibly accurate."
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-accent to-emerald-400 text-navy-deep flex items-center justify-center font-bold text-sm">
                  SJ
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Sarah Jenkins</h4>
                  <p className="text-[11px] text-slate-muted">Director of Growth, TechDefense Inc.</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-navy-accent p-8 rounded-2xl border border-white/5 relative flex flex-col justify-between hover:border-teal-accent/20 duration-300">
              <div>
                <span className="text-5xl font-serif text-teal-accent/10 block mb-2 leading-none">“</span>
                <p className="text-sm italic text-slate-muted leading-relaxed mb-6">
                  "The outbound email sequences delivered a 4.2% booked meeting rate with NIH program directors. Best single ROI we've logged on business development this year."
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0099ff] to-sky-350 text-white flex items-center justify-center font-bold text-sm">
                  MR
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Marcus Rodriguez</h4>
                  <p className="text-[11px] text-slate-muted">CEO, GovConsult Partners</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-navy-accent p-8 rounded-2xl border border-white/5 relative flex flex-col justify-between hover:border-teal-accent/20 duration-300">
              <div>
                <span className="text-5xl font-serif text-teal-accent/10 block mb-2 leading-none">“</span>
                <p className="text-sm italic text-slate-muted leading-relaxed mb-6">
                  "They understand federal spend mechanics better than our senior internal researchers. An essential competitive advantage asset for bidding small businesses."
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#0099ff] text-[#0a1628] flex items-center justify-center font-bold text-sm">
                  DL
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">David Lee</h4>
                  <p className="text-[11px] text-slate-muted">Founder, ClearPath Solutions Group</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section id="pricing" className="py-24 bg-navy-accent/45 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0099ff] uppercase font-mono px-3 py-1 rounded bg-blue-accent/10 border border-blue-accent/20">
              Bespoke Investment plans
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4 mb-4">
              Transparent, Value-Backed Pricing
            </h2>
            <p className="text-slate-muted text-base mb-10">
              Select standard recurring monthly list deliveries or a single custom project engagement configuration.
            </p>

            {/* Custom Interactive Toggle Button */}
            <div className="inline-flex items-center gap-3 p-1.5 bg-navy-deep rounded-full border border-white/10 shadow-inner select-none">
              <button 
                onClick={() => setPricingPeriod("monthly")}
                className={`px-4 py-2 rounded-full text-xs font-bold font-syne uppercase tracking-wider transition-colors duration-200 ${pricingPeriod === "monthly" ? "bg-teal-accent text-navy-deep font-extrabold" : "text-slate-muted hover:text-white"}`}
              >
                Monthly Plans
              </button>
              <button 
                onClick={() => setPricingPeriod("onetime")}
                className={`px-4 py-2 rounded-full text-xs font-bold font-syne uppercase tracking-wider transition-colors duration-200 ${pricingPeriod === "onetime" ? "bg-teal-accent text-navy-deep font-extrabold" : "text-slate-muted hover:text-white"}`}
              >
                One-Time Project
              </button>
            </div>
          </div>

          {/* Pricing tiers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1 */}
            <div className="bg-navy-deep p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/15 duration-200 group">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-slate-muted uppercase">
                  STARTER
                </span>
                <div className="mt-4 mb-6">
                  <span className="font-syne text-5xl font-extrabold text-white">
                    {pricingPeriod === "monthly" ? "$1,499" : "$2,450"}
                  </span>
                  <span className="text-xs text-slate-muted ml-1">
                    {pricingPeriod === "monthly" ? "/month" : "/engagement"}
                  </span>
                </div>
                <p className="text-xs text-slate-muted leading-relaxed mb-6">
                  Ideal for companies testing federal lead responses first or tracking short-term niche opportunities.
                </p>
                <hr className="border-white/10 my-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-muted">
                    <Check className="w-4 h-4 text-teal-accent flex-shrink-0" />
                    <span>1 Target Agency Profile</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-muted">
                    <Check className="w-4 h-4 text-teal-accent flex-shrink-0" />
                    <span>250 Verified CO Contacts / mo</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-muted">
                    <Check className="w-4 h-4 text-teal-accent flex-shrink-0" />
                    <span>Basic USAspending Audit</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-muted">
                    <Check className="w-4 h-4 text-teal-accent flex-shrink-0" />
                    <span>Compliant Outbound Templates</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4">
                <button 
                  onClick={() => setBookingOpen(true)}
                  className="w-full py-3 rounded text-xs font-syne font-extrabold uppercase tracking-wide border border-white/10 hover:border-white/30 text-white hover:bg-white/5 duration-200"
                >
                  Configure Starter Selection
                </button>
              </div>
            </div>

            {/* Tier 2 (Most Popular / Glow container) */}
            <div className="bg-gradient-to-br from-[#0f2a4a] to-[#0a1628] p-8 rounded-2xl border-2 border-teal-accent flex flex-col justify-between relative shadow-[0_0_40px_rgba(0,212,170,0.15)] transform lg:scale-105 duration-200 group">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-teal-accent text-navy-deep font-sans text-[10px] font-extrabold tracking-widest uppercase">
                ★ MOST POPULAR
              </span>
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-teal-accent uppercase block mt-2">
                  GROWTH ENGAGEMENT
                </span>
                <div className="mt-4 mb-6">
                  <span className="font-syne text-5xl font-extrabold text-white">
                    {pricingPeriod === "monthly" ? "$3,499" : "$5,900"}
                  </span>
                  <span className="text-xs text-slate-muted ml-1">
                    {pricingPeriod === "monthly" ? "/month" : "/engagement"}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-6 font-medium">
                  Perfect for established federal contractors seeking steady pipeline opportunities and full managed cold campaign deployments.
                </p>
                <hr className="border-white/10 my-6" />
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-teal-accent flex-shrink-0" />
                    <span>5 Target Agency Profiles</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-teal-accent flex-shrink-0" />
                    <span>1,000 Verified Leads / mo</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-teal-accent flex-shrink-0" />
                    <span>Full Managed Cold Campaigns</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-teal-accent flex-shrink-0" />
                    <span>Incumbent Timelines & Analytics</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-teal-accent flex-shrink-0" />
                    <span>Priority Support Response</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4">
                <button 
                  onClick={() => setBookingOpen(true)}
                  className="w-full py-4.5 rounded text-xs font-syne font-extrabold uppercase tracking-widest bg-teal-accent text-navy-deep hover:bg-white hover:text-navy-deep duration-200 shadow-[0_4px_15px_rgba(0,212,170,0.3)]"
                >
                  Configure Growth Plan
                </button>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-navy-deep p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/15 duration-200 group">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#0099ff] uppercase">
                  ENTERPRISE CUSTOM
                </span>
                <div className="mt-4 mb-6">
                  <span className="font-syne text-5xl font-extrabold text-white">
                    Custom
                  </span>
                  <span className="text-xs text-slate-muted ml-1">
                    /tailored
                  </span>
                </div>
                <p className="text-xs text-slate-muted leading-relaxed mb-6">
                  For top GovCon players requiring specialized sub-contractor mapping, high-volume lists, or custom API integration parameters.
                </p>
                <hr className="border-white/10 my-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-muted">
                    <Check className="w-4 h-4 text-[#0099ff] flex-shrink-0" />
                    <span>Unlimited Agency Spending Profiles</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-muted">
                    <Check className="w-4 h-4 text-[#0099ff] flex-shrink-0" />
                    <span>Bespoke Lead Quantities & Scrubbing</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-muted">
                    <Check className="w-4 h-4 text-[#0099ff] flex-shrink-0" />
                    <span>Custom Rest Data Integrations</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-muted">
                    <Check className="w-4 h-4 text-[#0099ff] flex-shrink-0" />
                    <span>Dedicated Research Analyst Liaison</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-muted">
                    <Check className="w-4 h-4 text-[#0099ff] flex-shrink-0" />
                    <span>Weekly Strategic Alignment Briefs</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4">
                <button 
                  onClick={() => setBookingOpen(true)}
                  className="w-full py-3 rounded text-xs font-syne font-extrabold uppercase tracking-wide border border-white/10 hover:border-white/30 text-white hover:bg-white/5 duration-200"
                >
                  Contact Our Analysts
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-teal-accent uppercase font-mono px-3 py-1 rounded bg-teal-accent/10 border border-teal-accent/20">
              Information Desks
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4 mb-4">
              Frequently Queried Topics
            </h2>
            <p className="text-slate-muted text-base">
              Learn how we securely extract, evaluate, and capitalize on federal transaction flows.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* FAQ 1 */}
            <div className="bg-navy-accent rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleFaq(0)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-syne text-sm sm:text-base font-extrabold text-white hover:text-teal-accent duration-250 select-none"
              >
                <span>What is USAspending.gov?</span>
                <span className={`text-teal-accent transform transition-transform duration-300 ${openFaq.includes(0) ? "rotate-45" : "rotate-0"}`}>
                  <X size={16} />
                </span>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openFaq.includes(0) ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}>
                <div className="px-6 py-5 text-sm leading-relaxed text-slate-muted bg-navy-deep/40">
                  USAspending.gov is the official marketplace record tracking overall federal spending. It holds raw logs for contract awards, grants, sub-awards, and allocation transactions. We build customized search scripts that sort through these gigabytes of unstructured database records to find pattern variations normal players miss entirely.
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-navy-accent rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleFaq(1)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-syne text-sm sm:text-base font-extrabold text-white hover:text-teal-accent duration-250 select-none"
              >
                <span>How are leads verified?</span>
                <span className={`text-teal-accent transform transition-transform duration-300 ${openFaq.includes(1) ? "rotate-45" : "rotate-0"}`}>
                  <X size={16} />
                </span>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openFaq.includes(1) ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}>
                <div className="px-6 py-5 text-sm leading-relaxed text-slate-muted bg-navy-deep/40">
                  We use three steps: First, cross-checking government department directories. Second, performing live SMTP handshakes directly with the mail exchange servers to make sure the inboxes are currently active. Third, referencing social profiles and SAM registries to make sure the individual is still in their correct active contracting role.
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-navy-accent rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleFaq(2)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-syne text-sm sm:text-base font-extrabold text-white hover:text-teal-accent duration-250 select-none"
              >
                <span>What contracting sectors benefit the most?</span>
                <span className={`text-teal-accent transform transition-transform duration-300 ${openFaq.includes(2) ? "rotate-45" : "rotate-0"}`}>
                  <X size={16} />
                </span>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openFaq.includes(2) ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}>
                <div className="px-6 py-5 text-sm leading-relaxed text-slate-muted bg-navy-deep/40">
                  We see high performance in enterprise IT, Cybersecurity setups, Civil & Defense Construction, Logistics tracking, and Scientific Research/Consulting. Essentially, any sector with complex contracts, recompetes over $1M, or active sub-contractual biddings will benefit immensely.
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-navy-accent rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleFaq(3)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-syne text-sm sm:text-base font-extrabold text-white hover:text-teal-accent duration-250 select-none"
              >
                <span>How fast is turnaround?</span>
                <span className={`text-teal-accent transform transition-transform duration-300 ${openFaq.includes(3) ? "rotate-45" : "rotate-0"}`}>
                  <X size={16} />
                </span>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openFaq.includes(3) ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}>
                <div className="px-6 py-5 text-sm leading-relaxed text-slate-muted bg-navy-deep/40">
                  Most custom lead list extractions and tactical agency audits are finalized and sent in under 48 business hours. Fully managed multi-tier outbound campaign configurations usually take 5 to 7 business days to launch due to safety domain preparation cycles.
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-navy-accent rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleFaq(4)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-syne text-sm sm:text-base font-extrabold text-white hover:text-teal-accent duration-250 select-none"
              >
                <span>Do you offer custom research queries?</span>
                <span className={`text-teal-accent transform transition-transform duration-300 ${openFaq.includes(4) ? "rotate-45" : "rotate-0"}`}>
                  <X size={16} />
                </span>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openFaq.includes(4) ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}>
                <div className="px-6 py-5 text-sm leading-relaxed text-slate-muted bg-navy-deep/40">
                  Absolutely. If you need bespoke competitive analysis on a specific incumbent prime contractor, or want to visually break down historical sub-contract files for specific task orders within DoD or HHS, our team can compile customized data dashboards on-demand.
                </div>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-navy-accent rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleFaq(5)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-syne text-sm sm:text-base font-extrabold text-white hover:text-teal-accent duration-250 select-none"
              >
                <span>How does your managed cold outreach work?</span>
                <span className={`text-teal-accent transform transition-transform duration-300 ${openFaq.includes(5) ? "rotate-45" : "rotate-0"}`}>
                  <X size={16} />
                </span>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openFaq.includes(5) ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}>
                <div className="px-6 py-5 text-sm leading-relaxed text-slate-muted bg-navy-deep/40">
                  We handle the entire process: cold domain preparation, safety SPF/DKIM technical settings, high-converting copy layouts, and inbox monitoring. Once a target contact replies with interest to schedule a contracting or capability briefing discussion, we route the lead directly to you to finalize!
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. EMAIL CAPTURE / LEAD MAGNET CTA */}
      <section id="lead-capture" className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-tr from-navy-accent to-[#162a44] p-10 md:p-14 rounded-3xl border border-white/10 text-center relative shadow-2xl">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-accent/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-mono font-bold tracking-widest text-teal-accent uppercase block mb-4">
              🎁 EXCLUSIVE FREE SAMPLE REGISTRY
            </span>
            
            <h2 className="font-syne text-3xl sm:text-4.5xl font-extrabold text-white tracking-tight leading-none mb-5">
              Get 50 Free Federal Leads
            </h2>
            <p className="text-slate-muted text-sm sm:text-base max-w-2xl mx-auto mb-8">
              No credit card required. Provide your professional workspace email, and our scripts will deliver a sample file containing 50 triple-verified target decision-makers corresponding to your niche.
            </p>

            {leadSubmitted ? (
              <div className="p-6 bg-teal-accent/10 border border-teal-accent/40 rounded-xl max-w-xl mx-auto animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-teal-accent mx-auto mb-3" />
                <h3 className="font-syne text-lg font-bold text-white mb-2">Check Your Workspace Inbox</h3>
                <p className="text-xs text-slate-muted">
                  We have queued the custom USAspending extraction for <strong>{leadEmail}</strong>. You will receive your download payload in less than 5 minutes!
                </p>
                <button 
                  onClick={() => setBookingOpen(true)}
                  className="mt-4 px-4 py-2 text-xs font-bold font-syne uppercase tracking-wider bg-teal-accent text-navy-deep rounded"
                >
                  Book Priority Strategy Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-muted w-4 h-4" />
                  <input 
                    type="email" 
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="Enter your work email address Only" 
                    className="w-full bg-navy-deep border border-white/10 rounded pl-11 pr-4 py-4 text-sm text-white focus:border-teal-accent focus:outline-none transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={leadSubmitting}
                  className="px-8 py-4 bg-teal-accent text-navy-deep font-syne font-extrabold uppercase text-xs tracking-wider rounded hover:bg-white hover:text-navy-deep duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {leadSubmitting ? "Running Scraping Query..." : <>Send My Sample <Send className="w-3.5 h-3.5" /></>}
                </button>
              </form>
            )}

            <p className="text-[10px] text-slate-muted tracking-wide mt-6 font-mono">
              ⚡ Securely processed • Used by 200+ GovCon firms • No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-navy-deep border-t border-white/10 pt-20 pb-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 mb-12 border-b border-white/5">
            
            {/* Col 1: Bio */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-accent to-[#0099ff] flex items-center justify-center font-syne font-extrabold text-[#0a1628] text-sm">
                  FD
                </div>
                <span className="font-syne text-lg font-extrabold tracking-tight text-white uppercase">
                  FEDDATA <span className="text-teal-accent">PRO</span>
                </span>
              </div>
              <p className="text-xs text-slate-muted leading-relaxed">
                Expert USAspending.gov analytics, precision lead lists, and certified GovCon cold outreach. We turn federal transaction records into an unfair competitive bidding advantage.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="p-2 rounded bg-white/5 hover:bg-white/10 hover:text-teal-accent transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded bg-white/5 hover:bg-white/10 hover:text-teal-accent transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="mailto:analysts@feddatapro.com" className="p-2 rounded bg-white/5 hover:bg-white/10 hover:text-teal-accent transition-all">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h4 className="font-syne text-xs font-bold uppercase tracking-widest text-white mb-6">
                Capabilities
              </h4>
              <ul className="space-y-3 text-xs">
                <li>
                  <a href="#services" className="text-slate-muted hover:text-teal-accent transition-colors">
                    USAspending.gov Data Mining
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-slate-muted hover:text-teal-accent transition-colors">
                    Targeted Lead Generation
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-slate-muted hover:text-teal-accent transition-colors">
                    Email Marketing Campaigns
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-slate-muted hover:text-teal-accent transition-colors">
                    Agency & Awardee Profiling
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-slate-muted hover:text-teal-accent transition-colors">
                    Opportunity Monitoring Alerts
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div>
              <h4 className="font-syne text-xs font-bold uppercase tracking-widest text-white mb-6">
                Strategic Assets
              </h4>
              <ul className="space-y-3 text-xs">
                <li>
                  <a href="#process" className="text-slate-muted hover:text-teal-accent transition-colors">
                    Our Core Engine Process
                  </a>
                </li>
                <li>
                  <a href="#results" className="text-slate-muted hover:text-teal-accent transition-colors">
                    Contractor Benchmarks
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-slate-muted hover:text-teal-accent transition-colors">
                    Transparent Investment plans
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-slate-muted hover:text-teal-accent transition-colors">
                    Frequently Answered FAQ
                  </a>
                </li>
                <li>
                  <span onClick={() => setBookingOpen(true)} className="text-slate-muted hover:text-teal-accent transition-colors cursor-pointer block">
                    Schedule Analyst Call
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 4: Reach Info */}
            <div className="space-y-4">
              <h4 className="font-syne text-xs font-bold uppercase tracking-widest text-white mb-6">
                Specialist Desk
              </h4>
              <div className="p-4 rounded-xl bg-navy-accent/50 border border-white/5 space-y-3">
                <div className="flex items-center gap-3 text-xs text-white">
                  <PhoneCall className="w-4 h-4 text-teal-accent flex-shrink-0" />
                  <span>+1 (202) 555-0184</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white">
                  <Mail className="w-4 h-4 text-teal-accent flex-shrink-0" />
                  <span>analysts@feddatapro.com</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white">
                  <Globe className="w-4 h-4 text-teal-accent flex-shrink-0" />
                  <span>HQ: Washington, D.C.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Core Legal Disclaimers (MANDATORY in USAspending alignments) */}
          <div className="text-center space-y-4 pt-4">
            <p className="text-[10px] text-slate-muted max-w-4xl mx-auto leading-relaxed uppercase tracking-wider">
              FedData Pro is an independent commercial intelligence consultancy, operated by private data scientists.
            </p>
            <p className="text-[9px] text-[#8e9cae] max-w-3xl mx-auto leading-relaxed">
              DISCLAIMER: We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with USAspending.gov, SAM.gov, the United States Government, or any federal agency, department, commission, or statutory body there-of. All government logos, trademarks, and transaction names are property of their respective holders. Use of them does not imply any affiliation with or endorsement by them.
            </p>
            <p className="text-[10px] text-slate-muted pt-4">
              &copy; {new Date().getFullYear()} FedData Pro. All Rights and Data Queries Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE BOOKING CALENDAR DIALOG (CRO MODAL ADVANCED HOOK) */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-navy-accent w-full max-w-lg p-8 rounded-3xl border border-white/15 shadow-2xl relative">
            <button 
              onClick={() => setBookingOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-muted hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <Calendar className="w-10 h-10 text-teal-accent mx-auto mb-3" />
              <h3 className="font-syne text-xl font-extrabold text-white">
                Book a Free Discovery Call
              </h3>
              <p className="text-xs text-slate-muted mt-1.5">
                Lock in your 1-on-1 analysis review with our leading database experts.
              </p>
            </div>

            {bookingSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-teal-accent mx-auto" />
                <p className="text-sm text-white">Your session has been securely cataloged!</p>
                <p className="text-xs text-slate-muted">
                  Check your calendar invitation at the requested professional inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-muted tracking-wider mb-2">
                    Professional Full Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Director of Contracts"
                    className="w-full bg-navy-deep border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-teal-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-muted tracking-wider mb-2">
                    Preferred Call Date
                  </label>
                  <input 
                    type="date" 
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-navy-deep border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-teal-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-muted tracking-wider mb-2">
                    Preferred Time (Your Timezone)
                  </label>
                  <input 
                    type="time" 
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-navy-deep border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-teal-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-muted tracking-wider mb-2">
                    Brief Specialty Focus
                  </label>
                  <textarea 
                    placeholder="Tell us about your NAICS tags, bidding vehicle specs, or primary target departments..." 
                    className="w-full bg-navy-deep border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-teal-accent focus:outline-none h-20 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded text-xs font-syne font-extrabold uppercase tracking-widest bg-teal-accent text-navy-deep hover:bg-white hover:text-navy-deep duration-200"
                >
                  Verify & Secure Calendar Block
                </button>
              </form>
            )}

            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono text-slate-muted">
                🔒 HIPAA Compliant • Direct Analyst Access • No Sale Pitch Guarantee
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
