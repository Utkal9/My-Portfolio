// GithubStats.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import { githubAPI } from '../services/api.js';

const USERNAME = 'Utkal9';

export function GithubStats() {
  const [user,  setUser]  = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([githubAPI.getUser(USERNAME), githubAPI.getRepos(USERNAME)])
      .then(([u, r]) => { setUser(u.data); setRepos(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <section id="github" className="py-20">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_,i) => <div key={i} className="skeleton h-24 rounded-2xl"/>)}
        </div>
      </div>
    </section>
  );

  return (
    <section id="github" className="py-20 bg-slate-50/50 dark:bg-dark-bg2/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold tracking-widest text-accent-blue uppercase mb-3 block">GitHub</span>
          <h2 className="section-heading text-slate-900 dark:text-white">
            Open Source <span className="grad-text">Activity</span>
          </h2>
        </motion.div>

        {user && (
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border shadow-card-light dark:shadow-none">
              <img src={user.avatar_url} alt={user.login} className="w-14 h-14 rounded-full border-2 border-dark-border"/>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{user.name || user.login}</div>
                <a href={user.html_url} target="_blank" rel="noreferrer"
                  className="text-xs text-accent-blue hover:underline flex items-center gap-1">
                  <Github size={11}/> @{user.login}
                </a>
              </div>
              <div className="flex gap-6 ml-6">
                {[
                  { label: 'Repos',     value: user.public_repos },
                  { label: 'Followers', value: user.followers },
                  { label: 'Following', value: user.following },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-lg font-bold grad-text">{s.value}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url} target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="block p-5 rounded-2xl bg-white dark:bg-dark-card
                border border-slate-100 dark:border-dark-border
                hover:border-accent-blue/30 dark:hover:border-accent-blue/20
                hover:shadow-glow-blue/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-accent-blue transition-colors truncate">
                  {repo.name}
                </h4>
                <ExternalLink size={13} className="text-slate-400 flex-shrink-0 mt-0.5"/>
              </div>
              {repo.description && (
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{repo.description}</p>
              )}
              <div className="flex items-center gap-4 text-xs text-slate-400">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent-blue"/> {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1"><Star size={11}/> {repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitFork size={11}/> {repo.forks_count}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
              border border-slate-200 dark:border-dark-border
              text-slate-700 dark:text-slate-300 text-sm font-medium
              hover:border-accent-blue/40 hover:text-accent-blue transition-all">
            <Github size={16}/> View all repositories
          </a>
        </div>
      </div>
    </section>
  );
}

export default GithubStats;
