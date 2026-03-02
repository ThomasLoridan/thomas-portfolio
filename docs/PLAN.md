# PLAN.md — Roadmap d'exécution — Portfolio Web Thomas

> ⚠️ **Règle fondamentale** : Ne travailler que sur l'étape `→ EN COURS`.
> Ne passer à la suivante qu'après validation explicite de Thomas.

---

## Statuts
`⬜ À FAIRE` | `→ EN COURS` | `✅ VALIDÉ` | `🚫 BLOQUÉ` | `⏭ SKIPÉ`

---

## Phase 0 — Foundation

### Étape 0.1 — Setup repo GitHub
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] Repo GitHub créé : `thomas-portfolio` (public)
- [ ] Structure de dossiers conforme à `ARCHITECTURE.md`
- [ ] `.gitignore` en place (Node + Next.js)
- [ ] `README.md` avec nom + problem statement
- [ ] Commit : `chore(init): initialize Next.js portfolio project`

Critère de validation : *Repo clonable, structure visible sur GitHub.*

---

### Étape 0.2 — Setup Next.js + tooling
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] `pnpm create next-app` avec TypeScript + Tailwind + App Router
- [ ] Framer Motion installé : `pnpm add framer-motion`
- [ ] shadcn/ui initialisé : `pnpm dlx shadcn@latest init`
- [ ] Fonts configurées : Syne + DM Sans via `next/font/google`
- [ ] Palette de couleurs custom dans `tailwind.config.ts`
- [ ] Variables CSS dans `globals.css`
- [ ] ESLint + Prettier configurés
- [ ] Serveur démarre sans erreur : `pnpm dev`
- [ ] Commit : `chore(setup): configure Next.js with Tailwind, fonts, and design tokens`

Critère de validation : *`pnpm dev` → page blanche stylisée avec les bonnes fonts et couleurs.*

---

### Étape 0.3 — Types & Data Layer
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] `src/types/index.ts` complet (Profile, Experience, Skill, Certification, Project)
- [ ] `src/data/profile.ts` rempli avec les vraies infos de Thomas
- [ ] `src/data/experiences.ts` — Amazon, L'Oréal, Familyad
- [ ] `src/data/skills.ts` — hard skills, soft skills, tools
- [ ] `src/data/certifications.ts` — toutes les certifications + URLs
- [ ] `src/data/projects.ts` — SONAR, ORACLE, portfolio PM
- [ ] Commit : `feat(data): add content layer with profile, experiences, and skills`

Critère de validation : *Les fichiers de données sont importables sans erreur TypeScript.*

> ⚠️ **BLOQUANT** : Thomas doit fournir :
> - Sa photo de profil (dans `/public/images/profile.jpg`)
> - Les textes de ses expériences (ou validation des drafts générés par AGENT:PM)
> - Les URLs de ses certifications

---

## Phase 1 — Layout & Navigation

### Étape 1.1 — Layout global + Navbar
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] `src/app/layout.tsx` : fonts + metadata SEO + providers
- [ ] `src/components/layout/Navbar.tsx` : navigation fixe, liens vers sections, scroll-spy (section active surlignée)
- [ ] Hook `useActiveSection.ts` pour le scroll-spy
- [ ] Responsive : hamburger menu sur mobile
- [ ] Commit : `feat(layout): add root layout with navbar and scroll-spy`

Critère de validation : *La navbar est fixe, les liens scrollent vers les bonnes sections, la section active est surlignée.*

---

### Étape 1.2 — Footer
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] `src/components/layout/Footer.tsx`
- [ ] Liens : LinkedIn, GitHub, Email
- [ ] Liens certifications (top 3)
- [ ] Copyright
- [ ] Commit : `feat(layout): add footer with links`

Critère de validation : *Footer visible, tous les liens fonctionnent.*

---

## Phase 2 — Sections (cœur du site)

> Chaque section est une étape séparée. Une section = une conversation AGENT:FRONT.

### Étape 2.1 — Hero Section
**Status** : `⬜ À FAIRE`

**C'est la section la plus importante du site.**

Livrables :
- [ ] `src/components/sections/Hero.tsx`
- [ ] Nom en grand (Syne 800), titre, tagline percutante
- [ ] Dégradé de fond animé (gradient mesh ou particules CSS)
- [ ] Photo de profil (ou placeholder si non fournie)
- [ ] CTA : bouton "View my work" (scroll vers Experience) + bouton "LinkedIn"
- [ ] Animation d'entrée : stagger reveal sur les éléments (Framer Motion)
- [ ] Scroll indicator animé en bas
- [ ] Commit : `feat(sections): add hero section with animated entry`

Critère de validation : *La section est visuellement percutante. L'animation d'entrée fonctionne. Responsive.*

---

