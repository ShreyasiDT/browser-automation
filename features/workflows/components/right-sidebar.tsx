"use client";

import { PlayIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { runWorkflowAction } from "@/features/workflows/actions";
import { RunStatus } from "@/features/workflows/components/run-status";

interface ActiveRun {
  runId: string;
  publicAccessToken: string;
}

export function RightSidebar() {
  const [isPending, startTransition] = React.useTransition();
  const [activeRun, setActiveRun] = React.useState<ActiveRun | null>(null);
  const [isRunning, setIsRunning] = React.useState(false);

  const handleRun = () => {
    startTransition(async () => {
      try {
        const run = await runWorkflowAction();
        setActiveRun(run);
        setIsRunning(true);
      } catch {
        toast.error("Failed to start workflow run");
      }
    });
  };

  const isBusy = isPending || isRunning;

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 p-3">
      <Button onClick={handleRun} disabled={isBusy}>
        {isBusy ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <PlayIcon data-icon="inline-start" />
        )}
        Run
      </Button>
      {activeRun && (
        <RunStatus
          key={activeRun.runId}
          runId={activeRun.runId}
          publicAccessToken={activeRun.publicAccessToken}
          onComplete={() => setIsRunning(false)}
        />
      )}
    </div>
  );
}
