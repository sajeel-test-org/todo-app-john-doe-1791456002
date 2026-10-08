import type { Filter } from '@/types/todo';

type FilterBarProps = {
  filter: Filter;
  onChange: (f: Filter) => void;
  sort: 'newest' | 'priority' | 'due';
  onSortChange: (s: 'newest' | 'priority' | 'due') => void;
  counts: Record<Filter, number>;
};

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export function FilterBar({ filter, onChange, sort, onSortChange, counts }: FilterBarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              filter === f.value ? 'bg-violet-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {f.label}
            <span className={`ml-1.5 text-xs ${filter === f.value ? 'text-violet-100' : 'text-slate-500'}`}>
              {counts[f.value]}
            </span>
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-400">
        Sort
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as 'newest' | 'priority' | 'due')}
          className="rounded-lg border border-white/10 bg-slate-900 px-2 py-1.5 text-sm text-slate-200 focus:border-violet-400 focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="priority">Priority</option>
          <option value="due">Due date</option>
        </select>
      </label>
    </div>
  );
}
