import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MapPin, Award, BookOpen, Compass, Tv, Calendar, Heart, ShieldAlert, Sparkles, Share2, ArrowUpRight, Radio } from 'lucide-react'
import Lenis from 'lenis'
import sheikImg from '../assets/sheik.webp'
import teluguLogo from '../assets/BIGTV-TELUGU-LOGO-NEW-1.png'
import { LightLines } from '../Components/LightLines.jsx'
import { TypingKeyboard } from '../Components/TypingKeyboard.jsx'
import { ScrollDissolveReveal } from '../Components/ScrollDissolveReveal.jsx'
import { CylinderCarousel } from '../Components/CylinderCarousel.jsx'

// Dynamic Font Injector for a stunning editorial serif font
const useGoogleFont = (fontFamily) => {
  useEffect(() => {
    const linkId = 'google-font-' + fontFamily.toLowerCase().replace(/\s+/g, '-');
    if (document.getElementById(linkId)) return;

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap`;
    document.head.appendChild(link);
  }, [fontFamily]);
};

// 3D Tilt Card Component
function TiltCard({ children, className, index = 0 }) {
  const cardRef = useRef(null);
  const defaultX = index % 2 === 0 ? 3 : -3;
  const defaultY = index % 2 === 0 ? -4 : 4;

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = `perspective(1000px) rotateX(${defaultX}deg) rotateY(${defaultY}deg) scale3d(1, 1, 1)`;
    }
  }, [defaultX, defaultY]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(${defaultX}deg) rotateY(${defaultY}deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-out ${className || ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

// Interactive Card component with dynamic radial glow that tracks mouse cursor
function BroadcasterFileCard({ item, className }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const IconComponent = item.icon || FileText;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-8 shadow-2xl transition-all duration-500 ease-out hover:border-[#c5a880]/30 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] group select-none ${className || ''}`}
    >
      {/* Spotlight Radial Background Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(197, 168, 128, 0.07), transparent 80%)`,
        }}
      />
      
      {/* Accent corner light */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a880]/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <span className="px-3 py-1 rounded bg-[#c5a880]/10 text-[#c5a880] text-[9px] font-mono font-bold uppercase tracking-wider">
          {item.tag}
        </span>
        <span className="font-mono text-[10px] text-neutral-500">{item.date}</span>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#c5a880] group-hover:text-white transition-colors duration-300">
              <IconComponent className="w-4 h-4" />
            </div>
            <h4 className="font-sans font-extrabold text-base md:text-lg tracking-tight uppercase text-white leading-tight group-hover:text-[#c5a880] transition-colors duration-300">
              {item.title}
            </h4>
          </div>
          
          <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed font-light mb-6">
            {item.desc}
          </p>

          {item.highlights && (
            <ul className="flex flex-col gap-2 mb-6">
              {item.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer info & Link */}
        <div className="flex justify-between items-center border-t border-neutral-900/60 pt-4 mt-auto">
          <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest group-hover:text-neutral-500 transition-colors">
            CODE ID: {item.code}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono text-[#c5a880] tracking-wider uppercase group-hover:translate-x-1.5 transition-transform duration-300">
            SECURE ACCESS <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sheik() {
  useGoogleFont('Playfair Display');
  useGoogleFont('Outfit');

  const [isExiting, setIsExiting] = useState(false);
  const [isTransitioningIn, setIsTransitioningIn] = useState(true);

  // Initialize Lenis for Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // End transition-in overlay after 1 second
    const timer = setTimeout(() => {
      setIsTransitioningIn(false);
    }, 1000);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      window.location.hash = '#/';
    }, 850); // wait for exit wipe animation
  };

  // Stagger transition panel variants
  const panelVariants = {
    initial: { x: '-100%' },
    enter: (i) => ({
      x: '100%',
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.76, 0, 0.24, 1]
      }
    }),
    exit: (i) => ({
      x: '0%',
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.76, 0, 0.24, 1]
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white selection:bg-[#c5a880] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* 1. Staggered Vertical Curtains for Entry/Exit Transitions */}
      <AnimatePresence mode="wait">
        {(isTransitioningIn || isExiting) && (
          <div className="fixed inset-0 z-[999] pointer-events-none flex">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                custom={index}
                variants={panelVariants}
                initial={isExiting ? "initial" : "initial"}
                animate={isExiting ? "exit" : "enter"}
                className="h-full flex-1"
                style={{
                  backgroundColor: index === 0 ? '#121212' 
                                 : index === 1 ? '#c5a880' 
                                 : index === 2 ? '#ebdcb9' 
                                 : '#060606'
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating Header & Back Portal Button */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-transparent pointer-events-none"
      >
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 md:border-white/10 bg-white/70 md:bg-black/40 backdrop-blur-md text-xs font-mono tracking-widest text-neutral-800 md:text-neutral-300 hover:text-black md:hover:text-[#c5a880] hover:border-black/30 md:hover:border-[#c5a880]/30 transition-all duration-300 group cursor-pointer pointer-events-auto shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1.5 transition-transform" />
          BACK TO NEWSROOM
        </button>
      </motion.header>

      {/* Hero Section: Madison-Inspired Cream / Beige Layout — viewport-fit on all screens */}
      <section className="relative w-full h-screen max-h-screen bg-gradient-to-br from-[#f3ead3] via-[#FAF6EE] to-[#e4d3ac] flex flex-col overflow-hidden select-none">
        
        {/* Soft Noise Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1a1205_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] pointer-events-none" />

        {/* Large Cinematic Background Text — hidden on very small screens to avoid overflow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 0.12, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] sm:text-[15vw] md:text-[13vw] tracking-tighter text-[#1a1308] leading-none text-center select-none font-light whitespace-nowrap"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
          >
            Hey, there
          </motion.div>
        </div>

        {/* ──── MOBILE LAYOUT (< md) ──── */}
        <div className="md:hidden relative z-10 flex flex-col h-full overflow-hidden">

          {/* Portrait fills upper 65% */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, type: 'spring', stiffness: 70 }}
            className="relative w-full flex-shrink-0"
            style={{ height: '62%' }}
          >
            {/* Badge over portrait */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#ebdcb9] backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-amber-900">Coordinating Editor</span>
            </motion.div>
            <img
              src={sheikImg}
              alt="Shaik Sartaj"
              className="w-full h-full object-cover object-top filter contrast-[1.02]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.6) 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.6) 80%, transparent 100%)'
              }}
            />
          </motion.div>

          {/* Name + Role row */}
          <div className="flex items-end justify-between flex-1 px-4 pt-2 pb-2 min-h-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col"
            >
              <span className="font-mono text-[7px] tracking-[0.25em] text-[#6b5f48] uppercase font-bold mb-0.5">BIG TV NEWS</span>
              <h1 className="font-sans font-black text-[11vw] tracking-tight text-[#1a1205] leading-[0.85] uppercase">
                I AM<br />SARTAJ
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-col items-end text-right pb-1"
            >
              <h2 className="font-sans font-black text-[5.5vw] text-[#1a1205] leading-[0.9] uppercase tracking-tighter">
                COORDINATING<br />EDITOR
              </h2>
            </motion.div>
          </div>

          {/* Location bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-between border-t border-[#ebdcb9]/50 px-4 py-2 mx-0 shrink-0"
          >
            <div className="flex items-center gap-1.5 font-mono text-[8px] text-[#5c5039] uppercase font-bold">
              <MapPin className="w-3 h-3 text-amber-800" />
              Hyderabad, AP &amp; Telangana
            </div>
            <p className="font-sans text-[9px] text-[#6b5f48] font-light">Ethical · Bold</p>
          </motion.div>
        </div>

        {/* ──── TABLET (sm-md) LAYOUT ──── */}
        <div className="hidden md:flex lg:hidden relative z-10 flex-col h-full pt-20 pb-6 px-8">
          <div className="flex justify-between items-start w-full mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#ebdcb9] backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-amber-900">Coordinating Editor</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-right"
            >
              <p className="font-mono text-[9px] uppercase tracking-wider text-[#4a3f29] font-bold">Specialization</p>
              <p className="font-sans text-[11px] text-[#6b5f48]">Public Issues &amp; Governance</p>
            </motion.div>
          </div>

          <div className="flex flex-row items-end flex-1 gap-4 min-h-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-col justify-end pb-4 shrink-0">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#6b5f48] uppercase font-bold mb-1">BIG TV NEWS</span>
              <h1 className="font-sans font-black text-7xl tracking-tight text-[#1a1205] leading-[0.85] uppercase">I AM<br />SARTAJ</h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.0, delay: 0.2, type: 'spring', stiffness: 70 }} className="flex-1 flex justify-center items-end">
              <img src={sheikImg} alt="Shaik Sartaj" className="h-[55vh] max-h-[400px] w-auto object-cover object-top drop-shadow-2xl"
                style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)' }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col justify-end items-end text-right pb-4 shrink-0 max-w-[180px]">
              <p className="font-sans text-sm text-[#4a3f29] font-light leading-relaxed mb-4">Holding power accountable through ethical journalism.</p>
              <h2 className="font-sans font-black text-3xl text-[#1a1205] leading-none uppercase tracking-tighter">COORDINATING<br />EDITOR</h2>
            </motion.div>
          </div>

          <div className="flex justify-between items-center border-t border-[#ebdcb9]/40 pt-4 mt-2">
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#5c5039] uppercase font-bold">
              <MapPin className="w-3.5 h-3.5 text-amber-800" />
              Based in Hyderabad, AP &amp; Telangana
            </div>
          </div>
        </div>

        {/* ──── DESKTOP (≥ lg) LAYOUT ──── */}
        <div className="hidden lg:flex relative z-10 flex-col h-full pt-24 pb-8 px-[5vw] max-w-[1400px] mx-auto w-full">
          {/* Top row */}
          <div className="flex justify-between items-start w-full mb-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#ebdcb9] backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-amber-900">Coordinating Editor</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-right max-w-[210px]">
              <p className="font-mono text-[9px] uppercase tracking-wider text-[#4a3f29] font-bold">Specialization</p>
              <p className="font-sans text-[11px] text-[#6b5f48] leading-relaxed mt-1">Public Issues, Governance &amp; Sustainability</p>
            </motion.div>
          </div>

          {/* Centre row */}
          <div className="flex flex-row items-end flex-1 gap-6 min-h-0 mt-4">
            {/* Left name */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-col justify-end pb-6 shrink-0">
              <span className="font-mono text-xs tracking-[0.3em] text-[#6b5f48] uppercase font-bold mb-2">BIG TV NEWS PORTAL</span>
              <h1 className="font-sans font-black text-[8.5vw] tracking-tight text-[#1a1205] leading-[0.82] uppercase">I AM<br />SARTAJ</h1>
            </motion.div>
            {/* Portrait */}
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, type: 'spring', stiffness: 60 }} className="flex-1 flex justify-center items-end">
              <img src={sheikImg} alt="Shaik Sartaj"
                className="h-[65vh] max-h-[520px] w-auto object-cover object-top filter contrast-[1.02] drop-shadow-2xl"
                style={{ maskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.85) 80%, transparent 98%)', WebkitMaskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.85) 80%, transparent 98%)' }} />
            </motion.div>
            {/* Right role */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col justify-end items-end text-right pb-6 shrink-0 max-w-[280px]">
              <p className="font-sans text-base text-[#4a3f29] font-light leading-relaxed mb-6">Holding power accountable in Andhra Pradesh and Telangana through ethical, fact-driven journalism.</p>
              <div className="h-px w-16 bg-[#c5a880] mb-5" />
              <h2 className="font-sans font-black text-4xl text-[#1a1205] leading-none uppercase tracking-tighter">COORDINATING<br />EDITOR</h2>
            </motion.div>
          </div>

          {/* Bottom location bar */}
          <div className="flex justify-between items-center border-t border-[#ebdcb9]/40 pt-5 mt-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-1.5 font-mono text-[10px] text-[#5c5039] uppercase font-bold">
              <MapPin className="w-3.5 h-3.5 text-amber-800" />
              Based in Hyderabad, AP &amp; Telangana
            </motion.div>
            <p className="font-sans text-sm text-[#6b5f48] font-light">Ethical · Fact-Driven · Bold</p>
          </div>
        </div>

      </section>

      {/* Divider Transition into Sleek Dark/Gold Section */}
      <div className="w-full h-24 bg-gradient-to-b from-[#e4d3ac] to-[#060606] relative pointer-events-none" />

      {/* Career Sections utilizing ScrollDissolveReveal */}
      <section className="relative w-full bg-[#060606] py-16">
        
        <LightLines 
          gradientFrom="#060606" 
          gradientTo="#0b0b0b" 
          lightColor="#c5a880"
          lineColor="rgba(197, 168, 128, 0.04)"
          linesOpacity={0.15}
          lightsOpacity={0.4}
        />

        <ScrollDissolveReveal
          containerClassName="max-w-5xl mx-auto px-6"
          childrenFront={
            <TiltCard index={0} className="bg-neutral-950/80 border border-neutral-900 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden cursor-pointer hover:border-[#c5a880]/30 transition-all duration-500">
              <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                {/* Gold Glow Ambient */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#c5a880]/10 flex items-center justify-center text-[#c5a880]">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#c5a880] uppercase font-bold">
                    EDITORIAL PHILOSOPHY // ETHICAL JOURNALISM
                  </span>
                </div>

                <h3 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight uppercase">
                  Holding Power Accountable Through <span className="text-[#c5a880]">Fact-Driven Coverage</span>
                </h3>

                <p className="font-sans text-neutral-400 text-sm md:text-base leading-relaxed mb-8 font-light">
                  I focus on public issues, governance challenges, and holding power accountable in Andhra Pradesh and Telangana through ethical, fact-driven journalism. Based in Hyderabad, I bring bold, credible storytelling to every broadcast, anchoring regional dialogue to truth and clarity.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-[10px] uppercase tracking-wider text-neutral-400 pt-6 border-t border-white/5">
                  <div>
                    <span className="text-[#c5a880] block mb-1">Position</span>
                    <span className="text-white font-bold">Coordinating Editor</span>
                  </div>
                  <div>
                    <span className="text-[#c5a880] block mb-1">Region</span>
                    <span className="text-white font-bold">AP & Telangana</span>
                  </div>
                  <div>
                    <span className="text-[#c5a880] block mb-1">Status</span>
                    <span className="text-white font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> VETTED DOCUMENT
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          }
          childrenBack={
            <TiltCard index={1} className="bg-neutral-950/80 border border-neutral-900 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden cursor-pointer hover:border-[#c5a880]/30 transition-all duration-500">
              <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                {/* Gold Glow Ambient */}
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#c5a880]/10 flex items-center justify-center text-[#c5a880]">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#c5a880] uppercase font-bold">
                    VOCAL ADVOCACY // SOCIAL & NATURAL CAUSES
                  </span>
                </div>

                <h3 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight uppercase">
                  Amplifying Environmental Integrity & <span className="text-[#c5a880]">Animal Welfare</span>
                </h3>

                <p className="font-sans text-neutral-400 text-sm md:text-base leading-relaxed mb-8 font-light">
                  Beyond the editor's desk, I champion animal welfare, nature conservation, sustainability, and the needs of the underprivileged by amplifying their voices. Storytelling must transcend political news to protect the voiceless and secure ecological balance.
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {['Animal Welfare', 'Nature Conservation', 'Sustainability Campaigns', 'Underprivileged Voice Advocacy'].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full border border-white/5 bg-neutral-900/50 text-[11px] font-mono text-[#c5a880] tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          }
        />
      </section>

      {/* Interactive Typing Keyboard Spotlight */}
      <section className="py-12 md:py-16 relative z-10 bg-[#0b0b0b] border-y border-white/5 overflow-hidden">
        <div className="w-full max-w-container-max mx-auto px-4 md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Typing Keyboard — hidden on mobile, scaled on tablet */}
          <div className="hidden md:flex w-full md:w-1/2 h-[50vh] items-center justify-center relative overflow-hidden">
            <div className="w-full flex items-center justify-center"
              style={{ transform: 'scale(0.62)', transformOrigin: 'center center' }}
            >
              <div className="w-[700px] h-[420px] flex items-center justify-center">
                <TypingKeyboard 
                  autoTypeText="Coordinating Editor Shaik Sartaj. Broadcasting bold, credible storytelling... "
                  scale={0.85}
                  accentColor="#c5a880"
                  secondaryAccent="#ebdcb9"
                />
              </div>
            </div>
          </div>

          {/* Mobile: Gold icon visual instead of keyboard */}
          <div className="md:hidden w-full flex items-center justify-center py-4">
            <div className="relative flex items-center justify-center w-28 h-28 rounded-3xl bg-[#c5a880]/10 border border-[#c5a880]/20">
              <Radio className="w-12 h-12 text-[#c5a880] opacity-80" />
              <div className="absolute inset-0 rounded-3xl bg-[#c5a880]/5 animate-ping" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          {/* Core Vision Description */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-0 text-center md:text-left">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#c5a880] uppercase font-bold block mb-3">
              BROADCAST SYNCHRONY // VISION
            </span>
            <h3 className="font-sans text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-4 md:mb-6">
              Impactful storytelling on every frequency.
            </h3>
            <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-5 md:mb-6 font-light">
              We leverage live broadcast integrations and strategic regional journalism to keep voters informed, policies scrutinized, and community needs prioritized. No story is too small if it shapes the democratic fabric of Andhra Pradesh and Telangana.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-[9px] text-[#c5a880] uppercase tracking-wider">
              <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
              Hyderabad Central Broadcast Office • Vetted &amp; Active
            </div>
          </div>

        </div>
      </section>

      {/* Vetting Registry & Logs (Interactive Bento Grid Console) */}
      <motion.section
        initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-12 md:py-24 relative z-10 bg-neutral-950/40 border-b border-white/5 overflow-hidden"
      >
        <div className="w-full max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="flex flex-col items-center text-center mb-8 md:mb-16">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#c5a880] uppercase font-bold block mb-3">
              EDITORIAL LOG SYSTEM // VETTING REGISTRY
            </span>
            <h3 className="font-sans text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
              Recent Broadcaster Files
            </h3>
            <p className="font-sans text-xs text-neutral-500 mt-2 max-w-md font-light">
              Secure catalog containing verified transmission records, policy audits, and environmental awareness campaigns led by Shaik Sartaj.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BroadcasterFileCard
              className="md:col-span-2"
              item={{
                title: "AP Governance & Integrity Series",
                desc: "Investigative logs and live debates reviewing rural welfare policies, agricultural developments, and municipal budgets in Andhra Pradesh. Spearheading regional audit feeds.",
                date: "May 2026",
                tag: "AP Bureau",
                code: "GOV-2026-AP",
                icon: Tv,
                highlights: [
                  "12 Prime-Time Debates Moderated",
                  "26 Municipal Budgets Audited",
                  "Direct Stakeholder Engagement & Public Hearings"
                ]
              }}
            />
            <BroadcasterFileCard
              className="md:col-span-1"
              item={{
                title: "Wildlife Welfare & Sustainability Forum",
                desc: "Special broadcast campaigns and eco-dialogues highlighting wildlife conservation, forest protection, and municipal shelter reforms.",
                date: "April 2026",
                tag: "Green Desk",
                code: "ENV-2026-WILD",
                icon: Heart,
                highlights: [
                  "Eco-Preservation Features",
                  "Nature Reserve Collaborations"
                ]
              }}
            />
            <BroadcasterFileCard
              className="md:col-span-1"
              item={{
                title: "Telangana Assembly Live",
                desc: "Moderating critical legislative sessions regarding infrastructure developments, budgets, and public policies in Telangana.",
                date: "March 2026",
                tag: "Live Studio",
                code: "LEG-2026-TS",
                icon: ShieldAlert,
                highlights: [
                  "Live Assembly Feed Sync",
                  "Fact-Checking Overlays"
                ]
              }}
            />
            <BroadcasterFileCard
              className="md:col-span-2"
              item={{
                title: "Community Outreach & Underprivileged Voices",
                desc: "Amplifying local grievances, infrastructure failures, and municipal responses in semi-urban sectors. Putting the public back in public broadcasting by giving a voice to the voiceless.",
                date: "Jan 2026",
                tag: "Field Report",
                code: "COMM-2026-VOX",
                icon: BookOpen,
                highlights: [
                  "45 Rural Hubs Covered & Vetted",
                  "Municipal Resolution Tracking Logs",
                  "Interactive Public Voice Broadcast Feeds"
                ]
              }}
            />
          </div>
        </div>
      </motion.section>

      {/* Career Chronology / Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-12 md:py-24 relative z-10"
      >
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#c5a880] uppercase font-bold block mb-3">
              JOURNALISTIC MILESTONES // TIMELINE
            </span>
            <h3 className="font-sans text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white">
              Sartaj's Path of Impact
            </h3>
          </div>

          <div className="relative border-l border-[#c5a880]/20 pl-5 md:pl-12 ml-3 md:ml-4 flex flex-col gap-8 md:gap-12">
            {[
              {
                period: "2025 — Present",
                title: "Coordinating Editor",
                org: "BIG TV Network (Hyderabad)",
                desc: "Leading prime-time editorial planning, overseeing investigative broadcasts for Andhra Pradesh & Telangana, and coordinating regional debate schedules."
              },
              {
                period: "2022 — 2025",
                title: "Senior Anchor & Investigative Lead",
                org: "State Broadcast Bureaus",
                desc: "Led special coverage on state policies, governance reforms, and conducted deep-dives into rural welfare execution across major constituencies."
              },
              {
                period: "2018 — 2022",
                title: "Environmental Journalist & Anchor",
                org: "Independent Green Media",
                desc: "Advocated for animal protection laws, launched awareness campaigns for natural reserves, and curated weekly slots addressing ecological issues."
              },
              {
                period: "2014 — 2018",
                title: "Public Affairs Correspondent",
                org: "Regional News Desk",
                desc: "Reported directly from municipal centers, documenting public grievances, urban issues, and community welfare discrepancies."
              }
            ].map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="relative pl-3 md:pl-6"
              >
                {/* Glowing Bullet Dot */}
                <div className="absolute -left-[26px] md:-left-[55px] top-6 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#060606] border-2 border-[#c5a880] flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
                </div>

                <TiltCard index={idx} className="bg-neutral-950/60 border border-neutral-900/60 p-6 rounded-2xl hover:border-[#c5a880]/30 hover:bg-neutral-900/40 transition-all duration-300 cursor-pointer">
                  <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                    <span className="font-mono text-[9px] tracking-wider text-[#c5a880] font-bold block mb-1">
                      {milestone.period}
                    </span>
                    <h4 className="font-sans font-black text-sm tracking-tight text-white mb-1 uppercase">
                      {milestone.title}
                    </h4>
                    <h5 className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase font-semibold mb-3">
                      {milestone.org}
                    </h5>
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                      {milestone.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Social Connect Connect Grid (Award-Winning Style) */}
      <section className="py-12 md:py-20 relative z-10 border-t border-white/5 bg-[#0b0b0b]">
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 text-center">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#c5a880] uppercase font-bold block mb-3">
            EXTERNAL CHANNELS // NETWORKS
          </span>
          <h3 className="font-sans text-xl md:text-3xl font-extrabold uppercase tracking-tight text-white mb-8 md:mb-12">
            Establish Direct Connection
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              {
                platform: "Instagram",
                handle: "@anchor_sartaj",
                link: "https://www.instagram.com/anchor_sartaj?igsh=MWgwc2g2b2N6N29kaQ%3D%3D&utm_source=qr",
                bgColor: "hover:bg-gradient-to-tr hover:from-purple-900 hover:to-pink-700"
              },
              {
                platform: "Facebook",
                handle: "Shaik Sartaj",
                link: "https://www.facebook.com/honey.sartaj.9?mibextid=wwXIfr",
                bgColor: "hover:bg-blue-900"
              },
              {
                platform: "Threads",
                handle: "@anchor_sartaj",
                link: "https://www.threads.net/@anchor_sartaj",
                bgColor: "hover:bg-neutral-800"
              },
              {
                platform: "Twitter / X",
                handle: "@sartajhoney",
                link: "https://www.twitter.com/sartajhoney",
                bgColor: "hover:bg-neutral-900"
              }
            ].map((soc, index) => (
              <a
                href={soc.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className={`flex flex-col items-center justify-center p-6 bg-neutral-950 border border-neutral-900 rounded-2xl group transition-all duration-500 cursor-pointer ${soc.bgColor} hover:border-[#c5a880]/30 hover:scale-[1.03] hover:shadow-xl`}
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300">
                  <Share2 className="w-4 h-4 text-[#c5a880] group-hover:text-white" />
                </div>
                <span className="font-mono text-[10px] uppercase font-bold text-neutral-400 group-hover:text-white transition-colors duration-300">
                  {soc.platform}
                </span>
                <span className="font-sans text-xs text-[#c5a880] group-hover:text-neutral-200 mt-1 transition-colors duration-300">
                  {soc.handle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-white py-10 border-t border-neutral-900 relative z-10">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          {/* Left: Channel Logo + Dossier Label */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src={teluguLogo}
              alt="BIG TV Telugu"
              className="h-10 md:h-12 w-auto object-contain brightness-200"
            />
            <p className="font-mono text-[8px] text-neutral-600 tracking-wider uppercase">
              Official Correspondent Dossier // Co-Editor Division
            </p>
          </div>

          {/* Centre: Copyright */}
          <div className="flex flex-col items-center gap-1">
            <p className="font-mono text-[9px] text-neutral-500">
              © {new Date().getFullYear()} BIG TV NETWORK. ALL RIGHTS RESERVED.
            </p>
            <p className="font-mono text-[8px] text-neutral-700 uppercase tracking-wider">
              Hyderabad · Andhra Pradesh · Telangana
            </p>
          </div>

          {/* Right: Powered By SocialBureau */}
          <div className="flex items-center gap-3 font-bold text-slate-500 uppercase tracking-[0.2em] text-xs">
            <span>Powered by</span>
            <a href="https://www.socialbureau.in/enquiry-form" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img
                src="https://www.socialbureau.in/assets/logo.webp"
                alt="SocialBureau"
                className="h-5 md:h-6 w-auto"
              />
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
