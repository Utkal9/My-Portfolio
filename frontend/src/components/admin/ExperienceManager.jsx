import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { useExperienceStore } from '../../store/index.js';

const EMPTY = { role:'', company:'', location:'', startDate:'', endDate:'Present', description:'', techStack:'' };

function ExpForm({ initial = EMPTY, onSave, onCancel, loading }) {
  const [form, setForm] = useState({
    ...EMPTY, ...initial,
    techStack: initial.techStack?.join?.(', ') || initial.techStack || ''
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputClass = `w-full px-3 py-2.5 rounded-xl text-sm bg-dark-bg border border-dark-border
    text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent-blue transition-colors`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean) };
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Role *</label>
          <input value={form.role} onChange={e=>set('role',e.target.value)} required className={inputClass} placeholder="Web Development Intern"/></div>
        <div><label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Company *</label>
          <input value={form.company} onChange={e=>set('company',e.target.value)} required className={inputClass} placeholder="Company Name"/></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Location</label>
          <input value={form.location} onChange={e=>set('location',e.target.value)} className={inputClass} placeholder="Remote / City"/></div>
        <div><label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Start Date</label>
          <input value={form.startDate} onChange={e=>set('startDate',e.target.value)} className={inputClass} placeholder="Sep 2025"/></div>
        <div><label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">End Date</label>
          <input value={form.endDate} onChange={e=>set('endDate',e.target.value)} className={inputClass} placeholder="Nov 2025 / Present"/></div>
      </div>
      <div><label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Description</label>
        <textarea value={form.description} onChange={e=>set('description',e.target.value)} rows={4}
          className={`${inputClass} resize-none`} placeholder="What you did here..."/></div>
      <div><label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Tech Stack (comma-separated)</label>
        <input value={form.techStack} onChange={e=>set('techStack',e.target.value)} className={inputClass} placeholder="React, Node.js, MongoDB..."/></div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-dark-border text-slate-400 text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-grad-main text-white font-semibold text-sm disabled:opacity-60">
          {loading ? 'Saving...' : 'Save Experience'}</button>
      </div>
    </form>
  );
}

export default function ExperienceManager() {
  const { experience, fetchAdmin, create, update, delete: del } = useExperienceStore();
  const [editing, setEditing] = useState(null);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => { fetchAdmin(); }, []);

  const handleSave = async (data) => {
    setSaving(true);
    try {
      if (editing === 'new') { await create(data); toast.success('Experience added!'); }
      else { await update(editing._id, data); toast.success('Updated!'); }
      setEditing(null);
    } catch { toast.error('Error saving'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    try { await del(id); toast.success('Deleted'); } catch { toast.error('Error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Experience</h2>
          <p className="text-sm text-slate-500">{experience.length} entries</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-grad-main text-white text-sm font-semibold hover:shadow-glow-blue transition-all">
          <Plus size={16}/> Add Experience
        </button>
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-6 mb-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">{editing==='new'?'Add Experience':'Edit Experience'}</h3>
              <button onClick={() => setEditing(null)} className="text-slate-500 hover:text-white"><X size={18}/></button>
            </div>
            <ExpForm initial={editing==='new'?EMPTY:editing} onSave={handleSave} onCancel={()=>setEditing(null)} loading={saving}/>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {experience.map(exp => (
          <div key={exp._id}
            className="bg-dark-card border border-dark-border rounded-2xl p-5
              hover:border-accent-blue/20 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue flex-shrink-0">
                <Briefcase size={18}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-white">{exp.role}</h4>
                    <p className="text-accent-blue text-sm font-medium">{exp.company}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{exp.startDate} – {exp.endDate} {exp.location && `· ${exp.location}`}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button onClick={() => setEditing(exp)}
                      className="w-8 h-8 rounded-lg bg-dark-bg2 text-slate-400 hover:text-accent-blue flex items-center justify-center transition-colors">
                      <Edit2 size={13}/>
                    </button>
                    <button onClick={() => handleDelete(exp._id)}
                      className="w-8 h-8 rounded-lg bg-dark-bg2 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors">
                      <Trash2 size={13}/>
                    </button>
                  </div>
                </div>
                {exp.description && <p className="text-sm text-slate-400 mt-2 leading-relaxed">{exp.description}</p>}
                {exp.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.techStack.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {experience.length === 0 && (
          <div className="text-center py-16 text-slate-600">
            <Briefcase size={40} className="mx-auto mb-3 opacity-20"/>
            <p className="text-sm">No experience entries yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
