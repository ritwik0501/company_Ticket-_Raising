export default function StatCard({ title, value }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-5 shadow-xl transform transition hover:scale-105 hover:shadow-2xl">
      <p className="text-sm md:text-base font-medium opacity-80">{title}</p>
      <p className="text-2xl md:text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
