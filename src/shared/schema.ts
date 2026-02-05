import { z } from "zod";

export const insertRegistrationSchema = z.object({
  nombre: z.string(),
  email: z.string(),
  telefono: z.string().optional(),
  empresa: z.string().optional(),
  mensaje: z.string().optional(),
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
