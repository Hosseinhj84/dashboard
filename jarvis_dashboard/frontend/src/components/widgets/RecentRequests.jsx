import { Mail, ArrowRight } from "lucide-react";

export default function RecentRequests() {
    const requests = [
        { id: 1, user: "Ali Akbari", type: "درخواست پشتیبانی", time: "2 ساعت پیش" },
        { id: 2, user: "Sara R.", type: "گزارش مشکل", time: "5 ساعت پیش" },
        { id: 3, user: "Mehdi D.", type: "درخواست بررسی حساب", time: "1 روز پیش" },
    ];

    return (
        <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                آخرین درخواست‌ها
            </h2>

            <ul className="space-y-4">
                {requests.map(req => (
                    <li
                        key={req.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                    >
                        <div className="flex items-center gap-3">
                            <Mail className="text-blue-600" size={22} />
                            <div>
                                <p className="font-medium text-gray-800">{req.user}</p>
                                <p className="text-sm text-gray-500">{req.type}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            {req.time}
                            <ArrowRight size={16} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
