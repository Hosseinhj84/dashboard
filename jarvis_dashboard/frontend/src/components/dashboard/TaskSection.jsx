import { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";

export default function TasksSection() {
  const { tasks, setTasks } = useDashboard();
  const [newTask, setNewTask] = useState("");

  // تیک‌زدن
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // حذف تسک
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // اضافه کردن تسک جدید
  const addTask = () => {
    if (newTask.trim() === "") return;

    setTasks(prev => [
      ...prev,
      { id: Date.now(), text: newTask, done: false }
    ]);

    setNewTask("");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-bold mb-4">تسک‌های امروز</h2>

      {/* لیست تسک‌ها */}
      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={`${task.done ? "line-through text-gray-400" : ""}`}>
                {task.text}
              </span>
            </div>

            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteTask(task.id)}
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {/* اضافه کردن تسک جدید */}
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 border p-2 rounded-lg"
          placeholder="تسک جدید..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          اضافه
        </button>
      </div>
    </div>
  );
}
