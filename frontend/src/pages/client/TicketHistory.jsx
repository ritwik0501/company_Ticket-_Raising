import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/api';

export default function TicketHistory() {
  const { referenceId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, [referenceId]);

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/tickets/history/${referenceId}`);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.tickets || [];

      setTickets(data);
    } catch (err) {
      setError('Failed to load ticket history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading ticket history…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ticket History</h1>
          <Link
            to="/client/tickets"
            className="text-sm text-indigo-400 hover:underline"
          >
            ← Back to My Tickets
          </Link>
        </div>

        {tickets.length === 0 && (
          <p className="text-slate-400">No history found</p>
        )}

        {/* Timeline */}
        <div className="space-y-4">
          {tickets.map((t, index) => (
            <div
              key={t._id}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">
                    {t.title}
                  </p>
                  <p className="text-sm text-slate-400">
                    Status: {t.status}
                  </p>
                </div>

                {/* Reopen Index */}
                {index > 0 && (
                  <span className="text-xs px-2 py-1 rounded-full
                    bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    Reopen #{index}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-1">
                Created: {new Date(t.createdAt).toLocaleString()}
              </p>

              {/* Warning */}
              {(t.warningFlag || t.reopenCount > 1) && (
                <p className="mt-2 text-yellow-400 text-xs">
                  ⚠ Reopened multiple times
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
