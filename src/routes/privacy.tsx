import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileNav } from "@/components/MobileNav";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
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

function Privacy() {
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
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mb-10 text-xs text-muted-foreground">
          Informativa sul trattamento dei dati personali ai sensi dell'art. 13 del Regolamento (UE) 2016/679 (GDPR) — Ultimo aggiornamento: giugno 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/80">

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">1. Titolare del Trattamento</h2>
            <p>
              ASKY s.r.l. — Viale Abruzzi 73A, 20131 Milano<br />
              P.IVA: 07968220967<br />
              Email: hello@mimetikos.ai<br />
              PEC: asky@pec.it
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">2. Dati trattati e finalità</h2>

            <h3 className="mb-2 font-medium text-foreground">2.1 Dati di navigazione</h3>
            <p className="mb-4">
              I sistemi informatici del sito raccolgono automaticamente alcuni dati la cui trasmissione è implicita nell'uso di Internet: indirizzi IP, tipo di browser, sistema operativo, pagine visitate e orario della richiesta. Questi dati non sono associati a utenti identificati e vengono usati esclusivamente per garantire la sicurezza e il corretto funzionamento del sito.
            </p>
            <ul className="mb-4 list-none space-y-1 pl-4 text-muted-foreground">
              <li><span className="text-foreground/80">Base giuridica:</span> legittimo interesse del Titolare (art. 6, par. 1, lett. f GDPR)</li>
              <li><span className="text-foreground/80">Conservazione:</span> massimo 30 giorni, salvo necessità legate all'accertamento di reati</li>
            </ul>

            <h3 className="mb-2 font-medium text-foreground">2.2 Dati forniti volontariamente</h3>
            <p className="mb-4">
              Cliccando su "Richiedi una demo", l'utente apre il proprio client di posta e invia un messaggio a hello@mimetikos.ai. I dati contenuti nell'email (nome, indirizzo email, contenuto del messaggio) sono trattati esclusivamente per rispondere alla richiesta e, ove applicabile, per l'esecuzione di misure precontrattuali.
            </p>
            <ul className="list-none space-y-1 pl-4 text-muted-foreground">
              <li><span className="text-foreground/80">Base giuridica:</span> misure precontrattuali su richiesta dell'interessato (art. 6, par. 1, lett. b GDPR)</li>
              <li><span className="text-foreground/80">Conservazione:</span> per la durata del rapporto commerciale e, successivamente, per il tempo previsto dagli obblighi di legge (max 10 anni per documentazione contabile)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">3. Destinatari dei dati</h2>
            <p>
              I dati non sono ceduti a terzi. Possono essere comunicati a fornitori di servizi tecnici (hosting, provider email) che agiscono in qualità di Responsabili del Trattamento ai sensi dell'art. 28 GDPR, esclusivamente per le finalità indicate nella presente informativa.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">4. Trasferimento dati extra-UE</h2>
            <p>I dati non sono trasferiti al di fuori dello Spazio Economico Europeo.</p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">5. Diritti dell'interessato</h2>
            <p className="mb-3">In qualità di interessato, hai diritto di:</p>
            <ul className="list-none space-y-1 pl-4 text-muted-foreground">
              <li>accedere ai tuoi dati personali (art. 15 GDPR)</li>
              <li>ottenerne la rettifica (art. 16 GDPR)</li>
              <li>ottenerne la cancellazione (art. 17 GDPR)</li>
              <li>ottenerne la limitazione del trattamento (art. 18 GDPR)</li>
              <li>opporti al trattamento (art. 21 GDPR)</li>
              <li>ricevere i tuoi dati in formato strutturato — portabilità (art. 20 GDPR)</li>
            </ul>
            <p className="mt-3">
              Per esercitare i tuoi diritti scrivi a: <a href="mailto:hello@mimetikos.ai" className="text-primary hover:underline">hello@mimetikos.ai</a> oppure a mezzo PEC: asky@pec.it
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">6. Reclamo al Garante</h2>
            <p>
              Hai il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali se ritieni che il trattamento dei tuoi dati violi il GDPR. Per informazioni: www.garanteprivacy.it
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">7. Modifiche</h2>
            <p>
              La presente informativa può essere aggiornata. Eventuali modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
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
