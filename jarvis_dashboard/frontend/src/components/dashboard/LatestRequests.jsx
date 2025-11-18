import RequestItem from "./RequestItem";

export default function LatestRequests() {
  const requests = [
    { user: "علی رضایی", title: "مشکل ورود به سیستم", status: "pending" },
    { user: "مریم احمدی", title: "درخواست بازگشت وجه", status: "solved" },
    { user: "پویا مرادی", title: "عدم دریافت پیام تأیید", status: "pending" },
    { user: "زهرا قربانی", title: "لغو سفارش", status: "rejected" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">آخرین درخواست‌ها</h2>

      <div className="space-y-4">
        {requests.map((req, index) => (
          <RequestItem
            key={index}
            user={req.user}
            title={req.title}
            status={req.status}
          />
        ))}
      </div>
    </div>
  );
}
