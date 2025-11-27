# Flintic Eats - Restaurant Reservation System

A modern, full-stack restaurant table reservation system built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Public Pages**
  - Home page with restaurant information
  - Interactive menu display
  - Contact form
  - Table reservation system with availability checking

- **Admin Dashboard**
  - Secure login with Supabase Auth
  - View today's reservations and statistics
  - Manage all reservations (filter, update status)
  - Real-time data from Supabase

- **Technical Features**
  - Dynamic time slots based on opening hours (weekdays vs weekends)
  - Email confirmations (mock implementation)
  - Responsive design for all devices
  - Form validation with Zod and React Hook Form
  - Row-level security with Supabase

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Validation:** Zod, React Hook Form
- **Icons:** Lucide React
- **Date Handling:** date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/flintic-eats.git
cd flintic-eats
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Set up Supabase database:

Run the SQL script in `brain/supabase_schema.sql` in your Supabase SQL Editor.

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
flintic-eats/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── api/            # API routes
│   │   ├── contact/        # Contact page
│   │   ├── menu/           # Menu page
│   │   ├── reserve/        # Reservation page
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── layout/         # Navbar, Footer
│   └── lib/
│       ├── supabase.ts     # Supabase client
│       └── email.ts        # Email service
├── public/                 # Static assets
└── package.json
```

## Deployment

See [deployment_guide.md](../brain/deployment_guide.md) for detailed instructions on deploying to Vercel.

Quick steps:
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## Opening Hours

- **Monday - Friday:** 11:00 AM - 10:00 PM
- **Saturday - Sunday:** 9:00 AM - 11:00 PM

Time slots automatically adjust based on the selected date.

## Admin Access

To access the admin dashboard:
1. Create a user in your Supabase Auth dashboard
2. Navigate to `/admin/login`
3. Sign in with your credentials

## License

This project is part of the Flintic AI portfolio.

## Contact

For questions or support, visit [flinticai.com](https://flinticai.com)
