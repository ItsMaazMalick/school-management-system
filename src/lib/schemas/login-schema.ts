import { z } from "zod";
import { requiredString } from "./required-fields-model";

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
  role: requiredString,
});

export type LoginSchema = z.infer<typeof loginSchema>;
