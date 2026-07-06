import { z } from "zod";

const envSchema = z.object({
  CLERK_PUBLISHABLE_KEY: z.string().min(1, "CLERK_PUBLISHABLE_KEY is required"),
  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
  DATABASE_URL: z.string().optional(),
});

const parsedEnv = envSchema.safeParse({
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables configured.");
}

export const env = parsedEnv.data;
export default env;
