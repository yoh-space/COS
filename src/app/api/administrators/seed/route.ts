import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { administrators } from "@/data/administrators";

// POST seed administrators from static data
export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results = {
      created: 0,
      skipped: 0,
      errors: [] as string[],
    };

    for (const admin of administrators) {
      try {
        // Check if administrator with this positionId already exists
        const existing = await prisma.administrator.findUnique({
          where: { positionId: admin.id },
        });

        if (existing) {
          results.skipped++;
          continue;
        }

        // Create new administrator
        await prisma.administrator.create({
          data: {
            positionId: admin.id,
            title: admin.title,
            name: admin.name || null,
            imagePath: admin.imagePath,
            accountabilityStatement: admin.accountabilityStatement || null,
            duties: admin.duties,
            status: "active",
            displayOrder: administrators.indexOf(admin),
          },
        });

        results.created++;
      } catch (error) {
        results.errors.push(`Failed to seed ${admin.title}: ${error}`);
      }
    }

    return NextResponse.json({
      message: "Seeding completed",
      ...results,
    });
  } catch (error) {
    console.error("Error seeding administrators:", error);
    return NextResponse.json(
      { error: "Failed to seed administrators" },
      { status: 500 }
    );
  }
}
