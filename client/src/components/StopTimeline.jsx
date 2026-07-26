import { MapPin, CircleDot } from 'lucide-react';

export default function StopTimeline({ stops = [] }) {
  if (!stops.length) return null;

  return (
    <ol className="relative">
      {stops.map((stop, index) => {
        const isFirst = index === 0;
        const isLast = index === stops.length - 1;

        return (
          <li
            key={`${stop}-${index}`}
            className="relative flex animate-fade-up gap-4 pb-8 last:pb-0"
            style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
          >
            {/* Connecting line */}
            {!isLast && (
              <span
                className="absolute left-[11px] top-6 h-full w-[2px] bg-gradient-to-b from-brand-blue-200 to-brand-green-200"
                aria-hidden="true"
              />
            )}

            {/* Node */}
            <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
              {isFirst || isLast ? (
                <MapPin
                  size={22}
                  strokeWidth={2.4}
                  className={isFirst ? 'text-brand-blue-600' : 'text-brand-green-600'}
                  fill={isFirst ? '#eef6ff' : '#ecfdf5'}
                />
              ) : (
                <CircleDot size={14} strokeWidth={2.5} className="text-slate-300" />
              )}
            </span>

            {/* Label */}
            <div className="flex min-w-0 items-center pt-0.5">
              <span
                className={`truncate font-display text-sm sm:text-base ${
                  isFirst || isLast ? 'font-semibold text-slate-900' : 'font-medium text-slate-600'
                }`}
              >
                {stop}
              </span>
              {isFirst && (
                <span className="ml-2 shrink-0 rounded-full bg-brand-blue-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-blue-600">
                  Start
                </span>
              )}
              {isLast && (
                <span className="ml-2 shrink-0 rounded-full bg-brand-green-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-green-600">
                  End
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
