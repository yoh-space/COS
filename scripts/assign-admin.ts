
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local if it exists, otherwise .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const clerkId = 'fuser_36C1KZrUTB9eWAqFyonOG7grNk1';
    const roleName = 'Admin';

    console.log(`Ensuring '${roleName}' role exists...`);

    // 1. Upsert Admin Role
    const adminRole = await prisma.role.upsert({
        where: { name: roleName },
        update: {
            permissions: ['*'], // Grant all permissions
        },
        create: {
            name: roleName,
            description: 'Administrator with full access',
            permissions: ['*'],
        },
    });

    console.log(`Role '${roleName}' is ready.`);

    // 2. Find User
    console.log(`Looking for user with Clerk ID: ${clerkId}...`);
    const user = await prisma.user.findUnique({
        where: { clerkId },
    });

    if (!user) {
        console.log(`User with Clerk ID ${clerkId} not found. Creating placeholder user...`);
        const placeholderEmail = `admin+${clerkId}@example.com`;

        // Create the user
        const newUser = await prisma.user.create({
            data: {
                clerkId,
                email: placeholderEmail,
                firstName: 'Admin',
                lastName: 'User',
                roles: {
                    connect: { id: adminRole.id },
                },
            },
        });
        console.log(`Created user ${newUser.id} with admin role.`);
        return;
    }

    // 3. Assign Role
    console.log(`Assigning '${roleName}' role to user ${user.email}...`);
    await prisma.user.update({
        where: { id: user.id },
        data: {
            roles: {
                connect: { id: adminRole.id },
            },
        },
    });

    console.log('Successfully assigned admin role!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
