# NanoReply - AI Automation for Google Business

A modern SaaS web application frontend for an AI automation platform that connects to Google Business Profile.

## Features

### Landing Page
- **Hero Section** with compelling headline and CTAs
- **Social Proof** with testimonials from various business types
- **Features Section** showcasing 6 core features
- **How It Works** - 3-step process explanation
- **Pricing** - 4 pricing tiers (Basic, Growth, Pro, Enterprise)
- **FAQ** - 8 comprehensive questions and answers
- **Footer** with legal links and company information

### Authentication Pages
- **Login** - Clean login form with email/password
- **Register** - Registration form with validation
- **Forgot Password** - Password reset flow

### Dashboard
- **Business Status** - Shows connection status to Google Business
- **Blog Post Status Card** - Daily completion status and monthly progress
- **AI Photo Status Card** - Daily completion status and monthly progress
- **AI Replies Status Card** - Daily count, monthly total, and remaining quota
- **Activity Feed** - Recent AI actions with timestamps
- **Upgrade CTA** - Encourages users to upgrade their plan

### Settings Page
- Google Business Profile connection management
- AI reply tone selector (Professional/Friendly/Premium)
- Business category selector
- Keywords for blog posts configuration
- Subscription plan management

### Upgrade Page
- Pricing comparison table
- Detailed feature comparison
- Benefits section
- Current plan indicator

### Legal Pages
- **Privacy Policy** - Comprehensive GDPR-compliant privacy policy
- **Terms of Service** - Detailed terms with AI disclaimers
- **Refund Policy** - Clear refund and cancellation policies
- **Data Processing Agreement** - Enterprise-grade DPA with security measures

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Font**: Inter (Google Fonts)

## Design Features

- Modern SaaS aesthetic with indigo/slate color scheme
- Light and dark mode support
- Responsive design (mobile-first)
- Glassmorphism effects
- Smooth animations and transitions
- Progress bars for quota tracking
- Clean, minimal UI with excellent spacing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd nanoreply-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
nanoreply-frontend/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # Main dashboard
│   │   │   ├── settings/
│   │   │   │   └── page.tsx      # Settings page
│   │   │   └── upgrade/
│   │   │       └── page.tsx      # Upgrade page
│   │   ├── legal/
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx      # Privacy Policy
│   │   │   ├── terms/
│   │   │   │   └── page.tsx      # Terms of Service
│   │   │   ├── refund/
│   │   │   │   └── page.tsx      # Refund Policy
│   │   │   └── dpa/
│   │   │       └── page.tsx      # Data Processing Agreement
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── register/
│   │   │   └── page.tsx          # Register page
│   │   ├── forgot-password/
│   │   │   └── page.tsx          # Forgot password page
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx        # Button component
│   │       ├── card.tsx          # Card components
│   │       ├── badge.tsx         # Badge component
│   │       ├── input.tsx         # Input component
│   │       └── progress.tsx      # Progress bar component
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Mock Data & Functionality

All backend interactions are currently mocked with console.log statements:
- Login/Register forms log credentials
- Google Business connection logs action
- Settings save logs configuration
- Upgrade buttons log plan selection

The dashboard displays mock data:
- Business name: "X" (placeholder)
- Connection status: Connected
- Blog posts: 12/15 this month
- AI photos: 11/15 this month
- Replies today: 14/20 daily limit
- Monthly replies: 212

## Customization

### Changing Business Name
Replace all instances of "X" with your actual business name in:
- Dashboard page (`src/app/dashboard/page.tsx`)
- Settings page (`src/app/dashboard/settings/page.tsx`)

### Updating Colors
Modify the color scheme in `src/app/globals.css`:
- `--primary`: Main brand color (currently indigo)
- `--secondary`: Secondary color (currently slate)
- Adjust light/dark mode variables as needed

### Adding Backend Integration
Replace console.log statements with actual API calls:
1. Create API routes in `src/app/api/`
2. Update form handlers to call API endpoints
3. Add authentication state management
4. Connect to real Google Business Profile API

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Node.js

## Environment Variables

For production deployment, you'll need to add:

```env
NEXT_PUBLIC_API_URL=your_api_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - All rights reserved

## Support

For questions or issues, contact: support@nanoreply.com

---

**Note**: This is a frontend-only implementation. Backend API integration, Google Business Profile OAuth, payment processing, and AI content generation need to be implemented separately.
