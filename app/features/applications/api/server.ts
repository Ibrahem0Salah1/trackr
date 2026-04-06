// app/features/applications/api/server.ts
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { PaginatedApplications } from "@/app/features/applications/types";

export const APPLICATIONS_PER_PAGE = 10;

function buildApplicationsWhere(
  userId: number,
  q: string,
): Prisma.JobApplicationWhereInput {
  if (!q) {
    return { userId };
  }

  return {
    userId,
    OR: [
      { company: { contains: q, mode: "insensitive" } },
      { position: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
      { country: { contains: q, mode: "insensitive" } },
    ],
  };
}

export async function getApplicationsPage(
  userId: number,
  q = "",
  page = 1,
): Promise<PaginatedApplications> {
  const normalizedQuery = q.trim();
  const normalizedPage = Math.max(1, Number.isFinite(page) ? page : 1);
  const where = buildApplicationsWhere(userId, normalizedQuery);

  const [total, applications] = await Promise.all([
    prisma.jobApplication.count({ where }),
    prisma.jobApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (normalizedPage - 1) * APPLICATIONS_PER_PAGE,
      take: APPLICATIONS_PER_PAGE,
    }),
  ]);

  return {
    data: applications,
    meta: {
      total,
      page: normalizedPage,
      perPage: APPLICATIONS_PER_PAGE,
      pageCount: Math.ceil(total / APPLICATIONS_PER_PAGE),
    },
  };
}
