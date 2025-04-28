import zod from 'zod';
export const createListingSchema = zod.object({
  id: zod.number().optional(),
  title: zod.string().min(1).max(100),
  description: zod.string().min(1).max(1000),
  location: zod.string().min(1).max(100),
  offering_skill: zod.number().positive(),
  requested_skill: zod.number().positive(),
  category: zod.number().positive(),
  duration: zod.string().min(1).max(100)
});

export type CreateListingInput = zod.infer<typeof createListingSchema>;
