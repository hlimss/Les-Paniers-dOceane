# 🚀 Guide de Démarrage Rapide

## Installation Express (5 minutes)

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer Notion (10 minutes)

Suivre le guide détaillé dans [NOTION_SETUP.md](./NOTION_SETUP.md)

**Résumé rapide** :
- Créer une intégration Notion → Copier le token
- Créer 2 bases de données (Clients + Commandes)
- Partager les bases avec l'intégration
- Copier les IDs des bases

### 3. Configurer Stripe (5 minutes)

1. Créer un compte sur https://stripe.com
2. Dashboard → Developers → API keys
3. Copier :
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)

### 4. Créer le fichier .env

Créer un fichier `.env` à la racine :

```env
# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle
STRIPE_SECRET_KEY=sk_test_votre_cle
STRIPE_WEBHOOK_SECRET=whsec_votre_secret

# Notion
VITE_NOTION_API_KEY=secret_votre_cle
NOTION_API_KEY=secret_votre_cle
VITE_NOTION_CLIENTS_DB_ID=votre_id_clients
NOTION_CLIENTS_DB_ID=votre_id_clients
VITE_NOTION_ORDERS_DB_ID=votre_id_commandes
NOTION_ORDERS_DB_ID=votre_id_commandes

# Server
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 5. Démarrer l'application

**Option A : Frontend + Backend (recommandé)**
```bash
npm run dev:all
```

**Option B : Frontend uniquement**
```bash
npm run dev
```

**Option C : Backend uniquement**
```bash
npm run dev:server
```

### 6. Tester

1. Ouvrir http://localhost:5173
2. Cliquer sur "Commander mon panier"
3. Remplir le formulaire
4. Tester avec une carte Stripe de test :
   - Numéro : `4242 4242 4242 4242`
   - Date : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres
   - Code postal : n'importe quel code

## ✅ Checklist de Vérification

- [ ] Toutes les dépendances installées (`npm install`)
- [ ] Fichier `.env` créé avec toutes les clés
- [ ] Bases Notion créées et partagées avec l'intégration
- [ ] Serveur backend démarre sans erreur
- [ ] Frontend accessible sur http://localhost:5173
- [ ] Formulaire de commande fonctionne
- [ ] Test de paiement Stripe réussi

## 🐛 Problèmes Courants

### "Cannot find module"
→ Exécuter `npm install`

### "Failed to create client"
→ Vérifier que les bases Notion sont partagées avec l'intégration

### "Stripe error"
→ Vérifier que les clés Stripe sont correctes (mode test)

### Port déjà utilisé
→ Changer le port dans `.env` ou arrêter l'application qui utilise le port

## 📚 Documentation Complète

- [README.md](./README.md) - Documentation complète
- [NOTION_SETUP.md](./NOTION_SETUP.md) - Guide détaillé Notion

---

**Prêt à démarrer ?** 🎉
