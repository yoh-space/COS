# Admin Panel Setup Guide

This guide will help you set up and access the admin panel for the College CMS system.

## Prerequisites

- Node.js installed
- PostgreSQL database configured (already set up in `.env.local`)
- Clerk account for authentication

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up the Database

Generate Prisma client and push the schema to your database:

```bash
npx prisma generate
npx prisma db push
```

Seed the database with initial roles:

```bash
npx prisma db seed
```

This will create the following roles:
- **Admin** - Full system access
- **Editor** - Can create and publish blog posts
- **Department_Lead** - Can manage department content
- **Registrar** - Can manage staff and departments
- **Research_Lead** - Can manage research resources
- **Faculty_Member** - Read-only access

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Create Your Account

1. Go to `http://localhost:3000`
2. Click on "Sign In" or "Sign Up" in the header
3. Create an account using Clerk authentication
4. Use the email address you want to use as admin

### 5. Assign Admin Role to Your Account

After signing up, you need to assign the Admin role to your account. Run this script with your email:

```bash
npx ts-node scripts/assign-admin-role.ts your-email@example.com
```

Replace `your-email@example.com` with the email you used to sign up.

### 6. Access the Admin Panel

Once you have the Admin role assigned, you can access the admin panel:

**User Management:**
- URL: `http://localhost:3000/admin/users`
- Features:
  - View all users
  - Search users by name or email
  - Filter by role or department
  - Manage user roles
  - Assign departments to users

**Managing a Specific User:**
- URL: `http://localhost:3000/admin/users/[user-id]`
- Features:
  - Assign multiple roles to a user
  - Assign department (required for Department_Lead role)
  - View user information
  - See role permissions

## Setting Up Clerk Webhook (Optional but Recommended)

To automatically sync users from Clerk to your database:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to Webhooks section
3. Create a new webhook endpoint
4. Set the endpoint URL to: `https://your-domain.com/api/webhooks/clerk`
   - For local development, use a tool like [ngrok](https://ngrok.com/) to expose your local server
5. Subscribe to these events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
6. Copy the webhook secret
7. Add it to your `.env.local`:
   ```
   CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

## Troubleshooting

### "User not found" when running assign-admin-role script

**Solution:** Make sure you've signed up with Clerk first. The webhook should automatically create a user in the database when you sign up.

### "Admin role not found in database"

**Solution:** Run the seed command:
```bash
npx prisma db seed
```

### Can't access admin pages (403 Forbidden)

**Solution:** Make sure you've assigned the Admin role to your account using the script above.

### Database connection errors

**Solution:** Check your `DATABASE_URL` in `.env.local` and ensure your PostgreSQL database is running.

## Admin Features

### User Management
- View all users with pagination
- Search and filter users
- Assign multiple roles to users
- Manage department assignments
- View user activity and audit logs

### Role-Based Access Control
Each role has specific permissions:
- **Admin**: Full access to all features
- **Editor**: Blog and media management
- **Department_Lead**: Department-specific content management
- **Registrar**: Staff and department management
- **Research_Lead**: Research resources management
- **Faculty_Member**: Read-only access

### Department Assignment
- Department_Lead role requires a department assignment
- Other roles can optionally have department assignments
- Department assignment is validated before saving

## Next Steps

After setting up the admin panel, you can:

1. Create additional users through Clerk
2. Assign appropriate roles to users
3. Set up departments and assign department leads
4. Start managing content through the CMS

## API Endpoints

The admin panel uses these API endpoints:

- `GET /api/cms/users` - List all users
- `POST /api/cms/users/[id]/roles` - Assign roles to a user
- `GET /api/cms/roles` - List all roles
- `GET /api/cms/departments` - List all departments

All endpoints require proper authentication and permissions.

## Security Notes

- All admin routes are protected by Clerk authentication
- API endpoints check for specific permissions before allowing access
- Audit logs track all user role changes
- Department_Lead role requires department assignment for security
- Admin role has unrestricted access - assign carefully

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the server logs in your terminal
3. Verify your environment variables are set correctly
4. Ensure the database is properly seeded
5. Confirm you have the correct permissions assigned
