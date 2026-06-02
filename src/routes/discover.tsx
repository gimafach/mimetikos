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
  CreditCard,
} from "lucide-react";
import { WorkflowGraph, type WorkflowGraphData } from "@/components/WorkflowGraph";

export const Route = createFileRoute("/discover")({
  component: Discover,
});

const navLinks = [
  { label: "How it works", href: "/en#how-it-works" },
  { label: "Who it's for", href: "/en#who" },
  { label: "Discover more", href: "/discover" },
];

const workflowsBase: WorkflowGraphData[] = [
  // ── WF0: Imprinting ──────────────────────────────────────────────────────
  {
    tag: "Imprinting",
    title: "Day one: knowledge is born",
    goal: "Before going live, Mimētikós connects to all your tools — email, documents, notes, calendar, ERP. From what it finds, and as it is used, it builds a knowledge base: your company's way of working, which it will draw on in every future activity.",
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
    goal: "Every night, Mimētikós analyses what it did during the day and designs new processes and tools to improve itself. These new procedures go live only after your careful approval (man in the middle).",
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
    goal: "When you ask for a daily sales report, Mimētikós cross-references commercial emails and messages with the ERP and replies with the Excel file via WhatsApp, sending a copy by email.",
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
    goal: "Automatically, every morning, Mimētikós analyses ERP data and reviews the past weeks of emails and messages to generate a report of the day's priority activities for the order manager.",
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
    goal: "A customer calls with a problem. Mimētikós searches the company's knowledge base for a solution, keeps the customer updated while working, opens a ticket if needed and closes the call once resolved.",
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
    goal: "The ERP signals that stock is exhausted. Mimētikós reads the operational protocol, switches the production line to the backup robot and creates an urgent purchase order. The manager receives a WhatsApp notification.",
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

  // ── WF5: Coordinated agent team ──────────────────────────────────────────
  {
    tag: "Team Mimētikós",
    title: "Every process has its own expert — all connected",
    goal: "The workflows you have seen so far — sales, order management, customer care, assembly line — don't have to stay isolated. As the business grows, each area gets its own specialised Mimētikós: M-Sales manages orders, M-Warehouse monitors stock, M-Procurement calls the supplier whenever restocking is needed. Each one learns its own domain; together they collaborate across the same operational chain. This is how you move from automating a single task to progressively automating the entire company.",
    viewWidth: 780,
    viewHeight: 420,
    nodes: [
      { id: "erp",      x: 60,  y: 190, icon: Database,         label: "ERP / Orders" },
      { id: "ai",       x: 220, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "m",        x: 220, y: 210, isBrain: true, subtitle: "coordinator",  label: "Mimētikós" },
      { id: "m_v",      x: 430, y: 80,  isBrain: true, label: "M-Sales" },
      { id: "m_w",      x: 430, y: 210, isBrain: true, label: "M-Warehouse" },
      { id: "m_a",      x: 430, y: 340, isBrain: true, label: "M-Procurement" },
      { id: "supplier", x: 640, y: 130, icon: Phone,            label: "Supplier" },
      { id: "robot",    x: 640, y: 280, icon: Bot,              label: "Robot / PLC" },
    ],
    edges: [
      { from: "erp",      to: "m",        label: "order received" },
      { from: "m",        to: "ai",       label: "analyse" },
      { from: "ai",       to: "m",        label: "delegation plan", fast: true },
      { from: "m",        to: "m_v",      label: "log sale" },
      { from: "m_v",      to: "m",        label: "sale logged", fast: true },
      { from: "m",        to: "m_w",      label: "check stock" },
      { from: "m_w",      to: "m",        label: "stock low", fast: true },
      { from: "m",        to: "m_a",      label: "reorder" },
      { from: "m_a",      to: "supplier", label: "call supplier" },
      { from: "supplier", to: "m",        label: "confirmed", fast: true },
      { from: "m",        to: "robot",    label: "production continues" },
    ],
  },

];

const workflowsVerticals: WorkflowGraphData[] = [
  // ── VF0: Tourism ──────────────────────────────────────────────────────────
  {
    tag: "Tourism",
    title: "Smart Destination - DMO",
    hideKnowledge: true,
    goal: "A tourist scans a QR code and WhatsApp opens to ask about a tour. Mimētikós asks a few questions, proposes available itineraries, books the slot and handles everything through to payment confirmation. The tour can also involve local businesses via WhatsApp — booking a restaurant or a room, for example.",
    nodes: [
      { id: "wa",   x: 80,  y: 260, icon: MessageCircle,  label: "WhatsApp" },
      { id: "m",    x: 260, y: 210, isBrain: true, subtitle: "supervisor", label: "DMO" },
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

  // ── VF1: Descartesia ──────────────────────────────────────────────────────
  {
    tag: "Descartesia",
    title: "Financial & legal advisory — always ready",
    hideKnowledge: true,
    goal: "The client contacts the advisor via phone, WhatsApp or email and attaches the relevant documents. Descartesia analyses the request, consults up-to-date regulations, accesses the client's bank profile and generates a personalised report. Everything is verified before contacting the client via WhatsApp or email.",
    viewWidth: 720,
    viewHeight: 430,
    nodes: [
      { id: "phone",  x: 55,  y: 55,  icon: Phone,           label: "Phone" },
      { id: "wa",     x: 55,  y: 165, icon: MessageCircle,   label: "WhatsApp" },
      { id: "email",  x: 55,  y: 275, icon: Mail,            label: "Email" },
      { id: "docs",   x: 55,  y: 385, icon: FileText,        label: "Documents" },
      { id: "ai",     x: 275, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "m",      x: 275, y: 215, isBrain: true, subtitle: "supervisor", label: "Descartesia" },
      { id: "know",   x: 460, y: 65,  icon: BookOpen,        label: "Legal knowledge" },
      { id: "crm",    x: 460, y: 165, icon: Database,        label: "CRM / Bank" },
      { id: "report", x: 460, y: 325, icon: FileSpreadsheet, label: "Report" },
      { id: "client", x: 610, y: 215, icon: UserCheck,       label: "Client" },
    ],
    edges: [
      { from: "phone",  to: "m",      label: "request" },
      { from: "wa",     to: "m",      label: "request" },
      { from: "email",  to: "m",      label: "email" },
      { from: "docs",   to: "m",      label: "document" },
      { from: "m",      to: "ai",     label: "analyse" },
      { from: "ai",     to: "know",   label: "consult regulation" },
      { from: "ai",     to: "crm",    label: "access profile" },
      { from: "ai",     to: "m",      label: "analysis ready", fast: true },
      { from: "m",      to: "ai",     label: "prepare report" },
      { from: "ai",     to: "report", label: "generate report" },
      { from: "ai",     to: "m",      label: "report ready", fast: true },
      { from: "m",      to: "client", label: "send to client" },
    ],
  },

  // ── VF2: SpotBook ─────────────────────────────────────────────────────────
  {
    tag: "SpotBook",
    title: "Campsite booking — from WhatsApp to confirmation",
    hideKnowledge: true,
    goal: "A camper messages via WhatsApp asking about a campsite. SpotBook searches the catalogue, presents available options and — once a site is chosen — contacts the manager to check availability, sends the camper a payment link, confirms the booking and updates both calendars.",
    nodes: [
      { id: "camper",  x: 80,  y: 105, icon: MessageCircle, label: "Camper" },
      { id: "payment", x: 80,  y: 310, icon: CreditCard,    label: "Payment" },
      { id: "m",       x: 260, y: 210, isBrain: true, subtitle: "supervisor", label: "SpotBook" },
      { id: "ai",      x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "cat",     x: 460, y: 75,  icon: BookOpen,      label: "Campsite catalogue" },
      { id: "gestore", x: 460, y: 205, icon: Users,         label: "Campsite manager" },
      { id: "cal",     x: 460, y: 335, icon: Calendar,      label: "Calendar" },
    ],
    edges: [
      { from: "camper",  to: "m",       label: "campsite info" },
      { from: "m",       to: "ai",      label: "analyse" },
      { from: "ai",      to: "cat",     label: "search availability" },
      { from: "ai",      to: "m",       label: "options found", fast: true },
      { from: "m",       to: "camper",  label: "propose options" },
      { from: "camper",  to: "m",       label: "chooses & books" },
      { from: "m",       to: "ai",      label: "check manager" },
      { from: "ai",      to: "gestore", label: "notify manager" },
      { from: "gestore", to: "m",       label: "availability ok", fast: true },
      { from: "m",       to: "payment", label: "send payment link" },
      { from: "payment", to: "m",       label: "paid", fast: true },
      { from: "m",       to: "ai",      label: "update calendar" },
      { from: "ai",      to: "cal",     label: "block slot" },
      { from: "ai",      to: "m",       label: "updated", fast: true },
      { from: "m",       to: "camper",  label: "confirm + details" },
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
              <Link to="/use-cases" className="transition-colors hover:text-primary">
                Use cases
              </Link>
            </li>
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
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
          These are simplified examples — in reality every process is more complex. The goal is to give you a concrete idea of how the mechanism works.
        </p>
      </section>

      {/* GRAPHS */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {workflowsBase.map((wf, i) => (
            <WorkflowGraph key={i} data={wf} />
          ))}

          {/* ── Verticals separator ── */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                verticals
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-primary/25 bg-primary/5 px-6 py-5 text-center">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Mimētikós Verticals
            </p>
            <p className="mb-2 text-sm font-semibold">Already specialised, ready on day one</p>
            <p className="mx-auto max-w-lg text-xs leading-relaxed text-muted-foreground">
              Verticals ship from the factory with sector skills, tools and knowledge already built in.
              They adapt to your way of working while keeping the full Mimētikós framework —
              human supervision, nightly self-improvement, multi-agent coordination.
            </p>
          </div>

          {workflowsVerticals.map((wf, i) => (
            <WorkflowGraph key={i} data={wf} />
          ))}
        </div>
      </section>

      {/* LINK USE CASES */}
      <section className="border-t border-border px-6 py-12 text-center lg:px-10">
        <p className="mb-2 text-sm text-muted-foreground">Looking for examples for SMBs, professional studios and sales networks?</p>
        <Link
          to="/use-cases"
          className="text-sm font-medium text-primary transition-colors hover:underline"
        >
          Go to use cases →
        </Link>
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
        <div className="mx-auto mt-6 max-w-7xl flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Mimētikós. All rights reserved.</span>
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/cookie" className="hover:text-primary">Cookie Policy</Link>
        </div>
      </footer>
    </div>
  );
}
