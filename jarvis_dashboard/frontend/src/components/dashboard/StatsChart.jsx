import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("stats/weekly/")
      .then(res => {
        const formatted = res.data.map(item => ({
          name: item.day,
          done: item.done,
          not_done: item.not_done,
        }));
        setData(formatted);
      })
      .catch(err => console.error("Stats error:", err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow border-gray-200 h-80">
      <h2 className="text-xl font-semibold mb-4">نمودار فعالیت هفتگی</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="done" stroke="#10b981" strokeWidth={3} name="انجام شده" />
          <Line type="monotone" dataKey="not_done" stroke="#ef4444" strokeWidth={3} name="انجام نشده" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
