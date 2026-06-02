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

export const Route = createFileRoute("/scopri-di-piu")({
  component: ScopriDiPiu,
});

const navLinks = [
  { label: "Come funziona", href: "/#come-funziona" },
  { label: "Per chi è", href: "/#per-chi" },
  { label: "Sicurezza", href: "/#sicurezza" },
  { label: "Scopri di più", href: "/scopri-di-piu" },
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

const workflowsBase: WorkflowGraphData[] = [
  // ── WF0: Imprinting ─────────────────────────────────────────────────────
  {
    tag: "Assunzione",
    title: "Primo giorno: nasce la conoscenza",
    goal: "Prima di iniziare a lavorare, Mimētikós si collega a tutti i tuoi strumenti — email, documenti, note, calendario, gestionale. Da quello che trova, e durante l'utilizzo, costruisce una base di conoscenza: il modo di lavorare della tua azienda, che userà in ogni attività futura.",
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
    goal: "Ogni notte, Mimētikós analizza quello che ha fatto durante il giorno e progetta nuovi processi e strumenti per migliorarsi. Queste nuove procedure entrano in funzione solo dopo tua attenta approvazione (man in the middle).",
    viewWidth: 720,
    boxPadBottom: 10,
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
      { id: "tools",  x: 400, y: 320, isMimetikos: true, icon: Wrench,    label: "Strumento" },
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
    goal: "Quando chiedi un report giornaliero sulle vendite, Mimētikós incrocia le email ed i messaggi commerciali con il gestionale e risponde con l'Excel sempre via WhatsApp ed invia una copia via email.",
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
    goal: "In automatico, ogni mattina, Mimētikós analizza i dati del gestionale e verifica le ultime settimane di email e messaggi per generare un report delle attività prioritarie in giornata per il responsabile degli ordini.",
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
    goal: "Il cliente chiama con un problema. Mimētikós cerca la soluzione tra le conoscenze dell'azienda, aggiorna il cliente mentre lavora, apre il ticket se serve e chiude la chiamata una volta risolta.",
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
    goal: "Il gestionale segnala le scorte esaurite. Mimētikós legge il protocollo operativo, commuta la linea di produzione sul robot di riserva e crea l'ordine d'acquisto urgente. Il responsabile riceve una notifica su WhatsApp.",
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

  // ── WF5: Team di agenti coordinati ──────────────────────────────────────
  {
    tag: "Team Mimētikós",
    title: "Ogni processo ha il suo esperto — tutti connessi",
    goal: "I processi che hai visto fin qui — vendite, controllo ordini, customer care, catena di montaggio — non devono restare isolati. Man mano che l'azienda cresce, ogni area ottiene il suo Mimētikós specializzato: M-Vendite gestisce gli ordini, M-Magazzino controlla le scorte, M-Acquisti chiama il fornitore quando servono rifornimenti. Ognuno impara il proprio dominio, tutti collaborano nella stessa catena operativa. È così che si passa dall'automazione di un singolo compito all'automazione progressiva dell'intera azienda.",
    viewWidth: 780,
    viewHeight: 420,
    nodes: [
      { id: "erp",      x: 60,  y: 190, icon: Database,        label: "ERP / Ordini" },
      { id: "ai",       x: 220, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "m",        x: 220, y: 210, isBrain: true, subtitle: "coordinatore", label: "Mimētikós" },
      { id: "m_v",      x: 430, y: 80,  isBrain: true, label: "M-Vendite" },
      { id: "m_w",      x: 430, y: 210, isBrain: true, label: "M-Magazzino" },
      { id: "m_a",      x: 430, y: 340, isBrain: true, label: "M-Acquisti" },
      { id: "supplier", x: 640, y: 130, icon: Phone,           label: "Fornitore" },
      { id: "robot",    x: 640, y: 280, icon: Bot,             label: "Robot / PLC" },
    ],
    edges: [
      { from: "erp",      to: "m",        label: "ordine ricevuto" },
      { from: "m",        to: "ai",       label: "analizza" },
      { from: "ai",       to: "m",        label: "piano deleghe", fast: true },
      { from: "m",        to: "m_v",      label: "registra vendita" },
      { from: "m_v",      to: "m",        label: "vendita ok", fast: true },
      { from: "m",        to: "m_w",      label: "controlla scorte" },
      { from: "m_w",      to: "m",        label: "scorte basse", fast: true },
      { from: "m",        to: "m_a",      label: "ordina merce" },
      { from: "m_a",      to: "supplier", label: "chiama fornitore" },
      { from: "supplier", to: "m",        label: "confermato", fast: true },
      { from: "m",        to: "robot",    label: "produzione continua" },
    ],
  },

];

const workflowsVerticals: WorkflowGraphData[] = [
  // ── VF0: DMO turismo ──────────────────────────────────────────────────────
  {
    tag: "Turismo",
    title: "Smart Destination - DMO",
    hideKnowledge: true,
    goal: "Il turista inquadra un QR code, si apre WhatsApp per chiedere info di un tour. Mimētikós fa qualche domanda, propone gli itinerari disponibili, prenota lo slot e gestisce tutto fino alla conferma del pagamento. Il tour potrebbe coinvolgere, sempre via WhatsApp, le attività locali — per prenotare un ristorante o una camera, ad esempio.",
    nodes: [
      { id: "wa",   x: 80,  y: 260, icon: MessageCircle, label: "WhatsApp" },
      { id: "m",    x: 260, y: 210, isBrain: true, subtitle: "supervisore", label: "DMO" },
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

  // ── VF1: Descartesia ──────────────────────────────────────────────────────
  {
    tag: "Descartesia",
    title: "Consulenza finanziaria e legale — sempre pronto",
    hideKnowledge: true,
    goal: "Il cliente contatta il consulente via telefono, WhatsApp o email e allega i documenti. Descartesia analizza la richiesta, consulta le normative aggiornate, accede al profilo bancario del cliente e genera un report personalizzato. Tutto viene verificato prima di contattare il cliente via WhatsApp o email.",
    viewWidth: 720,
    viewHeight: 430,
    nodes: [
      { id: "phone",  x: 55,  y: 55,  icon: Phone,           label: "Telefono" },
      { id: "wa",     x: 55,  y: 165, icon: MessageCircle,   label: "WhatsApp" },
      { id: "email",  x: 55,  y: 275, icon: Mail,            label: "Email" },
      { id: "docs",   x: 55,  y: 385, icon: FileText,        label: "Documenti" },
      { id: "ai",     x: 275, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "m",      x: 275, y: 215, isBrain: true, subtitle: "supervisore", label: "Descartesia" },
      { id: "know",   x: 460, y: 65,  icon: BookOpen,        label: "Conoscenza legale" },
      { id: "crm",    x: 460, y: 165, icon: Database,        label: "CRM / Banca" },
      { id: "report", x: 460, y: 325, icon: FileSpreadsheet, label: "Report" },
      { id: "client", x: 610, y: 215, icon: UserCheck,       label: "Cliente" },
    ],
    edges: [
      { from: "phone",  to: "m",      label: "richiesta" },
      { from: "wa",     to: "m",      label: "richiesta" },
      { from: "email",  to: "m",      label: "email" },
      { from: "docs",   to: "m",      label: "documento" },
      { from: "m",      to: "ai",     label: "analizza" },
      { from: "ai",     to: "know",   label: "consulta normativa" },
      { from: "ai",     to: "crm",    label: "accede al profilo" },
      { from: "ai",     to: "m",      label: "analisi pronta", fast: true },
      { from: "m",      to: "ai",     label: "prepara report" },
      { from: "ai",     to: "report", label: "genera report" },
      { from: "ai",     to: "m",      label: "report pronto", fast: true },
      { from: "m",      to: "client", label: "invia al cliente" },
    ],
  },

  // ── VF2: SpotBook ─────────────────────────────────────────────────────────
  {
    tag: "SpotBook",
    title: "Prenotazione campeggio — da WhatsApp a conferma",
    hideKnowledge: true,
    goal: "Il camperista scrive via WhatsApp per informazioni su un campeggio. SpotBook cerca nel catalogo, propone le opzioni disponibili e — una volta scelta la struttura — contatta il gestore per la disponibilità, richiede il pagamento al camperista, conferma la prenotazione e aggiorna il calendario di entrambi.",
    nodes: [
      { id: "camper",  x: 80,  y: 105, icon: MessageCircle, label: "Camperista" },
      { id: "payment", x: 80,  y: 310, icon: CreditCard,    label: "Pagamento" },
      { id: "m",       x: 260, y: 210, isBrain: true, subtitle: "supervisore", label: "SpotBook" },
      { id: "ai",      x: 260, y: 65,  isAI: true, icon: Brain, label: "AI / LLM" },
      { id: "cat",     x: 460, y: 75,  icon: BookOpen,      label: "Catalogo campeggi" },
      { id: "gestore", x: 460, y: 205, icon: Users,         label: "Gestore campeggio" },
      { id: "cal",     x: 460, y: 335, icon: Calendar,      label: "Calendario" },
    ],
    edges: [
      { from: "camper",  to: "m",       label: "info campeggio" },
      { from: "m",       to: "ai",      label: "analizza" },
      { from: "ai",      to: "cat",     label: "cerca disponibilità" },
      { from: "ai",      to: "m",       label: "opzioni trovate", fast: true },
      { from: "m",       to: "camper",  label: "propone opzioni" },
      { from: "camper",  to: "m",       label: "sceglie e prenota" },
      { from: "m",       to: "ai",      label: "verifica gestore" },
      { from: "ai",      to: "gestore", label: "notifica gestore" },
      { from: "gestore", to: "m",       label: "disponibilità ok", fast: true },
      { from: "m",       to: "payment", label: "invia link pagamento" },
      { from: "payment", to: "m",       label: "pagato", fast: true },
      { from: "m",       to: "ai",      label: "aggiorna calendario" },
      { from: "ai",      to: "cal",     label: "blocca slot" },
      { from: "ai",      to: "m",       label: "aggiornato", fast: true },
      { from: "m",       to: "camper",  label: "conferma + dettagli" },
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
              <Link to="/casi-duso" className="transition-colors hover:text-primary">
                Casi d'uso
              </Link>
            </li>
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
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Questi sono esempi semplificati — nella realtà ogni processo è più articolato. L'obiettivo è darti un'idea concreta di come funziona il meccanismo.
        </p>
      </section>

      {/* GRAPHS */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {workflowsBase.map((wf, i) => (
            <WorkflowGraph key={i} data={wf} knowledgeLabel="Conoscenza" skillsLabel="Competenze" />
          ))}

          {/* ── Separatore verticali ── */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                verticali
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-primary/25 bg-primary/5 px-6 py-5 text-center">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Mimētikós Verticali
            </p>
            <p className="mb-2 text-sm font-semibold">Già specializzati, pronti il giorno uno</p>
            <p className="mx-auto max-w-lg text-xs leading-relaxed text-muted-foreground">
              I verticali escono dalla fabbrica con competenze, strumenti e conoscenza di settore già integrati.
              Si adattano al tuo modo di lavorare mantenendo l'intero framework Mimētikós —
              supervisione umana, auto-apprendimento notturno, coordinamento multi-agente.
            </p>
          </div>

          {workflowsVerticals.map((wf, i) => (
            <WorkflowGraph key={i} data={wf} knowledgeLabel="Conoscenza" skillsLabel="Competenze" />
          ))}
        </div>
      </section>

      {/* LINK CASI D'USO */}
      <section className="border-t border-border px-6 py-12 text-center lg:px-10">
        <p className="mb-2 text-sm text-muted-foreground">Cerchi esempi per PMI, studi professionali e reti commerciali?</p>
        <Link
          to="/casi-duso"
          className="text-sm font-medium text-primary transition-colors hover:underline"
        >
          Vai ai casi d'uso →
        </Link>
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
