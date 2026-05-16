# Hintro Dashboard

A frontend internship assignment — building a mock dashboard for [Hintro](https://www.hintro.ai) based on a provided Figma design and mock REST APIs.

---

## What I Built

A clean, responsive dashboard that connects to Hintro's mock backend and displays real call session data. The UI handles two distinct user states — a new user with no data yet, and an active user with sessions, stats, and call history.

The goal was to match the Figma design as closely as possible while keeping the code organized and the experience smooth across both desktop and mobile.

---

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 14 (Pages Router) |
| **Styling** | Tailwind CSS + CSS custom properties |
| **HTTP Client** | Axios |
| **Icons** | lucide-react |
| **State** | React hooks (no external state library needed) |
| **Persistence** | localStorage (for feedback entries and theme preference) |

---

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/hintro-dashboard.git
cd hintro-dashboard
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. No `.env` file or extra configuration needed.

For a production build:

```bash
npm run build
npm start
```

---

## Project Structure

```
hintro-dashboard/
│
├── components/
│   ├── ComingSoon.js       # Placeholder page for unbuilt sections
│   ├── FeedbackModal.js    # Submit feedback + view history
│   ├── Header.js           # Top bar with avatar, dark mode toggle, user dropdown
│   ├── Layout.js           # Wraps sidebar + header around every page
│   ├── LogoutModal.js      # "Leaving already?" confirmation dialog
│   ├── RecentCalls.js      # Grouped call list with empty state
│   ├── Sidebar.js          # Navigation + user switcher
│   └── StatsCard.js        # Individual metric card (sessions, duration, etc.)
│
├── lib/
│   ├── api.js              # All Axios API calls in one place
│   └── utils.js            # Time formatting, date grouping, localStorage helpers
│
├── pages/
│   ├── _app.js             # Global styles entry point
│   ├── index.js            # Redirects to /dashboard
│   └── dashboard.js        # Main page — fetches data, manages state
│
├── styles/
│   └── globals.css         # Design tokens (CSS variables) + all component styles
│
└── README.md
```

---

## Features

### Two user states

Switch between users from the **sidebar** (below the Upgrade button):

- **Active User (u2)** — randomized call stats, session history grouped by date, populated dashboard
- **New User (u1)** — all stats at zero, "No Recent Calls" empty state

The `x-user-id` header is set dynamically based on the selected user.

### Dashboard

- Welcome message with the user's first name from the profile API
- Four stat cards: Total Sessions, Average Duration, AI Used, Last Session
- Average duration converted from seconds to readable format — `1h 4m`, `36m 51sec`
- Last session shown as relative time — `2 days ago`, `Today`
- Recent calls grouped by date with client avatar, description, participants, time, and a context menu

### Dark Mode

A light/dark theme toggle sits in the header next to the Watch Tutorial button. Clicking it switches the entire UI between light and dark mode instantly. The preference is saved to `localStorage` so it persists across page refreshes.

This was straightforward to implement because the entire design system is built on CSS custom properties — switching themes only requires overriding variable values on the root element, with no component changes needed.

### Sidebar navigation

- **Dashboard** — fully functional, connected to the API
- **Call Insights, Knowledge Base, Prompts, Boxy Controls** — each shows a professional "coming soon" page since the mock API doesn't provide data for these sections

### Feedback

- Click **Feedback** in the sidebar to open a modal with star rating, category selection, and a text area
- Submissions are saved to `localStorage` under the key `hintro_feedback`
- Click **Feedback History** to view all past submissions

### Logout

- Click the avatar → **Log out** → confirmation modal before anything happens

### Responsive layout

- Desktop: sidebar always visible on the left
- Mobile: slide-out drawer via hamburger button
- Stats grid: 4 columns on desktop, 2 columns on mobile
- Watch Tutorial link hidden on small screens to keep the header uncluttered

---

## API Details

Base URL: `https://mock-backend-hintro.vercel.app`

Every request includes `x-user-id: u1 | u2` in the header.

| Endpoint | Description |
|---|---|
| `GET /api/auth/profile` | User name, email, account info |
| `GET /api/auth/dashboard` | Subscription and usage data |
| `GET /api/call-sessions/stats` | Total sessions, average duration, AI interactions, last session dates |
| `GET /api/call-sessions?limit=10` | Paginated list of call sessions |

All requests fire in parallel with `Promise.all` on page load.

---

## Assumptions and Notes

- **No authentication flow** — user switching is done via the sidebar UI, which changes the `x-user-id` header. In a real app this would use proper auth tokens.
- **averageDuration is in seconds** — the API returns a raw number and the dashboard formats it to `1h 4m` or `36m 51sec` depending on the value.
- **lastSession is an array** — the API returns up to 3 recent dates. The most recent one (index 0) is used for the stat card.
- **Other sidebar sections are placeholders** — the mock API only covers the dashboard. Other sections show a "coming soon" page instead of a broken screen.
- **Feedback is browser-local** — localStorage is appropriate for this scope. In production it would go to a backend endpoint.
- **Default user is u2** — so reviewers see a populated dashboard immediately without needing to switch.
- **Dark mode preference is persisted** — saved to `localStorage` under `hintro_theme` so the chosen theme survives page refreshes.

---

## Deployment

Connect the GitHub repo to [Vercel](https://vercel.com):

1. Push to a public GitHub repository
2. Import the repo at [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js — no extra configuration
4. Click Deploy

Or via CLI:

```bash
npm install -g vercel
vercel
```

---

## Submission

**GitHub Repository:** https://github.com/YOUR_USERNAME/hintro-dashboard
**Deployed Link:** *(add after deployment)*
**Video Walkthrough:** *(optional)*

**Notes:** The mock API only covers dashboard data, so other sidebar sections show a placeholder. User switching is handled from the sidebar since no auth flow exists in this mock setup. Dark mode was added as an extra feature — it works entirely through CSS custom properties so no components needed individual changes.