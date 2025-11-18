import React from "react";

export default function LatestRequests() {
  const requests = [
    { id: 1, user: "Ali", type: "Password Reset", status: "Pending", date: "2025-01-10" },
    { id: 2, user: "Sara", type: "New Account", status: "Approved", date: "2025-01-09" },
    { id: 3, user: "Reza", type: "Data Export", status: "Rejected", date: "2025-01-08" },
  ];

  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Approved: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Latest Requests</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">User</th>
            <th className="py-2">Type</th>
            <th className="py-2">Status</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-b">
              <td className="py-2">{req.user}</td>
              <td className="py-2">{req.type}</td>
              <td className="py-2">
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[req.status]}`}>
                  {req.status}
                </span>
              </td>
              <td className="py-2">{req.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
