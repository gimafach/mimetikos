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

export const Route = createFileRoute("/we-know")({
  component: WeKnow,
});

const navLinks = [
  { label: "How it works", href: "/en#how-it-works" },
  { label: "Who it's for", href: "/en#who" },
];

const questions = [
  {
    q: "I'm not a technical person.",
    a: "You don't need to be. mimētikós does not require you to learn new software or change the way you work. You continue using phone, email, WhatsApp, Excel, ERP. mimētikós learns from the way you already work.",
    image: advantageNewImg,
    alt: "mimētikós device",
  },
  {
    q: "I don't have time for another platform.",
    a: "That is exactly why mimētikós exists. It is not designed to add work. It is designed to remove it.",
    image: bundle02,
    alt: "mimētikós automation",
  },
  {
    q: "Nobody can do my work.",
    a: "mimētikós does not replace your experience. It learns from it. The value of your company is in the way you work, decide and solve problems. mimētikós transforms that value into operational continuity.",
    image: bundle01,
    alt: "Team and mimētikós",
  },
  {
    q: "What if it makes mistakes?",
    a: "mimētikós does not make decisions without your control. At the beginning it observes, suggests, and automates only repetitive activities. Supervision always remains yours.",
    image: bundle04,
    alt: "mimētikós control",
  },
  {
    q: "Where does my data go?",
    a: "Nowhere. mimētikós works inside your company, on your desk. No external clouds, no sharing, no third-party training.",
    image: bundle03,
    alt: "mimētikós privacy",
  },
  {
    q: "Do I need to change the software I already use?",
    a: "No. mimētikós adapts to your work. Not the other way around.",
    image: bundle06,
    alt: "mimētikós adapts",
  },
  {
    q: "My employees will never use it.",
    a: "They may not even notice it. Because it continues working through the tools they already use every day.",
    image: bundle07,
    alt: "Team working",
  },
  {
    q: "It sounds complicated.",
    a: "Technology should be invisible. If you notice the complexity, we failed.",
    image: bundle05,
    alt: "mimētikós simplicity",
  },
  {
    q: "What if everything changes in a few years?",
    a: "The value is not the AI model. The value is what mimētikós learns from your company — your way of working, your operational experience. That remains yours.",
    image: bundle08,
    alt: "mimētikós future",
  },
  {
    q: "Why should I start now?",
    a: "Because those who start earlier build operational digital knowledge, automate earlier, and accumulate competitive advantage. In a few years, it won't matter who uses AI. It will matter who taught it their work first.",
    image: advantageImg,
    alt: "Competitive advantage",
  },
];

function Logo() {
  return (
    <a href="/en" className="flex items-baseline gap-0.5 text-2xl font-light tracking-tight">
      <span>mim</span>
      <span className="relative">ē</span>
      <span>tikós</span>
    </a>
  );
}

function WeKnow() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV — identico a en.tsx */}
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
              <Link to="/we-know" className="text-primary transition-colors hover:text-primary">
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
            activeKnow
          />
        </nav>
      </header>

      <main>
        {/* Opening */}
        <section className="mx-auto max-w-4xl px-6 pb-16 pt-36 lg:px-10 lg:pt-40">
          <p className="mb-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            We know
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Technology should adapt
            <br />
            to the way you work.
            <br />
            <span className="text-primary">Not the other way around.</span>
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

                {/* Image — scale-[1.04] per crop 2% sui bordi */}
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
              mimētikós does not change your work.{" "}
              <span className="text-primary">
                It helps you protect it, simplify it and grow it.
              </span>
            </p>
            <a
              href="mailto:hello@mimetikos.it"
              className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Request a demo
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER — identico a en.tsx */}
      <footer className="border-t border-border px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Your operational AlterEgo — private and under your control.
            </p>
          </div>
          <a
            href="mailto:hello@mimetikos.it"
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
