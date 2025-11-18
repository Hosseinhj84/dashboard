import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ProjectStatusCard() {
  const [stats, setStatus] = useState(null);

  useEffect(() => {
    api
      .get("tasks/stats")
      .then((res) => setStatus(res.data))
      .catch((err) => console.log("stats API error: ", err));
  }, []);

  if (!stats) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">وضعیت پروژه‌ها</h2>
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white-800 shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">وضعیت پروژه‌ها</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>کل وظایف:</span>
          <span className="font-bold">{stats.total}</span>
        </div>

        <div className="flex justify-between">
          <span>انجام شده:</span>
          <span className="font-bold text-emerald-500">{stats.done}</span>
        </div>

        <div className="flex justify-between">
          <span>درصد پیشرفت:</span>
          <span className="font-bold">{stats.percent}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded-full mt-4">
        <div
          className="h-3 rounded-full bg-emerald-500 transition-all"
          style={{ width: `${stats.percent}%` }}
        ></div>
      </div>
    </div>
  );
}
