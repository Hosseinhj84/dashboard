import { useState, useEffect } from "react";
import api from "../../api/api";
import { ClipboardList, CheckCircle2, Clock } from "lucide-react";

export default function TaskStatsCard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("tasks/stats/")
      .then(res => setStats(res.data))
      .catch(err => console.log("Stats API Error:", err));
  }, []);

  if (!stats) {
    return (
      <div className="bg-white dark:bg-white-800 shadow rounded-xl p-6">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white-800 shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">آمار کارها</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <ClipboardList className="w-4 h-4" />
            کل تسک‌ها
          </span>
          <span className="font-bold">{stats.total}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-4 h-4" />
            تکمیل‌شده
          </span>
          <span className="font-bold">{stats.done}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2 text-yellow-600">
            <Clock className="w-4 h-4" />
            باز / در انتظار
          </span>
          <span className="font-bold">{(stats.total) - (stats.done)}</span>
        </div>
      </div>
    </div>
  );
}
