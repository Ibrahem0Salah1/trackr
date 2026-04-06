// app/api/applications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/getUser";
import { createApplicationSchema } from "@/app/features/applications/api/schema";
import { bulkSelectedIdsDeleteSchema } from "@/app/features/applications/api/schema";
import { getApplicationsPage } from "@/app/features/applications/api/server";
import { prisma } from "@/lib/prisma";
import { success } from "zod";
import { stat } from "fs";
export async function GET(request: Request) {
  const user = await getUser();
  if (!user || typeof user === "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const result = await getApplicationsPage(Number(user.userId), q, page);

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user || typeof user === "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const parsedData = createApplicationSchema.parse(body);
  const dataPassed = { ...parsedData, userId: Number(user?.userId) };
  const app = await prisma.jobApplication.create({
    data: {
      ...dataPassed,
    },
  });
  return NextResponse.json(app);
}
//DELETE
export async function DELETE(request: NextRequest) {
  const user = await getUser();
  if (!user || typeof user === "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const parsedData = bulkSelectedIdsDeleteSchema.parse(body);
  if (!parsedData || parsedData.ids.length === 0) {
    return NextResponse.json(
      { error: "Invalid IDs provided" },
      { status: 422 },
    );
  }
  await prisma.jobApplication.deleteMany({
    where: {
      id: {
        in: parsedData.ids,
      },
      userId: Number(user.userId),
    },
  });
  return NextResponse.json({
    deleted: parsedData.ids.length,
    message: "Applications deleted successfully",
    success: true,
    status: 200,
  });
}
