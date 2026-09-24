"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ToastButton() {
  return (
    <Button
      size="lg"
      className="h-12 w-full rounded-full md:w-[158px]"
      onClick={() =>
        toast.success("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => toast.info("Event creation undone"),
          },
        })
      }
    >
      Show Toast
    </Button>
  );
}
