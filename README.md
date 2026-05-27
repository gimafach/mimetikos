# Mimētikós — www.mimetikos.it

Sito istituzionale di Mimētikós. "Il lavoratore che non trovi. H24."

## Requisiti

- Node.js 18+
- npm o bun

## Installazione e Setup

### 1. Clona il repository
```bash
git clone <repo-url>
cd www.mimetikos.it
```

### 2. Installa le dipendenze
```bash
npm install
# oppure
bun install
```

### 3. Avvia in modalità sviluppo
```bash
npm run dev
# oppure
bun dev
```
Il sito sarà disponibile su http://localhost:8080

## Comandi Disponibili

### Sviluppo
```bash
npm run dev        # Avvia server di sviluppo
npm run build      # Build per produzione
npm run preview    # Anteprima build di produzione
```

### Quality
```bash
npm run lint       # Controlla codice con ESLint
npm run format     # Formatta con Prettier
```

## Deploy in Produzione

### Con PM2 (consigliato)

Seguire la stessa procedura del sito www.mimetikos.ai. Il crontab `@reboot pm2 resurrect` già configurato per quell'utente **non** coprirà questo sito — va configurato separatamente per l'utente `mimetikosit` (vedi sotto).

```bash
# 1. Installa dipendenze e build
bun install
npm run build
mkdir -p logs

# 2. Avvia con PM2
pm2 start ecosystem.config.cjs

# 3. Salva la lista dei processi PM2
pm2 save
```

### Auto-restart PM2 al riavvio del server (crontab)

Aggiungere nel crontab dell'utente `mimetikosit` il ripristino automatico dei processi salvati:

```bash
crontab -e
```

Aggiungere queste righe (adattare il PATH all'ambiente, verificare con `echo $PATH`):

```
PATH=/home/mimetikosit/.nvm/versions/node/v22.x.x/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
@reboot pm2 resurrect &> /dev/null
```

> `pm2 resurrect` ripristina tutti i processi salvati con `pm2 save`. Il PATH esplicito è necessario perché al reboot la shell non carica il profilo utente.

### Deploy su CloudPanel
1. Sito configurato come app **Node.js** su porta **4002**
2. PM2 process name: `mimetikosit`
3. Logs in `./logs/`

### Sequenza comandi dopo aggiornamento da git

```bash
bun install
npm run build
pm2 restart mimetikosit
```

## Tecnologie

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Routing**: TanStack Router (SPA, file-based)
- **Server (prod)**: Express.js
- **Process Manager**: PM2

## Struttura Progetto

```
src/
├── assets/       # Immagini
├── components/
│   └── ui/       # Componenti shadcn/ui
├── hooks/        # Custom hooks
├── lib/          # Utilities
└── routes/       # Pagine (TanStack Router file-based)
    ├── __root.tsx
    ├── index.tsx  # Versione italiana (/)
    └── en.tsx     # Versione inglese (/en)
```

## Note di Sviluppo

- `src/routeTree.gen.ts` è auto-generato — non modificare manualmente
- Import alias: `@/*` punta a `src/*`
- Server produzione su porta 4002
- Il sito gemello www.mimetikos.ai gira su porta 4001 sotto l'utente `mimetikos`
