import { z } from "zod";
import { optionalString, requiredString } from "./required-fields-model";

export const addSchoolSchema = z.object({
  name: requiredString,
  email: requiredString,
  targetLine: requiredString,
  contact: requiredString,
  website: optionalString,
  address: requiredString,
  country: requiredString,
});

export type AddSchoolSchema = z.infer<typeof addSchoolSchema>;

export const updateSchoolUserSchema = z.object({
  username: requiredString,
  password: optionalString,
});

export type UpdateSchoolUserSchema = z.infer<typeof updateSchoolUserSchema>;
