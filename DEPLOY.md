# 🚀 Déploiement sur GitHub Pages

## Configuration effectuée

1. **Base path configuré** dans `vite.config.ts` : `/Les-Paniers-dOceane/`
2. **Router configuré** dans `src/App.tsx` avec le basename
3. **Workflow GitHub Actions** créé dans `.github/workflows/deploy.yml`
4. **Fichier 404.html** créé pour le routing React

## Étapes pour activer GitHub Pages

1. **Aller sur GitHub** → Votre repository `Les-Paniers-dOceane`
2. **Settings** → **Pages** (dans le menu de gauche)
3. **Source** : Sélectionner **"GitHub Actions"** (pas "Deploy from a branch")
4. **Sauvegarder**

## Déploiement automatique

Une fois configuré, chaque push sur la branche `main` déclenchera automatiquement :
- Le build du projet
- Le déploiement sur GitHub Pages

Votre site sera accessible à : `https://hlimss.github.io/Les-Paniers-dOceane/`

## Vérification

Après le premier déploiement (quelques minutes), vous pouvez :
1. Vérifier l'onglet **Actions** sur GitHub pour voir le statut du déploiement
2. Visiter votre URL GitHub Pages
3. Si la page est blanche, vérifier la console du navigateur (F12) pour voir les erreurs

## Note importante

Le site utilise le base path `/Les-Paniers-dOceane/` donc toutes les URLs seront :
- Accueil : `https://hlimss.github.io/Les-Paniers-dOceane/`
- Commande : `https://hlimss.github.io/Les-Paniers-dOceane/commander`
- Merci : `https://hlimss.github.io/Les-Paniers-dOceane/merci`
