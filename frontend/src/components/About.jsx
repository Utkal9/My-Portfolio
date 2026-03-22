// About.jsx
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Award } from 'lucide-react';

export function About({ config }) {
  const about = config?.about || {};
  const hero  = config?.hero  || {};

  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold tracking-widest text-accent-blue uppercase mb-3 block">About</span>
          <h2 className="section-heading text-slate-900 dark:text-white">
            Who I <span className="grad-text">Am</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-dark-border shadow-card-light dark:shadow-card-dark">
                {about.profileImage
                  ? <img src={about.profileImage} alt="About" className="w-full h-full object-cover"/>
                  : <div className="w-full h-full bg-grad-main flex items-center justify-center text-white text-6xl font-bold">UB</div>
                }
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-white dark:bg-dark-card
                border border-slate-100 dark:border-dark-border shadow-card-light dark:shadow-card-dark
                flex flex-col items-center justify-center">
                <div className="text-2xl font-bold grad-text">7.6</div>
                <div className="text-xs text-slate-500 text-center">CGPA @ LPU</div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {about.description || `I'm Utkal Behera, a passionate Full Stack Developer pursuing B.Tech in CSE at Lovely Professional University, Phagwara. I love building scalable web applications and have hands-on experience with MERN Stack, Next.js, and Cloud technologies.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: <GraduationCap size={16}/>, label: 'Education', value: 'LPU, B.Tech CSE' },
                { icon: <MapPin size={16}/>,        label: 'Location',  value: 'Phagwara, Punjab' },
                { icon: <Award size={16}/>,         label: 'Rank 1',    value: 'NxtWave DSA (7k+ participants)' },
              ].map(item => (
                <div key={item.label}
                  className="flex items-center gap-3 p-3 rounded-xl
                    bg-slate-50 dark:bg-dark-card2
                    border border-slate-100 dark:border-dark-border">
                  <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{item.label}</div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
