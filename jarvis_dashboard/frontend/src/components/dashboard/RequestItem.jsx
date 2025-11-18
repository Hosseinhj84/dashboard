export default function RequestItem({ user, title, status }) {
  const statusColors = {
    pending: "text-yellow-600 bg-yellow-100",
    solved: "text-green-600 bg-green-100",
    rejected: "text-red-600 bg-red-100",
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border shadow-sm bg-white">
      <div>
        <p className="text-gray-800 font-semibold">{user}</p>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>

      <span className={`px-3 py-1 text-sm rounded-full ${statusColors[status]}`}>
        {status === "pending" && "در حال بررسی"}
        {status === "solved" && "حل شده"}
        {status === "rejected" && "رد شده"}
      </span>
    </div>
  );
}
