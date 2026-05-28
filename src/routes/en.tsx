import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileNav } from "@/components/MobileNav";
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
import heroDevicePng from "@/assets/hero-device-pillars.png";
import catPromotori from "@/assets/cat-promotori.jpg";
import catCommLegali from "@/assets/cat-commercialisti-legali.jpg";
import catPmi from "@/assets/cat-pmi.jpg";
import catTurismo from "@/assets/cat-turismo.jpg";

export const Route = createFileRoute("/en")({
  component: IndexEn,
});

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Who it's for", href: "#who" },
];

const pillars = [
  {
    icon: Eye,
    title: "Observes",
    text:
      "Joins meetings, reads emails, messages and documents, and watches how company tools and procedures are used.",
  },
  {
    icon: Brain,
    title: "Learns",
    text:
      "Builds operational knowledge and learns recurring tasks, procedures and the way your company works.",
  },
  {
    icon: CheckCircle2,
    title: "Works",
    text:
      "Executes approved tasks and automations through controlled, auditable tools, always under your control.",
  },
];


const verticals = [
  {
    img: catPromotori,
    icon: TrendingUp,
    title: "Financial advisors",
    text: "Client onboarding, MiFID, portfolio reporting and commercial follow-ups.",
  },
  {
    img: catCommLegali,
    icon: Scale,
    title: "Accounting & law firms",
    text: "Document classification, deadlines, case analysis and file management.",
  },
  {
    img: catPmi,
    icon: Factory,
    title: "Manufacturing SMEs",
    text: "Operating procedures, quality, purchasing, maintenance and production.",
  },
  {
    img: catTurismo,
    icon: Hotel,
    title: "Hospitality & tourism",
    text: "Bookings, guest management, OTAs (Booking, Airbnb) and multilingual comms.",
  },
];

const trust = [
  { icon: Lock, title: "Local & private AI", text: "Your data stays inside your company." },
  { icon: Lightbulb, title: "No data to third parties", text: "Zero data sent to the cloud." },
  { icon: ShieldCheck, title: "Full control", text: "You decide what it learns and what it runs." },
  {
    icon: ShieldAlert,
    title: "Security & compliance",
    text: "Designed for privacy — your privacy, GDPR and the EU AI Act.",
  },
];

function OrchestratorDiagram() {
  const items = [
    { icon: Mail, label: "Email" },
    { icon: MessageCircle, label: "WhatsApp" },
    { icon: Settings, label: "ERP" },
    { icon: FileSpreadsheet, label: "Excel" },
    { icon: FileText, label: "Documents" },
    { icon: ListChecks, label: "Procedures" },
    { icon: BookOpen, label: "Knowledge" },
    { icon: MoreHorizontal, label: "More" },
  ];

  const cx = 50;
  const cy = 50;
  const outerR = 36;
  const centerR = 10;

  const nodes = items.map((item, i) => {
    const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
    const x = cx + outerR * Math.cos(angle);
    const y = cy + outerR * Math.sin(angle);
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return {
      ...item,
      x,
      y,
      lx1: cx + (dx / dist) * (centerR + 1),
      ly1: cy + (dy / dist) * (centerR + 1),
      lx2: x - (dx / dist) * 7,
      ly2: y - (dy / dist) * 7,
    };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[400px]">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        overflow="visible"
      >
        <defs>
          <marker id="tip-en" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" className="fill-primary" opacity="0.55" />
          </marker>
        </defs>
        {nodes.map(({ label, lx1, ly1, lx2, ly2 }) => (
          <line
            key={label}
            x1={lx1}
            y1={ly1}
            x2={lx2}
            y2={ly2}
            className="stroke-primary"
            strokeWidth="0.5"
            strokeDasharray="2 1.5"
            opacity="0.4"
            markerEnd="url(#tip-en)"
          />
        ))}
      </svg>

      {/* Center M */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-[20%] w-[20%] items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">
        <span className="text-xl font-semibold leading-none">M</span>
      </div>

      {/* Tool nodes */}
      {nodes.map(({ icon: Icon, label, x, y }) => (
        <div
          key={label}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/40 bg-card text-primary">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <span className="max-w-[60px] text-center text-[10px] leading-tight text-foreground/65">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-baseline gap-0.5 text-2xl font-light tracking-tight">
      <span>mim</span>
      <span className="relative">ē</span>
      <span>tikós</span>
    </a>
  );
}

function IndexEn() {
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
              <Link to="/discover" className="transition-colors hover:text-primary">
                Discover more
              </Link>
            </li>
            <li>
              <Link to="/we-know" className="transition-colors hover:text-primary">
                We know
              </Link>
            </li>
            <li>
              <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
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
            ctaHref="mailto:hello@mimetikos.it"
            ctaLabel="Request a demo"
          />
        </nav>
      </header>

      {/* HERO */}
      <section className="relative flex h-screen min-h-[640px] items-center overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroDevice}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/mimetikos.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/75 via-background/30 to-background" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,oklch(0.35_0.08_250/0.5),transparent_65%)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Private AI employees for professionals and SMEs
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            The worker
            <br />
            you can't find.
            <br />
            <span className="text-primary">24/7.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-foreground/85 md:text-2xl">
            Artificial, but <span className="text-primary">intelligent.</span>
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-foreground/60 md:text-base">
            Install AI employees that learn your procedures, organise knowledge and execute
            approved automations — without sending data to third parties in the cloud.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:hello@mimetikos.it"
              className="rounded-md bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Request a demo
            </a>
            <a
              href="#how-it-works"
              className="rounded-md border border-white/20 px-7 py-3 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-colors hover:border-primary/60 hover:text-primary"
            >
              See how it works
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-foreground/40">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3 w-3" /> Local & private AI
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" /> GDPR
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="h-3 w-3" /> EU AI Act
            </span>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="how-it-works" className="px-6 pb-10 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-2xl bg-card px-8 py-14 md:px-16">
          <h2 className="text-center text-3xl font-semibold md:text-4xl">
            Observe. Learn. <span className="text-primary">Work.</span>
          </h2>
          <div className="relative mt-10 overflow-hidden rounded-xl">
            <img
              src={heroDevicePng}
              alt="Mimētikós device"
              className="w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,oklch(0.35_0.08_250/0.6),transparent_70%)]" />
            <div className="pointer-events-none absolute inset-0 bg-background/25" />
          </div>
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
              You don't have to learn
              <br />
              a new system.
              <br />
              <span className="text-primary">The system learns from you.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Use your tools,
              <br />
              your procedures,
              <br />
              your way of working.
            </p>
            <a
              href="/discover"
              className="mt-7 inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <OrchestratorDiagram />
            <p className="text-center text-sm text-muted-foreground">
              Mimētikós orchestrates your existing systems.
            </p>
          </div>
        </div>
      </section>

      {/* VERTICALS */}
      <section id="who" className="px-6 pb-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-semibold md:text-4xl">
            For Professionals, Firms and SMEs
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {verticals.map(({ img, icon: Icon, title, text }) => (
              <article
                key={title}
                className="overflow-hidden rounded-2xl bg-card transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    width={768}
                    height={512}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,oklch(0.35_0.08_250/0.6),transparent_70%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-background/25" />
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
      <section id="security" className="px-6 pb-16 pt-4 lg:px-10">
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
      <footer id="contact" className="border-t border-border px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Your operational AlterEgo — private and under your control.
            </p>
          </div>
          <a
            href="mailto:hello@mimetikos.ai"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Request a demo
          </a>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mimētikós. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
