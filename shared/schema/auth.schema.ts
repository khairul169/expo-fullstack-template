import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  platform: z.enum(["ios", "android", "windows", "macos", "web"]).optional(),
});

export type LoginSchema = z.input<typeof loginSchema>;
