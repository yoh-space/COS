# How to Get Your Clerk Authentication Keys

## Quick Steps

### 1. Go to Clerk Dashboard
Visit: https://dashboard.clerk.com

### 2. Sign In or Create Account
- If you don't have an account, sign up (it's free)
- If you have an account, sign in

### 3. Create or Select Application
- Click "Create Application" if this is your first time
- Or select your existing "Yo-Tech" application

### 4. Get Your API Keys
1. In the left sidebar, click on **"API Keys"**
2. You'll see two types of keys:

#### Publishable Key (Frontend)
- Starts with `pk_test_` (for development) or `pk_live_` (for production)
- Example: `pk_test_Y2xlcmsuaW5zcGlyZWQucGVuZ3Vpbi03NC5sY2wuZGV2JA`
- This is safe to expose in your frontend code

#### Secret Key (Backend)
- Starts with `sk_test_` (for development) or `sk_live_` (for production)
- Example: `sk_test_abcdefghijklmnopqrstuvwxyz1234567890`
- **Keep this secret!** Never commit to Git or expose publicly

### 5. Copy Keys to .env.local

Open your `.env.local` file and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here
```

### 6. Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Alternative: Disable Clerk Temporarily

If you want to build without Clerk authentication temporarily, you can:

### Option 1: Remove ClerkProvider from Layout

Edit `src/app/layout.tsx`:

```tsx
// Comment out or remove ClerkProvider
export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>...</head>
      <body>
        {/* <ClerkProvider> */}
          <Providers>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </Providers>
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
```

### Option 2: Use Mock Keys for Testing

Add these temporary keys to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_mock_key_for_testing_only
CLERK_SECRET_KEY=sk_test_mock_key_for_testing_only
```

**Note:** This won't work for actual authentication, but will allow the build to complete.

## Clerk Features You Get

Once configured, Clerk provides:
- ✅ User authentication (sign up/sign in)
- ✅ User management dashboard
- ✅ Social login (Google, GitHub, etc.)
- ✅ Email verification
- ✅ Password reset
- ✅ User profiles
- ✅ Session management

## Pricing

- **Free Tier**: Up to 10,000 monthly active users
- **Pro Tier**: $25/month for more features
- Perfect for startups and small businesses

## Support

If you need help:
1. Clerk Documentation: https://clerk.com/docs
2. Clerk Discord: https://clerk.com/discord
3. Email me: yohansdam@gmail.com

---

**Quick Tip:** Use the test keys (`pk_test_` and `sk_test_`) during development. Switch to live keys (`pk_live_` and `sk_live_`) only when deploying to production.
