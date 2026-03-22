import { Heart } from 'lucide-react';

export default function Footer({ config }) {
  const footer = config?.footer || {};
  const hero   = config?.hero   || {};

  return (
    <footer className="bg-white dark:bg-dark-bg2 border-t border-slate-100 dark:border-dark-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-grad-main flex items-center justify-center text-white font-bold text-xs">
            {(hero.name||'UB').split(' ').map(n=>n[0]).join('').slice(0,2)}
          </div>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {hero.name || 'Utkal Behera'}
          </span>
        </div>

        <p className="text-xs text-slate-400 flex items-center gap-1.5">
          {footer.tagline || (
            <>Built with <Heart size={11} className="text-red-400 fill-red-400"/> using MERN Stack</>
          )}
        </p>

        <p className="text-xs text-slate-400">
          {footer.copyright || `© ${new Date().getFullYear()} Utkal Behera. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
