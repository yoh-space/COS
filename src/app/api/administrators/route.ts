import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET all administrators
export async function GET() {
  try {
    const administrators = await prisma.administrator.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(administrators);
  } catch (error) {
    console.error("Error fetching administrators:", error);
    // Return empty array instead of error object to prevent frontend crashes
    return NextResponse.json([], { status: 200 });
  }
}

// POST create new administrator
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { positionId, title, name, imagePath, accountabilityStatement, duties, displayOrder } = body;

    const administrator = await prisma.administrator.create({
      data: {
        positionId,
        title,
        name,
        imagePath,
        accountabilityStatement,
        duties,
        displayOrder: displayOrder || 0,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "create",
        entityType: "administrator",
        entityId: administrator.id,
        userId,
        changes: JSON.stringify(administrator),
      },
    });

    revalidateTag('administrators');
    return NextResponse.json(administrator, { status: 201 });
  } catch (error) {
    console.error("Error creating administrator:", error);
    return NextResponse.json(
      { error: "Failed to create administrator" },
      { status: 500 }
    );
  }
}
