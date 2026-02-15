# 🚀 Déploiement sur Vercel

## Configuration effectuée

1. **Fichier `vercel.json`** créé pour la configuration Vercel
2. **Base path dynamique** : utilise `/` pour Vercel (pas `/Les-Paniers-dOceane/`)
3. **Router configuré** pour fonctionner avec les deux plateformes

## Étapes de déploiement

### 1. Via l'interface Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Cliquez sur "Add New Project"
4. Importez votre repository `Les-Paniers-dOceane`
5. **Configuration importante** :
   - **Framework Preset** : Vite
   - **Root Directory** : `./` (racine)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

6. **Variables d'environnement** (si nécessaire) :
   - `VITE_BASE_PATH` : Laissez vide ou `/` pour Vercel
   - Ajoutez vos autres variables VITE_* si nécessaire

7. Cliquez sur "Deploy"

### 2. Via la CLI Vercel

```bash
npm i -g vercel
vercel
```

## Vérification

Après le déploiement :
1. Votre site sera accessible sur l'URL fournie par Vercel
2. Ouvrez la console du navigateur (F12) pour vérifier les erreurs
3. Si la page est blanche, vérifiez :
   - Les erreurs dans la console
   - Les logs de build dans Vercel
   - Que le dossier `dist` contient bien les fichiers

## Problèmes courants

### Page blanche
- **Cause** : Base path incorrect ou erreurs JavaScript
- **Solution** : Vérifiez que `VITE_BASE_PATH` n'est pas défini (ou est `/`) dans Vercel

### Erreurs 404
- **Cause** : Le routing React ne fonctionne pas
- **Solution** : Le fichier `vercel.json` avec les rewrites devrait résoudre cela

### Assets non chargés
- **Cause** : Chemins incorrects
- **Solution** : Vérifiez que le base path est bien `/` pour Vercel
