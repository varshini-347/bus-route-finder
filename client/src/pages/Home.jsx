import { useNavigate } from 'react-router-dom';
import { Zap, Route, ListChecks } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import FeatureCard from '../components/FeatureCard.jsx';

const FEATURES = [
  {
    icon: Zap,
    title: 'Fast Search',
    description: 'Look up any Hyderabad city bus number and get results in seconds.',
    accent: 'blue',
  },
  {
    icon: Route,
    title: 'Accurate Bus Routes',
    description: 'Routes sourced from public GTFS transit data, kept clear and reliable.',
    accent: 'green',
  },
  {
    icon: ListChecks,
    title: 'Complete Stop List',
    description: 'See every stop from start to end, laid out in the exact travel order.',
    accent: 'blue',
  },
];

export default function Home() {
  const navigate = useNavigate();

  function handleSearch(busNumber) {
    navigate(`/results/${encodeURIComponent(busNumber)}`);
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#eef6ff_0%,transparent_45%),radial-gradient(circle_at_80%_0%,#ecfdf5_0%,transparent_40%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-20 text-center sm:pb-24 sm:pt-28">
          <span className="mb-5 inline-flex animate-fade-up items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green-500" />
            Live Hyderabad city bus data
          </span>
          <h1
            className="animate-fade-up font-display text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl"
            style={{ animationDelay: '80ms' }}
          >
            Find Your Bus Route <span className="text-brand-blue-600">Instantly</span>
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl animate-fade-up text-base text-slate-500 sm:text-lg"
            style={{ animationDelay: '160ms' }}
          >
            Search Hyderabad city bus routes and view all stops in seconds.
          </p>

          <div
            className="mx-auto mt-9 max-w-xl animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            <SearchBar onSearch={handleSearch} autoFocus />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </main>
  );
}
