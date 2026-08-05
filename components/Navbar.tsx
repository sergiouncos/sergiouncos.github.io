import React, { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionNav = motion.nav as any;
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const menu = document.getElementById('mobile-navigation');
      const focusableElements = Array.from(menu?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? []);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo(0,0);
  };

  return (
    <>
      <MotionNav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-slate-950/80 backdrop-blur-2xl border-white/5 py-4 shadow-lg shadow-black/10' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button type="button" onClick={() => handleNavClick('home')} aria-label="Go to home" className="group flex items-start gap-2.5 text-left max-[359px]:gap-2">
            <MotionDiv 
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-12 w-12 items-center justify-center transition-all duration-300 max-[359px]:h-10 max-[359px]:w-10"
            >
                <div className="absolute inset-[-6px] rounded-full bg-brand-accent/10 blur-xl opacity-70 transition-all duration-500 group-hover:bg-brand-accent/15 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_65%)] opacity-80" />
                <svg
                  aria-hidden="true"
                  className="relative z-10 h-full w-full overflow-visible drop-shadow-[0_0_12px_rgba(6,182,212,0.18)] transition-all duration-500 group-hover:drop-shadow-[0_0_18px_rgba(6,182,212,0.32)]"
                  viewBox="0 0 200 200"
                >
                  <defs>
                    <linearGradient id="nav-core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F5FF" />
                      <stop offset="55%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#b600f8" />
                    </linearGradient>
                    <linearGradient id="nav-outer-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#b600f8" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.25" />
                    </linearGradient>
                    <linearGradient id="nav-inner-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#b600f8" stopOpacity="0.45" />
                    </linearGradient>
                    <pattern id="nav-hex-pattern" width="10" height="17.32" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
                      <path d="M5 0L10 2.886V8.66L5 11.547L0 8.66V2.886L5 0Z" fill="none" stroke="#00F5FF" strokeOpacity="0.14" strokeWidth="0.5" />
                    </pattern>
                    <filter id="nav-neon-glow" x="-25%" y="-25%" width="150%" height="150%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <circle cx="100" cy="100" r="88" fill="url(#nav-hex-pattern)" className="opacity-25 transition-opacity duration-500 group-hover:opacity-45" />

                  <g className="origin-center animate-[nav-rotate-outer_20s_linear_infinite]">
                    <path d="M100 18 L171 59 L171 141 L100 182 L29 141 L29 59 Z" fill="none" stroke="url(#nav-outer-gradient)" strokeWidth="3" strokeDasharray="10 5 26 10" opacity="0.7" />
                    <circle cx="100" cy="18" r="5" fill="#00F5FF" filter="url(#nav-neon-glow)" />
                    <circle cx="171" cy="141" r="3.5" fill="#b600f8" />
                    <circle cx="29" cy="141" r="3.5" fill="#06b6d4" />
                  </g>

                  <g className="origin-center animate-[nav-rotate-inner_14s_linear_infinite]">
                    <circle cx="100" cy="100" r="60" fill="none" stroke="url(#nav-inner-gradient)" strokeWidth="2.2" strokeDasharray="48 14 8 14" opacity="0.9" />
                    <circle cx="100" cy="100" r="51" fill="none" stroke="#00F5FF" strokeOpacity="0.22" strokeWidth="1" />
                    <path d="M100 34 L100 44 M100 156 L100 166 M34 100 L44 100 M156 100 L166 100" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                  </g>

                  <g opacity="0.36" stroke="#06b6d4" strokeWidth="1.4">
                    <line x1="100" y1="100" x2="100" y2="46" strokeDasharray="3 5" />
                    <line x1="100" y1="100" x2="147" y2="73" strokeDasharray="3 5" />
                    <line x1="100" y1="100" x2="147" y2="127" strokeDasharray="3 5" />
                    <line x1="100" y1="100" x2="100" y2="154" strokeDasharray="3 5" />
                    <line x1="100" y1="100" x2="53" y2="127" strokeDasharray="3 5" />
                    <line x1="100" y1="100" x2="53" y2="73" strokeDasharray="3 5" />
                  </g>

                  <g className="origin-center animate-[nav-pulse-core_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                    <path d="M100 56 L139 78 L139 122 L100 144 L61 122 L61 78 Z" fill="#020617" stroke="url(#nav-core-gradient)" strokeWidth="3" filter="url(#nav-neon-glow)" />
                    <path d="M100 56 L100 100 L139 78 Z" fill="url(#nav-core-gradient)" opacity="0.2" />
                    <path d="M139 78 L100 100 L139 122 Z" fill="url(#nav-core-gradient)" opacity="0.38" />
                    <path d="M139 122 L100 100 L100 144 Z" fill="url(#nav-core-gradient)" opacity="0.58" />
                    <path d="M100 144 L100 100 L61 122 Z" fill="url(#nav-core-gradient)" opacity="0.42" />
                    <path d="M61 122 L100 100 L61 78 Z" fill="url(#nav-core-gradient)" opacity="0.24" />
                    <path d="M61 78 L100 100 L100 56 Z" fill="url(#nav-core-gradient)" opacity="0.3" />
                    <circle cx="100" cy="100" r="11" fill="#00F5FF" filter="url(#nav-neon-glow)" />
                    <circle cx="100" cy="100" r="4" fill="#ffffff" />
                  </g>
                </svg>
            </MotionDiv>
            <div className="flex min-w-0 flex-col items-start justify-start pt-0.5 text-left leading-none">
              <span className="block w-full text-left font-sans text-[1.35rem] font-semibold tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-brand-accent max-[359px]:text-lg">
                SERGIO<span className="text-white/45">.</span>U
              </span>
              <span className="mt-0.5 block w-full text-left font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 transition-colors duration-300 group-hover:text-slate-300 max-[359px]:hidden">
                security portfolio
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <button 
                type="button"
                key={link.name} 
                onClick={() => handleNavClick(link.id)}
                aria-current={activePage === link.id ? 'page' : undefined}
                className={`text-sm font-medium transition-colors relative px-1 py-1 ${
                    activePage === link.id ? 'text-brand-accent' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
                {activePage === link.id && (
                  <MotionDiv 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-accent shadow-[0_0_10px_#06b6d4]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <MotionButton 
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('contact')}
              className="px-5 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors hover:border-brand-accent/50 backdrop-blur-md"
            >
              Get in Touch
            </MotionButton>
          </div>

          {/* Mobile Menu Button */}
          <button 
            ref={menuButtonRef}
            type="button"
            className="md:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu />
          </button>
        </div>
      </MotionNav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv 
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-3xl flex flex-col justify-center items-center space-y-8 border-l border-white/10"
          >
            <button 
              ref={closeButtonRef}
              type="button"
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={32} />
            </button>
            {NAV_LINKS.map((link) => (
              <MotionButton 
                type="button"
                key={link.name} 
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavClick(link.id)}
                aria-current={activePage === link.id ? 'page' : undefined}
                className={`text-2xl font-light ${activePage === link.id ? 'text-brand-accent' : 'text-slate-200 hover:text-brand-accent'}`}
              >
                {link.name}
              </MotionButton>
            ))}
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
