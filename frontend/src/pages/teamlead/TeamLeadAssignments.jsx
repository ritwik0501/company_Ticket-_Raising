import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function TeamLeadAssignments() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tl/team-lead/assignments');

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.assignments || [];

      setTasks(data);
      console.log("tasks",data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(
        `/tl/team-lead/assignments/${id}/status`,
        { status }
      );
      alert('Task updated');
      fetchTasks();
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading) {
    return <div className="p-6">Loading tasks...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Tasks</h1>

      {tasks.length === 0 && (
        <p className="text-slate-400">No assigned tasks</p>
      )}

      {tasks.map(t => (
        <div
          key={t._id}
          className="glass p-4 rounded-xl shadow-lg"
        >
          {/* Ticket Info */}
          <div className="mb-2">
            <p className="font-semibold text-lg">
              {t.ticket_id?.title || 'Untitled Ticket'}
            </p>

            <p className="text-sm text-slate-300 mt-1">
              {t.ticket_id?.description || 'No description provided'}
            </p>
          </div>

          {/* Assignment Info */}
          <div className="text-sm text-slate-400">
            <p>Department: {t.department}</p>
            <p>Status: {t.status}</p>
          </div>

          {/* Actions */}
          {t.status !== 'Resolved' && (
            <button
              onClick={() => updateStatus(t._id, 'Resolved')}
              className="btn-primary mt-3"
            >
              Mark as Resolved
            </button>
          )}

          {t.status === 'Resolved' && (
            <p className="mt-3 text-emerald-400 text-sm">
              Resolved ✔
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
