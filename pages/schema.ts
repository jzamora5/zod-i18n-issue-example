import { z } from "zod";

const contactMethodSchema = z.object({
  method: z.string().min(1),
});

export const schema = z.object({
  personName: z.string().min(1),
  contactMethod: z.array(contactMethodSchema),
});
