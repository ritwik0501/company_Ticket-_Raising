import { useEffect, useState } from 'react';
import api from '../../api/api';

const DEPARTMENTS = ['Resume', 'Marketing', 'Sales', 'Technical'];
const MARKETING_BRANCHES = ['AHM', 'LKO', 'GGR'];

export default function ComplianceQueue() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track department selection per ticket
  const [selection, setSelection] = useState({});

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await api.get('/admin/compliance/queue');

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.tickets || [];

      setTickets(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load compliance queue');
      setLoading(false);
    }
  };

  const toggleDepartment = (ticketId, dept) => {
    setSelection(prev => {
      const current = prev[ticketId] || [];
      return {
        ...prev,
        [ticketId]: current.includes(dept)
          ? current.filter(d => d !== dept)
          : [...current, dept]
      };
    });
  };

  const setBranch = (ticketId, branch) => {
    setSelection(prev => ({
      ...prev,
      [`${ticketId}_branch`]: branch
    }));
  };

  const approveTicket = async (ticketId) => {
    const departments = (selection[ticketId] || []).map(dep => {
      if (dep === 'Marketing') {
        return {
          name: 'Marketing',
          branch: selection[`${ticketId}_branch`]
        };
      }
      return { name: dep };
    });

    if (departments.length === 0) {
      alert('Select at least one department');
      return;
    }

    try {
      await api.post(`/admin/compliance/tickets/${ticketId}/approve`, {
        departments
      });
      alert('Ticket approved');
      fetchQueue();
    } catch (err) {
      alert(err.response?.data?.message || 'Approval failed');
    }
  };

  const closeTicket = async (ticketId) => {
    try {
      await api.post(`/admin/compliance/tickets/${ticketId}/close`);
      alert('Ticket closed');
      fetchQueue();
    } catch (err) {
      alert(err.response?.data?.message || 'Close failed');
    }
  };

  if (loading) return <p className="p-6">Loading compliance queue...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Compliance Queue</h1>

      {tickets.length === 0 && (
        <p className="text-gray-500">No tickets pending compliance</p>
      )}

      {tickets.map(ticket => (
        <div
          key={ticket._id}
          className="bg-white rounded-xl shadow p-4 mb-4"
        >
          {/* Ticket Info */}
          <div className="mb-3">
            <p className="font-semibold text-lg">{ticket.title}</p>
            <p className="text-sm text-gray-500">
              Priority: {ticket.priority} | Status: {ticket.status}
            </p>
            <p className="text-xs text-gray-400">
              Ref: {ticket.referenceID}
            </p>
          </div>

          {/* Assign Departments (only if in compliance review) */}
          {ticket.status === 'In Compliance Review' && (
            <>
              <div className="flex flex-wrap gap-3 mb-3">
                {DEPARTMENTS.map(dep => (
                  <label key={dep} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={() =>
                        toggleDepartment(ticket._id, dep)
                      }
                      checked={
                        selection[ticket._id]?.includes(dep) || false
                      }
                    />
                    <span>{dep}</span>
                  </label>
                ))}
              </div>

              {/* Marketing Branch */}
              {selection[ticket._id]?.includes('Marketing') && (
                <select
                  className="input mb-3"
                  onChange={e =>
                    setBranch(ticket._id, e.target.value)
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Marketing Branch
                  </option>
                  {MARKETING_BRANCHES.map(b => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={() => approveTicket(ticket._id)}
                className="btn-primary"
              >
                Approve & Assign
              </button>
            </>
          )}

          {/* Close Ticket */}
          {ticket.status === 'Ready to Close' && (
            <button
              onClick={() => closeTicket(ticket._id)}
              className="btn-primary bg-green-600 mt-2"
            >
              Close Ticket
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
