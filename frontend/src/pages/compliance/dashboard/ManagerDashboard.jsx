

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import StatCard from './StatCard';

export default function ManagerDashboard() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    api.get('/department/manager/assignments')
      .then(res => setAssignments(res.data.assignments || []));
  }, []);

  const unassigned = assignments.filter(a => a.status === 'Not Assigned');

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Manager Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Assignments"
          value={assignments.length}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl hover:scale-105 transform transition duration-300"
        />
        <StatCard
          title="Unassigned"
          value={unassigned.length}
          className="bg-gradient-to-r from-red-400 to-red-600 text-white shadow-xl hover:scale-105 transform transition duration-300"
        />
      </div>

      <div className="mt-8 flex justify-center md:justify-start">
        <Link
          to="/manager"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-green-500/40 transition transform hover:-translate-y-1 hover:scale-105 font-semibold"
        >
          Manage Assignments
        </Link>
      </div>
    </div>
  );
}
