import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileNav } from "@/components/MobileNav";
import {
  Mail,
  FileSpreadsheet,
  Database,
  MessageCircle,
  Phone,
  ClipboardList,
  Calendar,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Brain,
  FileText,
} from "lucide-react";
import { WorkflowGraph, type WorkflowGraphData } from "@/components/WorkflowGraph";

export const Route = createFileRoute("/use-cases")({
  component: UseCases,
});

const navLinks = [
  { label: "How it works", href: "/en#how-it-works" },
  { label: "Who it's for", href: "/en#who" },
  { label: "Discover more", href: "/discover" },
  { label: "Use cases", href: "/use-cases" },
];

const workflows: WorkflowGraphData[] = [
  // ── WF1: Professional studio ─────────────────────────────────────────────────
  {
    tag: "Professional studio",
    title: "Tax deadlines — no client ever late",
    hideKnowledge: true,
    goal: "The client sends documents via WhatsApp or email. Mimētikós files them in the case, checks if anything is missing and notifies the client. As a deadline approaches, it checks all open cases and sends reminders automatically.",
    nodes: [
      { id: "wa",       x: 80,  y: 100, icon: MessageCircle, label: "Client WA" },
      { id: "email",    x: 80,  y: 220, icon: Mail,          label: "Email" },
      { id: "docs",     x: 80,  y: 340, icon: FileText,      label: "Documents" },
      { id: "m",        x: 260, y: 210, isBrain: true, subtitle: "supervision", label: "Mimētikós" },
      { id: "ai",       x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "pratica",  x: 460, y: 80,  icon: ClipboardList, label: "Case file" },
      { id: "cal",      x: 460, y: 200, icon: Calendar,      label: "Deadlines" },
      { id: "notifica", x: 460, y: 320, icon: MessageCircle, label: "WA reminder" },
    ],
    edges: [
      { from: "wa",       to: "m",        label: "document" },
      { from: "email",    to: "m",        label: "email" },
      { from: "docs",     to: "m",        label: "case docs" },
      { from: "m",        to: "ai",       label: "analyse" },
      { from: "ai",       to: "pratica",  label: "file it" },
      { from: "ai",       to: "m",        label: "what's missing?", fast: true },
      { from: "m",        to: "wa",       label: "missing document" },
      { from: "m",        to: "ai",       label: "check deadlines" },
      { from: "ai",       to: "cal",      label: "open cases" },
      { from: "ai",       to: "m",        label: "3 deadlines near", fast: true },
      { from: "m",        to: "notifica", label: "auto reminder" },
    ],
  },

  // ── WF2: Auto repair shop ────────────────────────────────────────────────────
  {
    tag: "Auto repair",
    title: "From intake to delivery — all on WhatsApp",
    hideKnowledge: true,
    goal: "The customer calls or messages about a breakdown. Mimētikós opens the work order, checks spare parts availability in the warehouse, keeps the customer updated on the repair status and notifies them when the vehicle is ready.",
    nodes: [
      { id: "phone",  x: 80,  y: 170, icon: Phone,          label: "Customer" },
      { id: "wa",     x: 80,  y: 310, icon: MessageCircle,  label: "WhatsApp" },
      { id: "m",      x: 260, y: 210, isBrain: true, subtitle: "supervision", label: "Mimētikós" },
      { id: "ai",     x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "stock",  x: 460, y: 80,  icon: Database,       label: "Warehouse" },
      { id: "order",  x: 460, y: 200, icon: ClipboardList,  label: "Work order" },
      { id: "wa_out", x: 460, y: 320, icon: MessageCircle,  label: "WA update" },
    ],
    edges: [
      { from: "phone",  to: "m",       label: "report breakdown" },
      { from: "wa",     to: "m",       label: "message" },
      { from: "m",      to: "ai",      label: "analyse" },
      { from: "ai",     to: "stock",   label: "check parts" },
      { from: "ai",     to: "m",       label: "parts ok", fast: true },
      { from: "m",      to: "ai",      label: "open order" },
      { from: "ai",     to: "order",   label: "create work order" },
      { from: "ai",     to: "m",       label: "order opened", fast: true },
      { from: "m",      to: "wa_out",  label: "intake confirmed" },
      { from: "m",      to: "wa_out",  label: "vehicle ready" },
    ],
  },

  // ── WF3: SMB sales network ───────────────────────────────────────────────────
  {
    tag: "Sales network",
    title: "Orders and quotes — from agent to ERP",
    hideKnowledge: true,
    goal: "The agent sends an order or quote request via WhatsApp. Mimētikós cross-references with the ERP — availability, price list, discounts — prepares the order confirmation or quote and sends it to the agent. Open offers without a reply are followed up automatically.",
    nodes: [
      { id: "agent",  x: 80,  y: 260, icon: MessageCircle,  label: "Agent" },
      { id: "m",      x: 260, y: 210, isBrain: true, subtitle: "supervision", label: "Mimētikós" },
      { id: "ai",     x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "erp",    x: 460, y: 80,  icon: Database,        label: "ERP / Price list" },
      { id: "offer",  x: 460, y: 200, icon: FileSpreadsheet, label: "Quote" },
      { id: "reply",  x: 460, y: 320, icon: MessageCircle,   label: "WA reply" },
    ],
    edges: [
      { from: "agent", to: "m",      label: "order request" },
      { from: "m",     to: "ai",     label: "analyse" },
      { from: "ai",    to: "erp",    label: "check availability" },
      { from: "ai",    to: "m",      label: "data ready", fast: true },
      { from: "m",     to: "ai",     label: "prepare quote" },
      { from: "ai",    to: "offer",  label: "generate quote" },
      { from: "ai",    to: "m",      label: "quote ready", fast: true },
      { from: "m",     to: "reply",  label: "send to agent" },
      { from: "m",     to: "ai",     label: "monitor open" },
      { from: "ai",    to: "m",      label: "offer expired", fast: true },
      { from: "m",     to: "reply",  label: "auto follow-up" },
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

function UseCases() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Logo />
          <ul className="hidden items-center gap-9 text-sm text-foreground/85 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`transition-colors hover:text-primary ${l.href === "/use-cases" ? "text-primary" : ""}`}
                >
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
          Mimētikós for you
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Use cases
          <br />
          <span className="text-primary">for your sector.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Three concrete examples designed for SMBs, professional studios and entrepreneurs. Simplified as always — in reality every process is more complex.
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
        <div className="mx-auto mt-6 max-w-7xl flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Mimētikós. All rights reserved.</span>
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/cookie" className="hover:text-primary">Cookie Policy</Link>
        </div>
      </footer>
    </div>
  );
}
