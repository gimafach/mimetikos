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

export const Route = createFileRoute("/casi-duso")({
  component: CasiDuso,
});

const navLinks = [
  { label: "Come funziona", href: "/#come-funziona" },
  { label: "Per chi è", href: "/#per-chi" },
  { label: "Sicurezza", href: "/#sicurezza" },
  { label: "Scopri di più", href: "/scopri-di-piu" },
  { label: "Casi d'uso", href: "/casi-duso" },
];

const workflows: WorkflowGraphData[] = [
  // ── WF1: Studio professionale ───────────────────────────────────────────────
  {
    tag: "Studio professionale",
    title: "Scadenze fiscali — nessun cliente in ritardo",
    hideKnowledge: true,
    goal: "Il cliente invia documenti via WhatsApp o email. Mimētikós li archivia nella pratica, verifica se manca ancora qualcosa e avvisa il cliente. A ridosso della scadenza, controlla le pratiche aperte e invia i promemoria in automatico.",
    nodes: [
      { id: "wa",       x: 80,  y: 100, icon: MessageCircle, label: "Cliente WA" },
      { id: "email",    x: 80,  y: 220, icon: Mail,          label: "Email" },
      { id: "docs",     x: 80,  y: 340, icon: FileText,      label: "Documenti" },
      { id: "m",        x: 260, y: 210, isBrain: true, subtitle: "supervisione", label: "Mimētikós" },
      { id: "ai",       x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "pratica",  x: 460, y: 80,  icon: ClipboardList, label: "Pratica" },
      { id: "cal",      x: 460, y: 200, icon: Calendar,      label: "Scadenze" },
      { id: "notifica", x: 460, y: 320, icon: MessageCircle, label: "Notifica WA" },
    ],
    edges: [
      { from: "wa",       to: "m",        label: "documento" },
      { from: "email",    to: "m",        label: "email" },
      { from: "docs",     to: "m",        label: "pratica" },
      { from: "m",        to: "ai",       label: "analizza" },
      { from: "ai",       to: "pratica",  label: "archivia" },
      { from: "ai",       to: "m",        label: "cosa manca?", fast: true },
      { from: "m",        to: "wa",       label: "documento mancante" },
      { from: "m",        to: "ai",       label: "verifica scadenze" },
      { from: "ai",       to: "cal",      label: "pratiche aperte" },
      { from: "ai",       to: "m",        label: "3 scadenze vicine", fast: true },
      { from: "m",        to: "notifica", label: "promemoria automatico" },
    ],
  },

  // ── WF2: Officina meccanica ──────────────────────────────────────────────────
  {
    tag: "Officina",
    title: "Dall'accettazione alla consegna — tutto su WhatsApp",
    hideKnowledge: true,
    goal: "Il cliente chiama o scrive per un guasto. Mimētikós apre l'ordine di lavoro, verifica la disponibilità dei ricambi in magazzino, tiene aggiornato il cliente sullo stato della riparazione e avvisa quando il veicolo è pronto.",
    nodes: [
      { id: "phone",  x: 80,  y: 170, icon: Phone,          label: "Cliente" },
      { id: "wa",     x: 80,  y: 310, icon: MessageCircle,  label: "WhatsApp" },
      { id: "m",      x: 260, y: 210, isBrain: true, subtitle: "supervisione", label: "Mimētikós" },
      { id: "ai",     x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "stock",  x: 460, y: 80,  icon: Database,       label: "Magazzino" },
      { id: "order",  x: 460, y: 200, icon: ClipboardList,  label: "Ordine lavoro" },
      { id: "wa_out", x: 460, y: 320, icon: MessageCircle,  label: "Notifica WA" },
    ],
    edges: [
      { from: "phone",  to: "m",       label: "segnala guasto" },
      { from: "wa",     to: "m",       label: "messaggio" },
      { from: "m",      to: "ai",      label: "analizza" },
      { from: "ai",     to: "stock",   label: "verifica ricambi" },
      { from: "ai",     to: "m",       label: "ricambi ok", fast: true },
      { from: "m",      to: "ai",      label: "apri ordine" },
      { from: "ai",     to: "order",   label: "crea ordine lavoro" },
      { from: "ai",     to: "m",       label: "ordine aperto", fast: true },
      { from: "m",      to: "wa_out",  label: "accettazione confermata" },
      { from: "m",      to: "wa_out",  label: "veicolo pronto" },
    ],
  },

  // ── WF3: PMI agenti commerciali ──────────────────────────────────────────────
  {
    tag: "Rete commerciale",
    title: "Ordini e preventivi — dall'agente al gestionale",
    hideKnowledge: true,
    goal: "L'agente invia un ordine o una richiesta di preventivo via WhatsApp. Mimētikós incrocia con il gestionale — disponibilità, listino, sconti — prepara la conferma d'ordine o il preventivo e lo invia all'agente. Le offerte aperte senza risposta vengono sollecitate automaticamente.",
    nodes: [
      { id: "agent",  x: 80,  y: 260, icon: MessageCircle,  label: "Agente" },
      { id: "m",      x: 260, y: 210, isBrain: true, subtitle: "supervisione", label: "Mimētikós" },
      { id: "ai",     x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "erp",    x: 460, y: 80,  icon: Database,        label: "ERP / Listino" },
      { id: "offer",  x: 460, y: 200, icon: FileSpreadsheet, label: "Preventivo" },
      { id: "reply",  x: 460, y: 320, icon: MessageCircle,   label: "Risposta WA" },
    ],
    edges: [
      { from: "agent", to: "m",      label: "richiesta ordine" },
      { from: "m",     to: "ai",     label: "analizza" },
      { from: "ai",    to: "erp",    label: "verifica disponibilità" },
      { from: "ai",    to: "m",      label: "dati pronti", fast: true },
      { from: "m",     to: "ai",     label: "prepara preventivo" },
      { from: "ai",    to: "offer",  label: "genera preventivo" },
      { from: "ai",    to: "m",      label: "preventivo pronto", fast: true },
      { from: "m",     to: "reply",  label: "invia all'agente" },
      { from: "m",     to: "ai",     label: "monitora aperti" },
      { from: "ai",    to: "m",      label: "offerta scaduta", fast: true },
      { from: "m",     to: "reply",  label: "sollecito automatico" },
    ],
  },
];

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-baseline gap-0.5 text-2xl font-light tracking-tight"
    >
      <span>mim</span>
      <span className="relative">ē</span>
      <span>tikós</span>
    </Link>
  );
}

