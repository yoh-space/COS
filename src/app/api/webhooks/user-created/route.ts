import { NextRequest } from 'next/server';
import { Webhook } from 'svix';
import { prisma } from '@/lib/prisma';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const svix_id = request.headers.get('svix-id');
  const svix_timestamp = request.headers.get('svix-timestamp');
  const svix_signature = request.headers.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as any;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  
  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const email = email_addresses[0]?.email_address;

    if (!email) {
      return new Response('No email found', { status: 400 });
    }

    try {
      // Create or update user
      const user = await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email,
          firstName: first_name,
          lastName: last_name,
          profileImage: image_url,
        },
        create: {
          clerkId: id,
          email,
          firstName: first_name,
          lastName: last_name,
          profileImage: image_url,
        },
      });

      console.log(`User ${email} created successfully`);
      return new Response('User processed successfully', { status: 200 });
    } catch (error) {
      console.error('Error processing user creation:', error);
      return new Response('Error processing user', { status: 500 });
    }
  }

  return new Response('Webhook processed', { status: 200 });
}
