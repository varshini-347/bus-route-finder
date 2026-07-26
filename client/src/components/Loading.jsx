import { Bus } from 'lucide-react';

export default function Loading({ label = 'Fetching your route...' }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-24 text-center animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute h-16 w-16 animate-spin rounded-full border-4 border-brand-blue-100 border-t-brand-blue-600" />
        <Bus size={24} className="text-brand-blue-600" />
      </div>
      <p className="font-display text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}
