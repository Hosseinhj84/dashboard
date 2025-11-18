import TaskItem from "./TaskItem";

export default function TodayTasks() {
  const tasks = [
    { title: "بررسی پیام‌های کاربران", time: "08:30 AM", isDone: false },
    { title: "جلسه با تیم طراحی", time: "10:00 AM", isDone: true },
    { title: "آپدیت نسخه جدید API", time: "13:30 PM", isDone: false },
    { title: "تحویل گزارش ماهانه", time: "17:00 PM", isDone: true },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">تسک‌های امروز</h2>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            title={task.title}
            time={task.time}
            isDone={task.isDone}
          />
        ))}
      </div>
    </div>
  );
}
