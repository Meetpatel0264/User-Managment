import { Edit3, Mail, Phone, Trash2, UserRound } from "lucide-react";

export default function UserCard({
  user,
  onEdit,
  onDelete,
  deletingId
}) {
  const deleting = deletingId === user.id;

  return (
    <article className="glass group rounded-2xl p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70 dark:hover:shadow-black/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-bold text-slate-900 dark:text-white">
              {user.name}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              User
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex min-w-0 items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Phone className="h-4 w-4 shrink-0 text-slate-400" />
          <span>{user.phone}</span>
        </div>
      </div>

      <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        <button
          className="btn-secondary flex-1"
          onClick={() => onEdit(user)}
          disabled={deleting}
          aria-label={`Edit ${user.name}`}
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </button>
        <button
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
          onClick={() => onDelete(user)}
          disabled={deleting}
          aria-label={`Delete ${user.name}`}
        >
          <Trash2 className="h-4 w-4" />
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}