import { Users } from "lucide-react";

export default function EmptyState({ hasSearch, onAdd }) {
  return (
    <div className="glass flex min-h-64 flex-col items-center justify-center rounded-2xl p-8 text-center">
      <div className="mb-4 rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-950/40">
        <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-lg font-bold">No users found</h3>
      <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
        {hasSearch
          ? "Try changing your search."
          : "Create your first user to get started."}
      </p>
      {!hasSearch && (
        <button className="btn-primary mt-5" onClick={onAdd}>
          Add first user
        </button>
      )}
    </div>
  );
}