import { z } from "zod";

export const requiredString = z.string().min(1, "Required");
export const optionalString = z.string().optional();
export const requiredInt = z.coerce.number().min(1, "Required");
export const optionalInt = z.coerce.number().optional();
