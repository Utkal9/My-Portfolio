import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { useExperienceStore } from '../store/index.js';

function TimelineItem({ exp, index }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-start md:items-center gap-6 md:gap-12`}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card
          border border-slate-100 dark:border-dark-border
          shadow-card-light dark:shadow-none
          hover:border-accent-blue/30 dark:hover:border-accent-blue/20
          hover:shadow-glow-blue/10 transition-all duration-300"
        >
          <div className={`flex items-center gap-2 mb-1 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="text-xs px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue font-semibold">
              {exp.startDate} – {exp.endDate || 'Present'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{exp.role}</h3>
          <p className="text-accent-blue font-semibold text-sm mb-2">{exp.company}</p>
          {exp.location && (
            <div className={`flex items-center gap-1 text-xs text-slate-400 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
              <MapPin size={11}/> {exp.location}
            </div>
          )}
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{exp.description}</p>
          {exp.techStack?.length > 0 && (
            <div className={`flex flex-wrap gap-1.5 mt-3 ${isLeft ? 'md:justify-end' : ''}`}>
              {exp.techStack.map(t => (
                <span key={t} className="tech-pill text-[10px] px-2 py-0.5">{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-grad-main
        items-center justify-center shadow-glow-blue z-10">
        <Briefcase size={18} className="text-white" />
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const { experience, fetch, loading } = useExperienceStore();
  useEffect(() => { fetch(); }, []);

  return (
    <section id="experience" className="py-20 bg-slate-50/50 dark:bg-dark-bg2/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest text-accent-blue uppercase mb-3 block">Experience</span>
          <h2 className="section-heading text-slate-900 dark:text-white">
            Work <span className="grad-text">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Centre line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px
            bg-gradient-to-b from-accent-blue/30 via-accent-purple/20 to-transparent" />

          <div className="flex flex-col gap-12">
            {loading
              ? Array(2).fill(0).map((_,i) => <div key={i} className="skeleton h-36 rounded-2xl" />)
              : experience.map((exp, i) => (
                  <TimelineItem key={exp._id} exp={exp} index={i} />
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}
