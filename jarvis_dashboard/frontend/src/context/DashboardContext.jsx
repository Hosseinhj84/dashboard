import { createContext, useContext, useState } from "react";

// ایجاد کانتکست
const DashboardContext = createContext();

// ساخت Provider (تمام داشبورد زیر این قرار می‌گیرند)
export function DashboardProvider({ children }) {
  const [stats, setStats] = useState({
    users: 120,
    orders: 45,
    revenue: 1240,
  });

  const [tasks, setTasks] = useState([
    { id: 1, text: "بررسی پیام‌های امروز", done: false },
    { id: 2, text: "آپلود نسخه جدید محصول", done: true },
    { id: 3, text: "پاسخ‌گویی به درخواست‌ها", done: false },
  ]);

  const [activities, setActivities] = useState([
    "کاربر *علی رضایی* وارد حساب شد",
    "سفارش جدید ثبت شد",
    "درگاه پرداخت بروزرسانی شد",
  ]);

  const [requests, setRequests] = useState([
    { user: "علی رضایی", title: "مشکل ورود به سیستم", status: "pending" },
    { user: "مریم احمدی", title: "درخواست بازگشت وجه", status: "solved" },
    { user: "زهرا قربانی", title: "لغو سفارش", status: "rejected" },
  ]);

  return (
    <DashboardContext.Provider
      value={{
        stats,
        tasks, setTasks,
        activities, setActivities,
        requests, setRequests,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

// هوک برای استفاده راحت در بقیه کامپوننت‌ها
export const useDashboard = () => useContext(DashboardContext);
