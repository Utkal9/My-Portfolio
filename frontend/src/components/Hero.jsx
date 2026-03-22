import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Github, Linkedin, Code2, ArrowDown } from 'lucide-react';
import { useSiteConfigStore } from '../store/index.js';
import { resumeAPI } from '../services/api.js';

const ROLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'React & Next.js Dev',
  'Cloud & DevOps Learner',
];

function TypingEffect({ texts }) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);
  const speed = deleting ? 40 : 80;

  useEffect(() => {
    const target = texts[idx];
    const timer = setTimeout(() => {
      if (!deleting) {
        if (display.length < target.length) {
          setDisplay(target.slice(0, display.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (display.length > 0) {
          setDisplay(display.slice(0, -1));
        } else {
          setDeleting(false);
          setIdx(i => (i + 1) % texts.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [display, deleting, idx, texts]);

  return (
    <span className="grad-text font-bold">
      {display}
      <span className="typing-cursor" />
    </span>
  );
}

// Floating particle orbs
function HeroOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/5 dark:bg-accent-blue/8 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/5 dark:bg-accent-purple/8 rounded-full blur-3xl animate-float" style={{animationDelay:'1.5s'}} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-blue/3 dark:bg-accent-blue/5 rounded-full blur-2xl animate-float" style={{animationDelay:'0.75s'}} />
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{backgroundImage:'linear-gradient(rgba(79,142,247,1) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,247,1) 1px,transparent 1px)',backgroundSize:'60px 60px'}}
      />
    </div>
  );
}

const ICON_MAP = {
  github:   <Github size={18}/>,
  linkedin: <Linkedin size={18}/>,
  leetcode: <Code2 size={18}/>,
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } };

export default function Hero({ config }) {
  const hero   = config?.hero || {};
  const socials = [
    { platform: 'github',   url: 'https://github.com/Utkal9',                   icon: <Github size={18}/> },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/utkal-behera59/', icon: <Linkedin size={18}/> },
    { platform: 'leetcode', url: 'https://leetcode.com/u/utkal59/',             icon: <Code2 size={18}/> },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16">
      <HeroOrbs />
      <div className="section-container w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={container} initial="hidden" animate="show"
          >
            {/* Badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2 mb-6">
              <span className="px-4 py-2 rounded-full text-xs font-semibold border
                bg-blue-50 border-accent-blue/30 text-accent-blue
                dark:bg-accent-blue/10 dark:border-accent-blue/20 dark:text-accent-blue">
                🚀 {hero.tagline || 'Open to Internships & Placements'}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.div variants={item} className="mb-2">
              <span className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                Hi there 👋, I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight font-display"
              style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}
            >
              <span className="text-slate-900 dark:text-white">
                {hero.name || 'Utkal Behera'}
              </span>
            </motion.h1>

            {/* Typing role */}
            <motion.div variants={item} className="text-xl md:text-2xl mb-6 h-8">
              <TypingEffect texts={ROLES} />
            </motion.div>

            {/* Subtitle */}
            <motion.p variants={item}
              className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed"
            >
              {hero.subtitle || 'Building scalable web applications with MERN Stack · Next.js · Cloud & DevOps. Currently @ LPU, CSE.'}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                  bg-grad-main text-white shadow-glow-blue hover:shadow-glow-purple
                  transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              >
                <ExternalLink size={16}/> {hero.cta1Text || 'View Projects'}
              </a>
              <a
                href={resumeAPI.download()}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                  border border-slate-200 dark:border-dark-border
                  text-slate-700 dark:text-slate-300
                  hover:border-accent-blue dark:hover:border-accent-blue/50
                  hover:text-accent-blue transition-all duration-300 hover:scale-105"
              >
                <Download size={16}/> {hero.cta2Text || 'Download CV'}
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex gap-3 justify-center lg:justify-start">
              {socials.map(s => (
                <a
                  key={s.platform}
                  href={s.url} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center
                    bg-slate-100 dark:bg-dark-card2
                    text-slate-600 dark:text-slate-400
                    hover:bg-accent-blue/10 hover:text-accent-blue
                    dark:hover:bg-accent-blue/10 dark:hover:text-accent-blue
                    border border-transparent hover:border-accent-blue/20
                    transition-all duration-200 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22,1,0.36,1] }}
            className="flex-shrink-0 animate-float"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-grad-main opacity-20 blur-2xl scale-110 animate-glow-pulse" />
              {/* Avatar */}
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-grad-main
                flex items-center justify-center text-white text-6xl md:text-8xl font-extrabold
                shadow-glow-blue overflow-hidden"
              >
                {hero.profileImage
                  ? <img src={hero.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  : <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>UB</span>
                }
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-dark-card2
                border border-slate-200 dark:border-dark-border
                rounded-2xl px-3 py-2 flex items-center gap-2 shadow-card-light dark:shadow-card-dark">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Available for work</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-400 dark:text-slate-500">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} className="text-accent-blue" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
