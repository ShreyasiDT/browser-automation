import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dbCredentials: {
    // Direct (non-pooled) connection: PgBouncer's transaction mode breaks
    // migrations, dumps and anything relying on session state.
    url: process.env.DATABASE_URL_UNPOOLED!,
  },
  casing: "snake_case",
  strict: true,
  verbose: true,
});
