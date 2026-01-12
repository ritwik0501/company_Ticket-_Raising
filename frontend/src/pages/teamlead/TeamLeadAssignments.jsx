// import { useEffect, useState } from 'react';
// import api from '../../api/api';

// export default function TeamLeadAssignments() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await api.get('/tl/team-lead/assignments');

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data.assignments || [];

//       setTasks(data);
//       console.log("tasks",data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await api.patch(
//         `/tl/team-lead/assignments/${id}/status`,
//         { status }
//       );
//       alert('Task updated');
//       fetchTasks();
//     } catch (err) {
//       alert('Update failed');
//     }
//   };

//   if (loading) {
//     return <div className="p-6">Loading tasks...</div>;
//   }

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold">My Tasks</h1>

//       {tasks.length === 0 && (
//         <p className="text-slate-400">No assigned tasks</p>
//       )}

//       {tasks.map(t => (
//         <div
//           key={t._id}
//           className="glass p-4 rounded-xl shadow-lg"
//         >
//           {/* Ticket Info */}
//           <div className="mb-2">
//             <p className="font-semibold text-lg">
//               {t.ticket_id?.title || 'Untitled Ticket'}
//             </p>

//             <p className="text-sm text-slate-300 mt-1">
//               {t.ticket_id?.description || 'No description provided'}
//             </p>
//           </div>

//           {/* Assignment Info */}
//           <div className="text-sm text-slate-400">
//             <p>Department: {t.department}</p>
//             <p>Status: {t.status}</p>
//           </div>

//           {/* Actions */}
//           {t.status !== 'Resolved' && (
//             <button
//               onClick={() => updateStatus(t._id, 'Resolved')}
//               className="btn-primary mt-3"
//             >
//               Mark as Resolved
//             </button>
//           )}

//           {t.status === 'Resolved' && (
//             <p className="mt-3 text-emerald-400 text-sm">
//               Resolved ✔
//             </p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

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
      console.log("tasks", data);
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
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-lg">
        Loading your assignments…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">My Assigned Tasks</h1>
          <p className="text-slate-400">
            Manage and resolve the tickets assigned to you
          </p>
        </div>

        {tasks.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-xl font-semibold">No assigned tasks</p>
            <p className="text-slate-400 mt-2">
              You don’t have any tickets assigned yet.
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map(t => (
            <div
              key={t._id}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl transition"
            >
              {/* Ticket Info */}
              <div className="space-y-2">
                <p className="text-lg font-semibold leading-snug">
                  {t.ticket_id?.title || 'Untitled Ticket'}
                </p>

                <p className="text-sm text-slate-400 line-clamp-3">
                  {t.ticket_id?.description || 'No description provided'}
                </p>
              </div>

              {/* Meta */}
              <div className="mt-4 pt-4 border-t border-white/10 text-sm text-slate-400 space-y-1">
                <p>
                  Department: <span className="text-slate-200">{t.department}</span>
                </p>
                <p>
                  Status: <span className="text-slate-200">{t.status}</span>
                </p>
              </div>

              {/* Actions */}
              {t.status !== 'Resolved' && (
                <button
                  onClick={() => updateStatus(t._id, 'Resolved')}
                  className="w-full mt-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-semibold hover:scale-[1.02] transition shadow-lg"
                >
                  Mark as Resolved
                </button>
              )}

              {t.status === 'Resolved' && (
                <div className="mt-5 flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Resolved
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
