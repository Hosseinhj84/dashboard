import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    // فرم ویرایش
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "",
    });

    const fetchTask = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://d7b0-2-190-152-106.ngrok-free.app/api/tasks/${id}/`);
            const data = await res.json();
            setTask(data);

            // پر کردن فرم در حالت ویرایش
            setForm({
                title: data.title,
                description: data.description || "",
                status: data.status,
            });

        } catch (error) {
            console.error("Error loading task:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    // ارسال آپدیت
    const saveChanges = async () => {
        try {
            const res = await fetch(`https://d7b0-2-190-152-106.ngrok-free.app/api/tasks/${id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                alert("خطا در ذخیره تغییرات");
                return;
            }

            setEditing(false);
            fetchTask();

        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <p className="text-center mt-10 text-gray-400">Loading...</p>;
    }

    if (!task) {
        return <p className="text-center mt-10 text-red-400">Task not found</p>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <button
                onClick={() => navigate("/dashboard")}
                className="mb-6 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700"
            >
                ← Back to Dashboard
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 p-6 rounded-2xl shadow-xl"
            >
                {/* EDIT MODE */}
                {editing ? (
                    <div className="space-y-4">

                        <input
                            className="w-full bg-gray-800 text-white p-3 rounded-xl"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />

                        <textarea
                            className="w-full bg-gray-800 text-white p-3 rounded-xl min-h-[120px]"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />

                        <select
                            className="w-full bg-gray-800 text-white p-3 rounded-xl"
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                        </select>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={saveChanges}
                                className="px-4 py-2 rounded-xl bg-green-700 hover:bg-green-600"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setEditing(false)}
                                className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    /* VIEW MODE */
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{task.title}</h1>

                        <p className="text-gray-300 mb-2">
                            <span className="text-gray-500">Status:</span>{" "}
                            <span className={
                                task.status === "completed"
                                    ? "text-green-400"
                                    : task.status === "failed"
                                    ? "text-red-400"
                                    : "text-yellow-400"
                            }>
                                {task.status}
                            </span>
                        </p>

                        {task.description && (
                            <p className="text-gray-300 mb-4">
                                {task.description}
                            </p>
                        )}

                        <p className="text-gray-400 text-sm">
                            Created: {new Date(task.created_at).toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm mb-6">
                            Updated: {new Date(task.updated_at).toLocaleString()}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={fetchTask}
                                className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                )}

            </motion.div>
        </div>
    );
}
