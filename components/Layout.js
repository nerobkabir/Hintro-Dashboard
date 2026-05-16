import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import FeedbackModal from './FeedbackModal';
import LogoutModal from './LogoutModal';

export default function Layout({ children, profile, userId, setUserId, activeNav, setActiveNav }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackDefaultView, setFeedbackDefaultView] = useState('form');
  const [showLogout, setShowLogout] = useState(false);

  const handleLogoutConfirm = () => {
    setShowLogout(false);
    alert('Logged out. (Demo — refresh page to log back in)');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onFeedbackClick={() => { setFeedbackDefaultView('form'); setShowFeedback(true); }}
        onFeedbackHistoryClick={() => { setFeedbackDefaultView('history'); setShowFeedback(true); }}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        userId={userId}
        setUserId={setUserId}
      />

      <div className="main-area">
        <Header
          profile={profile}
          userId={userId}
          onLogoutClick={() => setShowLogout(true)}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="main-scroll">
          <div className="main-inner">{children}</div>
        </main>
      </div>

      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          defaultView={feedbackDefaultView}
        />
      )}
      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </div>
  );
}
