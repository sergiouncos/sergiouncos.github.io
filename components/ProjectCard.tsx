import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, Lock, Github } from 'lucide-react';

const MotionDiv = motion.div as any;

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  // Provide a default status if undefined to prevent crashes on .toUpperCase()
  const status = project.status || 'Public';

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative glass-card p-8 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Gradient Border Glow */}
      <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-brand-accent/30 transition-colors duration-300 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-lg bg-brand-panel border border-white/5">
             {status === 'Public' ? <Github size={20} className="text-slate-300"/> : <Lock size={20} className="text-brand-accent"/>}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
            status === 'Public' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
            status === 'Classified' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
            'bg-slate-700/30 text-slate-400'
        }`}>
            {status.toUpperCase()}
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-brand-accent transition-colors">
        {project.title}
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map(tech => (
          <span key={tech} className="text-xs font-medium text-slate-300 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
            {tech}
          </span>
        ))}
      </div>

      {status === 'Public' && (
        <a 
          href={project.link} 
          className="inline-flex items-center space-x-2 text-sm font-medium text-brand-accent hover:text-brand-secondary transition-colors"
        >
          <span>View Case Study</span>
          <ArrowUpRight size={16} />
        </a>
      )}
    </MotionDiv>
  );
};

export default ProjectCard;