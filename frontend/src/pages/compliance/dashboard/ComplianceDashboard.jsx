

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import StatCard from './StatCard';

export default function ComplianceDashboard() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    api.get('/admin/compliance/queue')
      .then(res => setQueue(res.data || []));
  }, []);

  const readyToClose = queue.filter(t => t.status === 'Ready to Close');

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Compliance Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard
          title="In Review"
          value={queue.length}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-xl hover:scale-105 transform transition duration-300"
        />
        <StatCard
          title="Ready to Close"
          value={readyToClose.length}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-xl hover:scale-105 transform transition duration-300"
        />
      </div>

      <div className="mt-8 flex justify-center md:justify-start">
        <Link
          to="/compliance"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg hover:shadow-purple-500/40 transition transform hover:-translate-y-1 hover:scale-105 font-semibold"
        >
          Open Compliance Queue
        </Link>
      </div>
    </div>
  );
}
