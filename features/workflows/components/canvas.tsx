"use client";

import {
  Background,
  Controls,
  ReactFlow,
  ConnectionLineType,
  NodeTypes,
  type ColorMode,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow";
import { useTheme } from "next-themes";
import * as React from "react";
import { StepNode } from "@/features/workflows/components/step-node";
import type { StepNodeType } from "@/features/workflows/nodes/node-registry";
import "@xyflow/react/dist/style.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-flow/styles.css";
interface CanvasProps {
  workflowId: string;
}
const nodeTypes: NodeTypes = { step: StepNode };

const initialNodes: Node[] = [
  {
    id: "start",
    type: "step",
    position: { x: 0, y: 0 },
    data: { type: "start", kind: "trigger", title: "Start", values: {} },
  },
];

const initialEdges: Edge[] = [{ id: "n1-n2", source: "n1", target: "n2" }];

const subscribe = () => () => {};

// false during server render and hydration, true once mounted on the client
function useMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function Canvas({ workflowId }: CanvasProps) {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow<Node, Edge>({
      suspense: true,
      nodes: { initial: initialNodes },
      edges: { initial: initialEdges },
    });
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  // Render "light" on the server and during hydration so both match
  const colorMode: ColorMode =
    mounted && resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div className="size-full" data-workflow-id={workflowId}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        colorMode={colorMode}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "var(--border)" },
        }}
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionLine-stroke-width": 2,
          } as React.CSSProperties
        }
        maxZoom={1}
      >
        <Background />
        <Controls />
        <Cursors />
      </ReactFlow>
    </div>
  );
}
