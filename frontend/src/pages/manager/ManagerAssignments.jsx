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
  <div className="min-h-screen bg-slate-950 p-4 sm:p-6 text-white">
    <div className="max-w-6xl mx-auto space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Department Assignments</h1>
        <p className="text-slate-400">
          Assign incoming department tickets to team leads
        </p>
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          No assignments available
        </div>
      )}

      <div className="space-y-3">
        {assignments.map(a => {
          const tlList = TEAM_LEADS[a.department] || [];

          return (
            <div
              key={a._id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-indigo-500/40 transition"
            >
              {/* LEFT – Info */}
              <div>
                <p className="text-lg font-semibold">{a.department}</p>
                <p className="text-sm text-slate-400">
                  Status:{" "}
                  <span
                    className={
                      a.status === 'Not Assigned'
                        ? 'text-orange-400'
                        : 'text-emerald-400'
                    }
                  >
                    {a.status}
                  </span>
                </p>
              </div>

              {/* RIGHT – Action */}
              {a.status === 'Not Assigned' ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <select
                    className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500"
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
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:scale-[1.05] transition"
                  >
                    Assign
                  </button>
                </div>
              ) : (
                <span className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm font-semibold">
                  Assigned ✔
                </span>
              )}
            </div>
          );
        })}
      </div>

    </div>
  </div>
);
}