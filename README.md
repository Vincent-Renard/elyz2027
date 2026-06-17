# ElyZ 2027

French presidential election 2027 dashboard — candidates, polls, topics, games, and media monitoring.

## Tech Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS 4**
- **Prisma 7 + MongoDB** (optional, falls back to static data)
- **Docker** (optional)

## Pages

| Route | Description |
|---|---|
| `/` | Timeline with candidate announcements and key dates |
| `/candidats` | Candidate list with status filter |
| `/candidats/[slug]` | Candidate profile: bio, polls, program, agenda, articles |
| `/parti/[slug]` | Party page: history, position, candidates |
| `/sondages` | Poll evolution chart and poll barometer |
| `/sujets` | Topics with candidate positions as dot clouds |
| `/jeux` | Quiz (12 random questions out of 200+), Quotes game, Score simulator, Memory |
| `/veille` | Media monitoring — collected articles from 50 French news sources |

## Start

```bash
npm install
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001).

## Stop

```bash
pkill -f "next dev"
```

## Database

```bash
docker compose up -d         # Start MongoDB
npm run db:seed              # Seed candidates, parties, polls, articles, quiz questions
```

## Media Monitor

Collects election news from 50 French media outlets (Le Monde, Le Figaro, France Info, BFM TV, regional press, magazines, radios).

```bash
npm run media:fetch
```

Articles are saved to `src/data/collected/` and visible on the `/veille` page.

## Games

- **Quiz** — 12 random questions from a bank of 200+ (candidates, parties, programs, history)
- **Citations** — guess which candidate said the quote
- **Simulateur** — drag sliders to simulate first-round scores
- **Memory** — find matching candidate pairs

## Data

Static data lives in `src/data/` (TypeScript files). When MongoDB is available, the app reads from the database instead. Run `npm run db:seed` to populate MongoDB.
