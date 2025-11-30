import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET single administrator
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const administrator = await prisma.administrator.findUnique({
      where: { id: params.id },
    });

    if (!administrator) {
      return NextResponse.json(
        { error: "Administrator not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(administrator);
  } catch (error) {
    console.error("Error fetching administrator:", error);
    return NextResponse.json(
      { error: "Failed to fetch administrator" },
      { status: 500 }
    );
  }
}

// PUT update administrator
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, name, imagePath, accountabilityStatement, duties, status, displayOrder } = body;

    const oldData = await prisma.administrator.findUnique({
      where: { id: params.id },
    });

    const administrator = await prisma.administrator.update({
      where: { id: params.id },
      data: {
        title,
        name,
        imagePath,
        accountabilityStatement,
        duties,
        status,
        displayOrder,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "update",
        entityType: "administrator",
        entityId: administrator.id,
        userId,
        changes: JSON.stringify({ old: oldData, new: administrator }),
      },
    });

    return NextResponse.json(administrator);
  } catch (error) {
    console.error("Error updating administrator:", error);
    return NextResponse.json(
      { error: "Failed to update administrator" },
      { status: 500 }
    );
  }
}

// DELETE administrator
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const administrator = await prisma.administrator.delete({
      where: { id: params.id },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "delete",
        entityType: "administrator",
        entityId: administrator.id,
        userId,
        changes: JSON.stringify(administrator),
      },
    });

    return NextResponse.json({ message: "Administrator deleted successfully" });
  } catch (error) {
    console.error("Error deleting administrator:", error);
    return NextResponse.json(
      { error: "Failed to delete administrator" },
      { status: 500 }
    );
  }
}
