"use client";

import { PlusIcon, WorkflowIcon } from "lucide-react";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const workflows = [
  { id: "dominant-wasp", name: "dominant-wasp" },
  { id: "honest-reindeer", name: "honest-reindeer" },
  { id: "expected-llama", name: "expected-llama" },
  { id: "essential-ocelot", name: "essential-ocelot" },
  { id: "creepy-echidna", name: "creepy-echidna" },
  { id: "eastern-silkworm", name: "eastern-silkworm" },
  { id: "cultural-lion", name: "cultural-lion" },
  { id: "proud-weasel", name: "proud-weasel" },
  { id: "regional-bonobo", name: "regional-bonobo" },
];

export function WorkflowNav() {
  const { state } = useSidebar();
  const [activeWorkflow, setActiveWorkflow] = React.useState(workflows[0].id);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const workflowItems = (
    <SidebarMenu className="gap-y-0.5">
      {workflows.map((workflow) => (
        <SidebarMenuItem key={workflow.id}>
          <SidebarMenuButton
            isActive={workflow.id === activeWorkflow}
            onClick={() => setActiveWorkflow(workflow.id)}
          >
            <span>{workflow.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover onOpenChange={setIsPopoverOpen}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <SidebarMenuButton>
                        <WorkflowIcon />
                        <span>Workflows</span>
                      </SidebarMenuButton>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="right" hidden={isPopoverOpen}>
                    Workflows
                  </TooltipContent>
                </Tooltip>
                <PopoverContent side="right" align="start" className="p-1">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <PlusIcon />
                        <span>New workflow</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                  <SidebarSeparator className="mx-0 my-0" />
                  {workflowItems}
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarGroupAction title="New workflow">
        <PlusIcon />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarGroupContent>{workflowItems}</SidebarGroupContent>
    </SidebarGroup>
  );
}
