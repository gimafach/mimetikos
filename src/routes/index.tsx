import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Eye,
  Brain,
  CheckCircle2,
  Mail,
  FileText,
  FileSpreadsheet,
  Settings,
  MessageCircle,
  ListChecks,
  BookOpen,
  MoreHorizontal,
  TrendingUp,
  Scale,
  Factory,
  Hotel,
  ShieldCheck,
  Lightbulb,
  Lock,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import heroDevice from "@/assets/hero-device.jpg";
import catPromotori from "@/assets/cat-promotori.jpg";
import catCommLegali from "@/assets/cat-commercialisti-legali.jpg";
import catPmi from "@/assets/cat-pmi.jpg";
import catTurismo from "@/assets/cat-turismo.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mimētikós — Il lavoratore che non trovi. H24." },
      {
        name: "description",
        content:
          "Mimētikós installa dipendenti AI privati che imparano procedure, organizzano conoscenza ed eseguono automazioni approvate, senza inviare dati a terzi nel cloud.",
      },
    ],
  }),
});

const navLinks = [
  { label: "Come funziona", href: "#come-funziona" },
  { label: "Per chi è", href: "#per-chi" },
  { label: "Sicurezza", href: "#sicurezza" },
  { label: "Architettura", href: "#architettura" },
  { label: "Contatti", href: "#contatti" },
];

const pillars = [
  {
    icon: Eye,
    title: "Osserva",
    text:
      "Partecipa alle riunioni, legge email, messaggi e documenti, e osserva come vengono utilizzati strumenti e procedure aziendali.",
  },
  {
    icon: Brain,
    title: "Impara",
    text:
      "Costruisce conoscenza operativa e apprende attività ricorrenti, procedure e modalità di lavoro della tua azienda.",
  },
  {
    icon: CheckCircle2,
    title: "Lavora",
    text:
      "Esegue attività e automazioni approvate tramite strumenti controllati, verificabili e sotto il tuo controllo.",
  },
];

const tools = [
  { icon: Mail, label: "Email" },
  { icon: FileText, label: "Documenti" },
  { icon: FileSpreadsheet, label: "Excel" },
  { icon: Settings, label: "ERP" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: ListChecks, label: "Procedure" },
  { icon: BookOpen, label: "Conoscenza interna" },
  { icon: MoreHorizontal, label: "E molto altro" },
];

const verticals = [
  {
    img: catPromotori,
    icon: TrendingUp,
    title: "Promotori finanziari",
    text: "Onboarding clienti, MiFID, reportistica portafogli e follow-up commerciali.",
  },
  {
    img: catCommLegali,
    icon: Scale,
    title: "Commercialisti e studi legali",
    text: "Classificazione documenti, scadenze, analisi pratiche e gestione fascicoli.",
  },
  {
    img: catPmi,
    icon: Factory,
    title: "PMI manifatturiere",
    text: "Procedure operative, qualità, acquisti, manutenzione e produzione.",
  },
  {
    img: catTurismo,
    icon: Hotel,
    title: "Hospitality e turismo",
    text: "Prenotazioni, gestione ospiti, OTA (Booking, Airbnb) e comunicazioni multilingua.",
  },
];

const trust = [
  { icon: Lock, title: "AI locale e privata", text: "I tuoi dati restano dentro la tua azienda." },
  { icon: Lightbulb, title: "Nessun dato a terzi", text: "Zero invio di dati nel cloud." },
  { icon: ShieldCheck, title: "Controllo totale", text: "Tu decidi cosa impara e cosa esegue." },
  {
    icon: ShieldAlert,
    title: "Sicurezza e compliance",
    text: "Progettato per la privacy, la tua privacy e il GDPR.",
  },
];

function Logo() {
  return (
    <a href="#" className="flex items-baseline gap-0.5 text-2xl font-light tracking-tight">
      <span>mim</span>
      <span className="relative">
        ē
      </span>
      <span>tikós</span>
    </a>
  );
}

function Index() {
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
              <Link to="/en" className="text-muted-foreground transition-colors hover:text-primary">
                EN
              </Link>
            </li>
          </ul>
          <a
            href="#contatti"
            className="rounded-md border border-primary/70 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Richiedi una demo
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,oklch(0.35_0.08_250/0.55),transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-24 pt-36 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:pb-32 lg:pt-40">
          <div className="relative z-10 max-w-xl">
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Il lavoratore
              <br />
              che non trovi.
              <br />
              <span className="text-primary">H24.</span>
            </h1>
            <p className="mt-6 text-2xl text-foreground/90 md:text-3xl">
              Artificiale, ma <span className="text-primary">intelligente.</span>
            </p>
            <div className="mt-8 h-px w-16 bg-primary" />
            <h2 className="mt-8 text-xl font-semibold">Mimētikós affianca le tue persone.</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Diventa un <span className="text-foreground">AlterEgo operativo</span> con cui
              lavorare ogni giorno. Installa dipendenti AI che imparano procedure, organizzano
              conoscenza ed eseguono automazioni approvate — senza inviare dati a terzi nel cloud.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contatti"
                className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Richiedi una demo
              </a>
              <a
                href="#come-funziona"
                className="rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                Scopri come funziona
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroDevice}
              alt="Dispositivo Mimētikós su scrivania in ufficio"
              width={1280}
              height={1280}
              className="mx-auto w-full max-w-xl rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="come-funziona" className="px-6 pb-10 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-2xl bg-card px-8 py-14 md:px-16">
          <h2 className="text-center text-3xl font-semibold md:text-4xl">
            Osserva. Impara. Lavora.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 text-primary">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-xl font-medium">{title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="px-6 pb-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-2xl bg-card px-8 py-14 md:grid-cols-[1fr_1.4fr] md:px-12">
          <div>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Non devi imparare
              <br />
              un nuovo sistema.
              <br />
              <span className="text-primary">È il sistema a imparare da te.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Usa i tuoi strumenti,
              <br />
              le tue procedure,
              <br />
              il tuo modo di lavorare.
            </p>
            <a
              href="#architettura"
              className="mt-7 inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
            >
              Scopri di più <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {tools.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/40 text-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <span className="mt-3 text-sm text-foreground/90">{label}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-muted-foreground">
              Mimētikós impara come il lavoro viene davvero svolto.
            </p>
          </div>
        </div>
      </section>

      {/* VERTICALS */}
      <section id="per-chi" className="px-6 pb-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-semibold md:text-4xl">
            Per studi professionali e PMI
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {verticals.map(({ img, icon: Icon, title, text }) => (
              <article
                key={title}
                className="overflow-hidden rounded-2xl bg-card transition-transform hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    width={768}
                    height={512}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative p-6">
                  <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-md bg-card text-primary ring-1 ring-primary/40">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="sicurezza" className="px-6 pb-16 pt-4 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-2xl bg-card px-8 py-10 md:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <Icon className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / FOOTER */}
      <footer id="contatti" className="border-t border-border px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Il tuo AlterEgo operativo, privato e sotto il tuo controllo.
            </p>
          </div>
          <a
            href="mailto:hello@mimetikos.ai"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Richiedi una demo
          </a>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mimētikós. Tutti i diritti riservati.
        </p>
      </footer>
    </div>
  );
}
