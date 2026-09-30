export default function Loading() {
  return (
    <div className="flex min-h-64 items-center justify-center" role="status" aria-label="Loading users">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
        Loading users...
      </div>
    </div>
  );
}