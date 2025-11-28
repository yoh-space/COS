# Clerk Webhook Setup Guide

This guide explains how to set up Clerk webhooks to sync users to the PostgreSQL database.

## Overview

The CMS uses Clerk for authentication and syncs user data to PostgreSQL for role-based access control. When users sign up, update their profile, or delete their account in Clerk, a webhook automatically updates the database.

## Setup Steps

### 1. Get Your Webhook Secret

1. Go to the [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **Webhooks** in the sidebar
4. Click **Add Endpoint**
5. Enter your webhook URL: `https://your-domain.com/api/webhooks/clerk`
6. Select the following events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
7. Click **Create**
8. Copy the **Signing Secret** (starts with `whsec_`)

### 2. Add Webhook Secret to Environment Variables

Add the webhook secret to your `.env.local` file:

```bash
CLERK_WEBHOOK_SECRET=whsec_your_secret_here
```

### 3. Test the Webhook (Local Development)

For local testing, you'll need to expose your local server to the internet:

#### Using ngrok:

```bash
# Install ngrok
npm install -g ngrok

# Start your Next.js dev server
pnpm dev

# In another terminal, expose port 3000
ngrok http 3000
```

Copy the ngrok URL (e.g., `https://abc123.ngrok.io`) and use it as your webhook endpoint in Clerk:
```
https://abc123.ngrok.io/api/webhooks/clerk
```

#### Using Clerk's CLI (Recommended):

```bash
# Install Clerk CLI
npm install -g @clerk/clerk-cli

# Forward webhooks to your local server
clerk webhooks forward --url http://localhost:3000/api/webhooks/clerk
```

### 4. Verify Webhook is Working

1. Create a new user in your application
2. Check your server logs for: `User created: <clerk_user_id>`
3. Verify the user exists in your PostgreSQL database:

```sql
SELECT * FROM "User" WHERE "clerkId" = '<clerk_user_id>';
```

## Webhook Events Handled

### user.created
- Creates a new user record in PostgreSQL
- Stores: Clerk ID, email, first name, last name, profile image

### user.updated
- Updates existing user record in PostgreSQL
- Updates: email, first name, last name, profile image

### user.deleted
- Removes user record from PostgreSQL
- Note: Related records (blog posts, resources) are handled by database cascade rules

## Troubleshooting

### Webhook Returns 400 Error
- Verify `CLERK_WEBHOOK_SECRET` is set correctly in `.env.local`
- Check that the secret matches the one in Clerk Dashboard

### User Not Created in Database
- Check server logs for error messages
- Verify database connection is working
- Ensure Prisma migrations have been run: `pnpm prisma migrate deploy`

### Webhook Signature Verification Failed
- Make sure you're using the correct webhook secret
- Verify the webhook URL in Clerk matches your endpoint exactly

## Security Notes

- Never commit `CLERK_WEBHOOK_SECRET` to version control
- The webhook endpoint verifies the signature of all incoming requests
- Only requests signed by Clerk will be processed
- Invalid signatures return a 400 error

## Related Files

- Webhook handler: `src/app/api/webhooks/clerk/route.ts`
- Auth utilities: `src/lib/auth.ts`
- Prisma client: `src/lib/prisma.ts`
- User model: `prisma/schema.prisma`
