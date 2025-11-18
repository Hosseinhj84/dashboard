import ActivityItem from "./ActivityItem";
import { useState, useEffect } from "react";
import api from "../../api/api";

export default function RecentActivities() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/activity").then((res) => setList(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">آخرین فعالیت‌ها</h2>

      <div className="space-y-4">
        {list.map((item) => (
          <li key={item.id} className="border-b pb-2 text-sm text-gray-700">
            {item.action} — {item.timestamp}
          </li>
        ))}
      </div>
    </div>
  );
}
