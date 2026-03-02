# ARCHITECTURE.md — Portfolio Web Thomas

> **Version** : 1.0 | **Status** : Validated
> Toute déviation doit être enregistrée dans `docs/DECISIONS.md`.

---

## 1. Vue d'ensemble

Site statique Next.js 14 (App Router, SSG), déployé sur Vercel. Une seule route `/` — SPA avec scroll. Pas de backend, pas de DB en v1. Contenu géré via fichiers de données TypeScript.

```
[Browser]
    │  HTTPS
    ▼
[Vercel CDN]
    │  Static files (SSG)
    ▼
[Next.js App]
    │
    ├── /src/app/page.tsx          ← page unique
    ├── /src/components/sections/  ← Hero, About, Skills...
    ├── /src/data/                 ← contenu (experiences, certs, projects)
    └── /public/                   ← images (photo profil, logos)
```

**Principe directeur** : "Le contenu est séparé du rendu. Modifier une expérience = modifier un fichier data, jamais un composant."

---

## 2. Structure des fichiers

```
portfolio/
│
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── AI_RULES.md
│   ├── PLAN.md
│   └── DECISIONS.md
│
├── tasks/
│   ├── todo.md
│   └── lessons.md
│
├── public/
│   ├── images/
│   │   ├── profile.jpg           ← photo de profil Thomas
│   │   ├── companies/            ← logos Amazon, L'Oréal, etc.
│   │   └── certifications/       ← logos certs (optionnel)
│   ├── favicon.ico
│   └── og-image.jpg              ← Open Graph image pour partage social
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← root layout : fonts, metadata, providers
│   │   ├── page.tsx              ← page principale : assemblage des sections
│   │   └── globals.css           ← CSS global + variables Tailwind custom
│   │
│   ├── components/
│   │   ├── ui/                   ← shadcn/ui (ne pas modifier)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        ← navigation fixe en haut
│   │   │   └── Footer.tsx        ← liens + copyright
│   │   └── sections/             ← une section = un composant
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Skills.tsx
│   │       ├── Experience.tsx
│   │       ├── Certifications.tsx
│   │       ├── Projects.tsx
│   │       └── Contact.tsx       ← intégré au Footer en v1
│   │
│   ├── data/                     ← SEUL endroit où modifier le contenu
│   │   ├── profile.ts            ← nom, titre, bio, photo, réseaux
│   │   ├── experiences.ts        ← timeline expériences pro
│   │   ├── skills.ts             ← hard skills, soft skills, tools
│   │   ├── certifications.ts     ← certifications + URLs
│   │   └── projects.ts           ← projets GitHub avec description
│   │
│   ├── hooks/
│   │   ├── useScrollReveal.ts    ← hook Framer Motion pour animations scroll
│   │   └── useActiveSection.ts   ← hook pour navbar active state
│   │
│   ├── lib/
│   │   └── utils.ts              ← cn() helper + fonctions utilitaires
│   │
│   └── types/
│       └── index.ts              ← tous les types TypeScript du projet
│
├── .env.local.example
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── CHANGELOG.md
└── README.md
```

---

## 3. Types TypeScript

Tous définis dans `src/types/index.ts` :

```typescript
export interface Profile {
  name: string
  title: string
  tagline: string
  bio: string
  photoUrl: string
  location: string
  links: {
    linkedin: string
    github: string
    email: string
  }
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string           // ex: "Jan 2023 — Present"
  location: string
  description: string      // texte modifiable via agent
  highlights: string[]     // 3-4 bullet points d'impact
  logoUrl: string
  color: string            // couleur d'accent de la card
}

export interface Skill {
  name: string
  category: 'technical' | 'product' | 'tools'
  level?: 'expert' | 'proficient' | 'familiar'
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url: string
  logoUrl?: string
}

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  githubUrl: string
  status: 'live' | 'in-progress' | 'scoped'
  impact?: string          // ex: "€13.3M impact"
}
```

---

## 4. Design System

### Palette de couleurs

```css
/* tailwind.config.ts — couleurs custom */
:root {
  --background: #080810;         /* fond principal quasi-noir */
  --surface: #0f0f1a;            /* cards, sections alternées */
  --border: rgba(255,255,255,0.08);

  /* Gradient principal : bleu → violet → teal */
  --gradient-primary: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);

  /* Accents */
  --accent-blue: #3b82f6;
  --accent-violet: #8b5cf6;
  --accent-teal: #06b6d4;

  /* Texte */
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #475569;
}
```

### Typographie

```typescript
// src/app/layout.tsx
import { Syne, DM_Sans } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['700', '800']
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500']
})
```

- **Display (Syne 700/800)** : titres de section, hero headline
- **Body (DM Sans 300-500)** : tout le reste

### Animations — Framer Motion

```typescript
// src/hooks/useScrollReveal.ts
// Pattern réutilisé sur toutes les sections
const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}
// Déclenché par useInView({ once: true, margin: "-100px" })
```

---

## 5. Règles d'architecture

### Séparation contenu / rendu
- Les composants `sections/` ne contiennent **jamais** de contenu en dur
- Tout le contenu vient de `src/data/`
- Modifier une expérience = modifier `experiences.ts` uniquement

### Composants
- Une section = un composant dans `sections/`
- Les composants `sections/` peuvent importer des composants `ui/` mais pas l'inverse
- Pas de `fetch()` dans les composants (site statique — data importée directement)

### Performance
- Toutes les images via `next/image` (optimisation auto WebP + lazy loading)
- Fonts via `next/font` (no layout shift)
- Animations avec `will-change: transform` et désactivées si `prefers-reduced-motion`
- Code split automatique par Next.js — ne pas créer de barrel exports inutiles

---

## 6. SEO & Metadata

```typescript
// src/app/layout.tsx
export const metadata = {
  title: 'Thomas — Product Manager',
  description: 'TPM @ Amazon EU. Building products that matter.',
  openGraph: {
    title: 'Thomas — Product Manager',
    description: 'TPM @ Amazon EU. Building products that matter.',
    url: 'https://thomas.dev',          // à remplacer par le vrai domaine
    images: [{ url: '/og-image.jpg' }]
  },
  twitter: { card: 'summary_large_image' }
}
```

---

## 7. Performance targets

| Indicateur | Cible |
|---|---|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |
| Lighthouse SEO | > 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |

---

> **Signal d'alarme** : fichier > 200 lignes ou composant qui mélange contenu et rendu → refactoriser obligatoirement.
