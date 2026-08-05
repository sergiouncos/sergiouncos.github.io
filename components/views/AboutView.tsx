import React from 'react';
import { motion } from 'framer-motion';
import { BOOKS, CERTIFICATIONS, SKILL_CATEGORIES } from '../../constants';
import { BookOpen, Award, User, ExternalLink, Layers3 } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionA = motion.a as any;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }
};

const AboutView: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="container mx-auto max-w-7xl space-y-10 lg:hidden">
        <MotionDiv variants={container} initial="hidden" animate="show">
          <MotionDiv variants={item}>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <User className="text-brand-accent" /> About Me
            </h2>
            <div className="glass-panel p-8 rounded-2xl space-y-6 text-slate-300 leading-relaxed text-lg border border-white/10">
              <p>
                I have a strong passion for assisting others to achieve their goals and also offering support and coaching. 
                My devotion to learning allowed me to become fluent in <strong>English, Portuguese, and Spanish</strong>.
              </p>
              <p>
                I consider myself a knowledge seeker and an explorer. I believe that continuous learning is the key 
                to staying relevant in the ever-evolving field of cybersecurity.
              </p>
            </div>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv variants={container} initial="hidden" animate="show">
          <MotionDiv variants={item}>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
               <Layers3 className="text-brand-accent" /> Skills
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
               {SKILL_CATEGORIES.map((category) => (
                  <div key={category.title} className="glass-panel p-5 rounded-2xl border border-white/10">
                     <h4 className="text-base font-bold text-white mb-4">{category.title}</h4>
                     <div className="flex flex-wrap gap-2">
                        {category.items.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-medium text-slate-200 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv variants={container} initial="hidden" animate="show">
          <MotionDiv variants={item}>
             <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Award className="text-yellow-500" /> Recognitions & Certifications
             </h3>
             <div className="space-y-5">
                {CERTIFICATIONS.map((cert, i) => (
                   <MotionA 
                     key={i} 
                     href={cert.url} 
                     target="_blank" 
                     rel="noreferrer"
                     whileHover={{ scale: 1.02 }}
                     className="flex items-center justify-between glass-panel p-5 rounded-xl group hover:bg-white/5 transition-colors border border-white/5"
                   >
                      <span className="font-medium text-slate-200 group-hover:text-white text-lg">{cert.name}</span>
                      <ExternalLink size={20} className="text-slate-500 group-hover:text-brand-accent transition-colors"/>
                   </MotionA>
                ))}
             </div>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv variants={container} initial="hidden" animate="show">
          <MotionDiv variants={item}>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
               <BookOpen className="text-brand-secondary" /> Recommended Reading
            </h3>
            <div className="grid sm:grid-cols-1 gap-4">
              {BOOKS.map((book, i) => (
                <MotionDiv 
                  key={i} 
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="glass-card p-4 rounded-xl text-base text-slate-300 transition-all border-l-2 border-transparent hover:border-brand-accent cursor-default"
                >
                   {book}
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>

      <MotionDiv 
        variants={container}
        initial="hidden"
        animate="show"
        className="hidden lg:grid container mx-auto max-w-7xl lg:grid-cols-2 gap-10 lg:gap-16 items-start"
      >
        <MotionDiv variants={item} className="space-y-10">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <User className="text-brand-accent" /> About Me
          </h2>
          <div className="glass-panel p-8 rounded-2xl space-y-6 text-slate-300 leading-relaxed text-lg border border-white/10">
            <p>
              I have a strong passion for assisting others to achieve their goals and also offering support and coaching. 
              My devotion to learning allowed me to become fluent in <strong>English, Portuguese, and Spanish</strong>.
            </p>
            <p>
              I consider myself a knowledge seeker and an explorer. I believe that continuous learning is the key 
              to staying relevant in the ever-evolving field of cybersecurity.
            </p>
          </div>

          <div>
             <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Award className="text-yellow-500" /> Recognitions & Certifications
             </h3>
             <div className="space-y-5">
                {CERTIFICATIONS.map((cert, i) => (
                   <MotionA 
                     key={i} 
                     href={cert.url} 
                     target="_blank" 
                     rel="noreferrer"
                     whileHover={{ scale: 1.02 }}
                     className="flex items-center justify-between glass-panel p-5 rounded-xl group hover:bg-white/5 transition-colors border border-white/5"
                   >
                      <span className="font-medium text-slate-200 group-hover:text-white text-lg">{cert.name}</span>
                      <ExternalLink size={20} className="text-slate-500 group-hover:text-brand-accent transition-colors"/>
                   </MotionA>
                ))}
             </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
               <BookOpen className="text-brand-secondary" /> Recommended Reading
            </h3>
            <div className="grid sm:grid-cols-1 gap-4">
              {BOOKS.map((book, i) => (
                <MotionDiv 
                  key={i} 
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="glass-card p-4 rounded-xl text-base text-slate-300 transition-all border-l-2 border-transparent hover:border-brand-accent cursor-default"
                >
                   {book}
                </MotionDiv>
              ))}
            </div>
          </div>
        </MotionDiv>

        <MotionDiv variants={item}>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
             <Layers3 className="text-brand-accent" /> Skills
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
             {SKILL_CATEGORIES.map((category) => (
                <div key={category.title} className="glass-panel p-5 rounded-2xl border border-white/10">
                   <h4 className="text-base font-bold text-white mb-4">{category.title}</h4>
                   <div className="flex flex-wrap gap-2">
                      {category.items.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-medium text-slate-200 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                   </div>
                </div>
             ))}
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};

export default AboutView;
