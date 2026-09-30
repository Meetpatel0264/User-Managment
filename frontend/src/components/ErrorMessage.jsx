import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
      <AlertCircle className="mb-3 h-9 w-9 text-red-500" />
      <h3 className="text-base font-bold text-red-800 dark:text-red-300">
        Something went wrong
      </h3>
      <p className="mt-1 max-w-md text-sm text-red-700 dark:text-red-400">
        {message || "Please try again later."}
      </p>
      <button className="btn-secondary mt-5" onClick={onRetry}>
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}