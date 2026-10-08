import { useState } from 'react';
import type { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
};

const priorityStyles = {
  low: { bar: 'bg-emerald-400', chip: 'bg-emerald-400/10 text-emerald-300', label: 'Low' },
  medium: { bar: 'bg-amber-400', chip: 'bg-amber-400/10 text-amber-300', label: 'Medium' },
  high: { bar: 'bg-rose-500', chip: 'bg-rose-500/10 text-rose-300', label: 'High' },
};

function todayStr() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function formatDue(due: string) {
  const [y, m, d] = due.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function TodoItem({ todo, onToggle, onDelete, onRename }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const p = priorityStyles[todo.priority];

  const today = todayStr();
  const overdue = !todo.done && todo.dueDate !== null && todo.dueDate < today;
  const dueToday = !todo.done && todo.dueDate === today;

  function commit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.title) onRename(todo.id, trimmed);
    else setDraft(todo.title);
    setEditing(false);
  }

  return (
    <li className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 pl-5 transition hover:border-white/20 hover:bg-white/[0.07]">
      <span className={`absolute inset-y-0 left-0 w-1 ${p.bar} ${todo.done ? 'opacity-30' : ''}`} />

      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
          todo.done
            ? 'border-violet-400 bg-violet-500 text-white'
            : 'border-slate-500 hover:border-violet-400'
        }`}
      >
        {todo.done && (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              if (e.key === 'Escape') {
                setDraft(todo.title);
                setEditing(false);
              }
            }}
            className="w-full rounded-lg bg-white/10 px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-violet-400"
          />
        ) : (
          <p
            onDoubleClick={() => setEditing(true)}
            title="Double-click to edit"
            className={`truncate text-base transition ${
              todo.done ? 'text-slate-500 line-through' : 'text-slate-100'
            }`}
          >
            {todo.title}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 font-medium ${p.chip}`}>{p.label}</span>
          {todo.dueDate && (
            <span
              className={`rounded-full px-2 py-0.5 font-medium ${
                overdue
                  ? 'bg-rose-500/15 text-rose-300'
                  : dueToday
                    ? 'bg-violet-500/15 text-violet-300'
                    : 'bg-white/5 text-slate-400'
              }`}
            >
              {overdue ? 'Overdue · ' : dueToday ? 'Today · ' : 'Due '}
              {formatDue(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            aria-label="Edit task"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M13.6 3.6a2 2 0 012.8 2.8l-8.5 8.5-3.6.8.8-3.6 8.5-8.5z" />
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
          className="rounded-lg p-2 text-slate-400 hover:bg-rose-500/15 hover:text-rose-300"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M8 2a1 1 0 00-1 1v1H4a1 1 0 000 2h12a1 1 0 100-2h-3V3a1 1 0 00-1-1H8zM5 8h10l-.8 8.1A2 2 0 0112.2 18H7.8a2 2 0 01-2-1.9L5 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
