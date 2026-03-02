# PRD — Portfolio Web Personnel (Thomas)

> **Status** : Approved
> **Author** : Thomas
> **Last updated** : 2026-03-02
> **Version** : 1.0

---

## TL;DR

Site web personnel de Thomas, TPM Amazon reconverti en PM, destiné aux recruteurs tech (Google, Meta, Microsoft, Netflix, Apple). L'objectif est de créer une première impression mémorable en 30 secondes, de démontrer une culture technique rare pour un PM, et de remplacer le CV PDF par une expérience interactive de découverte — inspirée du storytelling produit d'Apple.

---

## 1. Problème

### Contexte
Les recruteurs de GAFAM reçoivent des centaines de profils PM. Un CV PDF standard ne capte pas l'attention et ne permet pas de démontrer une culture technique, une sensibilité produit, ni une personnalité. Thomas a un profil rare (TPM + builder + data) qui ne ressort pas dans un format traditionnel.

### Énoncé du problème
> "When a GAFAM recruiter receives Thomas's application, they cannot quickly grasp what makes his profile unique because a static resume doesn't show technical depth, product thinking, or builder mindset, which results in his application being screened out despite an atypical and valuable background."

### Pourquoi maintenant
Thomas cible activement des rôles PM IC4/IC5. Le GitHub PM portfolio est en cours de construction. Le site web est le point d'entrée unique vers l'ensemble de ce portfolio — il doit exister avant les premières candidatures.

### Ce qu'on a déjà essayé
CV PDF + LinkedIn. Insuffisant : pas de différenciation visuelle, pas de démonstration de la capacité à "shipper", pas d'expérience utilisateur.

---

## 2. Utilisateurs

### Utilisateur primaire : Recruteur tech GAFAM

**Profil** : Sourcer ou hiring manager, 25-45 ans, analyse 50-100 profils/semaine
**Comportement actuel** : Visite LinkedIn → regarde 15s → décide de contacter ou non
**Frustration** : Tous les profils PM se ressemblent. Difficile de trouver quelqu'un avec vraie culture technique ET sensibilité produit.
**Définition du succès** : "Ce profil est différent, je veux en savoir plus."

### Utilisateur secondaire : Hiring manager technique
**Profil** : Engineering manager ou Director PM qui veut valider la profondeur technique
**Besoin** : Voir des preuves concrètes (projets, impact chiffré, stack maîtrisée)

---

## 3. Objectifs & Métriques

### Objectifs
- **O1** : Créer une première impression mémorable et professionnelle en < 30 secondes
- **O2** : Démontrer le profil hybride PM + technique de façon convaincante
- **O3** : Faciliter la prise de contact et l'accès aux preuves (GitHub, LinkedIn, certifications)

### Métriques de succès
| Métrique | Baseline | Cible |
|---|---|---|
| Temps moyen sur le site | 0 (pas de site) | > 2 minutes |
| Taux de clic vers LinkedIn/GitHub | 0 | > 40% des visiteurs |
| Retours recruteurs positifs | 0 | Mentionné dans 3+ premiers contacts |

---

## 4. Scope

### ✅ In scope — v1

