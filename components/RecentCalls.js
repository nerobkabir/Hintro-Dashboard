import { useState } from 'react';
import { CalendarDays, MoreVertical, User } from 'lucide-react';
import { groupCallsByDate, formatTime } from '../lib/utils';

/* ── Empty state ────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <CalendarDays size={22} style={{ color: 'var(--stat-purple-icon)' }} />
      </div>
      <p className="empty-state__title">No Recent Calls</p>
      <p className="empty-state__desc">
        Connect your Google Calendar to see upcoming meetings, get reminders,
        and join calls directly from Hintro.
      </p>
      <button className="btn-outline" style={{ marginTop: '1.25rem', fontSize: '0.82rem' }}>
        Start a Call
      </button>
    </div>
  );
}

/* ── Single call row ────────────────────────────────── */
function CallRow({ session }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Pick avatar color from client name initial char code
  const palette = [
    { bg: 'var(--stat-purple-bg)', color: 'var(--stat-purple-icon)' },
    { bg: 'var(--stat-teal-bg)',   color: 'var(--stat-teal-icon)'   },
    { bg: 'var(--stat-pink-bg)',   color: 'var(--stat-pink-icon)'   },
    { bg: 'var(--stat-green-bg)',  color: 'var(--stat-green-icon)'  },
  ];
  const { bg, color } = palette[(session.client?.charCodeAt(0) ?? 0) % palette.length];
  const initial = session.client?.[0]?.toUpperCase() ?? 'C';

  const menuItems = ['View Details', 'View Transcript', 'Delete'];

  return (
    <div className="call-row">
      {/* Avatar */}
      <div className="call-row__avatar" style={{ background: bg, color }}>
        {initial}
      </div>

      {/* Info */}
      <div className="call-row__info">
        <div className="call-row__title">{session.description ?? 'Call Session'}</div>
        {/* Participant dots */}
        <div className="call-row__participants">
          {(session.participants ?? []).slice(0, 4).map((p, i) => (
            <User key={i} size={11} style={{ color: 'var(--text-light)' }} />
          ))}
        </div>
      </div>

      {/* Time */}
      <span className="call-row__time">{formatTime(session.started_at)}</span>

      {/* 3-dot menu */}
      <div style={{ position: 'relative' }}>
        <button
          className="call-row__menu-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="More options"
        >
          <MoreVertical size={16} />
        </button>

        {menuOpen && (
          <>
            {/* Invisible backdrop to close menu */}
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 5 }}
              onClick={() => setMenuOpen(false)}
            />
            <div className="call-row__dropdown">
              {menuItems.map((item) => (
                <button
                  key={item}
                  className={`call-row__dropdown-item ${item === 'Delete' ? 'call-row__dropdown-item--danger' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Skeleton row ───────────────────────────────────── */
function SkeletonRow() {
  return (
    <div className="call-row">
      <div className="skeleton" style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ width: '55%', height: 13, marginBottom: 6 }} />
        <div className="skeleton" style={{ width: '25%', height: 11 }} />
      </div>
      <div className="skeleton" style={{ width: 52, height: 13 }} />
    </div>
  );
}

/* ── Main component ─────────────────────────────────── */
export default function RecentCalls({ calls, loading }) {
  const grouped = groupCallsByDate(calls);

  return (
    <div className="card recent-calls fade-up">
      <div className="recent-calls__header">
        <h3 className="recent-calls__title">Recent calls</h3>
      </div>

      <div className="recent-calls__body">
        {/* Loading state */}
        {loading && [1, 2, 3].map((i) => <SkeletonRow key={i} />)}

        {/* Empty state */}
        {!loading && calls.length === 0 && <EmptyState />}

        {/* Populated list grouped by date */}
        {!loading && grouped.map(({ label, calls: group }) => (
          <div key={label}>
            <div className="date-header">{label}</div>
            {group.map((session) => (
              <CallRow key={session._id} session={session} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
