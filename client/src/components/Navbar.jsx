import { NavLink } from 'react-router-dom';
import { Bus, Github } from 'lucide-react';

const navLinkClasses = ({ isActive }) =>
  `text-sm font-medium transition-colors hover:text-brand-blue-600 ${
    isActive ? 'text-brand-blue-600' : 'text-slate-600'
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-display text-lg font-bold text-slate-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue-500 to-brand-green-500 text-white shadow-card">
            <Bus size={18} strokeWidth={2.4} />
          </span>
          Bus Route Finder
        </NavLink>

        <div className="flex items-center gap-6">
          <NavLink to="/" end className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            About
          </NavLink>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-brand-blue-600"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