- **Hero section** : Nom, titre, phrase d'accroche percutante, CTA (LinkedIn + GitHub)
- **About section** : Photo de profil + présentation narrative (qui je suis, ma philosophie PM)
- **Skills section** : Hard skills (Python, SQL, FastAPI, Next.js...) + Soft skills (stakeholder mgmt, data-driven...) + Tools (QuickSight, Jira, AWS...)
- **Experience section** : Timeline des expériences (Amazon, L'Oréal, Familyad) avec texte descriptif modifiable via agent
- **Certifications section** : Cards avec logo, nom, organisme, date, et lien URL
- **Projects section** : Aperçu des projets GitHub (SONAR, ORACLE, portfolio PM...)
- **Footer** : LinkedIn, GitHub, email, certifications

### ❌ Out of scope — v1

| Item exclu | Raison |
|---|---|
| Blog / articles | Complexité rédactionnelle, non critique pour recrutement |
| Formulaire de contact | Email direct + LinkedIn suffisants, évite spam |
| CMS headless | Overkill pour v1, contenu modifiable via agent Claude directement |
| Multilingue (FR/EN) | EN uniquement pour cible GAFAM internationale |
| Animations 3D WebGL | Complexité disproportionnée vs impact |
| Dark/light mode toggle | Choisir un seul thème fort — le toggle dilue l'identité visuelle |

### 🔮 Future scope
- Section "Writing" avec articles PM
- Intégration GitHub API pour projets dynamiques
- Version française pour marché européen
- Analytics (Plausible) pour tracking recruteurs

---

## 5. Solution

### Approche choisie
Site statique Next.js déployé sur Vercel. Une seule page (SPA) avec sections en scroll, animations Framer Motion inspirées du storytelling Apple, design system custom sombre avec dégradés dynamiques.

**Pourquoi Next.js et non HTML statique** : SEO natif via SSG, optimisation images automatique (`next/image`), déploiement Vercel en 1 clic, base réutilisable pour ajouter des features futures.

**Pourquoi une SPA et non multi-pages** : Expérience fluide sans rechargement, transitions entre sections contrôlées, closer de l'expérience Apple produit page.

### User flow principal
1. Le recruteur clique sur le lien (email, LinkedIn, GitHub)
2. Il arrive sur le Hero — nom + titre + phrase d'accroche immédiatement visible
3. Il scrolle — chaque section se révèle avec une animation (fade + slide)
4. Il découvre About → Skills → Experience → Certifications → Projects
5. Il clique sur LinkedIn, GitHub ou Email dans le footer
6. (Optionnel) Il clique sur un projet pour aller sur le repo GitHub

### Design direction — Apple-inspired
- **Palette** : Fond très sombre (#0a0a0a) avec dégradés lumineux (bleu électrique → violet → teal)
- **Typographie** : Display font expressif (ex: Clash Display ou Syne) pour les titres, corps en DM Sans
- **Animations** : Reveal au scroll (Framer Motion `useInView`), parallax subtil sur le hero, hover states élégants sur les cards
- **Layout** : Sections plein-écran avec padding généreux, asymétrie contrôlée, éléments qui "percent" les sections

---

## 6. Contraintes

### Techniques
- Site statique uniquement — pas de base de données en v1
- Performance : Lighthouse score > 90 sur tous les indicateurs
- SEO : meta tags, OG tags, sitemap
- Responsive : mobile-first, parfait sur iPhone et desktop

### Temporelles
- Objectif : déployé avant les premières candidatures actives

### Dépendances
| Dépendance | Criticité | Note |
|---|---|---|
| Photo de profil fournie par Thomas | Haute | À uploader dans `/public` |
| Logos certifications | Moyenne | Via URLs publiques ou `/public` |
| Textes expériences | Haute | Fournis par Thomas ou rédigés avec AGENT:PM |

---

## 7. Risques

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Design trop sombre illisible | Moyenne | Haut | Tester le contrast ratio WCAG AA |
| Animations trop lourdes → Lighthouse bas | Moyenne | Moyen | `will-change`, `lazy load`, réduire sur mobile |
| Contenu générique qui ressemble à tous les autres portfolios | Haute | Haut | Thomas fournit textes personnels avant implémentation |

---

## 8. Questions ouvertes

- [x] Stack confirmée : Next.js + Framer Motion + Tailwind
- [ ] Photo de profil à fournir par Thomas — format recommandé : JPG/WebP, min 800x800px
- [ ] Textes des expériences : Thomas fournit les drafts ou AGENT:PM les génère ?
- [ ] Domaine custom ? (ex: thomas-dupont.com) — optionnel, Vercel fournit un sous-domaine gratuit

---

> **Règle d'or** : Ce site est un produit, pas un CV en ligne.
> Chaque section doit répondre à la question : "Pourquoi Thomas et pas un autre PM ?"
