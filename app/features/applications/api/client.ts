// app/features/applications/api/client.ts
import {
  UpdateApplicationInput,
  CreateApplicationInput,
  Application,
  PaginatedApplications,
} from "@/app/features/applications/types";
//get Applications
export async function getApplications(
  q: string = "",
  page: number = 1,
): Promise<PaginatedApplications> {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  const url = qs ? `/api/applications?${qs}` : `/api/applications`;
  const applications = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!applications.ok) {
    throw new Error("inable to fetch applications *comingFromClient*");
  }
  return applications.json();
}

export async function createApplication(
  data: CreateApplicationInput,
): Promise<Application> {
  const response = await fetch("/api/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateApplication(
  id: number,
  data: UpdateApplicationInput,
): Promise<Application> {
  const res = await fetch(`/api/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update application");
  return res.json();
}

export async function deleteApplications(
  ids: number[],
): Promise<{ deleted: number }> {
  const response = await fetch("/api/applications", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete applications", { cause: response });
  }
  return response.json();
}
