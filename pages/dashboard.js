import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import RecentCalls from '../components/RecentCalls';
import ComingSoon from '../components/ComingSoon';
import { fetchProfile, fetchCallStats, fetchCallHistory } from '../lib/api';
import { formatDuration, timeAgo } from '../lib/utils';

const CALLS_LIMIT = 10;

export default function Dashboard() {
  const [userId, setUserId] = useState('u2');
  const [activeNav, setActiveNav] = useState('dashboard');

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async (uid) => {
    setLoading(true);
    setError(null);
    try {
      const [profileRes, statsRes, callsRes] = await Promise.all([
        fetchProfile(uid),
        fetchCallStats(uid),
        fetchCallHistory(uid, CALLS_LIMIT),
      ]);
      setProfile(profileRes.data);
      setStats(statsRes.data);
      setCalls(callsRes.data.callSessions ?? []);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Could not load data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard(userId);
  }, [userId, loadDashboard]);

  const statsCards = [
    {
      label: 'Total Sessions',
      value: stats?.totalSessions ?? 0,
      iconType: 'sessions',
    },
    {
      label: 'Average Duration',
      value: stats ? formatDuration(stats.averageDuration) : '0',
      iconType: 'duration',
    },
    {
      label: 'AI Used',
      value: stats?.totalAIInteractions ? `${stats.totalAIInteractions} times` : '0',
      iconType: 'ai',
    },
    {
      label: 'Last Session',
      value: stats?.lastSession?.[0] ? timeAgo(stats.lastSession[0]) : '-',
      iconType: 'calendar',
    },
  ];

  return (
    <Layout
      profile={profile}
      userId={userId}
      setUserId={setUserId}
      activeNav={activeNav}
      setActiveNav={setActiveNav}
    >
      {activeNav === 'dashboard' ? (
        <>
          <div className="welcome-banner fade-up">
            <div>
              <h1 className="welcome-title">
                Hi, {profile?.firstName ?? 'Name'} 👋 Welcome to Hintro
              </h1>
              <p className="welcome-sub">Ready to make your next call smarter?</p>
            </div>
            <button className="btn-primary start-call-btn">Start New Call</button>
          </div>

          {error && (
            <div className="error-banner">⚠ {error}</div>
          )}

          <div className="stats-grid">
            {statsCards.map((card) => (
              <StatsCard
                key={card.label}
                label={card.label}
                value={card.value}
                iconType={card.iconType}
                loading={loading}
              />
            ))}
          </div>

          <RecentCalls calls={calls} loading={loading} />
        </>
      ) : (
        <ComingSoon section={activeNav} />
      )}
    </Layout>
  );
}
