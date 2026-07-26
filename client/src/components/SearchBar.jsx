import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, initialValue = '', autoFocus = false }) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-card sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-3 px-3 py-2">
        <Search size={20} className="shrink-0 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus={autoFocus}
          placeholder="Enter Bus Number (Example: 10, 49M, 218)"
          aria-label="Bus number"
          className="w-full bg-transparent font-display text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-brand-blue-600 px-6 py-3 font-display text-sm font-semibold text-white transition-all hover:bg-brand-blue-700 active:scale-[0.98]"
      >
        <Search size={16} />
        Search
      </button>
    </form>
  );
}
