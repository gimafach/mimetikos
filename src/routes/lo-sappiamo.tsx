import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileNav } from "@/components/MobileNav";

import advantageNewImg from "@/assets/discover-advantage-new.jpg";
import advantageImg from "@/assets/discover-advantage.jpg";
import bundle01 from "@/assets/bundle_01.png";
import bundle02 from "@/assets/bundle_02.png";
import bundle03 from "@/assets/bundle_03.png";
import bundle04 from "@/assets/bundle_04.png";
import bundle05 from "@/assets/bundle_05.png";
import bundle06 from "@/assets/bundle_06.png";
import bundle07 from "@/assets/bundle_07.png";
import bundle08 from "@/assets/bundle_08.png";
import bundle09 from "@/assets/bundle_09.png";

export const Route = createFileRoute("/lo-sappiamo")({
  component: LoSappiamo,
});

const navLinks = [
  { label: "Come funziona", href: "/#come-funziona" },
  { label: "Per chi è", href: "/#per-chi" },
  { label: "Sicurezza", href: "/#sicurezza" },
];

const questions = [
  {
    q: "Non sono tecnologico.",
    a: "Non devi esserlo. mimētikós non ti chiede di imparare nuovi software o cambiare il tuo modo di lavorare. Continui a usare telefono, email, WhatsApp, Excel, gestionale. mimētikós impara da come lavori già oggi.",
    image: advantageNewImg,
    alt: "Dispositivo mimētikós",
  },
  {
    q: "Non ho tempo per un'altra piattaforma.",
    a: "È esattamente il motivo per cui esiste mimētikós. Non nasce per aggiungere lavoro. Nasce per togliertelo.",
    image: bundle02,
    alt: "Automazione mimētikós",
  },
  {
    q: "Nessuno può fare il mio lavoro.",
    a: "mimētikós non sostituisce la tua esperienza. La apprende. Il valore della tua azienda è nel modo in cui lavori, decidi e risolvi problemi. mimētikós trasforma quel valore in continuità operativa.",
    image: bundle01,
    alt: "Team e mimētikós",
  },
  {
    q: "E se sbaglia?",
    a: "mimētikós non prende decisioni senza il tuo controllo. All'inizio osserva, suggerisce, automatizza solo attività ripetitive. La supervisione resta sempre tua.",
    image: bundle04,
    alt: "Controllo mimētikós",
  },
  {
    q: "I miei dati dove finiscono?",
    a: "Da nessuna parte. mimētikós lavora all'interno della tua azienda, sulla tua scrivania. Niente cloud esterni, niente condivisione, niente addestramento di sistemi terzi.",
    image: bundle03,
    alt: "Privacy mimētikós",
  },
  {
    q: "Devo cambiare i programmi che uso?",
    a: "No. mimētikós nasce per usarli così come sono, li integra. Non il contrario.",
    image: bundle06,
    alt: "mimētikós si adatta",
  },
  {
    q: "I miei collaboratori non lo useranno mai.",
    a: "Probabilmente non si accorgeranno nemmeno di usarlo. Perché continuano a lavorare con strumenti che già utilizzano ogni giorno.",
    image: bundle07,
    alt: "Team che lavora",
  },
  {
    q: "Sembra complicato.",
    a: "La tecnologia deve essere invisibile. Se ti accorgi della complessità, abbiamo sbagliato qualcosa.",
    image: bundle05,
    alt: "Semplicità mimētikós",
  },
  {
    q: "E se tra qualche anni cambia tutto?",
    a: "Il valore non è il modello AI. Il valore è ciò che mimētikós ha imparato dalla tua azienda — il tuo modo di lavorare, la tua esperienza operativa. Quello resta tuo.",
    image: bundle08,
    alt: "Futuro mimētikós",
  },
  {
    q: "Perché dovrei iniziare adesso?",
    a: "Perché chi inizierà prima costruirà conoscenza operativa digitale, automatizzerà prima, accumulerà vantaggio competitivo. Fra qualche anno non farà differenza chi usa l'AI. Farà differenza chi le ha insegnato il proprio lavoro per primo.",
    image: advantageImg,
    alt: "Vantaggio competitivo",
  },
];

function Logo() {
  return (
    <a href="/" className="flex items-baseline gap-0.5 text-2xl font-light tracking-tight">
      <span>mim</span>
      <span className="relative">ē</span>
      <span>tikós</span>
    </a>
  );
}

function LoSappiamo() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV — identico a index.tsx */}
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
              <Link to="/lo-sappiamo" className="text-primary transition-colors hover:text-primary">
                Lo sappiamo
              </Link>
            </li>
            <li>
              <Link to="/en" className="text-muted-foreground transition-colors hover:text-primary">
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
            ctaHref="mailto:hello@mimetikos.it"
            ctaLabel="Richiedi una demo"
            activeKnow
          />
        </nav>
      </header>

      <main>
        {/* Opening — pt-36 per compensare l'header absolute */}
        <section className="mx-auto max-w-4xl px-6 pb-16 pt-36 lg:px-10 lg:pt-40">
          <p className="mb-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Lo sappiamo
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            La tecnologia deve adattarsi
            <br />
            al tuo modo di lavorare.
            <br />
            <span className="text-primary">Non il contrario.</span>
          </h1>
        </section>

        {/* Q&A alternating */}
        {questions.map((item, i) => (
          <section key={i} className="border-t border-border">
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:px-10">
              <div
                className={`flex flex-col items-center gap-12 md:flex-row lg:gap-20 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Text */}
                <div className="md:w-1/2 lg:w-[40%]">
                  <h2 className="mb-6 text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
                    {item.q}
                  </h2>
                  <p className="text-base leading-relaxed text-muted-foreground">{item.a}</p>
                </div>

                {/* Image — overflow-hidden + scale-[1.04] per crop 2% sui bordi */}
                <div className="md:w-1/2 lg:w-[60%]">
                  <div
                    className="relative overflow-hidden rounded-xl"
                    style={{
                      boxShadow: "0 0 70px 24px rgba(55,60,70,0.55)",
                      background: "rgb(55,60,70)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={960}
                      height={640}
                      loading="lazy"
                      className="h-auto w-full scale-[1.04] object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,oklch(0.35_0.08_250/0.6),transparent_70%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-background/25" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Closing */}
        <section className="border-t border-border px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="mb-10 text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
              mimētikós non cambia il tuo lavoro.{" "}
              <span className="text-primary">
                Ti aiuta a proteggerlo, alleggerirlo e farlo crescere.
              </span>
            </p>
            <a
              href="mailto:hello@mimetikos.it"
              className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Richiedi una demo
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER — identico a index.tsx */}
      <footer className="border-t border-border px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Il tuo AlterEgo operativo, privato e sotto il tuo controllo.
            </p>
          </div>
          <a
            href="mailto:hello@mimetikos.it"
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
