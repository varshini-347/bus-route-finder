import { SearchX, RotateCcw } from 'lucide-react';

export default function ErrorCard({
  title = 'No bus found.',
  message = "We couldn't find a route for that bus number. Double-check it and try again.",
  onRetry,
}) {
  return (
    <div className="mx-auto flex max-w-md animate-pop-in flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white px-8 py-12 text-center shadow-card">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-400">
        <SearchX size={30} strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-brand-blue-200 hover:text-brand-blue-600"
        >
          <RotateCcw size={15} />
          Try another search
        </button>
      )}
    </div>
  );
}
