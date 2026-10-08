type HeaderProps = {
  total: number;
  done: number;
};

export function Header({ total, done }: HeaderProps) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mb-8">
      <p className="text-sm font-medium uppercase tracking-widest text-violet-300/80">{today}</p>
      <h1 className="mt-1 text-4xl font-bold tracking-tight text-white">
        Tickd<span className="text-violet-400">.</span>
      </h1>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-300">
            {total === 0 ? 'Nothing on your plate yet' : `${done} of ${total} tasks done`}
          </span>
          <span className="font-semibold text-violet-300">{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </header>
  );
}
