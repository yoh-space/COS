# Setup Instructions for yotech.space

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Clerk account (for authentication)
- Convex account (for database)

## Step 1: Clone and Install

```bash
git clone <your-repo>
cd Yotech
npm install
# or
pnpm install
```

## Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your actual keys:

### Clerk Authentication Keys

1. Go to https://dashboard.clerk.com
2. Create a new application or select existing one
3. Navigate to **API Keys** section
4. Copy your keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_` or `pk_live_`)
   - `CLERK_SECRET_KEY` (starts with `sk_test_` or `sk_live_`)

### Convex Database

1. Go to https://dashboard.convex.dev
2. Create a new project or select existing one
3. Copy your deployment URL:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `CONVEX_DEPLOYMENT`

<!-- Google AdSense section removed: this website is intended for a governmental/university audience and should not include ads -->

## Step 3: Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open http://localhost:3000 in your browser.

## Step 4: Build for Production

```bash
npm run build
npm run start
```

## Troubleshooting

### Build Error: Missing Clerk Keys

**Error:**
```
Error: @clerk/nextjs: Missing publishableKey
```

**Solution:**
Make sure you have added your Clerk keys to `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

### ESLint Warnings

The following warnings are expected and can be ignored:
- Google Font preconnect warning (already optimized)
- Image component warning in RichTextEditor (intentionally using img tag)

### Convex Connection Issues

If you see Convex connection errors:
1. Make sure Convex is running: `npx convex dev`
2. Check your `NEXT_PUBLIC_CONVEX_URL` in `.env.local`
3. Verify your deployment is active in Convex dashboard

## SEO Configuration

The SEO is already configured! Check these files:
- `src/lib/seo.config.ts` - SEO configuration
- `public/robots.txt` - Crawler directives
- `src/app/sitemap.ts` - Dynamic sitemap
- `public/manifest.json` - PWA manifest

See `SEO_IMPLEMENTATION_COMPLETE.md` for full SEO documentation.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Other Platforms

Make sure to add all environment variables from `.env.local` to your deployment platform.

## Support

For issues or questions:
- Email: yohansdam@gmail.com
- Telegram: https://t.me/yon_fx
- Phone: +251911701858

---

**Last Updated**: November 26, 2025
