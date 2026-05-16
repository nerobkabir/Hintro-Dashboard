import { useState, useEffect } from 'react';
import { X, Send, Clock, Star, ChevronRight } from 'lucide-react';
import { saveFeedback, getFeedbackHistory } from '../lib/utils';

const CATEGORIES = ['General', 'Bug Report', 'Feature Request', 'UI/UX', 'Performance'];

// Feedback submit form 
function FeedbackForm({ onSubmit, onClose }) {
  const [category, setCategory] = useState('General');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) return;

    const entry = {
      id: Date.now(),
      category,
      message: message.trim(),
      rating,
      createdAt: new Date().toISOString(),
    };

    saveFeedback(entry);
    setSubmitted(true);

    setTimeout(() => {
      onSubmit();
      onClose();
    }, 1500);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'var(--stat-green-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
          }}
        >
          <Send size={22} style={{ color: 'var(--stat-green-icon)' }} />
        </div>
        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Thanks for your feedback!</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
          We really appreciate it 🙏
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: '1.1rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
            }}
          >
            <Star
              size={22}
              fill={star <= (hoverRating || rating) ? '#f59e0b' : 'none'}
              style={{
                color: star <= (hoverRating || rating) ? '#f59e0b' : 'var(--border-hover)',
                transition: 'color 0.1s ease',
              }}
            />
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
          Category
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '0.78rem',
                fontWeight: 500,
                border: `1.5px solid ${category === cat ? 'var(--primary)' : 'var(--border)'}`,
                background: category === cat ? 'var(--primary-light)' : 'transparent',
                color: category === cat ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
          Your feedback
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you think…"
          rows={4}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1.5px solid var(--border)',
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit',
            background: '#fafafa',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!message.trim()}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          background: message.trim() ? '#0f172a' : 'var(--border)',
          color: message.trim() ? '#fff' : 'var(--text-muted)',
          fontWeight: 500,
          fontSize: '0.875rem',
          border: 'none',
          cursor: message.trim() ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'background 0.15s ease',
        }}
      >
        <Send size={14} />
        Submit Feedback
      </button>
    </div>
  );
}

//  Feedback history list 
function FeedbackHistory() {
  const history = getFeedbackHistory();

  if (history.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        No feedback submitted yet.
      </div>
    );
  }

  return (
    <div style={{ maxHeight: 360, overflowY: 'auto' }}>
      {history.map((item) => (
        <div
          key={item.id}
          style={{
            padding: '12px 0',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '20px',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
              }}
            >
              {item.category}
            </span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={11}
                  fill={s <= item.rating ? '#f59e0b' : 'none'}
                  style={{ color: s <= item.rating ? '#f59e0b' : 'var(--border-hover)' }}
                />
              ))}
            </div>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            {item.message}
          </p>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: 4 }}>
            {new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Modal wrapper 
export default function FeedbackModal({ onClose, defaultView = 'form' }) {
  const [view, setView] = useState(defaultView); 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setView('form')}
              style={{
                background: view === 'form' ? 'var(--primary-light)' : 'none',
                color: view === 'form' ? 'var(--primary)' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '6px',
                padding: '5px 12px',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Send size={14} /> Feedback
            </button>
            <button
              onClick={() => setView('history')}
              style={{
                background: view === 'history' ? 'var(--primary-light)' : 'none',
                color: view === 'history' ? 'var(--primary)' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '6px',
                padding: '5px 12px',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Clock size={14} /> History
            </button>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        {view === 'form' ? (
          <FeedbackForm onSubmit={() => {}} onClose={onClose} />
        ) : (
          <FeedbackHistory />
        )}
      </div>
    </div>
  );
}
