import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/api';
import { useAuth } from '../../auth/AuthContext';
import { Link } from 'react-router-dom';

export default function MyTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    fetchTickets();
  }, [user]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tickets/my-tickets');
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.tickets || [];
      setTickets(data);
    } catch (err) {
      setError('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const reopenTicket = async (ticketId) => {
    if (!window.confirm('Reopen this ticket?')) return;

    try {
      await api.post(`/tickets/${ticketId}/reopen`);
      fetchTickets();
    } catch (err) {
      alert(err.response?.data?.message || 'Reopen failed');
    }
  };

  /* ---------- UI HELPERS ---------- */

  const statusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'In Progress':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Closed':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  /* ---------- LOADING SKELETON ---------- */
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="h-28 rounded-xl bg-white/5 animate-pulse"
          />
        ))}
      </div>
    );
  }


  return (
    
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold tracking-tight"
      >
        🎫 My Tickets
      </motion.h1>

      {error && (
        <p className="text-red-400">{error}</p>
      )}

      {tickets.length === 0 && (
        <p className="text-slate-400">No tickets found</p>
      )}

      <AnimatePresence>
        {tickets.map((t, index) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="
              glass rounded-2xl p-5
              border border-white/10
              shadow-xl backdrop-blur-xl
            "
          >
            {/* HEADER */}
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="text-lg font-semibold">
                  {t.title}
                </p>

                <span
                  className={`inline-block mt-1 text-xs px-3 py-1 rounded-full border ${statusColor(t.status)}`}
                >
                  {t.status}
                </span>
              </div>

              {/* ⚠️ WARNING */}
              {(t.warningFlag || t.reopenCount > 1) && (
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="
                    inline-flex items-center gap-1
                    text-xs font-semibold px-3 py-1 rounded-full
                    bg-yellow-500/20 text-yellow-400
                    border border-yellow-500/30
                  "
                >
                  ⚠ Reopened multiple times
                </motion.span>
              )}
            </div>

            {/* META */}
            <p className="text-xs text-slate-500 mt-2">
              Ref ID: {t.referenceID}
            </p>

            {/* ACTIONS */}
            <div className="mt-4">
              {t.status === 'Closed' ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => reopenTicket(t._id)}
                  className="
                    px-4 py-2 rounded-lg text-sm font-medium
                    bg-yellow-600 hover:bg-yellow-700
                    transition-colors
                  "
                >
                  🔄 Reopen Ticket
                </motion.button>
              ) : (
                <span className="text-xs text-slate-400">
                  Ticket must be closed to reopen
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
