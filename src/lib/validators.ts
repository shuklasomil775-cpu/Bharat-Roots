// Shared form validation rules.
import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be under 20 characters")
      .regex(/^[A-Za-z0-9_]+$/, "Use letters, numbers and underscore only"),
    email: z.string().trim().email("Enter a valid email address").max(255),
    password: z.string().min(6, "Password must be at least 6 characters").max(72),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Email or username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be under 100 characters"),
  state: z.string().min(1, "Please select a state"),
  category: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be under 500 characters"),
});

export type FieldErrors = Record<string, string>;

/** Safe lookup that works with strict index-signature access rules. */
export const fieldError = (errors: FieldErrors, key: string): string | undefined =>
  errors[key];

/** Flattens a zod error into a simple { field: message } map. */
export function errorsFrom(err: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
