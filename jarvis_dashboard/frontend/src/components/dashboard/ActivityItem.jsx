export default function ActivityItem({ text, time, type }) {
  const colors = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-white">
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${colors[type]}`}></span>
        <p classname="text-gray-700 font-medium">{text}</p>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
  );
}
