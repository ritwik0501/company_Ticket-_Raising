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
    return <div className="p-6">Loading tickets...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Tickets</h1>

      {error && <div className="text-red-400">{error}</div>}

      {tickets.length === 0 ? (
        <div className="glass p-4 rounded-xl text-slate-300 shadow-lg">
          No tickets yet.
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map(t => (
            <div
              key={t._id}
              className="glass p-4 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    {t.title || 'Untitled ticket'}
                  </p>
                  <StatusBadge status={t.status} />
                </div>

                <span className="text-xs text-slate-400">
                  Ref: {t.referenceID || '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========================= */
/* Status Badge              */
/* ========================= */
function StatusBadge({ status }) {
  const safeStatus = status || 'Unknown';

  const colorMap = {
    'In Compliance Review':
      'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    'In Resolution':
      'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    'Waiting for Client':
      'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    'Ready to Close':
      'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    'Closed':
      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    'Unknown':
      'bg-slate-500/20 text-slate-300 border border-slate-500/30'
  };

  return (
    <span
      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
        colorMap[safeStatus] || colorMap.Unknown
      }`}
    >
      {safeStatus}
    </span>
  );
}
