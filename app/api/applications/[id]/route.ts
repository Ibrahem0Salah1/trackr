// app/api/applications/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/getUser";
import { updateApplicationSchema } from "@/app/features/applications/api/schema";
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getUser();
  if (!user || typeof user === "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsedData = updateApplicationSchema.parse(body);
    const updatedApplication = await prisma.jobApplication.update({
      where: { id, userId: Number(user?.userId) }, // ownership check
      data: parsedData,
    });

    return NextResponse.json(updatedApplication);
  } catch (err) {
    console.error("Error updating application:", err);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}
