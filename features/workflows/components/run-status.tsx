"use client";

import { useRealtimeRun } from "@trigger.dev/react-hooks";

import type { helloWorldTask } from "@/trigger/example";

interface RunStatusProps {
  runId: string;
  publicAccessToken: string;
  onComplete: () => void;
}

export function RunStatus({
  runId,
  publicAccessToken,
  onComplete,
}: RunStatusProps) {
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(runId, {
    accessToken: publicAccessToken,
    skipColumns: ["payload", "output"],
    onComplete,
  });

  if (error) {
    return <p className="text-sm text-destructive">{error.message}</p>;
  }

  return (
    <p className="text-sm text-muted-foreground">
      Status:{" "}
      <span className="font-medium text-foreground">
        {run?.status ?? "CONNECTING"}
      </span>
    </p>
  );
}
