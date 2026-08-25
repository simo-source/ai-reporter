# The Primary Record

Newsroom autonome : un reporter IA (GPT-5.6 Luna, effort élevé) enquête à partir de documents publics, choisit ses sujets, et publie en anglais **sans t’attendre**. Tu peux intervenir. Tu n’es pas obligatoire.

Le site public s’appelle **The Primary Record**. L’agent n’est pas une personne. Tu restes l’éditeur responsable.

## Autonomie

Par défaut, le desk :

1. se réveille (Automation Cursor quotidienne)
2. ingère un horizon de sources primaires (SEC EDGAR, Federal Register, GAO, CourtListener, UK legislation)
3. décide chaque enquête ouverte (continuer / parker / tuer), pousse jusqu’à deux pistes, et **publie au plus une fois par semaine** (sauf série)
4. ne publie pas un résumé de rapport : il faut un finding (lien entre documents, contradiction, motif dans le temps) ou un avis étiqueté

Un jour sans article est le cas normal. Le journal interne, lui, est obligatoire tous les jours. `main` est la mémoire : chaque run commence par `npm run desk:status` et le journal `latest`.

## Intervenir (optionnel)

Voir [newsroom/INTERVENTION.md](newsroom/INTERVENTION.md).

| Fichier | Effet |
|---|---|
| `newsroom/KILL` | stoppe le run |
| `newsroom/HOLD` | enquête et brouillon, pas de publication |
| `newsroom/killfile.md` | sujets interdits |
| `newsroom/overrides/` | consignes pour le prochain run |

Supprime le fichier pour rendre la main à l’agent.

## Lancer en local

```bash
npm install
npm test
npm run ingest
npm run site:dev
```

Le site lit `newsroom/published/`. Tant que ce dossier est vide, la une dit la vérité : rien n’a encore passé les gates.

## Automation quotidienne

1. Pousser ce repo vers GitHub (les Cloud Agents en ont besoin).
2. Ouvrir Automations dans Cursor.
3. Trigger : tous les jours.
4. Modèle : GPT-5.6 Luna, effort élevé.
5. Prompt : copier [newsroom/DAILY_RUN.md](newsroom/DAILY_RUN.md).
6. Memory on. Checkout de ce repo.

## Protocole 30 jours

Mesurer autre chose que le trafic.

- Semaine 1 : ingest + SCAN, zéro obligation de publier. Vérifier que le desk **abandonne** des pistes.
- Semaine 2 : une enquête `CONTINUE` sur plusieurs jours, preuves dans git.
- Semaine 3 : au plus une pièce publiée, chaque claim cliquable en moins de deux minutes.
- Semaine 4 : postmortem. Si les articles sont des recaps, resserrer la constitution, pas augmenter le volume.

Succès : un finding qu’un éditeur humain soigneux jugerait digne d’un suivi, zéro citation inventée, zéro auteur fictif.

Échec : un flux quotidien de réécritures, ou une accusation nominative à une seule source.

## Ce qui n’est pas activé au jour 1

Email, FOIA, interviews. Quand ce sera le cas : identité IA obligatoire dans chaque message, rien de privé dans git.

## Avertissement

Pas un avis juridique. Publication autonome ⇒ disclosure AI Act visible. La diffamation reste sur l’éditeur humain.
