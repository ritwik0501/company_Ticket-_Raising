
// export default function TeamLeadDashboard() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     api.get('/tl/team-lead/assignments')
//       .then(res => setTasks(res.data.assignments || []));
//   }, []);

//   const inProgress = tasks.filter(t => t.status === 'In Progress');

//   return (
//     <>
//       <div className="grid grid-cols-3 gap-4">
//         <StatCard title="My Tasks" value={tasks.length} />
//         <StatCard title="In Progress" value={inProgress.length} />
//       </div>

//       <Link to="/teamlead" className="btn-primary mt-4 inline-block">
//         Open My Tasks
//       </Link>
//     </>
//   );
// }


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import StatCard from './StatCard';

export default function TeamLeadDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/tl/team-lead/assignments')
      .then(res => setTasks(res.data.assignments || []));
  }, []);

  const inProgress = tasks.filter(t => t.status === 'In Progress');

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Team Lead Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard
          title="My Tasks"
          value={tasks.length}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl hover:scale-105 transform transition duration-300"
        />
        <StatCard
          title="In Progress"
          value={inProgress.length}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-xl hover:scale-105 transform transition duration-300"
        />
      </div>

      <div className="mt-8 flex justify-center md:justify-start">
        <Link
          to="/teamlead"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-green-500/40 transition transform hover:-translate-y-1 hover:scale-105 font-semibold"
        >
          Open My Tasks
        </Link>
      </div>
    </div>
  );
}