function CasiDuso() {
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
                  className={`transition-colors hover:text-primary ${l.href === "/casi-duso" ? "text-primary" : ""}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/lo-sappiamo" className="transition-colors hover:text-primary">
                Lo sappiamo
              </Link>
            </li>
            <li>
              <Link
                to="/en"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                EN
              </Link>
            </li>
          </ul>
          <MobileNav
            links={navLinks}
            knowTo="/lo-sappiamo"
            knowLabel="Lo sappiamo"
            langTo="/en"
            langLabel="EN"
            ctaHref="mailto:hello@mimetikos.ai"
            ctaLabel="Richiedi una demo"
          />
        </nav>
      </header>

      {/* HERO */}
      <section className="px-6 pb-12 pt-36 text-center lg:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Mimētikós per te
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Casi d'uso
          <br />
          <span className="text-primary">per il tuo settore.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Tre esempi concreti pensati per PMI, studi professionali e imprenditori. Anche qui esempi semplificati — nella realtà ogni processo è più articolato.
        </p>
      </section>

      {/* GRAPHS */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {workflows.map((wf, i) => (
            <WorkflowGraph key={i} data={wf} knowledgeLabel="Conoscenza" skillsLabel="Competenze" />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 text-center lg:px-10">
        <h2 className="text-2xl font-semibold">Hai un caso d'uso specifico?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Raccontaci il tuo flusso di lavoro. Lo analizziamo insieme e ti
          mostriamo come Mimētikós può gestirlo.
        </p>
        <a
          href="mailto:hello@mimetikos.ai"
          className="mt-7 inline-block rounded-md bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Richiedi una demo
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Logo />
          <div className="flex gap-x-5 text-xs text-foreground/40">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3 w-3" /> AI locale
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
          <span>© {new Date().getFullYear()} Mimētikós. Tutti i diritti riservati.</span>
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/cookie" className="hover:text-primary">Cookie Policy</Link>
        </div>
      </footer>
    </div>
  );
}
