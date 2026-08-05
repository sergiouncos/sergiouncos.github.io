import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, FileText, Lock, Server, Cloud } from 'lucide-react';

const MotionDiv = motion.div as any;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const MetricCard: React.FC<{ label: string; value: string; icon: React.ReactNode; note?: string }> = ({ label, value, icon, note }) => (
  <MotionDiv 
    variants={cardVariants}
    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(6, 182, 212, 0.15)" }}
    className="glass-panel p-4 sm:p-5 rounded-xl flex items-center gap-4 transition-colors overflow-hidden border border-white/5 hover:border-brand-accent/30"
  >
    <div className="p-3 rounded-lg bg-brand-accent/10 text-brand-accent flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      {/* Added break-normal to prevent mid-word splitting */}
      <div className="text-slate-300 text-[10px] sm:text-[11px] uppercase tracking-wider font-medium leading-tight mb-1 break-normal">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-base sm:text-xl font-bold text-white font-mono leading-tight break-words">
          {value}
        </div>
        {note && (
          <span className="rounded-full border border-brand-accent/20 bg-brand-accent/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-brand-accent">
            {note}
          </span>
        )}
      </div>
    </div>
  </MotionDiv>
);

const MetricsDashboard: React.FC = () => {
  return (
    <MotionDiv 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
    >
      <MetricCard 
        label="Vendors Reviewed" 
        value="400+"
        note="Ongoing"
        icon={<ShieldCheck size={20} />} 
      />
      <MetricCard 
        label="Compliance Audit" 
        value="SOC 2 Type 2" 
        icon={<FileText size={20} />} 
      />
      <MetricCard 
        label="Risk Assessment" 
        value="Continuous" 
        icon={<Activity size={20} />} 
      />
      <MetricCard 
        label="Access Control" 
        value="IAM & RBAC" 
        icon={<Lock size={20} />} 
      />
      <MetricCard 
        label="Security Events Analyzed"
        value="100K+"
        icon={<Server size={20} />} 
      />
      <MetricCard 
        label="Cloud Security" 
        value="AWS Certified" 
        icon={<Cloud size={20} />} 
      />
    </MotionDiv>
  );
};

export default MetricsDashboard;
