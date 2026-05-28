import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Cpu, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface GNode {
  id: string;
  x: number;
  y: number;
  icon?: LucideIcon;
  isBrain?: boolean;
  isAI?: boolean;      // LLM node – dashed border
  isMimetikos?: boolean; // inside Mimetikos box but not core AI/M
  subtitle?: string;
  label: string;
}

export interface GEdge {
  from: string;
  to: string;
  label: string;
  fast?: boolean; // shorter duration – used for ai→m confirmation hops
}

export interface WorkflowGraphData {
  tag: string;
  title: string;
  goal: string;
  nodes: GNode[];
  edges: GEdge[];
  knowledgeOnRight?: boolean;
  knowledgePos?: { skills: { x: number; y: number }; wiki: { x: number; y: number } };
  viewWidth?: number;
  viewHeight?: number;
}

const VW = 600;
const VH = 380;
const ICON_R = 26;
const STEP_MS = 1500;
const FAST_MS = 800;
const PAUSE_MS = 2400;

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

const SKILLS_POS   = { x: 115, y: 60 };
const WIKI_POS     = { x: 115, y: 148 };
const SKILLS_POS_R = { x: 490, y: 110 };
const WIKI_POS_R   = { x: 490, y: 245 };
const KNOW_PAD     = 14;

function edgePts(a: { x: number; y: number }, b: { x: number; y: number }, pad = ICON_R + 4) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  return {
    x1: a.x + (dx / d) * pad,
    y1: a.y + (dy / d) * pad,
    x2: b.x - (dx / d) * pad,
    y2: b.y - (dy / d) * pad,
  };
}

