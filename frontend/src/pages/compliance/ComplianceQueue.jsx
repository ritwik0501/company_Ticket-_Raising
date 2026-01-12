// import { useEffect, useState } from 'react';
// import api from '../../api/api';

// const DEPARTMENTS = ['Resume', 'Marketing', 'Sales', 'Technical'];
// const MARKETING_BRANCHES = ['AHM', 'LKO', 'GGR'];

// export default function ComplianceQueue() {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Track department selection per ticket
//   const [selection, setSelection] = useState({});

//   useEffect(() => {
//     fetchQueue();
//   }, []);

//   const fetchQueue = async () => {
//     try {
//       const res = await api.get('/admin/compliance/queue');

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data.tickets || [];

//       setTickets(data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load compliance queue');
//       setLoading(false);
//     }
//   };

//   const toggleDepartment = (ticketId, dept) => {
//     setSelection(prev => {
//       const current = prev[ticketId] || [];
//       return {
//         ...prev,
//         [ticketId]: current.includes(dept)
//           ? current.filter(d => d !== dept)
//           : [...current, dept]
//       };
//     });
//   };

//   const setBranch = (ticketId, branch) => {
//     setSelection(prev => ({
//       ...prev,
//       [`${ticketId}_branch`]: branch
//     }));
//   };

//   const approveTicket = async (ticketId) => {
//     const departments = (selection[ticketId] || []).map(dep => {
//       if (dep === 'Marketing') {
//         return {
//           name: 'Marketing',
//           branch: selection[`${ticketId}_branch`]
//         };
//       }
//       return { name: dep };
//     });

//     if (departments.length === 0) {
//       alert('Select at least one department');
//       return;
//     }

//     try {
//       await api.post(`/admin/compliance/tickets/${ticketId}/approve`, {
//         departments
//       });
//       alert('Ticket approved');
//       fetchQueue();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Approval failed');
//     }
//   };

//   const closeTicket = async (ticketId) => {
//     try {
//       await api.post(`/admin/compliance/tickets/${ticketId}/close`);
//       alert('Ticket closed');
//       fetchQueue();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Close failed');
//     }
//   };

//   if (loading) return <p className="p-6">Loading compliance queue...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Compliance Queue</h1>

//       {tickets.length === 0 && (
//         <p className="text-gray-500">No tickets pending compliance</p>
//       )}

//       {tickets.map(ticket => (
//         <div
//           key={ticket._id}
//           className="bg-white rounded-xl shadow p-4 mb-4"
//         >
//           {/* Ticket Info */}
//           <div className="mb-3">
//             <p className="font-semibold text-lg">{ticket.title}</p>
//             <p className="text-sm text-gray-500">
//               Priority: {ticket.priority} | Status: {ticket.status}
//             </p>
//             <p className="text-xs text-gray-400">
//               Ref: {ticket.referenceID}
//             </p>
//           </div>

//           {/* Assign Departments (only if in compliance review) */}
//           {ticket.status === 'In Compliance Review' && (
//             <>
//               <div className="flex flex-wrap gap-3 mb-3">
//                 {DEPARTMENTS.map(dep => (
//                   <label key={dep} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       onChange={() =>
//                         toggleDepartment(ticket._id, dep)
//                       }
//                       checked={
//                         selection[ticket._id]?.includes(dep) || false
//                       }
//                     />
//                     <span>{dep}</span>
//                   </label>
//                 ))}
//               </div>

//               {/* Marketing Branch */}
//               {selection[ticket._id]?.includes('Marketing') && (
//                 <select
//                   className="input mb-3"
//                   onChange={e =>
//                     setBranch(ticket._id, e.target.value)
//                   }
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Select Marketing Branch
//                   </option>
//                   {MARKETING_BRANCHES.map(b => (
//                     <option key={b} value={b}>
//                       {b}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               <button
//                 onClick={() => approveTicket(ticket._id)}
//                 className="btn-primary"
//               >
//                 Approve & Assign
//               </button>
//             </>
//           )}

//           {/* Close Ticket */}
//           {ticket.status === 'Ready to Close' && (
//             <button
//               onClick={() => closeTicket(ticket._id)}
//               className="btn-primary bg-green-600 mt-2"
//             >
//               Close Ticket
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

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

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-lg">
        Loading compliance queue…
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-400 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">Compliance Queue</h1>
          <p className="text-slate-400 mt-1">
            Review and route tickets to the correct departments
          </p>
        </div>

        {tickets.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-xl font-semibold">No pending tickets</p>
            <p className="text-slate-400 mt-2">
              All compliance checks are cleared.
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {tickets.map(ticket => (
            <div
              key={ticket._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition"
            >
              {/* Ticket Header */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-lg font-semibold">{ticket.title}</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Priority: <span className="text-white">{ticket.priority}</span> •
                    Status: <span className="text-white"> {ticket.status}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Ref: {ticket.referenceID}
                  </p>
                </div>
              </div>

              {/* Assign Departments */}
              {ticket.status === 'In Compliance Review' && (
                <>
                  <div className="mt-5 space-y-3">
                    <p className="text-sm text-slate-300 font-semibold">
                      Assign Departments
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {DEPARTMENTS.map(dep => (
                        <label
                          key={dep}
                          className={`px-4 py-2 rounded-xl border cursor-pointer transition
                            ${
                              selection[ticket._id]?.includes(dep)
                                ? 'bg-indigo-500/20 border-indigo-500'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selection[ticket._id]?.includes(dep) || false}
                            onChange={() => toggleDepartment(ticket._id, dep)}
                          />
                          {dep}
                        </label>
                      ))}
                    </div>

                    {selection[ticket._id]?.includes('Marketing') && (
                      <select
                        className="w-full mt-3 bg-white/10 border border-white/10 rounded-xl px-4 py-2"
                        onChange={e => setBranch(ticket._id, e.target.value)}
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
                      className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:scale-[1.02] transition"
                    >
                      Approve & Assign
                    </button>
                  </div>
                </>
              )}

              {/* Close Ticket */}
              {ticket.status === 'Ready to Close' && (
                <button
                  onClick={() => closeTicket(ticket._id)}
                  className="w-full mt-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 font-semibold hover:scale-[1.02] transition"
                >
                  Close Ticket
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
