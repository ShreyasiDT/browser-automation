"use server";

import { auth } from "@clerk/nextjs/server";
import { tasks } from "@trigger.dev/sdk";
// Type-only import: gives full payload/return type-safety without bundling
// the task's code (and its dependencies) into your Next.js server build.
import type { helloWorldTask } from "@/trigger/example";

/**
 * Example of triggering a Trigger.dev task from backend code.
 *
 * Call this from a Client Component the same way you call `createWorkflowAction`.
 * It returns immediately with a handle — the task runs on Trigger.dev, not in
 * your request, so nothing here blocks on the task's 5s `wait.for`.
 */
export async function triggerHelloWorldAction(message: string) {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("No active organization");
  }

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message,
  });

  return { runId: handle.id, publicAccessToken: handle.publicAccessToken };
}
