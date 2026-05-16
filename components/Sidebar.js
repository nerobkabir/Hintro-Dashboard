import {
  LayoutDashboard, Phone, BookOpen, MessageSquare,
  Settings2, Clock, Gift, Info, X, RefreshCw, Users,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard',      label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'call-insights',  label: 'Call Insights',  icon: Phone },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen,       hasInfo: true },
  { id: 'prompts',        label: 'Prompts',         icon: MessageSquare,  hasInfo: true },
  { id: 'boxy-controls',  label: 'Boxy Controls',  icon: Settings2,      hasInfo: true },
];

export default function Sidebar({
  isOpen, onClose,
  onFeedbackClick, onFeedbackHistoryClick,
  activeNav, setActiveNav,
  userId, setUserId,
}) {
  const otherUser  = userId === 'u1' ? 'u2' : 'u1';
  const switchLabel = userId === 'u1' ? 'Switch to Active User' : 'Switch to New User';

  const handleNav = (id) => {
    setActiveNav(id);
    onClose(); 
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>

        <div className="sidebar__logo">
          <span className="sidebar__brand">Hintro</span>
          <button className="sidebar__close md:hidden" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map(({ id, label, icon: Icon, hasInfo }) => {
            const active = activeNav === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`nav-item ${active ? 'nav-item--active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
                <span className="nav-item__label">{label}</span>
                {hasInfo && <Info size={13} className="nav-item__info" />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar__bottom">

          <button className="bottom-btn" onClick={() => { onFeedbackHistoryClick(); onClose(); }}>
            <Clock size={16} strokeWidth={1.8} />
            <span>Feedback History</span>
          </button>

          <button className="bottom-btn" onClick={() => { onFeedbackClick(); onClose(); }}>
            <Gift size={16} strokeWidth={1.8} />
            <span>Feedback</span>
          </button>

          <button className="upgrade-btn">Upgrade</button>

          <div className="user-switcher">
            <div className="user-switcher__info">
              <div
                className="user-switcher__avatar"
                style={{
                  background: userId === 'u2' ? 'var(--stat-green-bg)' : 'var(--stat-purple-bg)',
                }}
              >
                <Users
                  size={13}
                  style={{ color: userId === 'u2' ? 'var(--stat-green-icon)' : 'var(--stat-purple-icon)' }}
                />
              </div>
              <div>
                <div className="user-switcher__name">
                  {userId === 'u1' ? 'New User (u1)' : 'Active User (u2)'}
                </div>
                <div className="user-switcher__sub">
                  {userId === 'u1' ? 'Empty state' : 'With live data'}
                </div>
              </div>
            </div>
            <button
              className="user-switcher__btn"
              onClick={() => { setUserId(otherUser); onClose(); }}
            >
              <RefreshCw size={12} />
              {switchLabel}
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}
