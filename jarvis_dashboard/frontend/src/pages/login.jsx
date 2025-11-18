import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const CORRECT_USERNAME = import.meta.env.VITE_AUTH_USER || "admin";
    const CORRECT_PASSWORD = import.meta.env.VITE_AUTH_PASS || "12345";

    setTimeout(() => {
      if (
        form.username === CORRECT_USERNAME &&
        form.password === CORRECT_PASSWORD
      ) {
        localStorage.setItem("auth", "true");
        navigate("/dashboard");
      } else {
        setError("نام کاربری یا رمز عبور اشتباه است");
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          ورود به داشبورد
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">
              نام کاربری
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-0"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">رمز عبور</label>
            <input
              type="password"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-0"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
