import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local if it exists, otherwise .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const clerkId = 'user_36C1KZrUTB9eWAqFyonOG7grNk1';
    const email = 'yohansdam@gmail.com';
    const roleName = 'Admin';

    console.log(`Ensuring '${roleName}' role exists...`);

    // 1. Upsert Admin Role with all permissions
    const adminRole = await prisma.role.upsert({
        where: { name: roleName },
        update: {
            permissions: ['*'], // Grant all permissions
            description: 'Administrator with full access to all features',
        },
        create: {
            name: roleName,
            description: 'Administrator with full access to all features',
            permissions: ['*'],
        },
    });

    console.log(`Role '${roleName}' is ready with ID: ${adminRole.id}`);

    // 2. Find or Create User
    console.log(`Looking for user with Clerk ID: ${clerkId}...`);
    let user = await prisma.user.findUnique({
        where: { clerkId },
        include: { roles: true },
    });

    if (!user) {
        console.log(`User not found. Creating user with email: ${email}...`);
        user = await prisma.user.create({
            data: {
                clerkId,
                email,
                firstName: 'Admin',
                lastName: 'User',
                roles: {
                    connect: { id: adminRole.id },
                },
            },
            include: { roles: true },
        });
        console.log(`Created user ${user.id} with admin role.`);
    } else {
        console.log(`Found user: ${user.email} (ID: ${user.id})`);

        // Check if user already has admin role
        const hasAdminRole = user.roles.some(role => role.name === roleName);

        if (hasAdminRole) {
            console.log(`User already has '${roleName}' role.`);
        } else {
            // Assign admin role
            console.log(`Assigning '${roleName}' role to user...`);
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    roles: {
                        connect: { id: adminRole.id },
                    },
                },
            });
            console.log(`Successfully assigned '${roleName}' role!`);
        }
    }

    console.log('\n✅ Admin role assignment complete!');
    console.log(`User: ${email}`);
    console.log(`Clerk ID: ${clerkId}`);
    console.log(`Role: ${roleName} (all permissions)`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
