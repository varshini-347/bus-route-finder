import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-8 text-center">
        <p className="flex items-center gap-1.5 text-sm text-slate-500">
          Made with
          <Heart size={14} className="fill-brand-green-500 text-brand-green-500" />
          using React and Tailwind CSS
        </p>
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Bus Route Finder &middot; Hyderabad public transit data
        </p>
      </div>
    </footer>
  );
}
