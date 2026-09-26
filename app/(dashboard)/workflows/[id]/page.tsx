import { WorkflowShell } from "@/features/workflows/components/workflow-shell";
import { Room } from "@/features/workflows/components/room";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getWorkflow } from "@/features/workflows/data";
import { liveblocks } from "@/lib/liveblocks";
export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { orgId } = await auth();
  if (!orgId) notFound();
  const workflow = await getWorkflow(orgId, id);
  if (!workflow) notFound();
  // Private by default; members of the workflow's org (a groupId in the ID token) get write access
  await liveblocks.getOrCreateRoom(id, {
    defaultAccesses: [],
    groupsAccesses: { [workflow.orgId]: ["room:write"] },
    organizationId: orgId,
  });
  return (
    <Room roomId={id}>
      <WorkflowShell workflowId={id} />
    </Room>
  );
}
