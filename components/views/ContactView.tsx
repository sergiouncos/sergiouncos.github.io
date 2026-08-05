import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const MotionDiv = motion.div as any;

const ContactView: React.FC = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 pb-12 pt-28 sm:px-6">
       <div className="container mx-auto max-w-3xl text-center relative z-10">
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card rounded-3xl border border-white/10 p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:p-12"
          >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Connect</h2>
              <p className="text-slate-300 text-lg mb-12 leading-relaxed">
                I'm always open to discussing security architecture, compliance audits, or new opportunities.
                Whether you have a question about my work or just want to say hello, my inbox is open.
              </p>
              
              <a 
                href="mailto:sergio_uncos@outlook.com"
                className="group inline-flex max-w-full items-center rounded-full bg-white px-4 py-4 text-sm font-bold text-brand-dark shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 sm:px-8 sm:text-base"
              >
                <Mail className="mr-2 w-5 h-5 group-hover:text-brand-accent transition-colors" />
                <span className="min-w-0 break-all">sergio_uncos@outlook.com</span>
              </a>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <a href="https://github.com/sergiouncos" target="_blank" rel="noreferrer" className="glass-panel p-4 rounded-xl flex items-center justify-center gap-2 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                        <Github size={20} /> <span>GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/sergio-uncos/" target="_blank" rel="noreferrer" className="glass-panel p-4 rounded-xl flex items-center justify-center gap-2 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                        <Linkedin size={20} /> <span>LinkedIn</span>
                    </a>
              </div>
          </MotionDiv>
          
          <div className="mt-8 text-slate-500 text-sm">
             &copy; {new Date().getFullYear()} Sergio Uncos. All Rights Reserved.
          </div>
       </div>
    </section>
  );
};

export default ContactView;
