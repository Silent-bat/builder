import { z } from "zod";

export const pageTypeSchema = z.enum(["LANDING", "DASHBOARD"]);

export const pageUpsertSchema = z.object({
  type: pageTypeSchema,
  slug: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers, and hyphens only"),
  title: z.string().min(1).max(120),
  contentMd: z.string().max(50_000).optional().default(""),
  published: z.boolean().optional().default(true),
});

export const pageUpdateSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  contentMd: z.string().max(50_000).optional(),
  published: z.boolean().optional(),
});

export type PageUpsertInput = z.infer<typeof pageUpsertSchema>;
export type PageUpdateInput = z.infer<typeof pageUpdateSchema>;
