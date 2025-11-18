import { CheckCircle, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { getTasks } from "../../api/tasks";
import api from "../../api/api";

export default function TodayTasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const fetchData = async (pageNumber = 1, search = "", done = "") => {
    try {
      const res = await api.get(`/tasks/`, {
        params: {
          page: pageNumber,
          search: search || undefined,
          done: done || undefined,
        },
      });

      setTasks(res.data.results);
      setCount(res.data.count);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      await api.post("/tasks/", {
        text: newTask,
        done: false,
      });

      setNewTask("");
      fetchData();
    } catch (error) {
      console.error("Error adding tasks : ", error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await api.patch(`/tasks/${id}/`, { done: !completed });
      fetchData();
    } catch (error) {
      console.error("Error updating task : ", error);
    }
  };

  const deleteTasks = async (id) => {
    try {
      await api.delete(`/tasks/${id}/`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting Tasks:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
      <div className="flex gap-3 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="جستجو..."
          onChange={(e) => fetchData(1, e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => fetchData(1, null, e.target.value)}
        >
          <option value="">همه</option>
          <option value="false">در حال انجام</option>
          <option value="true">انجام شده</option>
        </select>
      </div>

      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        تسک‌های امروز
      </h2>

      {/* add task input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>هیچ تسکی موجود نیست!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTask(task.id)}
            >
              <div className="flex items-center gap-3">
                {task.done ? (
                  <CheckCircle className="text-green-600" size={22} />
                ) : (
                  <Circle className="text-gray-400" size={22} />
                )}
                <span
                  className={`text-gray-800 ${
                    task.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTasks(task.id);
                }}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => fetchData(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <button
          disabled={page * 5 >= count}
          onClick={() => fetchData(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
