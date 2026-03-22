import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';

// Using static data seeded from CV — admin can override via CMS
const DEFAULT_CERTS = [
  { _id: '1', title: 'Social Networks', issuer: 'NPTEL', date: 'Oct 2025', verificationUrl: '' },
  { _id: '2', title: 'Full Stack Development', issuer: 'Apna College', date: 'Aug 2024', verificationUrl: '' },
];

export default function Certifications() {
  // Fetching is optional here; default certs are shown if API returns empty
  const [certs] = useState(DEFAULT_CERTS);

  return (
    <section id="certificates" className="py-20 bg-slate-50/50 dark:bg-dark-bg2/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold tracking-widest text-accent-blue uppercase mb-3 block">Certifications</span>
          <h2 className="section-heading text-slate-900 dark:text-white">
            Credentials & <span className="grad-text">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-card
                border border-slate-100 dark:border-dark-border
                hover:border-accent-blue/30 dark:hover:border-accent-blue/20
                shadow-card-light dark:shadow-none
                hover:shadow-glow-blue/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-grad-main flex items-center justify-center mb-4 shadow-glow-blue">
                <Award size={22} className="text-white"/>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-accent-blue transition-colors">
                {cert.title}
              </h3>
              <div className="text-sm text-accent-blue font-medium mb-1">{cert.issuer}</div>
              <div className="text-xs text-slate-400 mb-4">{cert.date}</div>

              {cert.image?.url && (
                <img src={cert.image.url} alt={cert.title} className="w-full h-28 object-cover rounded-xl mb-4 border border-slate-100 dark:border-dark-border"/>
              )}

              {cert.verificationUrl && (
                <a href={cert.verificationUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-accent-blue transition-colors">
                  <ExternalLink size={11}/> Verify Certificate
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
