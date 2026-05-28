import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileNav } from "@/components/MobileNav";
import {
  Mail,
  FileSpreadsheet,
  Database,
  MessageCircle,
  BookOpen,
  ScrollText,
  Phone,
  ClipboardList,
  Bot,
  Calendar,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Brain,
  FileText,
  Users,
  StickyNote,
  Activity,
  UserCheck,
  Puzzle,
  Wrench,
  GitBranch,
} from "lucide-react";
import { WorkflowGraph, type WorkflowGraphData } from "@/components/WorkflowGraph";

export const Route = createFileRoute("/discover")({
  component: Discover,
});

const navLinks = [
  { label: "How it works", href: "/en#how-it-works" },
  { label: "Who it's for", href: "/en#who" },
];

const workflows: WorkflowGraphData[] = [
  // ── WF0: Imprinting ──────────────────────────────────────────────────────
  {
    tag: "Imprinting",
    title: "Day one: knowledge is born",
    goal: "Before going live, Mimētikós integrates into your ecosystem. Every tool connects and transfers context: Mimētikós intelligence progressively analyses, structures and populates Skills and Wiki — the knowledge it will use in every future workflow.",
    knowledgeOnRight: true,
    nodes: [
      // Left column 1 (x=55)
      { id: "phone",  x: 55,  y: 35,  icon: Phone,          label: "Phone" },
      { id: "erp",    x: 55,  y: 135, icon: Database,        label: "CRM / ERP" },
      { id: "teams",  x: 55,  y: 235, icon: Users,           label: "Teams" },
      { id: "cal",    x: 55,  y: 335, icon: Calendar,        label: "Calendar" },
      // Left column 2 (x=145)
      { id: "wa",     x: 145, y: 35,  icon: MessageCircle,   label: "WhatsApp" },
      { id: "docs",   x: 145, y: 135, icon: FileText,        label: "Documents" },
      { id: "email",  x: 145, y: 235, icon: Mail,            label: "Email" },
      { id: "notes",  x: 145, y: 335, icon: StickyNote,      label: "Notes" },
      // Centre: Mimētikós
      { id: "m",  x: 260, y: 200, isBrain: true, subtitle: "supervision", label: "Mimētikós" },
      { id: "ai", x: 260, y: 65,  isAI: true, icon: Brain,  label: "AI / LLM" },
    ],
    edges: [
      { from: "phone", to: "m",  label: "connect" },
      { from: "wa",    to: "m",  label: "connect" },
      { from: "erp",   to: "m",  label: "connect" },
      { from: "docs",  to: "m",  label: "connect" },
      { from: "m",     to: "ai", label: "first analysis" },
      { from: "ai",    to: "m",  label: "structure mapped", fast: true },
      { from: "teams", to: "m",  label: "connect" },
      { from: "email", to: "m",  label: "connect" },
      { from: "cal",   to: "m",  label: "connect" },
      { from: "notes", to: "m",  label: "connect" },
      { from: "m",     to: "ai", label: "build knowledge" },
      { from: "ai",    to: "m",  label: "knowledge ready", fast: true },
    ],
  },

  // ── WF1: Day 2 — nightly self-improvement ────────────────────────────────
  {
    tag: "Day 2",
    title: "Nightly self-improvement",
    goal: "Every night Mimētikós analyses the logs and traces produced during the day. AI autonomously designs new workflows, plugins and tools for itself — while also updating Skills and Wiki. Nothing goes live without approval: every proposal is submitted to the Supervisor, who decides what to activate.",
    viewWidth: 720,
    knowledgePos: {
      skills: { x: 590, y: 75 },
      wiki:   { x: 590, y: 235 },
    },
    nodes: [
      // Supervisor — outside the box, prominent
      { id: "sup",    x: 70,  y: 50,  icon: UserCheck,  label: "You" },
      // Night inputs
      { id: "logs",   x: 70,  y: 185, icon: ScrollText, label: "Daily log" },
      { id: "tracce", x: 70,  y: 305, icon: Activity,   label: "Traces" },
      // Mimētikós core (left side of box)
      { id: "ai",     x: 240, y: 75,  isAI: true,        icon: Brain,     label: "AI / LLM" },
      { id: "m",      x: 240, y: 205, isBrain: true,     subtitle: "supervision", label: "Mimētikós" },
      // Self-created artefacts (right side of box)
      { id: "wf",     x: 400, y: 110, isMimetikos: true, icon: GitBranch, label: "Workflow" },
      { id: "plugin", x: 400, y: 215, isMimetikos: true, icon: Puzzle,    label: "Plugin" },
      { id: "tools",  x: 400, y: 320, isMimetikos: true, icon: Wrench,    label: "Tool" },
    ],
    edges: [
      { from: "logs",   to: "m",      label: "daily log" },
      { from: "tracce", to: "m",      label: "traces" },
      { from: "m",      to: "ai",     label: "night processing" },
      { from: "ai",     to: "wf",     label: "new workflow" },
      { from: "ai",     to: "plugin", label: "new plugin" },
      { from: "ai",     to: "tools",  label: "new tool" },
      { from: "ai",     to: "m",      label: "drafts ready", fast: true },
      { from: "m",      to: "sup",    label: "request approval" },
      { from: "sup",    to: "m",      label: "approved" },
      { from: "m",      to: "ai",     label: "apply" },
      { from: "ai",     to: "m",      label: "activated", fast: true },
    ],
  },

  // ── WF2: Sales report ────────────────────────────────────────────────────
  {
    tag: "Sales",
    title: "Daily sales report",
    goal: "A sales agent requests today's figures via WhatsApp. Mimētikós invokes the AI, which fetches data from the ERP and generates the Excel file — every result returns to Mimētikós for approval. The final reply to the requester is always sent by Mimētikós, never directly by the AI.",
    nodes: [
      { id: "wa",    x: 80,  y: 260, icon: MessageCircle,   label: "WhatsApp" },
      { id: "m",     x: 260, y: 210, isBrain: true, subtitle: "human approval", label: "Mimētikós" },
      { id: "ai",    x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "erp",   x: 460, y: 80,  icon: Database,         label: "ERP" },
      { id: "xls",   x: 460, y: 195, icon: FileSpreadsheet,  label: "Excel" },
      { id: "email", x: 460, y: 310, icon: Mail,             label: "Email" },
    ],
    edges: [
      { from: "wa",  to: "m",     label: "request" },
      { from: "m",   to: "ai",    label: "plan" },
      { from: "ai",  to: "erp",   label: "fetch data" },
      { from: "ai",  to: "m",     label: "data ready", fast: true },
      { from: "m",   to: "ai",    label: "build report" },
      { from: "ai",  to: "xls",   label: "gen Excel" },
      { from: "ai",  to: "m",     label: "Excel ready", fast: true },
      { from: "m",   to: "email", label: "send report" },
      { from: "m",   to: "wa",    label: "WA reply" },
    ],
  },

  // ── WF2: Order check (multi-step AI) ─────────────────────────────────────
  {
    tag: "Operations",
    title: "Procedure-driven order check",
    goal: "A scheduled procedure triggers Mimētikós every morning. The AI reads the SOP and queries the ERP — every result returns to Mimētikós for approval. The WhatsApp summary is sent by Mimētikós after approving the output.",
    nodes: [
      { id: "proc",  x: 80,  y: 260, icon: ScrollText,     label: "Procedures" },
      { id: "m",     x: 260, y: 210, isBrain: true, subtitle: "human approval", label: "Mimētikós" },
      { id: "ai",    x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "erp",   x: 460, y: 80,  icon: Database,       label: "ERP" },
      { id: "wa",    x: 460, y: 200, icon: MessageCircle,   label: "WhatsApp" },
      { id: "know",  x: 460, y: 320, icon: BookOpen,        label: "Knowledge" },
    ],
    edges: [
      { from: "proc", to: "m",    label: "start workflow" },
      { from: "m",    to: "ai",   label: "read procedure" },
      { from: "ai",   to: "erp",  label: "check orders" },
      { from: "ai",   to: "m",    label: "data ready", fast: true },
      { from: "m",    to: "ai",   label: "summarise" },
      { from: "ai",   to: "know", label: "archive" },
      { from: "ai",   to: "m",    label: "archived", fast: true },
      { from: "m",    to: "wa",   label: "send summary" },
    ],
  },

  // ── WF3: Call centre ─────────────────────────────────────────────────────
  {
    tag: "Customer Care",
    title: "Call centre support",
    goal: "A customer calls with a problem. Every AI action returns to Mimētikós for approval. Phone updates and the final call closure are always handled by Mimētikós — never directly by the AI.",
    nodes: [
      { id: "phone",  x: 80,  y: 260, icon: Phone,           label: "Phone" },
      { id: "m",      x: 260, y: 210, isBrain: true, subtitle: "human approval", label: "Mimētikós" },
      { id: "ai",     x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "know",   x: 460, y: 90,  icon: BookOpen,         label: "Knowledge" },
      { id: "ticket", x: 460, y: 270, icon: ClipboardList,    label: "Ticket" },
    ],
    edges: [
      { from: "phone",  to: "m",      label: "call" },
      { from: "m",      to: "ai",     label: "analyse" },
      { from: "ai",     to: "know",   label: "search KB" },
      { from: "ai",     to: "m",      label: "info found", fast: true },
      { from: "m",      to: "phone",  label: "searching..." },
      { from: "m",      to: "ai",     label: "resolve" },
      { from: "ai",     to: "ticket", label: "open ticket" },
      { from: "ai",     to: "m",      label: "ticket opened", fast: true },
      { from: "m",      to: "phone",  label: "solution found" },
      { from: "m",      to: "phone",  label: "end call" },
    ],
  },

  // ── WF4: Factory (2 ERP↔Robot passes + multi-step AI) ────────────────────
  {
    tag: "Manufacturing",
    title: "Assembly line — stock-out",
    goal: "The ERP alerts that stock is zero. The AI reads the protocol and coordinates two passes (Robot and urgent PO) — every result returns to Mimētikós for approval. The notification to the manager is sent by Mimētikós.",
    nodes: [
      { id: "erp",  x: 80,  y: 260, icon: Database,        label: "ERP/Warehouse" },
      { id: "m",    x: 260, y: 210, isBrain: true, subtitle: "human approval", label: "Mimētikós" },
      { id: "ai",   x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "proc", x: 460, y: 80,  icon: ScrollText,       label: "Procedures" },
      { id: "bot",  x: 460, y: 200, icon: Bot,              label: "Robot/PLC" },
      { id: "wa",   x: 460, y: 320, icon: MessageCircle,    label: "WhatsApp" },
    ],
    edges: [
      { from: "erp",  to: "m",    label: "stock-out alert" },
      { from: "m",    to: "ai",   label: "analyse" },
      { from: "ai",   to: "proc", label: "read protocol" },
      { from: "ai",   to: "m",    label: "protocol ok", fast: true },
      { from: "m",    to: "ai",   label: "1st pass: switch" },
      { from: "ai",   to: "bot",  label: "switch line" },
      { from: "ai",   to: "m",    label: "line ok", fast: true },
      { from: "m",    to: "ai",   label: "2nd pass: PO" },
      { from: "ai",   to: "erp",  label: "create urgent PO" },
      { from: "ai",   to: "m",    label: "PO created", fast: true },
      { from: "m",    to: "wa",   label: "notify" },
    ],
  },

  // ── WF5: Tourism (WA update after every AI step) ─────────────────────────
  {
    tag: "Tourism",
    title: "DMO — local tour booking",
    goal: "A tourist asks for a tour via WhatsApp. Every AI action (search, booking) returns to Mimētikós for approval. Customer updates and the final confirmation with QR code are always sent by Mimētikós.",
    nodes: [
      { id: "wa",   x: 80,  y: 260, icon: MessageCircle,  label: "WhatsApp" },
      { id: "m",    x: 260, y: 210, isBrain: true, subtitle: "human approval", label: "Mimētikós" },
      { id: "ai",   x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "know", x: 460, y: 120, icon: BookOpen,        label: "Tour catalogue" },
      { id: "cal",  x: 460, y: 280, icon: Calendar,        label: "Calendar" },
    ],
    edges: [
      { from: "wa",  to: "m",    label: "tour request" },
      { from: "m",   to: "ai",   label: "analyse" },
      { from: "ai",  to: "know", label: "find tours" },
      { from: "ai",  to: "m",    label: "tours found", fast: true },
      { from: "m",   to: "wa",   label: "searching..." },
      { from: "m",   to: "ai",   label: "check slot" },
      { from: "ai",  to: "cal",  label: "book slot" },
      { from: "ai",  to: "m",    label: "slot booked", fast: true },
      { from: "m",   to: "wa",   label: "confirm + QR" },
    ],
  },
];

