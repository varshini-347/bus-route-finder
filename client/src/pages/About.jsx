import { Zap, MousePointerClick, ShieldCheck, Database } from 'lucide-react';

const POINTS = [
  {
    icon: Zap,
    title: 'Simple',
    description: 'Type a bus number, get the full route. No extra steps.',
  },
  {
    icon: MousePointerClick,
    title: 'Fast',
    description: 'Results load in seconds, even on a slow mobile connection.',
  },
  {
    icon: ShieldCheck,
    title: 'Easy to use',
    description: 'A clean, focused interface built for quick, everyday lookups.',
  },
  {
    icon: Database,
    title: 'No login required',
    description: 'Search freely. No account, no sign-up, no friction.',
  },
];

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <div className="text-center">
        <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
          About Bus Route Finder
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500">
          This project helps Hyderabad commuters quickly find bus routes using GTFS public
          transport data &mdash; enter a bus number and see every stop along its journey.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {POINTS.map((point) => (
          <div
            key={point.title}
            className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-600">
              <point.icon size={19} strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="font-display text-sm font-semibold text-slate-900">
                {point.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{point.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
