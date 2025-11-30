# Vercel Deployment Guide

## Pre-Deployment Checklist

### ✅ Completed
- [x] Database schema updated with BackgroundContent
- [x] Prisma Client generated
- [x] Initial data seeded
- [x] All dependencies installed
- [x] Build script includes `prisma generate`

### ⚠️ Important: Environment Variables

Make sure these environment variables are set in Vercel:

1. **DATABASE_URL** - Use Prisma Accelerate URL for production:
   ```
   prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY
   ```

2. **DIRECT_URL** (if needed for migrations) - Direct database URL:
   ```
   postgres://USER:PASSWORD@db.prisma.io:5432/postgres?sslmode=require
   ```

3. **Clerk Environment Variables**:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

4. **Other Variables** (if applicable):
   - `NEXT_PUBLIC_APP_URL`
   - Any other custom environment variables

## Deployment Steps

### Option 1: Deploy via CLI (Current)

```bash
# Deploy to production
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

## Post-Deployment Tasks

### 1. Verify Database Connection

After deployment, check that the app can connect to the database:
- Visit your deployed URL
- Check `/api/background` endpoint
- Verify no database connection errors

### 2. Run Migrations (if needed)

If you need to run migrations on production database:

```bash
# Set production database URL
DATABASE_URL="your-direct-production-url" pnpm prisma db push

# Or use the migration script
DATABASE_URL="your-direct-production-url" ./scripts/migrate-with-direct-url.sh
```

### 3. Seed Production Data (if needed)

```bash
DATABASE_URL="your-direct-production-url" pnpm tsx prisma/seed-background.ts
DATABASE_URL="your-direct-production-url" pnpm tsx prisma/seed.ts
```

### 4. Test the Deployment

- [ ] Visit your production URL
- [ ] Sign in as admin
- [ ] Access `/admin/background`
- [ ] Edit and save content
- [ ] Visit `/about/background`
- [ ] Verify content displays correctly

## Troubleshooting

### Build Fails

**Error**: Prisma Client not generated
**Solution**: Ensure `prisma generate` is in build script (already done ✅)

**Error**: Environment variables missing
**Solution**: Add all required env vars in Vercel dashboard

### Runtime Errors

**Error**: Database connection failed
**Solution**: 
- Verify DATABASE_URL is set correctly
- Use Prisma Accelerate URL for production
- Check database is accessible from Vercel

**Error**: Permission denied
**Solution**:
- Verify user roles are seeded
- Check Clerk authentication is working
- Verify permissions are assigned correctly

### Migration Issues

**Error**: Can't run migrations
**Solution**:
- Use direct database URL (not Accelerate)
- Run migrations locally or via CI/CD
- Use `prisma db push` instead of `migrate dev`

## Vercel Configuration

Your `vercel.json` (if needed):

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## Environment Variables Setup

### Via Vercel CLI

```bash
# Set environment variable
vercel env add DATABASE_URL production

# Pull environment variables
vercel env pull
```

### Via Vercel Dashboard

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable with appropriate scope (Production, Preview, Development)

## Important Notes

1. **Use Prisma Accelerate** for production runtime (faster, pooled connections)
2. **Use Direct URL** only for migrations (schema changes)
3. **Seed data** before going live
4. **Test thoroughly** after deployment
5. **Monitor logs** in Vercel dashboard

## Rollback Plan

If deployment fails:

```bash
# Rollback to previous deployment
vercel rollback
```

Or redeploy previous version from Vercel dashboard.

## Next Steps After Deployment

1. ✅ Test all features
2. ✅ Monitor error logs
3. ✅ Set up custom domain (if needed)
4. ✅ Configure analytics
5. ✅ Set up monitoring/alerts

---

**Ready to deploy?** Run: `vercel --prod`
