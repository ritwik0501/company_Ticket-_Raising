
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { useAuth } from '../../auth/AuthContext';

export default function MyTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchTickets = async () => {
      setLoading(true);
      setError(null);

      try {
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

    fetchTickets();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-xl text-slate-400">
        Loading your tickets…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">
            My Tickets
          </h1>
          <p className="text-slate-400">
            Track the status of all your submitted requests
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4">
            {error}
          </div>
        )}

        {tickets.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
            <p className="text-2xl font-semibold">No tickets yet</p>
            <p className="text-slate-400 mt-2">
              Once you create a ticket, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map(t => (
              <div
                key={t._id}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold">
                      {t.title || 'Untitled ticket'}
                    </p>
                    <StatusBadge status={t.status} />
                  </div>

                  <span className="text-xs bg-black/40 px-3 py-1 rounded-full text-slate-300">
                    {t.referenceID || '—'}
                  </span>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-sm text-slate-400">
                  Ticket ID: <span className="text-slate-200">{t._id.slice(-6)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================= */
/* Status Badge              */
/* ========================= */
function StatusBadge({ status }) {
  const safeStatus = status || 'Unknown';

  const colorMap = {
    'In Compliance Review': 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    'In Resolution': 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    'Waiting for Client': 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    'Ready to Close': 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    'Closed': 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    'Unknown': 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
  };

  return (
    <span className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-xs font-semibold ${colorMap[safeStatus] || colorMap.Unknown}`}>
      <span className="w-2 h-2 rounded-full bg-current"></span>
      {safeStatus}
    </span>
  );
}
