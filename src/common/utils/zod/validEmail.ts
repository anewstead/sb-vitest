import { z } from "zod";

// Zod custom email validation using superRefine for type-safe validation chain
export const validEmail = z
  .string()
  .min(1, "Email is required")
  .superRefine((val, ctx) => {
    if (!val.includes("@")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email must include an '@' symbol",
      });
      return;
    }

    const [, domain] = val.split("@");
    if (!domain.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email must include a domain after '@'",
      });
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid email address",
      });
      return;
    }
  });
