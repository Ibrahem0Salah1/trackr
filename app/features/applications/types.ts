// features/applications/types.ts
import { z } from "zod";
import { createApplicationSchema, updateApplicationSchema } from "./api/schema";

// API input types — from Zod
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
export type ApplicationStatus = CreateApplicationInput["status"];

// API response type — mirrors what Prisma returns
export interface Application {
  id: number;
  company: string;
  position: string;
  salaryAmount: number | null;
  salaryCurrency: "USD" | "EUR" | "EGP" | null;
  status: ApplicationStatus;
  country: string | null;
  city: string | null;
  remote: boolean;
  linkOfApplication: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: number;
}
export interface paginationMeta {
  total: number;
  page: number;
  perPage: number;
  pageCount: number;
}

export interface PaginatedApplications {
  data: Application[];
  meta: paginationMeta;
}

export interface UserData {
  id: number;
  email: string;
  name: string;
}
