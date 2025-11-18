import { Clock, PlusCircle, Edit, CheckCircle, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../api/api";

export default function RecentActivity() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    api
      .get("/activity/")
      .then((res) => {
        setActivity(res.data.results || []);
      })
      .catch((err) => {
        console.error("Activity error:", err);
        setActivity([]);
      });
  }, []);

  // آیکون مخصوص هر اکشن
  const icons = {
    created: <PlusCircle className="w-5 h-5 text-green-500" />,
    updated: <Edit className="w-5 h-5 text-blue-500" />,
    completed: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    deleted: <Trash2 className="w-5 h-5 text-red-500" />,
  };

  // متن‌های فارسی هر رویداد
  const texts = {
    created: "ایجاد شد",
    updated: "ویرایش شد",
    completed: "تکمیل شد",
    deleted: "حذف شد",
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        رویدادهای اخیر
      </h2>

      <ul className="space-y-4">
        {activity.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between border-b pb-3 border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              {/* آیکون مخصوص اکشن */}
              {icons[item.action] || <Clock className="w-5 h-5" />}

              <span className="text-sm text-gray-700 dark:text-gray-300">
                تسک #{item.task} {texts[item.action]}
              </span>
            </div>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(item.timestamp).toLocaleString("fa-IR")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
