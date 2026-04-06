import { z } from "zod";

export const createApplicationSchema = z.object({
  company: z.string().min(1, "company is required"),
  position: z.string().min(1, "position is required"),
  salaryAmount: z.number().int().positive().optional().nullable(),
  salaryCurrency: z.enum(["USD", "EUR", "EGP"]).default("EGP"),
  country: z.string().optional(),
  city: z.string().optional(),
  remote: z.boolean().default(false),
  status: z
    .enum(["APPLIED", "INTERVIEW", "OFFER", "REJECTED"])
    .default("APPLIED"),
  linkOfApplication: z.string().url().optional().or(z.literal("")),
});

export const updateApplicationSchema = createApplicationSchema.partial();
export const bulkSelectedIdsDeleteSchema = z.object({
  ids: z
    .array(z.number().int().positive())
    .min(1, "At least one ID is required"),
});
