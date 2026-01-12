import { useEffect, useState } from 'react';
import api from '../../api/api';
import { TEAM_LEADS } from '../../data/teamlead';

export default function ManagerAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [selectedTL, setSelectedTL] = useState({});

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await api.get('/department/manager/assignments');
    setAssignments(res.data.assignments || []);
  };

  const assignTeamLead = async (assignmentId) => {
    const teamLeadId = selectedTL[assignmentId];

    if (!teamLeadId) {
      alert('Please select a Team Lead');
      return;
    }

    try {
      await api.post(
        `/department/manager/assignments/${assignmentId}/assign`,
        { teamLeadId }
      );

      alert('Team Lead assigned successfully');
      fetchAssignments();
    } catch (err) {
      alert(err.response?.data?.message || 'Assignment failed');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Department Assignments</h1>

      {assignments.length === 0 && (
        <p className="text-slate-400">No assignments</p>
      )}

      {assignments.map(a => {
        const tlList = TEAM_LEADS[a.department] || [];

        return (
          <div
            key={a._id}
            className="glass p-4 rounded-xl shadow-lg"
          >
            <p className="font-semibold">
              Department: {a.department}
            </p>

            <p className="text-sm text-slate-400">
              Status: {a.status}
            </p>

            {/* ASSIGN ONLY IF NOT ASSIGNED */}
            {a.status === 'Not Assigned' && (
              <div className="mt-3 flex items-center gap-3">
                <select
                  className="bg-slate-800 border border-slate-600 rounded px-3 py-2"
                  defaultValue=""
                  onChange={e =>
                    setSelectedTL(prev => ({
                      ...prev,
                      [a._id]: e.target.value
                    }))
                  }
                >
                  <option value="" disabled>
                    Select Team Lead
                  </option>

                  {tlList.map(tl => (
                    <option key={tl._id} value={tl._id}>
                      {tl.name}
                      {tl.branch ? ` (${tl.branch})` : ''}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => assignTeamLead(a._id)}
                  className="btn-primary"
                >
                  Assign
                </button>
              </div>
            )}

            {a.status !== 'Not Assigned' && (
              <p className="mt-2 text-emerald-400 text-sm">
                Assigned ✔
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
