export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-1 flex-col p-6">
      <h1 className="font-heading text-sm font-medium tracking-tight">
        Workflow
      </h1>
      <p className="text-sm/relaxed text-muted-foreground">{id}</p>
    </div>
  );
}
