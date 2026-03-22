import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMessageStore } from '../../store/index.js';

export default function MessageViewer() {
  const { messages, loading, fetch, markRead, delete: del } = useMessageStore();
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetch(); }, []);

  const handleSelect = async (msg) => {
    setSelected(msg);
    if (!msg.read) { await markRead(msg._id); }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Delete this message?')) return;
    try { await del(id); toast.success('Deleted'); if (selected?._id === id) setSelected(null); }
    catch { toast.error('Error'); }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Messages</h2>
        <p className="text-sm text-slate-500">{messages.filter(m=>!m.read).length} unread of {messages.length} total</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {loading
            ? Array(3).fill(0).map((_,i)=><div key={i} className="skeleton h-20 rounded-xl"/>)
            : messages.map(msg => (
              <div key={msg._id}
                onClick={() => handleSelect(msg)}
                className={`p-4 rounded-xl border cursor-pointer transition-all
                  ${selected?._id === msg._id
                    ? 'border-accent-blue/40 bg-accent-blue/5'
                    : 'border-dark-border bg-dark-card hover:border-dark-border/60'
                  }
                  ${!msg.read ? 'border-l-2 border-l-accent-blue' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate">{msg.name}</span>
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-accent-blue flex-shrink-0"/>}
                    </div>
                    <div className="text-xs text-accent-blue truncate">{msg.email}</div>
                    <div className="text-xs text-slate-500 truncate mt-1">{msg.message}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[10px] text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <button onClick={e=>handleDelete(msg._id,e)}
                      className="w-6 h-6 rounded-lg text-slate-600 hover:text-red-400 flex items-center justify-center hover:bg-red-400/10 transition-all">
                      <Trash2 size={11}/>
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
          {messages.length === 0 && !loading && (
            <div className="text-center py-12 text-slate-500">
              <Mail size={32} className="mx-auto mb-3 opacity-30"/>
              <p className="text-sm">No messages yet</p>
            </div>
          )}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <motion.div
              key={selected._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-card border border-dark-border rounded-2xl p-6 sticky top-6"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-bold text-white text-lg">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-accent-blue hover:underline">{selected.email}</a>
                </div>
                <span className="text-xs text-slate-500">{new Date(selected.createdAt).toLocaleString()}</span>
              </div>
              {selected.subject && (
                <div className="mb-4">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Subject</span>
                  <p className="text-sm text-slate-300 mt-1 font-medium">{selected.subject}</p>
                </div>
              )}
              <div className="mb-5">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Message</span>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed whitespace-pre-wrap bg-dark-bg rounded-xl p-4">
                  {selected.message}
                </p>
              </div>
              <div className="flex gap-3">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your message'}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                    bg-grad-main text-white text-sm font-semibold hover:shadow-glow-blue transition-all">
                  <Mail size={15}/> Reply
                </a>
                <button onClick={e=>handleDelete(selected._id,e)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                    border border-red-500/20 bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-all">
                  <Trash2 size={15}/> Delete
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-600">
              <Mail size={40} className="mb-3 opacity-20"/>
              <p className="text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
