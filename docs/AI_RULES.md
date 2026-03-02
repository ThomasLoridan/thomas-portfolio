# AI_RULES.md — Règles non-négociables

> Contrat de qualité du projet. S'applique à chaque ligne de code, sans exception.
> Un staff engineer doit pouvoir approuver chaque livraison.

---

## 0. Règle méta

Ces règles ne sont pas des suggestions. En cas de conflit avec une demande utilisateur, signaler le conflit **avant** d'agir. Ne jamais contourner silencieusement.

---

## 1. Avant de coder

- [ ] Lire `PRD.md` — problème et scope v1
- [ ] Lire `ARCHITECTURE.md` — structure et couches
- [ ] Lire `PLAN.md` — étape active uniquement
- [ ] Lire `tasks/lessons.md` — ne pas répéter les erreurs

**Une étape à la fois.** Ne pas anticiper l'étape suivante.
**Plan avant code.** `tasks/todo.md` rempli et validé avant d'implémenter.

---

## 2. Qualité du code

### Complétude
- Jamais de code partiel présenté comme complet
- Tous les imports présents en haut de fichier
- Zéro `TODO`, `FIXME`, `pass`, `// implement me` sans code qui suit
- Si une partie n'est pas faisable : le dire explicitement

### Typage strict
**TypeScript** : `strict: true`, pas de `any`, pas de `as unknown as X`
**Python** : type hints sur toutes les fonctions, pas de `dict` sans type, pas de `Any`

### Gestion des erreurs
- Chaque appel réseau, accès fichier, opération DB : try/catch ou handler
- Jamais de `except: pass` ou `.catch(() => {})`
- Messages d'erreur avec contexte + valeur problématique

### Logging
```python
# ✅ Correct
logger.error("Failed to fetch data", extra={"id": id, "error": str(e)})
# ❌ Incorrect
print("error")
```

### Sécurité
- Jamais de secret dans le code (même en commentaire)
- Jamais de SQL par concaténation de strings
- Toutes les entrées utilisateur validées avant traitement

---

## 3. Architecture

### Backend
| ❌ Interdit | ✅ Correct |
|---|---|
| Logique métier dans un router | Déplacer dans un service |
| Requête DB dans un service | Déplacer dans un repository |
| Logique dans un model SQLAlchemy | Déplacer dans un service |

### Frontend
| ❌ Interdit | ✅ Correct |
|---|---|
| `fetch()` dans un composant | Wrapper dans `/services` |
| State complexe dans une page | Extraire dans un hook |
| Types dupliqués | Centraliser dans `/types` |

### Règle des 200/40
- Fichier > 200 lignes → **refactoriser obligatoirement**
- Fonction > 40 lignes → **découper obligatoirement**

---

## 4. Tests

**Ce qui doit être testé** : logique métier services, edge cases PRD, happy paths endpoints, hooks avec logique.

```python
# Nommage descriptif
def test_should_return_empty_list_when_no_data_found(): ...
```

```typescript
it('should return filtered items when status is active', () => { ... })
```

---

## 5. Git

Chaque livraison inclut :
- Message Conventional Commits prêt à copier
- Entrée dans `CHANGELOG.md`
- `tasks/todo.md` mis à jour

```
<type>(<scope>): <description au présent>

<body : pourquoi, pas ce que ça fait>
```

Types : `feat` · `fix` · `refactor` · `test` · `docs` · `chore` · `perf`

---

## 6. Documentation

- Décision non-triviale → `docs/DECISIONS.md`
- Déviation vs `ARCHITECTURE.md` → `docs/DECISIONS.md`
- Nouvelle variable d'env → `.env.example` mis à jour
- Commentaires inline : expliquer le POURQUOI, jamais le QUOI

---

## 7. Checklist de livraison

**Code**
- [ ] Tous les imports présents
- [ ] Typage strict complet
- [ ] Gestion d'erreurs sur tous les points de défaillance
- [ ] Zéro `TODO` ou code commenté dans la livraison
- [ ] Fichiers < 200 lignes, fonctions < 40 lignes

**Architecture**
- [ ] Séparation des couches respectée
- [ ] Structure conforme à `ARCHITECTURE.md`

**Tests**
- [ ] Tests écrits pour la logique métier nouvelle
- [ ] Tests passent sans erreur

**Git**
- [ ] Commit Conventional Commits fourni
- [ ] `CHANGELOG.md` mis à jour
- [ ] `tasks/todo.md` mis à jour
- [ ] `.env.example` mis à jour si nouvelle variable

**Vérification finale**
- [ ] *"Un staff engineer approuverait-il ce code ?"*

---

> Il vaut mieux livrer moins et bien que livrer vite et mal.
