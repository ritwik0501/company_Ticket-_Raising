
import { useState } from 'react';
import api from '../../api/api';
import { Navigate, useNavigate } from 'react-router-dom';

export default function CreateTicket() {
  const [data, setData] = useState({
    title: '',
    description: '',
    priority: 'Medium'
  });
  const navigate =useNavigate();

  const submit = async () => {
    await api.post('/tickets', data);
    alert('Ticket created');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Create Ticket</h1>
          <p className="text-slate-400 mt-2">
            Submit a new support request and track its progress.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Ticket Title
            </label>
            <input
              placeholder="Enter a short title"
              onChange={e => setData({ ...data, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your issue in detail..."
              onChange={e => setData({ ...data, description: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Priority
            </label>
            <select
              onChange={e => setData({ ...data, priority: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button
              onClick={submit}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:scale-[1.03] transition shadow-lg"
            >
              Submit Ticket
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
