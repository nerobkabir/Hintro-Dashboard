import {
  Phone,
  BookOpen,
  MessageSquare,
  Settings2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

// Config for each section that isn't built yet
const SECTION_CONFIG = {
  'call-insights': {
    icon: Phone,
    title: 'Call Insights',
    description:
      'Get a deep look into your call performance. Review transcripts, AI suggestions, talk ratios, and key moments — all in one place.',
    color: 'var(--stat-teal-icon)',
    bg: 'var(--stat-teal-bg)',
    features: ['Call transcripts', 'AI-powered summaries', 'Talk time analytics', 'Action items'],
  },
  'knowledge-base': {
    icon: BookOpen,
    title: 'Knowledge Base',
    description:
      'Build your personal library of call frameworks, objection handlers, product sheets, and reference materials.',
    color: 'var(--stat-purple-icon)',
    bg: 'var(--stat-purple-bg)',
    features: ['Upload documents', 'Organize by category', 'Quick search', 'AI-indexed content'],
  },
  prompts: {
    icon: MessageSquare,
    title: 'Prompts',
    description:
      'Create and manage AI prompts that Boxy uses during live calls to help you respond faster and smarter.',
    color: 'var(--stat-pink-icon)',
    bg: 'var(--stat-pink-bg)',
    features: ['Custom prompt library', 'Context-aware triggers', 'Role-specific templates', 'One-click use'],
  },
  'boxy-controls': {
    icon: Settings2,
    title: 'Boxy Controls',
    description:
      "Fine-tune your AI call assistant. Configure Boxy behavior, response style, and integrations to fit your workflow.",
    color: 'var(--stat-green-icon)',
    bg: 'var(--stat-green-bg)',
    features: ['Personality settings', 'Response delay control', 'Integration hooks', 'Language preferences'],
  },
};

export default function ComingSoon({ section }) {
  const config = SECTION_CONFIG[section];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="fade-up" style={{ maxWidth: 540, margin: '3rem auto 0', textAlign: 'center', padding: '0 1rem' }}>

      {/* Icon bubble */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '20px',
          background: config.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}
      >
        <Icon size={30} style={{ color: config.color }} strokeWidth={1.8} />
      </div>

      {/* Coming soon badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: config.bg,
          color: config.color,
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '4px 12px',
          borderRadius: '20px',
          marginBottom: '1rem',
        }}
      >
        <Sparkles size={11} />
        Coming Soon
      </div>

      {/* Title */}
      <h2
        style={{
          fontWeight: 700,
          fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          lineHeight: 1.25,
        }}
      >
        {config.title}
      </h2>

      {/* Description */}
      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          marginBottom: '2rem',
        }}
      >
        {config.description}
      </p>

      {/* Feature pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '2.5rem',
        }}
      >
        {config.features.map((feat) => (
          <div
            key={feat}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              fontSize: '0.8rem',
              color: 'var(--text-primary)',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: config.color,
              }}
            />
            {feat}
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href="https://www.hintro.ai"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 22px',
          borderRadius: '10px',
          background: '#0f172a',
          color: '#fff',
          fontSize: '0.875rem',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#1e293b')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#0f172a')}
      >
        Learn more at Hintro.ai
        <ArrowRight size={15} />
      </a>
    </div>
  );
}
