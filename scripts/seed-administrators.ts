import { PrismaClient } from "@prisma/client";
import { administrators } from "../src/data/administrators";

const prisma = new PrismaClient();

async function seedAdministrators() {
  console.log("Starting to seed administrators...");

  try {
    for (const admin of administrators) {
      const existing = await prisma.administrator.findUnique({
        where: { positionId: admin.id },
      });

      if (existing) {
        console.log(`Updating administrator: ${admin.title}`);
        await prisma.administrator.update({
          where: { positionId: admin.id },
          data: {
            title: admin.title,
            name: admin.name,
            imagePath: admin.imagePath,
            accountabilityStatement: admin.accountabilityStatement,
            duties: admin.duties,
            status: "active",
          },
        });
      } else {
        console.log(`Creating administrator: ${admin.title}`);
        await prisma.administrator.create({
          data: {
            positionId: admin.id,
            title: admin.title,
            name: admin.name,
            imagePath: admin.imagePath,
            accountabilityStatement: admin.accountabilityStatement,
            duties: admin.duties,
            status: "active",
            displayOrder: administrators.indexOf(admin),
          },
        });
      }
    }

    console.log("Successfully seeded administrators!");
  } catch (error) {
    console.error("Error seeding administrators:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedAdministrators();
