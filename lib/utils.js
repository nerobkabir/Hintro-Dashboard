
export function formatDuration(seconds) {
  if (!seconds || seconds === 0) return '0';

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`;
  if (m > 0 && s > 0) return `${m}m ${s}sec`;
  if (m > 0) return `${m}m`;
  return `${s}sec`;
}

export function timeAgo(dateStr) {
  if (!dateStr) return '-';

  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}


const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};


export function formatDateLabel(dateStr) {
  const date = new Date(dateStr);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  return `${month} ${ordinal(day)}`;
}


export function formatTime(dateStr) {
  const date = new Date(dateStr);
  return date
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    .toLowerCase();
}

// ─── Call grouping ───────────────────────────────────────────────────────────

/**
 * Group an array of call sessions by their started_at date label.
 * Returns an ordered array of { label, calls } so the UI can render date headers.
 */
export function groupCallsByDate(callSessions) {
  const map = new Map();

  callSessions.forEach((session) => {
    const label = formatDateLabel(session.started_at);
    if (!map.has(label)) map.set(label, []);
    map.get(label).push(session);
  });

  return Array.from(map.entries()).map(([label, calls]) => ({ label, calls }));
}

// ─── Feedback (localStorage) ──────────────────────────────────────────────────

const FEEDBACK_KEY = 'hintro_feedback';

export function saveFeedback(entry) {
  const existing = getFeedbackHistory();
  const updated = [entry, ...existing];
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
}

export function getFeedbackHistory() {
  try {
    return JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || [];
  } catch {
    return [];
  }
}
