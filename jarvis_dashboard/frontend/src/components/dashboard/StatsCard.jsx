export default function StatsCard({ title, value , icon }) {
    return (
        <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
            <div className="text-3xl">{icon}</div>
            <div>
            <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
            <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
            </div>
        </div>
    );
}