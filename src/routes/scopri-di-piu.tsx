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

export const Route = createFileRoute("/scopri-di-piu")({
  component: ScopriDiPiu,
});

const navLinks = [
  { label: "Come funziona", href: "/#come-funziona" },
  { label: "Per chi è", href: "/#per-chi" },
  { label: "Sicurezza", href: "/#sicurezza" },
];

/*
  Layout comune (viewBox 600×380):
  - ai node:      x=260, y=65   (sopra M, bordo tratteggiato)
  - m node:       x=260, y=210  (centro)
  - trigger:      x=80,  y=260  (sinistra)
  - tool 1-3:     x=460, y=80/200/320
  I passi alternano m→ai (tool call) e ai→tool (esecuzione).
  Back-edge ai→trigger mostra aggiornamenti al mittente.
*/

const workflows: WorkflowGraphData[] = [
  // ── WF0: Imprinting ─────────────────────────────────────────────────────
  {
    tag: "Assunzione",
    title: "Primo giorno: nasce la conoscenza",
    goal: "Prima di entrare in azione, Mimētikós si integra nel tuo ecosistema. Ogni strumento si connette e trasferisce contesto: l'intelligenza di Mimētikós analizza, struttura e popola progressivamente Skills e Wiki — la conoscenza che userà in ogni processo futuro.",
    knowledgeOnRight: true,
    nodes: [
      // Colonna sinistra 1 (x=55)
      { id: "phone",  x: 55,  y: 35,  icon: Phone,          label: "Telefono" },
      { id: "erp",    x: 55,  y: 135, icon: Database,        label: "CRM / ERP" },
      { id: "teams",  x: 55,  y: 235, icon: Users,           label: "Teams" },
      { id: "cal",    x: 55,  y: 335, icon: Calendar,        label: "Calendario" },
      // Colonna sinistra 2 (x=145)
      { id: "wa",     x: 145, y: 35,  icon: MessageCircle,   label: "WhatsApp" },
      { id: "docs",   x: 145, y: 135, icon: FileText,        label: "Documenti" },
      { id: "email",  x: 145, y: 235, icon: Mail,            label: "Email" },
      { id: "notes",  x: 145, y: 335, icon: StickyNote,      label: "Note" },
      // Centro: Mimētikós
      { id: "m",  x: 260, y: 200, isBrain: true, subtitle: "supervisione", label: "Mimētikós" },
      { id: "ai", x: 260, y: 65,  isAI: true, icon: Brain,  label: "AI / LLM" },
    ],
    edges: [
      { from: "phone", to: "m",  label: "collega" },
      { from: "wa",    to: "m",  label: "collega" },
      { from: "erp",   to: "m",  label: "collega" },
      { from: "docs",  to: "m",  label: "collega" },
      { from: "m",     to: "ai", label: "prima analisi" },
      { from: "ai",    to: "m",  label: "struttura rilevata", fast: true },
      { from: "teams", to: "m",  label: "collega" },
      { from: "email", to: "m",  label: "collega" },
      { from: "cal",   to: "m",  label: "collega" },
      { from: "notes", to: "m",  label: "collega" },
      { from: "m",     to: "ai", label: "crea conoscenza" },
      { from: "ai",    to: "m",  label: "knowledge pronta", fast: true },
    ],
  },

  // ── WF1: Giorno 2 — auto-apprendimento notturno ─────────────────────────
  {
    tag: "Giorno 2",
    title: "Auto-apprendimento notturno",
    goal: "Ogni notte Mimētikós analizza i log e le tracce del giorno. L'AI progetta in autonomia nuovi processi, plugin e tool per sé stesso — aggiornando Skills e Wiki. Nulla entra in produzione senza approvazione: il Supervisore valuta ogni proposta e decide cosa attivare.",
    viewWidth: 720,
    knowledgePos: {
      skills: { x: 590, y: 75 },
      wiki:   { x: 590, y: 235 },
    },
    nodes: [
      // Supervisore — fuori dal box, in evidenza
      { id: "sup",    x: 70,  y: 50,  icon: UserCheck,  label: "Tu" },
      // Input notturni
      { id: "logs",   x: 70,  y: 185, icon: ScrollText, label: "Log del giorno" },
      { id: "tracce", x: 70,  y: 305, icon: Activity,   label: "Tracce" },
      // Core Mimētikós (sinistra del box)
      { id: "ai",     x: 240, y: 75,  isAI: true,       icon: Brain,     label: "AI / LLM" },
      { id: "m",      x: 240, y: 205, isBrain: true,    subtitle: "supervisione", label: "Mimētikós" },
      // Auto-creazioni (destra del box)
      { id: "wf",     x: 400, y: 110, isMimetikos: true, icon: GitBranch, label: "Processo" },
      { id: "plugin", x: 400, y: 215, isMimetikos: true, icon: Puzzle,    label: "Plugin" },
      { id: "tools",  x: 400, y: 320, isMimetikos: true, icon: Wrench,    label: "Tool" },
    ],
    edges: [
      { from: "logs",   to: "m",      label: "log del giorno" },
      { from: "tracce", to: "m",      label: "tracce" },
      { from: "m",      to: "ai",     label: "elabora notte" },
      { from: "ai",     to: "wf",     label: "nuovo processo" },
      { from: "ai",     to: "plugin", label: "nuovo plugin" },
      { from: "ai",     to: "tools",  label: "nuovo tool" },
      { from: "ai",     to: "m",      label: "bozze pronte", fast: true },
      { from: "m",      to: "sup",    label: "richiedi approvazione" },
      { from: "sup",    to: "m",      label: "approvato" },
      { from: "m",      to: "ai",     label: "applica" },
      { from: "ai",     to: "m",      label: "attivato", fast: true },
    ],
  },

  // ── WF2: Report vendite ──────────────────────────────────────────────────
  {
    tag: "Vendite",
    title: "Report vendite giornaliero",
    goal: "Un agente chiede le vendite del giorno via WhatsApp. Mimētikós invoca l'AI, che recupera i dati dall'ERP e genera l'Excel — ogni risultato torna sempre a Mimētikós per approvazione. La risposta finale al richiedente viene inviata da Mimētikós, mai direttamente dall'AI.",
    nodes: [
      { id: "wa",    x: 80,  y: 260, icon: MessageCircle,   label: "WhatsApp" },
      { id: "m",     x: 260, y: 210, isBrain: true, subtitle: "approvazione umana", label: "Mimētikós" },
      { id: "ai",    x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "erp",   x: 460, y: 80,  icon: Database,         label: "ERP" },
      { id: "xls",   x: 460, y: 195, icon: FileSpreadsheet,  label: "Excel" },
      { id: "email", x: 460, y: 310, icon: Mail,             label: "Email" },
    ],
    edges: [
      { from: "wa",  to: "m",     label: "richiesta" },
      { from: "m",   to: "ai",    label: "pianifica" },
      { from: "ai",  to: "erp",   label: "preleva dati" },
      { from: "ai",  to: "m",     label: "dati pronti", fast: true },
      { from: "m",   to: "ai",    label: "elabora" },
      { from: "ai",  to: "xls",   label: "genera Excel" },
      { from: "ai",  to: "m",     label: "Excel pronto", fast: true },
      { from: "m",   to: "email", label: "invia report" },
      { from: "m",   to: "wa",    label: "risposta WA" },
    ],
  },

  // ── WF2: Verifica ordini (multi-step AI) ─────────────────────────────────
  {
    tag: "Operations",
    title: "Verifica ordini da procedura",
    goal: "Ogni mattina la procedura schedulata attiva Mimētikós. L'AI legge la procedura, interroga l'ERP e archivia il report — ogni azione ritorna a Mimētikós. La notifica WhatsApp viene inviata da Mimētikós dopo aver approvato la sintesi.",
    nodes: [
      { id: "proc",  x: 80,  y: 260, icon: ScrollText,    label: "Procedure" },
      { id: "m",     x: 260, y: 210, isBrain: true, subtitle: "approvazione umana", label: "Mimētikós" },
      { id: "ai",    x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "erp",   x: 460, y: 80,  icon: Database,      label: "ERP" },
      { id: "wa",    x: 460, y: 200, icon: MessageCircle,  label: "WhatsApp" },
      { id: "know",  x: 460, y: 320, icon: BookOpen,       label: "Conoscenza" },
    ],
    edges: [
      { from: "proc", to: "m",    label: "avvia processo" },
      { from: "m",    to: "ai",   label: "leggi procedura" },
      { from: "ai",   to: "erp",  label: "verifica ordini" },
      { from: "ai",   to: "m",    label: "dati pronti", fast: true },
      { from: "m",    to: "ai",   label: "sintetizza" },
      { from: "ai",   to: "know", label: "archivia" },
      { from: "ai",   to: "m",    label: "archiviato", fast: true },
      { from: "m",    to: "wa",   label: "sintesi WhatsApp" },
    ],
  },

  // ── WF3: Call center ────────────────────────────────────────────────────
  {
    tag: "Customer Care",
    title: "Assistenza call center",
    goal: "Il cliente chiama con un problema. Ogni azione dell'AI torna a Mimētikós per approvazione. Gli aggiornamenti al telefono e la chiusura della chiamata vengono gestiti sempre da Mimētikós — mai direttamente dall'AI.",
    nodes: [
      { id: "phone",  x: 80,  y: 260, icon: Phone,          label: "Telefono" },
      { id: "m",      x: 260, y: 210, isBrain: true, subtitle: "approvazione umana", label: "Mimētikós" },
      { id: "ai",     x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "know",   x: 460, y: 90,  icon: BookOpen,        label: "Conoscenza" },
      { id: "ticket", x: 460, y: 270, icon: ClipboardList,   label: "Ticket" },
    ],
    edges: [
      { from: "phone",  to: "m",      label: "chiamata" },
      { from: "m",      to: "ai",     label: "analizza" },
      { from: "ai",     to: "know",   label: "cerca soluzione" },
      { from: "ai",     to: "m",      label: "info trovate", fast: true },
      { from: "m",      to: "phone",  label: "sto cercando..." },
      { from: "m",      to: "ai",     label: "risolvi" },
      { from: "ai",     to: "ticket", label: "apri ticket" },
      { from: "ai",     to: "m",      label: "ticket aperto", fast: true },
      { from: "m",      to: "phone",  label: "soluzione trovata" },
      { from: "m",      to: "phone",  label: "chiude chiamata" },
    ],
  },

  // ── WF4: Catena di montaggio (2 pass ERP↔Robot) ──────────────────────────
  {
    tag: "Manifattura",
    title: "Catena di montaggio — scorte esaurite",
    goal: "L'ERP segnala scorte a zero. L'AI consulta le procedure ed esegue due passaggi (Robot e ODA urgente) — ogni esito torna a Mimētikós per approvazione. La notifica al responsabile viene inviata da Mimētikós.",
    nodes: [
      { id: "erp",  x: 80,  y: 260, icon: Database,       label: "ERP/Magazzino" },
      { id: "m",    x: 260, y: 210, isBrain: true, subtitle: "approvazione umana", label: "Mimētikós" },
      { id: "ai",   x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "proc", x: 460, y: 80,  icon: ScrollText,      label: "Procedure" },
      { id: "bot",  x: 460, y: 200, icon: Bot,             label: "Robot/PLC" },
      { id: "wa",   x: 460, y: 320, icon: MessageCircle,   label: "WhatsApp" },
    ],
    edges: [
      { from: "erp",  to: "m",    label: "alert scorte" },
      { from: "m",    to: "ai",   label: "analizza" },
      { from: "ai",   to: "proc", label: "leggi protocollo" },
      { from: "ai",   to: "m",    label: "protocollo ok", fast: true },
      { from: "m",    to: "ai",   label: "1° pass: commuta" },
      { from: "ai",   to: "bot",  label: "commuta linea" },
      { from: "ai",   to: "m",    label: "linea ok", fast: true },
      { from: "m",    to: "ai",   label: "2° pass: ODA" },
      { from: "ai",   to: "erp",  label: "crea ODA urgente" },
      { from: "ai",   to: "m",    label: "ODA creato", fast: true },
      { from: "m",    to: "wa",   label: "notifica" },
    ],
  },

  // ── WF5: DMO turismo ────────────────────────────────────────────────────
  {
    tag: "Turismo",
    title: "DMO — prenotazione tour locale",
    goal: "Il turista chiede un tour via WhatsApp. Ogni azione dell'AI (ricerca, prenotazione) torna a Mimētikós per approvazione. Gli aggiornamenti al cliente e la conferma finale con QR vengono inviati da Mimētikós.",
    nodes: [
      { id: "wa",   x: 80,  y: 260, icon: MessageCircle, label: "WhatsApp" },
      { id: "m",    x: 260, y: 210, isBrain: true, subtitle: "approvazione umana", label: "Mimētikós" },
      { id: "ai",   x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "know", x: 460, y: 120, icon: BookOpen,       label: "Catalogo tour" },
      { id: "cal",  x: 460, y: 280, icon: Calendar,       label: "Calendario" },
    ],
    edges: [
      { from: "wa",  to: "m",    label: "richiesta tour" },
      { from: "m",   to: "ai",   label: "analizza" },
      { from: "ai",  to: "know", label: "trova tour" },
      { from: "ai",  to: "m",    label: "tour trovati", fast: true },
      { from: "m",   to: "wa",   label: "sto cercando..." },
      { from: "m",   to: "ai",   label: "verifica slot" },
      { from: "ai",  to: "cal",  label: "prenota slot" },
      { from: "ai",  to: "m",    label: "slot prenotato", fast: true },
      { from: "m",   to: "wa",   label: "conferma + QR" },
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

function ScopriDiPiu() {
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
          Mimētikós in azione
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Vedi come funziona
          <br />
          <span className="text-primary">nella pratica.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          In ogni grafo: il trigger a sinistra, <strong className="text-foreground/80">Mimētikós</strong> al centro, il nodo{" "}
          <strong className="text-foreground/80">AI / LLM</strong> (cerchio tratteggiato) sopra — invocato a ogni tool
          call. Gli archi si illuminano nell'ordine reale delle azioni.
        </p>
      </section>

      {/* GRAPHS */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {workflows.map((wf, i) => (
            <WorkflowGraph key={i} data={wf} knowledgeLabel="Conoscenza" />
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
        <p className="mx-auto mt-6 max-w-7xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mimētikós. Tutti i diritti riservati.
        </p>
      </footer>
    </div>
  );
}
