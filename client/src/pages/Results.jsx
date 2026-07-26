import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPinned, Flag, Milestone } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import StopTimeline from '../components/StopTimeline.jsx';
import Loading from '../components/Loading.jsx';
import ErrorCard from '../components/ErrorCard.jsx';
import { getBusRoute } from '../services/api.js';

export default function Results() {
  const { busNumber } = useParams();
  const navigate = useNavigate();

  const [route, setRoute] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'

  const fetchRoute = useCallback(async (number) => {
    setStatus('loading');
    setRoute(null);
    try {
      const data = await getBusRoute(number);
      setRoute(data);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    if (busNumber) fetchRoute(busNumber);
  }, [busNumber, fetchRoute]);

  function handleNewSearch(newBusNumber) {
    navigate(`/results/${encodeURIComponent(newBusNumber)}`);
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <button
        onClick={() => navigate('/')}
        className="mb-8 flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-blue-600"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="mb-8">
        <SearchBar onSearch={handleNewSearch} initialValue={busNumber} />
      </div>

      {status === 'loading' && <Loading label={`Looking up bus ${busNumber}...`} />}

      {status === 'error' && (
        <ErrorCard onRetry={() => fetchRoute(busNumber)} />
      )}

      {status === 'success' && route && (
        <div className="animate-fade-up space-y-6">
          {/* Summary card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold text-brand-blue-600">
                Bus {route.busNumber}
              </span>
              <span className="rounded-full bg-brand-green-50 px-3 py-1 text-xs font-semibold text-brand-green-600">
                {route.totalStops} stops
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <SummaryItem icon={MapPinned} label="Starting Stop" value={route.from} />
              <SummaryItem icon={Flag} label="Ending Stop" value={route.to} />
              <SummaryItem icon={Milestone} label="Total Stops" value={route.totalStops} />
            </div>
          </div>

          {/* Timeline card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
            <h2 className="mb-6 font-display text-base font-semibold text-slate-900">
              Route &amp; Stops
            </h2>
            <StopTimeline stops={route.stops} />
          </div>
        </div>
      )}
    </main>
  );
}

function SummaryItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-blue-600 shadow-sm">
        <Icon size={16} strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="truncate font-display text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