function Logo() {
  return (
    <Link
      to="/en"
      className="flex items-baseline gap-0.5 text-2xl font-light tracking-tight"
    >
      <span>mim</span>
      <span className="relative">ē</span>
      <span>tikós</span>
    </Link>
  );
}

function Discover() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Logo />
          <ul className="hidden items-center gap-9 text-sm text-foreground/85 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/we-know" className="transition-colors hover:text-primary">
                We know
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                IT
              </Link>
            </li>
          </ul>
          <MobileNav
            links={navLinks}
            knowTo="/we-know"
            knowLabel="We know"
            langTo="/"
            langLabel="IT"
            ctaHref="mailto:hello@mimetikos.ai"
            ctaLabel="Request a demo"
          />
        </nav>
      </header>

      {/* HERO */}
      <section className="px-6 pb-12 pt-36 text-center lg:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Mimētikós at work
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          See how it works
          <br />
          <span className="text-primary">in practice.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          In each graph: the trigger on the left,{" "}
          <strong className="text-foreground/80">Mimētikós</strong> in the
          centre, the <strong className="text-foreground/80">AI / LLM</strong>{" "}
          node (dashed circle) above — invoked at every tool call. Edges light
          up in the real order of actions.
        </p>
      </section>

      {/* GRAPHS */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {workflows.map((wf, i) => (
            <WorkflowGraph key={i} data={wf} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 text-center lg:px-10">
        <h2 className="text-2xl font-semibold">Got a specific use case?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Tell us about your workflow. We'll analyse it together and show you
          exactly how Mimētikós can handle it.
        </p>
        <a
          href="mailto:hello@mimetikos.ai"
          className="mt-7 inline-block rounded-md bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Request a demo
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Logo />
          <div className="flex gap-x-5 text-xs text-foreground/40">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3 w-3" /> Local AI
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" /> GDPR
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="h-3 w-3" /> EU AI Act
            </span>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-7xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mimētikós. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
