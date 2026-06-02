import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileNav } from "@/components/MobileNav";

export const Route = createFileRoute("/cookie")({
  component: CookiePolicy,
});

const navLinks = [
  { label: "Come funziona", href: "/#come-funziona" },
  { label: "Per chi è", href: "/#per-chi" },
  { label: "Sicurezza", href: "/#sicurezza" },
  { label: "Scopri di più", href: "/scopri-di-piu" },
  { label: "Casi d'uso", href: "/casi-duso" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-0.5 text-2xl font-light tracking-tight">
      <span>mim</span>
      <span className="relative">ē</span>
      <span>tikós</span>
    </Link>
  );
}

function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Logo />
          <ul className="hidden items-center gap-9 text-sm text-foreground/85 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-primary">{l.label}</a>
              </li>
            ))}
            <li>
              <Link to="/lo-sappiamo" className="transition-colors hover:text-primary">Lo sappiamo</Link>
            </li>
            <li>
              <Link to="/en" className="text-muted-foreground transition-colors hover:text-primary">EN</Link>
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

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-36 lg:px-10">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Cookie Policy</h1>
        <p className="mb-10 text-xs text-muted-foreground">
          Ai sensi dell'art. 122 del D.Lgs. 196/2003 e delle Linee guida del Garante sui cookie (10 giugno 2021) — Ultimo aggiornamento: giugno 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/80">

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell'utente durante la navigazione. Possono essere "di sessione" (si cancellano alla chiusura del browser) o "persistenti" (rimangono sul dispositivo per un tempo determinato).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">Cookie utilizzati da questo sito</h2>
            <p className="mb-4">
              Questo sito utilizza esclusivamente <strong>cookie tecnici</strong>, necessari al funzionamento delle pagine. Non vengono utilizzati cookie di profilazione, cookie di marketing né cookie di terze parti. Non è installato alcun sistema di analisi del traffico (Google Analytics o equivalenti), né alcun pixel di tracciamento.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left font-medium text-foreground">Tipo</th>
                    <th className="pb-2 text-left font-medium text-foreground">Finalità</th>
                    <th className="pb-2 text-left font-medium text-foreground">Durata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-muted-foreground">Tecnico di sessione</td>
                    <td className="py-2 pr-4 text-muted-foreground">Garantire il corretto funzionamento della navigazione</td>
                    <td className="py-2 text-muted-foreground">Fine sessione</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">Nessun consenso richiesto</h2>
            <p>
              In assenza di cookie di profilazione o di terze parti, questo sito non richiede il consenso ai cookie ai sensi delle Linee guida del Garante per la Protezione dei Dati Personali del 10 giugno 2021.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">Come gestire i cookie</h2>
            <p>
              Puoi configurare il tuo browser per bloccare o eliminare i cookie in qualsiasi momento. Le istruzioni si trovano nelle impostazioni del browser alla voce "Privacy" o "Cookie". Tieni presente che la disattivazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">Titolare del Trattamento</h2>
            <p>
              ASKY s.r.l. — Viale Abruzzi 73A, 20131 Milano<br />
              Email: <a href="mailto:hello@mimetikos.ai" className="text-primary hover:underline">hello@mimetikos.ai</a> — PEC: asky@pec.it
            </p>
            <p className="mt-3">
              Per maggiori informazioni sul trattamento dei dati personali consulta la{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-border px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Logo />
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
