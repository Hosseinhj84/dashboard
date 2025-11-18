export default function TaskItem({title , time , isDone}) {
    return(
        <div className={`flex item-center justify-between p-4 rounded-xl border shadow-sm ${isDone ? "bg-green-50 border-green-300" : "bg-white border-gray-200"}`}>
            <div>
                <h3 className="text-lg font-semiblod text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{time}</p>

                <span className={`text-2xl ${isDone ? "text-green-600" : "text-gray-300"}`}>
                    {isDone ? "✔" : "○"}
                </span>
            </div>
        </div>
    );
}