import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import MetricsDashboard from '../MetricsDashboard';
import DecryptText from '../GlitchText';
import { ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { EXPERIENCE } from '../../constants';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionButton = motion.button as any;
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parsePeriodStart = (period: string) => {
  const [monthName, yearText] = period.split(' - ')[0].split(' ');
  const monthIndex = monthNames.indexOf(monthName);
  const year = Number(yearText);
  return monthIndex >= 0 && Number.isFinite(year) ? Date.UTC(year, monthIndex, 1) : Number.NaN;
};

interface HomeViewProps {
  onNavigate: (page: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const securityExperienceYears = useMemo(() => {
    const startDates = EXPERIENCE.map((job) => parsePeriodStart(job.period)).filter(Number.isFinite);

    if (startDates.length === 0) return 4; 

    const earliestTimestamp = Math.min(...startDates);
    const now = Date.now();
    const diffInMilliseconds = now - earliestTimestamp;
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    
    return Math.floor(diffInYears);
  }, []);

  const totalItExperience = securityExperienceYears + 3;

  return (
    <section className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 md:px-12">
      <MotionDiv 
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto max-w-7xl grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] gap-12 xl:gap-20 items-center"
      >
        <div className="space-y-8">
          <MotionDiv variants={item} className="inline-flex items-center gap-3 rounded-full border border-brand-accent/20 bg-brand-accent/5 px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand-accent shadow-[0_0_12px_#06b6d4]"></span>
            <span className="text-brand-accent font-medium tracking-[0.28em] uppercase text-[11px] md:text-xs drop-shadow-[0_0_5px_rgba(6,182,212,0.45)]">
              Security Engineer | Security Analyst
            </span>
          </MotionDiv>
          
          <MotionH1 variants={item} className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            <span className="text-slate-400">Hello, I'm</span> <br />
            <DecryptText text="Sergio Uncos" className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] pb-2 pr-2" />
          </MotionH1>

          <MotionDiv variants={item} className="max-w-xl space-y-5 text-slate-300 text-lg leading-relaxed">
            <p>
              I am a Cybersecurity Professional with over <strong>{totalItExperience} years of IT experience</strong> and <strong>{securityExperienceYears}+ years</strong> dedicated to Information Security.
            </p>
            <p>
              I have a proven track record of success in protecting systems and data from malicious actors.
              My expertise spans vulnerability management and incident response, with specialized experience at <strong>Cloudflare</strong> in <strong>Governance, Risk, and Compliance (GRC)</strong> and <strong>Third-Party Risk Management (TPRM)</strong>.
            </p>
          </MotionDiv>

          <MotionDiv variants={item} className="flex flex-col items-stretch gap-4 pt-6 sm:flex-row sm:items-center sm:gap-5">
            <MotionButton 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('experience')} 
              className="flex justify-center rounded-full bg-white px-8 py-4 font-bold text-brand-dark shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:bg-slate-200"
            >
              View Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </MotionButton>
            <MotionButton 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('contact')} 
              className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Contact Me
            </MotionButton>
          </MotionDiv>

          {/* Quick Skills Summary */}
          <MotionDiv variants={item} className="grid sm:grid-cols-2 gap-6 mt-10">
             <MotionDiv whileHover={{ y: -5 }} className="glass-panel p-5 rounded-xl border-l-2 border-l-brand-accent hover:bg-white/5 transition-colors">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2"><ShieldCheck size={18}/> Core Security</h4>
                {/* Brightened text to slate-200 */}
                <p className="text-sm text-slate-200 leading-relaxed">TPRM, GRC, Vulnerability Mgmt, Incident Response</p>
             </MotionDiv>
             <MotionDiv whileHover={{ y: -5 }} className="glass-panel p-5 rounded-xl border-l-2 border-l-brand-secondary hover:bg-white/5 transition-colors">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2"><FileText size={18}/> Tech Stack</h4>
                {/* Brightened text to slate-200 */}
                <p className="text-sm text-slate-200 leading-relaxed">Vendor Risk Tools, Wazuh, AWS, Python, Burp Suite, AI Workflows</p>
             </MotionDiv>
          </MotionDiv>

        </div>

        {/* Right Side - Metrics */}
        <MotionDiv 
          variants={item}
          className="hidden lg:block relative lg:max-w-[520px] lg:w-full lg:justify-self-end"
        >
           <div className="absolute inset-0 bg-brand-accent/5 blur-[120px] rounded-full"></div>
           <MetricsDashboard />
           <div className="mt-10 text-center">
              <p className="text-sm text-slate-400 font-mono tracking-wide">"Practice builds knowledge; knowledge builds confidence."</p>
           </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};

export default HomeView;
