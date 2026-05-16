import { PieChart, Clock, Sparkles, CalendarDays } from 'lucide-react';

const CARD_CONFIG = {
  sessions: { icon: PieChart,      bg: 'var(--stat-pink-bg)',   color: 'var(--stat-pink-icon)' },
  duration: { icon: Clock,         bg: 'var(--stat-teal-bg)',   color: 'var(--stat-teal-icon)' },
  ai:       { icon: Sparkles,      bg: 'var(--stat-green-bg)',  color: 'var(--stat-green-icon)' },
  calendar: { icon: CalendarDays,  bg: 'var(--stat-purple-bg)', color: 'var(--stat-purple-icon)' },
};

export default function StatsCard({ label, value, iconType, loading }) {
  const cfg  = CARD_CONFIG[iconType] ?? CARD_CONFIG.sessions;
  const Icon = cfg.icon;

  return (
    <div className="card stats-card fade-up">
      <div className="stats-card__icon" style={{ background: cfg.bg }}>
        <Icon size={18} style={{ color: cfg.color }} strokeWidth={2} />
      </div>

      <div className="stats-card__body">
        <div className="stats-card__label">{label}</div>
        {loading
          ? <div className="skeleton" style={{ width: 56, height: 20 }} />
          : <div className="stats-card__value">{value}</div>
        }
      </div>
    </div>
  );
}
