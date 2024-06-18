import { z } from "zod";

export const createSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
});

export const updateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5),
  })
  .strict();

export const signinSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5),
  })
  .strict();

export type UpdateType = z.infer<typeof updateSchema>;
export type CreateType = z.infer<typeof createSchema>;
export type SigninType = z.infer<typeof signinSchema>;
export type SignupType = z.infer<typeof signupSchema>;
