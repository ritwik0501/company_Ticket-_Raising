import { useEffect, useState } from 'react';
import api from '../../api/api';

const DEPARTMENTS = ['Resume', 'Marketing', 'Sales', 'Technical'];
const MARKETING_BRANCHES = ['AHM', 'LKO', 'GGR'];

export default function ComplianceQueue() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selection, setSelection] = useState({});

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await api.get('/admin/compliance/queue');
      setTickets(res.data.tickets || res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load tickets');
    } finally {
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
    const departments = (selection[ticketId] || []).map(dep =>
      dep === 'Marketing'
        ? { name: 'Marketing', branch: selection[`${ticketId}_branch`] }
        : { name: dep }
    );

    if (departments.length === 0) {
      alert('Select at least one department');
      return;
    }

    try {
      await api.post(`/admin/compliance/tickets/${ticketId}/approve`, {
        departments
      });
      alert('Ticket approved');
      fetchTickets();
    } catch (err) {
      alert(err.response?.data?.message || 'Approval failed');
    }
  };

  const closeTicket = async (ticketId) => {
    try {
      await api.post(`/admin/compliance/tickets/${ticketId}/close`);
      alert('Ticket closed successfully');
      fetchTickets();
    } catch (err) {
      alert(err.response?.data?.message || 'Close failed');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Compliance Dashboard</h1>

      {tickets.length === 0 && (
        <p className="text-gray-500">No tickets</p>
      )}

      {tickets.map(ticket => (
        <div
          key={ticket._id}
          className="glass p-4 rounded-xl shadow"
        >
          {/* Ticket Info */}
          <div className="mb-3">
            <p className="font-semibold text-lg">{ticket.title}</p>
            <p className="text-sm text-gray-400">
              Priority: {ticket.priority} | Status: {ticket.status}
            </p>
            <p className="text-xs text-gray-500">
              Ref: {ticket.referenceID}
            </p>
          </div>

            {/* Department Progress */}
<div className="mt-3 space-y-1">
  <p className="text-sm font-semibold">Department Progress</p>

  {ticket.assignments?.map(a => (
    <div
      key={a._id}
      className="flex justify-between text-sm"
    >
      <span>
        {a.department}
        {a.branch ? ` (${a.branch})` : ''}
      </span>

      <span
        className={
          a.status === 'Resolved'
            ? 'text-emerald-400'
            : 'text-yellow-400'
        }
      >
        {a.status}
      </span>
    </div>
  ))}
</div>


          {/* COMPLIANCE REVIEW */}
          {ticket.status === 'In Compliance Review' && (
            <>
              <div className="flex flex-wrap gap-3 mb-3">
                {DEPARTMENTS.map(dep => (
                  <label key={dep} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selection[ticket._id]?.includes(dep) || false}
                      onChange={() =>
                        toggleDepartment(ticket._id, dep)
                      }
                    />
                    <span>{dep}</span>
                  </label>
                ))}
              </div>

              {selection[ticket._id]?.includes('Marketing') && (
                <select
                  className="input mb-3"
                  defaultValue=""
                  onChange={e =>
                    setBranch(ticket._id, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select Marketing Branch
                  </option>
                  {MARKETING_BRANCHES.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              )}

              <button
                className="btn-primary"
                onClick={() => approveTicket(ticket._id)}
              >
                Approve & Assign
              </button>
            </>
          )}

          {/* READY TO CLOSE */}
          {ticket.status === 'Ready to Close' && (
            <button
              onClick={() => closeTicket(ticket._id)}
              className="btn-primary bg-emerald-600"
            >
              Final Close Ticket
            </button>
          )}

          {/* CLOSED TRACKING */}
          {ticket.status === 'Closed' && (
            <p className="text-emerald-400 text-sm">
              ✔ Ticket Closed (Tracked)
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
