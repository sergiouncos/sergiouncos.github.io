import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../../constants';
import { ArrowUpRight, Briefcase, Calendar } from 'lucide-react';

const MotionDiv = motion.div as any;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }
};

const ExperienceView: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="container mx-auto max-w-5xl">
        <MotionDiv 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mb-16"
        >
           <h2 className="text-5xl font-bold text-white mb-4">Work Experience</h2>
           <p className="text-slate-300 text-lg">A timeline of my professional journey in information security.</p>
        </MotionDiv>

        <MotionDiv 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l border-white/10 ml-4 md:ml-6 space-y-16"
        >
          {EXPERIENCE.map((job) => (
            <MotionDiv 
              key={job.id}
              variants={item}
              className="relative pl-8 md:pl-16"
            >
              {/* Timeline Dot */}
              <MotionDiv 
                initial={{ opacity: 0.4, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.18, ease: "easeOut" }}
                className="absolute -left-1.5 md:-left-2 top-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-brand-accent shadow-[0_0_15px_#06b6d4]"
              />
              
              <div className="glass-card p-8 md:p-10 rounded-3xl group hover:bg-white/5 transition-colors duration-500">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-brand-accent transition-colors mb-1">{job.company}</h3>
                    <div className="text-lg md:text-xl text-slate-200 font-medium flex items-center gap-2">
                      <Briefcase size={18} className="text-brand-secondary"/> {job.role}
                    </div>
                  </div>
                  <div className="flex items-center text-sm font-medium text-slate-300 bg-white/5 px-4 py-2 rounded-full border border-white/5 self-start lg:self-auto whitespace-nowrap">
                    <Calendar size={16} className="mr-2"/>
                    {job.period}
                  </div>
                </div>
                
                <p className="text-slate-200 mb-8 italic border-l-2 border-brand-accent/30 pl-5 text-lg leading-relaxed">
                  {job.description}
                </p>

                <ul className="space-y-3 mb-8 text-slate-300 text-base leading-relaxed">
                  {job.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-3 mt-2 w-1.5 h-1.5 bg-slate-400 rounded-full flex-shrink-0"></span>
                      <span className="break-words">{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                   {job.techStack.map(tech => (
                      <span key={tech} className="text-xs font-bold uppercase tracking-wider text-brand-accent/90 bg-brand-accent/10 px-3 py-1.5 rounded border border-brand-accent/10">
                        {tech}
                      </span>
                   ))}
                </div>
                
                {job.link && job.link !== '#' && (
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a href={job.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-white hover:text-brand-accent transition-colors group/link">
                      Visit Company <ArrowUpRight size={16} className="ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"/>
                    </a>
                  </div>
                )}
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

export default ExperienceView;
