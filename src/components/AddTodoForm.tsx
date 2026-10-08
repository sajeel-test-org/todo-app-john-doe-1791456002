import { useState, type FormEvent } from 'react';
import type { Priority } from '@/types/todo';

type AddTodoFormProps = {
  onAdd: (title: string, priority: Priority, dueDate: string | null) => void;
};

const priorities: { value: Priority; label: string; dot: string }[] = [
  { value: 'low', label: 'Low', dot: 'bg-emerald-400' },
  { value: 'medium', label: 'Medium', dot: 'bg-amber-400' },
  { value: 'high', label: 'High', dot: 'bg-rose-500' },
];

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority, dueDate || null);
    setTitle('');
    setDueDate('');
    setPriority('medium');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-xl shadow-violet-950/30 backdrop-blur"
    >
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          className="min-w-0 flex-1 rounded-xl bg-transparent px-3 py-2 text-base text-white placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-xl bg-violet-500 px-5 py-2 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 px-1 pt-3">
        {priorities.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
              priority === p.value
                ? 'bg-white/15 text-white ring-1 ring-white/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${p.dot}`} />
            {p.label}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-xs text-slate-400">
          Due
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 [color-scheme:dark] focus:border-violet-400 focus:outline-none"
          />
        </label>
      </div>
    </form>
  );
}
