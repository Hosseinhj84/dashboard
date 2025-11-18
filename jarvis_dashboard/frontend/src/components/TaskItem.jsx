import React from "react";

export default function TaskItem({task, onToggle, onDelete}) {
  return (
    <div className="flex items-center justify-between bg-neutral-800 p-3 rounded">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task)}
          className="w-5 h-5"
        />
        <span className={task.done ? "line-through opacity-60" : ""}>
          {task.text}
        </span>
      </div>

      <button onClick={() => onDelete(task)} className="text-sm text-red-400">
        حذف
      </button>
    </div>
  );
}
