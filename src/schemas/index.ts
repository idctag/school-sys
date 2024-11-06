import { z } from "zod";

export const studentSchema = z.object({
  email: z.string().min(2).email().max(50),
  name: z.string().min(1),
  lastName: z.string().min(1),
});
