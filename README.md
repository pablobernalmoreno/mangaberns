# Mangaberns

A personal manga tracking web app built with **Next.js** and **Supabase**. Browse your manga collection, add new entries, and manage everything through a clean card-based UI.

## Features

- **Manga grid** — displays your collection as cards with cover image, title, description, and a link to read
- **Add manga** — authenticated users can add new manga entries (title, image URL, read link, description) via a modal form with validation
- **Authentication** — login/logout powered by Supabase Auth, with a React context (`AuthContext`) keeping session state across the app
- **MUI components** — built with Material UI for a consistent, responsive design

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | Material UI (MUI v7) + Emotion |
| Backend / DB | Supabase (PostgreSQL + Auth) |
| Forms | Formik + Yup |
| Styling | CSS Modules |

## Getting Started

1. **Install dependencies**

```bash
pnpm install
```

2. **Set up environment variables** — create a `.env.local` file with your Supabase project credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/          # Next.js App Router pages and layouts
├── components/   # UI components (MangaGrid, MangaCard, AddMangaModal, LoginModal, Header)
├── context/      # AuthContext — Supabase session state
└── lib/          # Supabase client
```
