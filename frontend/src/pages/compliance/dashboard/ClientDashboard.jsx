

export default function ClientDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get('/tickets/my-tickets')
      .then(res => setTickets(res.data.tickets || []));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 space-y-8">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <StatCard title="My Tickets" value={tickets.length} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/client/create"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:scale-[1.03] transition shadow-lg"
        >
          Create Ticket
        </Link>

        <Link
          to="/client/tickets"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/40 transition rounded-xl"
        >
          View My Tickets
        </Link>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
        <RecentList title="Recent Tickets" items={tickets} />
      </div>

    </div>
  );
}
