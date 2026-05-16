import { useState, useRef, useEffect } from 'react';
import { Play, ChevronDown, LogOut, Menu, Sun, Moon } from 'lucide-react';

function getSavedTheme() {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem('hintro_theme') || 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('hintro_theme', theme);
}

export default function Header({ profile, userId, onLogoutClick, onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const saved = getSavedTheme();
    setTheme(saved);
    applyTheme(saved);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    applyTheme(next);
  };

  const initials = profile
    ? `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`
    : 'U';

  const isDark = theme === 'dark';

  return (
    <header className="app-header">
      {/* Left: hamburger + title */}
      <div className="header-left">
        <button className="hamburger" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <h2 className="header-title">Dashboard</h2>
      </div>

      {/* Right: Watch Tutorial + toggle + avatar */}
      <div className="header-right">

        {/* Watch Tutorial */}
        <a
          href="https://www.hintro.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="watch-tutorial-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background 0.15s ease',
          }}
        >
          <Play size={12} fill="currentColor" />
          Watch Tutorial
        </a>

        {/* Dark / Light mode toggle button */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: isDark ? '#334155' : '#f1f5f9',
            color: isDark ? '#fbbf24' : '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.2s ease, color 0.2s ease',
          }}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Avatar + dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            className="avatar-btn"
            onClick={() => setDropdownOpen((v) => !v)}
            aria-label="User menu"
          >
            <div className="avatar-circle">{initials}</div>
            <ChevronDown
              size={14}
              className="avatar-chevron"
              style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}
            />
          </button>

          {dropdownOpen && (
            <div className="dropdown fade-up">
              <div className="dropdown-info">
                <div className="dropdown-name">
                  {profile ? `${profile.firstName} ${profile.lastName}` : 'Loading…'}
                </div>
                <div className="dropdown-email">{profile?.email ?? ''}</div>
                <span
                  className="dropdown-badge"
                  style={{
                    background: userId === 'u2' ? 'var(--stat-green-bg)' : 'var(--stat-purple-bg)',
                    color: userId === 'u2' ? 'var(--stat-green-icon)' : 'var(--stat-purple-icon)',
                  }}
                >
                  {userId === 'u2' ? 'Active User' : 'New User (empty)'}
                </span>
              </div>

              <button
                className="dropdown-logout"
                onClick={() => { setDropdownOpen(false); onLogoutClick(); }}
              >
                <LogOut size={15} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
