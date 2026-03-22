import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { socialAPI } from '../../services/api.js';

const EMPTY = { platform: '', url: '', icon: '🔗', label: '', visible: true };
const PLATFORMS = ['GitHub','LinkedIn','LeetCode','Twitter','YouTube','Instagram','Discord','Website'];

export default function SocialManager() {
  const [links,   setLinks]   = useState([]);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(EMPTY);
  const [saving,  setSaving]  = useState(false);

  const fetchLinks = async () => {
    try { const { data } = await socialAPI.getAllAdmin(); setLinks(data.data || []); }
    catch { toast.error('Failed to load'); }
  };

  useEffect(() => { fetchLinks(); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleEdit = (link) => { setEditing(link); setForm(link); };
  const handleNew  = ()     => { setEditing('new'); setForm(EMPTY); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing === 'new') {
        const { data } = await socialAPI.create(form);
        setLinks(l => [...l, data.data]);
        toast.success('Social link added!');
      } else {
        const { data } = await socialAPI.update(editing._id, form);
        setLinks(l => l.map(x => x._id === editing._id ? data.data : x));
        toast.success('Updated!');
      }
      setEditing(null);
    } catch { toast.error('Error saving'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this social link?')) return;
    try {
      await socialAPI.delete(id);
      setLinks(l => l.filter(x => x._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Error'); }
  };

  const inputClass = `w-full px-3 py-2.5 rounded-xl text-sm bg-dark-bg border border-dark-border
    text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent-blue transition-colors`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Social Links</h2>
          <p className="text-sm text-slate-500">{links.length} links configured</p>
        </div>
        <button onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-grad-main text-white text-sm font-semibold hover:shadow-glow-blue transition-all">
          <Plus size={16}/> Add Link
        </button>
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-6 mb-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">{editing==='new'?'Add Social Link':'Edit Link'}</h3>
              <button onClick={()=>setEditing(null)} className="text-slate-500 hover:text-white"><X size={18}/></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Platform</label>
                  <select value={form.platform} onChange={e=>set('platform',e.target.value)} className={inputClass}>
                    <option value="">Select platform</option>
                    {PLATFORMS.map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Icon (emoji)</label>
                  <input value={form.icon} onChange={e=>set('icon',e.target.value)} className={inputClass} placeholder="🔗"/>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">URL *</label>
                <input value={form.url} onChange={e=>set('url',e.target.value)} required className={inputClass} placeholder="https://..."/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Display Label (optional)</label>
                <input value={form.label} onChange={e=>set('label',e.target.value)} className={inputClass} placeholder="e.g. Utkal9"/>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={()=>setEditing(null)} className="flex-1 py-2.5 rounded-xl border border-dark-border text-slate-400 text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-grad-main text-white font-semibold text-sm disabled:opacity-60">
                  {saving?'Saving...':'Save Link'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {links.map(link => (
          <div key={link._id}
            className="flex items-center gap-4 p-4 bg-dark-card border border-dark-border rounded-xl
              hover:border-accent-blue/20 transition-all group">
            <div className="text-2xl w-10 text-center">{link.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white text-sm">{link.platform}</div>
              <a href={link.url} target="_blank" rel="noreferrer"
                className="text-xs text-accent-blue hover:underline truncate block">{link.url}</a>
              {link.label && <div className="text-xs text-slate-500 mt-0.5">@{link.label}</div>}
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(link)}
                className="w-8 h-8 rounded-lg bg-dark-bg2 text-slate-400 hover:text-accent-blue flex items-center justify-center transition-colors">
                <Edit2 size={13}/>
              </button>
              <button onClick={() => handleDelete(link._id)}
                className="w-8 h-8 rounded-lg bg-dark-bg2 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors">
                <Trash2 size={13}/>
              </button>
            </div>
          </div>
        ))}
        {links.length === 0 && (
          <div className="text-center py-16 text-slate-600">
            <Link2 size={36} className="mx-auto mb-3 opacity-20"/>
            <p className="text-sm">No social links yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
