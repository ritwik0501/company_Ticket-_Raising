// export default function RecentList({ title, items }) {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow mt-6">
//       <h3 className="font-semibold mb-2">{title}</h3>
//       {items.slice(0, 5).map(item => (
//         <div key={item._id} className="border-b py-2 text-sm">
//           {item.title || item.department}
//         </div>
//       ))}
//       {items.length === 0 && (
//         <p className="text-gray-400 text-sm">No data</p>
//       )}
//     </div>
//   );
// }

export default function RecentList({ title, items }) {
  return (
    <div className="bg-white/90 dark:bg-slate-900 rounded-2xl p-5 shadow-lg mt-6 transition-all hover:shadow-2xl">
      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        {title}
      </h3>

      {items.length === 0 && (
        <p className="text-gray-400 dark:text-gray-500 text-sm">No data</p>
      )}

      <div className="space-y-2">
        {items.slice(0, 5).map(item => (
          <div
            key={item._id}
            className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {item.title || item.department}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {item.date ? new Date(item.date).toLocaleDateString() : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
