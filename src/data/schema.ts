import { z } from "zod";

/** URL-safe identifier: lowercase alphanumeric segments separated by hyphens. */
export const idSchema = z
  .string()
  .min(1, "El identificador no puede estar vacío")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "El identificador debe usar solo minúsculas, números y guiones",
  );

export const slugSchema = z
  .string()
  .min(1, "El slug no puede estar vacío")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "El slug debe usar solo minúsculas, números y guiones",
  );

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isRealCalendarDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export const isoDateSchema = z
  .string()
  .refine(
    isRealCalendarDate,
    "La fecha debe tener formato ISO válido (YYYY-MM-DD)",
  );

export const promptLanguageSchema = z.enum(["es", "en"], {
  error: 'El idioma debe ser "es" o "en"',
});

export const moduleSchema = z.object({
  id: idSchema,
  iconId: idSchema,
  label: z.string().min(1, "El nombre del módulo no puede estar vacío"),
  description: z
    .string()
    .min(1, "La descripción del módulo no puede estar vacía"),
});

export const moduleNavigationGroupSchema = z.object({
  id: idSchema,
  label: z.string().min(1, "El nombre del grupo no puede estar vacío"),
  description: z.string().min(1, "La descripción del grupo no puede estar vacía"),
  categories: z.array(idSchema).min(1, "El grupo debe incluir al menos una categoría"),
});

export const moduleNavigationSchema = z.object({
  module: idSchema,
  groups: z.array(moduleNavigationGroupSchema).min(1, "El módulo debe incluir al menos un grupo"),
});

export const categorySchema = z.object({
  id: idSchema,
  iconId: idSchema,
  label: z.string().min(1, "El nombre de la categoría no puede estar vacío"),
  description: z.string().min(1, "La descripción de la categoría no puede estar vacía"),
  module: idSchema,
});

export const subcategorySchema = z.object({
  id: idSchema,
  iconId: idSchema.optional(),
  label: z
    .string()
    .min(1, "El nombre de la subcategoría no puede estar vacío"),
  category: idSchema,
  description: z.string().min(1).optional(),
  isNavigable: z.boolean().optional(),
});

export const tagSchema = z.object({
  id: idSchema,
  label: z.string().min(1, "El nombre de la etiqueta no puede estar vacío"),
  facet: z.enum(["technology", "objective", "format", "context"]),
});

export const promptSchema = z.object({
  id: idSchema,
  slug: slugSchema,
  title: z.string().min(1, "El título no puede estar vacío"),
  description: z.string().min(1, "La descripción no puede estar vacía"),
  content: z.string().min(1, "El contenido del prompt no puede estar vacío"),
  language: promptLanguageSchema,
  module: idSchema,
  category: idSchema,
  subcategories: z.array(idSchema).optional(),
  tags: z.array(idSchema),
  useCases: z.array(z.string().min(1)).optional(),
  notes: z.string().optional(),
  example: z.string().optional(),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
});
