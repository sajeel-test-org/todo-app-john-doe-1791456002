import { useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { AddTodoForm } from '@/components/AddTodoForm';
import { FilterBar } from '@/components/FilterBar';
import { TodoItem } from '@/components/TodoItem';
import { useTodos } from '@/hooks/useTodos';
import type { Filter } from '@/types/todo';

export const Route = createFileRoute('/')({
  component: HomePage,
});

type Sort = 'newest' | 'priority' | 'due';
const priorityRank = { high: 0, medium: 1, low: 2 };

function HomePage() {
  const { todos, addTodo, toggleTodo, updateTitle, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('newest');

  const done = todos.filter((t) => t.done).length;
  const counts = { all: todos.length, active: todos.length - done, completed: done };

  const visible = useMemo(() => {
    const list = todos.filter((t) =>
      filter === 'all' ? true : filter === 'active' ? !t.done : t.done,
    );
    return [...list].sort((a, b) => {
      if (sort === 'priority') return priorityRank[a.priority] - priorityRank[b.priority] || b.createdAt - a.createdAt;
      if (sort === 'due') {
        if (a.dueDate === b.dueDate) return b.createdAt - a.createdAt;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      return b.createdAt - a.createdAt;
    });
  }, [todos, filter, sort]);

  const emptyMessage =
    todos.length === 0
      ? { title: 'A clean slate', body: 'Add your first task above to get started.' }
      : filter === 'active'
        ? { title: 'All caught up! 🎉', body: 'Nothing left to do. Enjoy it.' }
        : { title: 'Nothing here yet', body: 'Completed tasks will show up here.' };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950 text-slate-100">
      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <Header total={todos.length} done={done} />
        <AddTodoForm onAdd={addTodo} />
        <FilterBar filter={filter} onChange={setFilter} sort={sort} onSortChange={setSort} counts={counts} />

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-slate-200">{emptyMessage.title}</p>
            <p className="mt-1 text-sm text-slate-400">{emptyMessage.body}</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {visible.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onRename={updateTitle}
              />
            ))}
          </ul>
        )}

        <footer className="mt-6 flex items-center justify-between text-sm text-slate-500">
          <span>
            {counts.active} {counts.active === 1 ? 'task' : 'tasks'} left
          </span>
          {done > 0 && (
            <button onClick={clearCompleted} className="font-medium text-slate-400 transition hover:text-rose-300">
              Clear completed
            </button>
          )}
        </footer>
        <p className="mt-10 text-center text-xs text-slate-600">
          Tip: double-click a task to rename it · Tasks are saved in this browser
        </p>
      </main>
    </div>
  );
}