### Étape 2.2 — About Section
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] `src/components/sections/About.tsx`
- [ ] Photo de profil (format card, pas hero)
- [ ] Texte narratif : qui je suis, ma philosophie PM, pourquoi je code
- [ ] 3 "facts" clés en cards (Amazon TPM / 26 pays / €30M portfolio)
- [ ] Animation au scroll (useInView)
- [ ] Commit : `feat(sections): add about section`

Critère de validation : *Section lisible, la photo s'affiche, l'animation scroll fonctionne.*

---

### Étape 2.3 — Skills Section
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] `src/components/sections/Skills.tsx`
- [ ] 3 catégories visuellement distinctes : Technical / Product / Tools
- [ ] Tags/pills avec couleur par catégorie
- [ ] Pas de barres de progression (cliché et subjectif)
- [ ] Animation stagger : les skills apparaissent un par un au scroll
- [ ] Commit : `feat(sections): add skills section with categorized tags`

Critère de validation : *Les 3 catégories sont distinctes. L'animation stagger fonctionne.*

---

### Étape 2.4 — Experience Section
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] `src/components/sections/Experience.tsx`
- [ ] Timeline verticale (style Apple : ligne centrale, cards alternées gauche/droite sur desktop, empilées sur mobile)
- [ ] Card par expérience : logo entreprise, rôle, période, description, highlights
- [ ] Couleur d'accent par entreprise (Amazon = orange, L'Oréal = noir/or, Familyad = custom)
- [ ] Animation : cards se révèlent au scroll dans l'ordre chronologique inverse
- [ ] Commit : `feat(sections): add experience timeline`

Critère de validation : *Timeline visible et lisible. Toutes les expériences s'affichent. Animation fonctionne.*

---

### Étape 2.5 — Certifications Section
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] `src/components/sections/Certifications.tsx`
- [ ] Grid de cards : logo, nom, organisme, date, lien cliquable
- [ ] Hover state : card se soulève légèrement (Framer Motion)
- [ ] Lien externe vers la certification (s'ouvre dans nouvel onglet)
- [ ] Commit : `feat(sections): add certifications grid`

Critère de validation : *Toutes les certifications affichées. Les liens fonctionnent. Hover état visible.*

---

### Étape 2.6 — Projects Section
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] `src/components/sections/Projects.tsx`
- [ ] Cards projets : nom, description, tags tech, badge status, lien GitHub
- [ ] Impact mis en avant si disponible (ex: "€13.3M impact")
- [ ] CTA final : "See all projects on GitHub"
- [ ] Commit : `feat(sections): add projects showcase`

Critère de validation : *Les projets s'affichent. Les liens GitHub fonctionnent.*

---

## Phase 3 — Polish & Performance

### Étape 3.1 — Animations globales & cohérence visuelle
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] Vérifier cohérence animations sur toutes les sections
- [ ] Ajouter `prefers-reduced-motion` : désactiver animations si demandé
- [ ] Smooth scroll natif (`scroll-behavior: smooth`)
- [ ] Gradient de transition entre sections (pas de cuts brusques)
- [ ] Commit : `feat(ux): polish animations and add motion preferences support`

---

### Étape 3.2 — Responsive & Accessibilité
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] Test complet sur mobile (375px), tablet (768px), desktop (1440px)
- [ ] Navbar hamburger fonctionnelle
- [ ] Images optimisées (`next/image` partout)
- [ ] Alt text sur toutes les images
- [ ] Contrast ratio WCAG AA sur tous les textes
- [ ] Commit : `fix(a11y): ensure responsive layout and accessibility compliance`

---

### Étape 3.3 — SEO & Metadata
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] Metadata complète dans `layout.tsx`
- [ ] OG image créée (`/public/og-image.jpg`)
- [ ] Sitemap généré (`next-sitemap` ou manuel)
- [ ] Favicon personnalisé
- [ ] Commit : `feat(seo): add metadata, OG tags, and sitemap`

---

### Étape 3.4 — Audit Lighthouse
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse SEO > 95
- [ ] Corriger tous les issues critiques
- [ ] Commit : `perf: optimize lighthouse scores`

---

## Phase 4 — Déploiement

### Étape 4.1 — Déploiement Vercel
**Status** : `⬜ À FAIRE`

Livrables :
- [ ] Compte Vercel connecté au repo GitHub
- [ ] Build de production sans erreur : `pnpm build`
- [ ] URL Vercel fonctionnelle (ex: `thomas-portfolio.vercel.app`)
- [ ] (Optionnel) Domaine custom configuré
- [ ] Commit : `chore(deploy): production deployment on Vercel`

Critère de validation : *Le site est accessible publiquement. Partager l'URL.*

---

## Log de progression

| Étape | Date début | Date validation | Durée réelle |
|---|---|---|---|
| | | | |
