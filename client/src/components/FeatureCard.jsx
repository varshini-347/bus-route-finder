export default function FeatureCard({ icon: Icon, title, description, accent = 'blue' }) {
  const accentClasses = {
    blue: 'bg-brand-blue-50 text-brand-blue-600',
    green: 'bg-brand-green-50 text-brand-green-600',
  };

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${accentClasses[accent]}`}
      >
        <Icon size={22} strokeWidth={2.2} />
      </div>
      <h3 className="mb-1.5 font-display text-base font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}
