// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';

// // TEMP: comment these if not created yet
// // import ClientDashboard from './client/ClientDashboard';
// // import ComplianceDashboard from './compliance/ComplianceDashboard';
// // import ManagerDashboard from './manager/ManagerDashboard';
// // import TeamLeadDashboard from './teamlead/TeamLeadDashboard';

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   // 🔒 HARD GUARD
//   if (!user) {
//     return <div className="p-6">Loading user...</div>;
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">
//           Welcome, {user.name || 'User'}
//         </h1>

//         <button
//           onClick={async () => {
//             await logout();
//             navigate('/login');
//           }}
//           className="btn-secondary"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="glass p-4 rounded-xl flex flex-wrap gap-3">
//         <Link to="/" className="btn-secondary">Home</Link>

//         {user.role === 'CLIENT' && (
//           <>
//             <Link to="/client/create" className="btn-primary">Create Ticket</Link>
//             <Link to="/client/tickets" className="btn-secondary">My Tickets</Link>
//           </>
//         )}

//         {user.role === 'SUPER_ADMIN' && (
//           <Link to="/compliance" className="btn-primary">Compliance Queue</Link>
//         )}

//         {user.role === 'ADMIN' && (
//           <Link to="/manager" className="btn-primary">Manager Assignments</Link>
//         )}

//         {user.role === 'USER' && (
//           <Link to="/teamlead" className="btn-primary">Team Lead Board</Link>
//         )}
//       </div>

//       {/* COMMENT THESE UNTIL VERIFIED */}
//       {/* {user.role === 'CLIENT' && <ClientDashboard />} */}
//       {/* {user.role === 'SUPER_ADMIN' && <ComplianceDashboard />} */}
//       {/* {user.role === 'ADMIN' && <ManagerDashboard />} */}
//       {/* {user.role === 'USER' && <TeamLeadDashboard />} */}
//     </div>
//   );
// }

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// TEMP: comment these if not created yet
// import ClientDashboard from './client/ClientDashboard';
// import ComplianceDashboard from './compliance/ComplianceDashboard';
// import ManagerDashboard from './manager/ManagerDashboard';
// import TeamLeadDashboard from './teamlead/TeamLeadDashboard';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🔒 HARD GUARD
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-lg">
        Loading user…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome, {user.name || 'User'}
          </h1>
          <p className="text-slate-400 mt-1">
            Manage your tickets and workflow from here
          </p>
        </div>

        <button
          onClick={async () => {
            await logout();
            navigate('/login');
          }}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:text-red-400 transition"
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-wrap gap-3">

        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          Home
        </Link>

        {user.role === 'CLIENT' && (
          <>
            <Link
              to="/client/create"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold shadow-lg"
            >
              Create Ticket
            </Link>

            <Link
              to="/client/tickets"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              My Tickets
            </Link>
          </>
        )}

        {user.role === 'SUPER_ADMIN' && (
          <Link
            to="/compliance"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 font-semibold shadow-lg"
          >
            Compliance Queue
          </Link>
        )}

        {user.role === 'ADMIN' && (
          <Link
            to="/manager"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-semibold shadow-lg"
          >
            Manager Assignments
          </Link>
        )}

        {user.role === 'USER' && (
          <Link
            to="/teamlead"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold shadow-lg"
          >
            Team Lead Board
          </Link>
        )}
      </div>

      {/* COMMENT THESE UNTIL VERIFIED */}
      {/* {user.role === 'CLIENT' && <ClientDashboard />} */}
      {/* {user.role === 'SUPER_ADMIN' && <ComplianceDashboard />} */}
      {/* {user.role === 'ADMIN' && <ManagerDashboard />} */}
      {/* {user.role === 'USER' && <TeamLeadDashboard />} */}

    </div>
  );
}
