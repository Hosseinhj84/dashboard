import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/api";
import TaskItem from "../components/TaskItem";

export default function Tasks(){
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // گرفتن لیست تسک‌ها از API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      setError("خطا در دریافت داده‌ها");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // افزودن تسک جدید
  const handleAdd = async () => {
    if (!text.trim()) return;
    try {
      const res = await createTask(text.trim());
      setTasks(prev => [res.data, ...prev]); // اضافه در بالا
      setText("");
    } catch (err) {
      console.error(err);
      setError("خطا در افزودن تسک");
    }
  };

  // تیک زدن (toggle)
  const handleToggle = async (task) => {
    try {
      const res = await updateTask(task.id, { done: !task.done });
      setTasks(prev => prev.map(t => t.id === task.id ? res.data : t));
    } catch (err) {
      console.error(err);
      setError("خطا در تغییر وضعیت");
    }
  };

  // حذف تسک
  const handleDelete = async (task) => {
    if(!confirm("مطمئنی حذف بشه؟")) return;
    try {
      await deleteTask(task.id);
      setTasks(prev => prev.filter(t => t.id !== task.id));
    } catch (err) {
      console.error(err);
      setError("خطا در حذف");
    }
  };

  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-bold mb-4">کارهای من</h2>

      <div className="mb-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="چی باید انجام بدی؟"
          className="flex-1 p-2 rounded bg-neutral-900 outline-none"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-indigo-600 rounded">افزودن</button>
      </div>

      {error && <div className="mb-3 text-red-400">{error}</div>}
      {loading ? (
        <div>در حال بارگذاری...</div>
      ) : (
        <div className="flex flex-col gap-2">
          {tasks.length === 0 ? (
            <div className="text-neutral-400">تسکی وجود ندارد</div>
          ) : (
            tasks.map(t => (
              <TaskItem
                key={t.id}
                task={t}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
