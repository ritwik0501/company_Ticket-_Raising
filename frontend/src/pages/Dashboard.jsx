import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../auth/AuthContext';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    warning: 0,
  });

  /* ---------- Guard ---------- */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading…
      </div>
    );
  }

  /* ---------- Fetch Stats ---------- */
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/tickets/my-tickets');
      const tickets = Array.isArray(res.data)
        ? res.data
        : res.data.tickets || [];

      setStats({
        total: tickets.length,
        open: tickets.filter(t => t.status === 'Open').length,
        closed: tickets.filter(t => t.status === 'Closed').length,
        warning: tickets.filter(
          t => t.warningFlag || t.reopenCount > 1
        ).length,
      });
    } catch (err) {
      console.error('Failed to load dashboard stats');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Welcome, {user.name || 'User'}
          </p>
        </div>

        <button
          onClick={async () => {
            await logout();
            navigate('/login');
          }}
          className="btn-secondary"
        >
          Logout
        </button>
      </header>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="flex gap-3 flex-wrap">
        <Link to="/" className="btn-secondary">Home</Link>

        {user.role === 'CLIENT' && (
          <>
            <Link to="/client/create" className="btn-primary">
              Create Ticket
            </Link>
            <Link to="/client/tickets" className="btn-secondary">
              My Tickets
            </Link>
          </>
        )}

        {user.role === 'SUPER_ADMIN' && (
          <Link to="/compliance" className="btn-primary">
            Compliance
          </Link>
        )}

        {user.role === 'ADMIN' && (
          <Link to="/manager" className="btn-primary">
            Manager
          </Link>
        )}

        {user.role === 'USER' && (
          <Link to="/teamlead" className="btn-primary">
            Team Lead
          </Link>
        )}
      </div>

      {/* ================= KPI ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI title="Total Tickets" value={stats.total} />
        <KPI title="Open" value={stats.open} />
        <KPI title="Closed" value={stats.closed} />
        <KPI title="Warning" value={stats.warning} />
      </section>

      {/* ================= CHARTS ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="card">
          <h3 className="font-medium mb-4">Ticket Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Open', value: stats.open },
                  { name: 'Closed', value: stats.closed },
                  { name: 'Warning', value: stats.warning },
                ]}
                dataKey="value"
                outerRadius={90}
              >
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
                <Cell fill="#f59e0b" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-medium mb-4">Ticket Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: 'Total', value: stats.total },
                { name: 'Open', value: stats.open },
                { name: 'Closed', value: stats.closed },
                { name: 'Warning', value: stats.warning },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </section>

      {/* ================= INSIGHTS ================= */}
      <section className="card">
        <h3 className="font-medium mb-3">Insights</h3>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>Total tickets raised: <strong>{stats.total}</strong></li>
          <li>Currently open: <strong>{stats.open}</strong></li>
          <li>Closed successfully: <strong>{stats.closed}</strong></li>

          {stats.warning > 0 && (
            <li className="text-amber-400">
              ⚠ {stats.warning} tickets were reopened multiple times
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function KPI({ title, value }) {
  return (
    <div className="card">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