export function WorkflowGraph({ data, knowledgeLabel = "Knowledge" }: {
  data: WorkflowGraphData;
  knowledgeLabel?: string;
}) {
  const [step, setStep] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px 0px" });
  const stop = useRef(false);

  useEffect(() => {
    if (!inView) {
      stop.current = true;
      return;
    }
    stop.current = false;
    (async () => {
      await sleep(600);
      while (!stop.current) {
        for (let i = 0; i < data.edges.length; i++) {
          if (stop.current) return;
          setStep(i);
          await sleep(data.edges[i].fast ? FAST_MS : STEP_MS);
        }
        if (stop.current) return;
        await sleep(PAUSE_MS);
        setStep(-1);
        await sleep(400);
      }
    })();
    return () => {
      stop.current = true;
      setStep(-1);
    };
  }, [inView, data.edges.length]);

  const nodeMap = Object.fromEntries(data.nodes.map((n) => [n.id, n]));
  const activeEdge = step >= 0 ? data.edges[step] : null;

  const visited = new Set<string>();
  for (let i = 0; i < step && step >= 0; i++) {
    visited.add(data.edges[i].from);
    visited.add(data.edges[i].to);
  }

  // packet speed depends on edge type
  const packetDur = activeEdge
    ? ((activeEdge.fast ? FAST_MS : STEP_MS) / 1000) * 0.6
    : 0.9;

  const mid = `m-${data.tag.replace(/\W/g, "")}`;
  const aiNode = data.nodes.find((n) => n.isAI);
  const aiIsActive = !!(aiNode && activeEdge &&
    (activeEdge.from === aiNode.id || activeEdge.to === aiNode.id));
  const skillsPos = data.knowledgePos?.skills ?? (data.knowledgeOnRight ? SKILLS_POS_R : SKILLS_POS);
  const wikiPos   = data.knowledgePos?.wiki   ?? (data.knowledgeOnRight ? WIKI_POS_R   : WIKI_POS);

  return (
    <div ref={ref} className="w-full rounded-2xl bg-card px-6 py-8 md:px-10">
      <span className="inline-block rounded-full border border-primary/40 px-3 py-0.5 text-xs font-medium text-primary">
        {data.tag}
      </span>
      <h3 className="mt-3 text-xl font-semibold">{data.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{data.goal}</p>

      <div className="mt-6">
        <svg
          viewBox={`0 0 ${data.viewWidth ?? VW} ${data.viewHeight ?? VH}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker id={`${mid}-a`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="oklch(0.65 0.18 250)" />
            </marker>
            <marker id={`${mid}-d`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" opacity="0.25" />
            </marker>
          </defs>

          {/* ── Mimetikos group box (AI + M are one entity) ── */}
          {(() => {
            const groupNodes = data.nodes.filter((n) => n.isAI || n.isBrain || n.isMimetikos);
            if (groupNodes.length < 2) return null;
            const pad = 18;
            const minX = Math.min(...groupNodes.map((n) => n.x)) - ICON_R - pad;
            const minY = Math.min(...groupNodes.map((n) => n.y)) - ICON_R - pad;
            const maxX = Math.max(...groupNodes.map((n) => n.x)) + ICON_R + pad;
            const maxY = Math.max(...groupNodes.map((n) => n.y)) + ICON_R + pad;
            const w = maxX - minX;
            const h = maxY - minY;
            const lw = 76;
            const lh = 18;
            return (
              <g>
                <rect
                  x={minX} y={minY}
                  width={w} height={h}
                  rx={12}
                  fill="oklch(0.65 0.18 250 / 0.04)"
                  stroke="oklch(0.65 0.18 250)"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  opacity={0.7}
                />
                {/* Label pill straddling the top border */}
                <rect
                  x={minX + w / 2 - lw / 2} y={minY - lh / 2}
                  width={lw} height={lh} rx={lh / 2}
                  fill="oklch(0.1 0.02 250)"
                  stroke="oklch(0.65 0.18 250)"
                  strokeWidth={1}
                  opacity={0.9}
                />
                <text
                  x={minX + w / 2}
                  y={minY + 5}
                  textAnchor="middle"
                  fill="oklch(0.65 0.18 250)"
                  style={{ fontSize: 9, fontWeight: 600, fontFamily: "inherit", letterSpacing: "0.09em" }}
                >
                  MIMĒTIKÓS
                </text>
              </g>
            );
          })()}

          {/* ── Knowledge group box (Skills + Wiki) ── */}
          {aiNode && (() => {
            const pad = KNOW_PAD;
            const minX = skillsPos.x - ICON_R - pad;
            const minY = Math.min(skillsPos.y, wikiPos.y) - ICON_R - pad;
            const maxX = skillsPos.x + ICON_R + pad;
            const maxY = Math.max(skillsPos.y, wikiPos.y) + ICON_R + pad + 10;
            const w = maxX - minX;
            const h = maxY - minY;
            const lw = 84; const lh = 18;
            const kOp = step === -1 ? 0.55 : aiIsActive ? 1 : 0.25;
            return (
              <g>
                {/* Connection lines AI ↔ knowledge */}
                {[skillsPos, wikiPos].map((pos, i) => {
                  const pts = edgePts(aiNode, pos, ICON_R + 2);
                  return (
                    <motion.line key={i}
                      x1={pts.x1} y1={pts.y1} x2={pts.x2} y2={pts.y2}
                      stroke="oklch(0.65 0.18 250)"
                      strokeWidth={aiIsActive ? 2 : 1}
                      strokeDasharray="4 3"
                      animate={{ opacity: step === -1 ? 0.2 : aiIsActive ? 0.75 : 0.08 }}
                      transition={{ duration: 0.3 }}
                    />
                  );
                })}
                {/* Box */}
                <motion.rect
                  x={minX} y={minY} width={w} height={h} rx={10}
                  fill="oklch(0.65 0.18 250 / 0.04)"
                  stroke="oklch(0.65 0.18 250)"
                  strokeWidth={1.5}
                  strokeDasharray="5 3"
                  animate={{ opacity: kOp }}
                  transition={{ duration: 0.3 }}
                />
                {/* Label pill straddling top border */}
                <motion.rect
                  x={minX + w / 2 - lw / 2} y={minY - lh / 2}
                  width={lw} height={lh} rx={lh / 2}
                  fill="oklch(0.1 0.02 250)"
                  stroke="oklch(0.65 0.18 250)"
                  strokeWidth={1}
                  animate={{ opacity: kOp }}
                  transition={{ duration: 0.3 }}
                />
                <motion.text
                  x={minX + w / 2} y={minY + 5}
                  textAnchor="middle"
                  fill="oklch(0.65 0.18 250)"
                  style={{ fontSize: 9, fontWeight: 600, fontFamily: "inherit", letterSpacing: "0.09em" }}
                  animate={{ opacity: kOp }}
                  transition={{ duration: 0.3 }}
                >
                  {knowledgeLabel.toUpperCase()}
                </motion.text>
              </g>
            );
          })()}

          {/* ── Edges ── */}
          {data.edges.map((edge, i) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;
            const { x1, y1, x2, y2 } = edgePts(from, to);
            const isActive = step === i;
            const isDone = step > i && step !== -1;

            return (
              <motion.line
                key={`e${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isActive ? "oklch(0.65 0.18 250)" : "currentColor"}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeDasharray={isActive ? "none" : "6 4"}
                markerEnd={`url(#${isActive ? `${mid}-a` : `${mid}-d`})`}
                animate={{ opacity: step === -1 ? 0.3 : isActive ? 1 : isDone ? 0.45 : 0.15 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground"
              />
            );
          })}

          {/* ── Packet ── */}
          <AnimatePresence>
            {/* Knowledge packets – travel AI↔Skills/Wiki whenever AI is active */}
            {aiIsActive && aiNode && [skillsPos, wikiPos].map((pos, i) => {
              const isOut = activeEdge?.from === aiNode.id;
              const fromPt = isOut ? aiNode : pos;
              const toPt   = isOut ? pos : aiNode;
              const pts = edgePts(fromPt, toPt, ICON_R + 2);
              return (
                <motion.circle
                  key={`kp${i}-${step}`}
                  r={4}
                  fill="oklch(0.65 0.18 250)"
                  initial={{ cx: pts.x1, cy: pts.y1, opacity: 0.8 }}
                  animate={{ cx: pts.x2, cy: pts.y2 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    cx: { duration: packetDur * 0.65, ease: "easeInOut", delay: i * 0.08 },
                    cy: { duration: packetDur * 0.65, ease: "easeInOut", delay: i * 0.08 },
                  }}
                />
              );
            })}
            {activeEdge && (() => {
              const from = nodeMap[activeEdge.from];
              const to = nodeMap[activeEdge.to];
              if (!from || !to) return null;
              const { x1, y1, x2, y2 } = edgePts(from, to);
              return (
                <motion.circle
                  key={`pk${step}`}
                  r={activeEdge.fast ? 5 : 8}
                  fill="oklch(0.65 0.18 250)"
                  initial={{ cx: x1, cy: y1, opacity: 1 }}
                  animate={{ cx: x2, cy: y2 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{
                    cx: { duration: packetDur, ease: "easeIn" },
                    cy: { duration: packetDur, ease: "easeIn" },
                  }}
                />
              );
            })()}
          </AnimatePresence>

          {/* ── Edge label pill ── */}
          <AnimatePresence>
            {activeEdge && (() => {
              const from = nodeMap[activeEdge.from];
              const to = nodeMap[activeEdge.to];
              if (!from || !to) return null;
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;
              const lw = 152;
              const lh = activeEdge.fast ? 22 : 28;
              return (
                <motion.g
                  key={`lbl${step}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ transformOrigin: `${mx}px ${my}px` }}
                >
                  <rect
                    x={mx - lw / 2} y={my - lh / 2}
                    width={lw} height={lh} rx={lh / 2}
                    fill={activeEdge.fast ? "oklch(0.12 0.01 250)" : "oklch(0.15 0.02 250)"}
                    stroke="oklch(0.65 0.18 250)"
                    strokeWidth={activeEdge.fast ? 1 : 1.5}
                    opacity={activeEdge.fast ? 0.85 : 1}
                  />
                  <text
                    x={mx} y={my + (activeEdge.fast ? 4 : 5)}
                    textAnchor="middle"
                    fill="oklch(0.65 0.18 250)"
                    style={{
                      fontSize: activeEdge.fast ? 10 : 12,
                      fontWeight: activeEdge.fast ? 400 : 600,
                      fontFamily: "inherit",
                      opacity: activeEdge.fast ? 0.85 : 1,
                    }}
                  >
                    {activeEdge.label}
                  </text>
                </motion.g>
              );
            })()}
          </AnimatePresence>

          {/* ── Nodes ── */}
          {data.nodes.map((node) => {
            const Icon = node.icon;
            const isActiveNode = activeEdge
              ? activeEdge.from === node.id || activeEdge.to === node.id
              : false;
            const alwaysOn = !!node.isBrain && step >= 0;
            const highlighted = isActiveNode || alwaysOn;
            const nodeOpacity =
              step === -1 ? 1 : highlighted ? 1 : visited.has(node.id) ? 0.55 : 0.25;

            return (
              <motion.g
                key={node.id}
                animate={{ opacity: nodeOpacity }}
                transition={{ duration: 0.35 }}
              >
                {/* Glow */}
                <motion.circle
                  cx={node.x} cy={node.y} r={ICON_R + 10}
                  fill="oklch(0.65 0.18 250)"
                  animate={{ opacity: highlighted ? (node.isBrain ? 0.18 : 0.12) : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Circle */}
                <circle
                  cx={node.x} cy={node.y} r={ICON_R}
                  fill={
                    node.isBrain
                      ? "oklch(0.65 0.18 250 / 0.15)"
                      : node.isAI || highlighted
                        ? "oklch(0.65 0.18 250 / 0.08)"
                        : "oklch(0.18 0.01 250)"
                  }
                  stroke={
                    highlighted || node.isBrain || node.isAI
                      ? "oklch(0.65 0.18 250)"
                      : "oklch(0.3 0.02 250)"
                  }
                  strokeWidth={node.isBrain ? 2.5 : 1.5}
                  strokeDasharray={node.isAI ? "5 3" : "none"}
                />

                {/* Content */}
                {node.isBrain ? (
                  <>
                    <text
                      x={node.x}
                      y={node.subtitle ? node.y + 1 : node.y + 7}
                      textAnchor="middle"
                      fill="oklch(0.65 0.18 250)"
                      style={{ fontSize: node.subtitle ? 18 : 22, fontWeight: 700, fontFamily: "inherit" }}
                    >
                      M
                    </text>
                    {node.subtitle && (
                      <text
                        x={node.x}
                        y={node.y + 14}
                        textAnchor="middle"
                        fill="oklch(0.75 0.1 250)"
                        style={{ fontSize: 8, fontWeight: 500, fontFamily: "inherit", letterSpacing: "0.02em" }}
                      >
                        {node.subtitle}
                      </text>
                    )}
                  </>
                ) : Icon ? (
                  <foreignObject x={node.x - 14} y={node.y - 14} width={28} height={28}>
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      className="flex h-full w-full items-center justify-center"
                    >
                      <Icon
                        className={`h-[18px] w-[18px] transition-colors duration-300 ${
                          highlighted ? "text-primary" : "text-muted-foreground"
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </foreignObject>
                ) : null}

                {/* Node label */}
                <text
                  x={node.x} y={node.y + ICON_R + 16}
                  textAnchor="middle"
                  fill={highlighted ? "oklch(0.9 0.01 250)" : "oklch(0.6 0.02 250)"}
                  style={{ fontSize: 11, fontFamily: "inherit" }}
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
          {/* ── Knowledge nodes (Skills + Wiki) ── */}
          {aiNode && (
            [
              { pos: skillsPos, Icon: Cpu,      label: "Skills" },
              { pos: wikiPos,   Icon: BookOpen, label: "Wiki" },
            ].map(({ pos, Icon, label }) => {
              const nodeOpacity = step === -1 ? 1 : aiIsActive ? 1 : 0.22;
              return (
                <motion.g
                  key={label}
                  animate={{ opacity: nodeOpacity }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Glow */}
                  <motion.circle
                    cx={pos.x} cy={pos.y} r={ICON_R + 10}
                    fill="oklch(0.65 0.18 250)"
                    animate={{ opacity: aiIsActive ? 0.12 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Circle */}
                  <circle
                    cx={pos.x} cy={pos.y} r={ICON_R}
                    fill={aiIsActive ? "oklch(0.65 0.18 250 / 0.08)" : "oklch(0.18 0.01 250)"}
                    stroke={aiIsActive ? "oklch(0.65 0.18 250)" : "oklch(0.3 0.02 250)"}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                  {/* Icon */}
                  <foreignObject x={pos.x - 14} y={pos.y - 14} width={28} height={28}>
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      className="flex h-full w-full items-center justify-center"
                    >
                      <Icon
                        className={`h-[18px] w-[18px] transition-colors duration-300 ${
                          aiIsActive ? "text-primary" : "text-muted-foreground"
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </foreignObject>
                  {/* Label */}
                  <text
                    x={pos.x} y={pos.y + ICON_R + 16}
                    textAnchor="middle"
                    fill={aiIsActive ? "oklch(0.9 0.01 250)" : "oklch(0.6 0.02 250)"}
                    style={{ fontSize: 11, fontFamily: "inherit" }}
                  >
                    {label}
                  </text>
                </motion.g>
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
}
