import React from 'react';
import { motion } from 'framer-motion';
import { TOOLS_DATA } from '../../constants';
import { Wrench, ExternalLink } from 'lucide-react';

const MotionDiv = motion.div as any;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const ToolsView: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        <MotionDiv 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-16 text-center"
        >
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Security Arsenal</h2>
           <p className="text-slate-300 text-lg max-w-2xl mx-auto">A curated collection of tools I use on a daily basis for intelligence, analysis, and defense.</p>
        </MotionDiv>

        <MotionDiv 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
           {TOOLS_DATA.map((category) => (
             <MotionDiv 
               key={category.category}
               variants={item}
               className="space-y-6"
             >
                <h3 className="text-xl font-bold text-brand-accent flex items-center gap-3 pl-2">
                   <div className="p-2 bg-brand-accent/10 rounded-lg">
                      <Wrench size={20} />
                   </div>
                   {category.category}
                </h3>
                <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                   {category.tools.map((tool) => (
                      <a 
                        key={tool.name} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-start justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors group last:border-0 gap-6"
                      >
                         <div className="min-w-0 flex-1">
                            <div className="text-slate-100 font-medium group-hover:text-white transition-colors break-words text-lg">{tool.name}</div>
                            {tool.description && <div className="text-sm text-slate-300 mt-1.5 break-words leading-relaxed">{tool.description}</div>}
                         </div>
                         <ExternalLink size={18} className="text-slate-400 group-hover:text-brand-accent transition-colors flex-shrink-0 mt-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                      </a>
                   ))}
                </div>
             </MotionDiv>
           ))}
        </MotionDiv>
      </div>
    </section>
  );
};

export default ToolsView;