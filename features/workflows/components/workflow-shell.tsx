import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface WorkflowShellProps {
  workflowId: string;
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical" className="size-full">
          <ResizablePanel minSize="18rem">
            <div className="flex size-full flex-col items-center justify-center gap-1">
              <span className="font-heading text-sm font-medium tracking-tight">
                Canvas
              </span>
              <span className="text-sm/relaxed text-muted-foreground">
                {workflowId}
              </span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="8rem" minSize="6rem">
            <div className="flex size-full items-center justify-center">
              <span className="font-heading text-sm font-medium tracking-tight">
                Logs
              </span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
        <div className="flex size-full items-center justify-center">
          <span className="font-heading text-sm font-medium tracking-tight">
            Inspector
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
