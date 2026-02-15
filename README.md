# 🥗 Les Paniers d'Océane – Site Web Premium

Un site web moderne, élégant et chaleureux pour une entreprise de paniers repas hebdomadaires. Style minimaliste haut de gamme avec une esthétique naturelle, saine et organique.

## 🚀 Technologies

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Formulaires**: React Hook Form + Zod
- **Paiement**: Stripe
- **Backend**: Notion API
- **Build Tool**: Vite
- **UI Components**: shadcn/ui

## 📋 Prérequis

- Node.js 18+ et npm
- Compte Stripe (pour les paiements)
- Compte Notion avec API activée
- Bases de données Notion configurées (voir section Configuration Notion)

## 🛠️ Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/hlimss/oc-ane-s-fresh-bites.git
   cd oc-ane-s-fresh-bites
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   
   Créer un fichier `.env` à la racine du projet :
   ```env
   # Frontend
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique_stripe
   VITE_NOTION_API_KEY=secret_votre_cle_api_notion
   VITE_NOTION_CLIENTS_DB_ID=id_de_votre_base_clients
   VITE_NOTION_ORDERS_DB_ID=id_de_votre_base_commandes
   VITE_NOTION_RECIPES_DB_ID=id_de_votre_base_recettes

   # Backend
   STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_stripe
   STRIPE_WEBHOOK_SECRET=whsec_votre_secret_webhook
   NOTION_API_KEY=secret_votre_cle_api_notion
   NOTION_CLIENTS_DB_ID=id_de_votre_base_clients
   NOTION_ORDERS_DB_ID=id_de_votre_base_commandes
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   ```

## 🎨 Configuration Notion

### 1. Créer les bases de données

#### Base Clients
Créer une base de données Notion avec les propriétés suivantes :
- **Nom** (Title)
- **Email** (Email)
- **Téléphone** (Phone)
- **Adresse** (Text)
- **Type de panier** (Select) : Végétarien / Diététique / Sportif
- **Fréquence** (Select) : Unique / Hebdomadaire / Bimensuelle
- **Allergies** (Text)
- **Date d'inscription** (Created time)
- **Statut** (Select) : Actif / Inactif

#### Base Commandes
Créer une base de données Notion avec les propriétés suivantes :
- **N° Commande** (Title)
- **Client** (Relation → Base Clients)
- **Date** (Date)
- **Type panier** (Text)
- **Quantité** (Number)
- **Montant** (Number)
- **Statut** (Select) : En attente / Confirmée / Livrée
- **Paiement confirmé** (Checkbox)
- **Stripe Payment ID** (Text)

### 2. Obtenir les IDs des bases de données

1. Ouvrir la base de données dans Notion
2. Copier l'URL de la page
3. L'ID est la partie entre `https://notion.so/` et `?v=...`
   Exemple : `https://notion.so/abc123def456?v=...` → ID = `abc123def456`

### 3. Créer une intégration Notion

1. Aller sur https://www.notion.so/my-integrations
2. Cliquer sur "New integration"
3. Donner un nom (ex: "Les Paniers d'Océane")
4. Sélectionner l'espace de travail
5. Copier le "Internal Integration Token" (c'est votre `NOTION_API_KEY`)
6. Partager les bases de données avec l'intégration :
   - Ouvrir chaque base de données
   - Cliquer sur "..." en haut à droite
   - "Add connections" → Sélectionner votre intégration

## 💳 Configuration Stripe

1. Créer un compte sur https://stripe.com
2. Obtenir les clés API dans le Dashboard Stripe :
   - **Publishable key** (commence par `pk_test_`) → `VITE_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (commence par `sk_test_`) → `STRIPE_SECRET_KEY`
3. Configurer les webhooks :
   - Dans le Dashboard Stripe → Developers → Webhooks
   - Ajouter un endpoint : `http://localhost:3001/api/webhooks/stripe` (ou votre URL de production)
   - Sélectionner l'événement : `checkout.session.completed`
   - Copier le "Signing secret" → `STRIPE_WEBHOOK_SECRET`

## 🚀 Démarrage

### Développement

**Option 1 : Frontend uniquement (pour tester l'UI)**
```bash
npm run dev
```

**Option 2 : Frontend + Backend (recommandé)**
```bash
npm run dev:all
```

Le frontend sera accessible sur http://localhost:5173
Le backend sera accessible sur http://localhost:3001

### Production

1. **Build du frontend**
   ```bash
   npm run build
   ```

2. **Démarrer le serveur backend**
   ```bash
   npm run dev:server
   ```

## 📁 Structure du projet

```
projectoceanne/
├── src/
│   ├── components/       # Composants React
│   │   ├── ui/          # Composants shadcn/ui
│   │   ├── HeroSection.tsx
│   │   ├── Formulas.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── pages/           # Pages de l'application
│   │   ├── Index.tsx    # Page d'accueil
│   │   ├── Order.tsx    # Page de commande
│   │   └── ThankYou.tsx # Page de confirmation
│   ├── lib/             # Utilitaires
│   │   ├── notion.ts    # Client Notion
│   │   ├── stripe.ts    # Client Stripe
│   │   └── api.ts       # Fonctions API
│   └── App.tsx          # Composant principal
├── server/
│   └── index.js       # Serveur Express (API routes)
├── public/              # Fichiers statiques
└── package.json
```

## 🎨 Design System

### Palette de couleurs
- **Sage Green**: `#9CAF88` (Primary)
- **Cream Beige**: `#F5F1E8` (Secondary)
- **Off White**: `#FEFDFB` (Background)
- **Charcoal**: `#2C2C2C` (Foreground)
- **Terracotta**: `#8B7355` (Accent - couleur terre douce)

### Typographie
- **Headings**: Outfit (weight: 300-500)
- **Body**: Inter (weight: 400)
- **Line height**: 1.6 pour le corps de texte

## 🔒 Sécurité

- Les clés API ne doivent **jamais** être commitées dans Git
- Utiliser des variables d'environnement pour toutes les clés sensibles
- Le fichier `.env` est dans `.gitignore`
- En production, utiliser des clés Stripe en mode `live` (pas `test`)

## 📝 Fonctionnalités

### ✅ Implémentées
- ✅ Page d'accueil avec hero section
- ✅ Section "Comment ça marche"
- ✅ Affichage des formules (Végétarienne, Diététique, Sportive)
- ✅ Section "Pourquoi nous choisir"
- ✅ Témoignages clients
- ✅ Formulaire de commande multi-étapes
- ✅ Intégration Stripe (paiement)
- ✅ Intégration Notion (stockage clients/commandes)
- ✅ Animations Framer Motion
- ✅ Design responsive
- ✅ Page de confirmation

### 🚧 À venir (Bonus)
- [ ] Espace client (login + historique)
- [ ] Page "À propos d'Océane"
- [ ] Blog recettes (CMS Notion)
- [ ] Page B2B pour entreprises
- [ ] Système d'abonnement récurrent automatique
- [ ] Emails automatiques (Resend/SendGrid)

## 🐛 Dépannage

### Erreur "Failed to create client"
- Vérifier que `NOTION_API_KEY` est correct
- Vérifier que la base de données Clients est partagée avec l'intégration Notion
- Vérifier que les propriétés de la base correspondent exactement aux noms dans le code

### Erreur Stripe
- Vérifier que les clés Stripe sont en mode `test` (commencent par `pk_test_` et `sk_test_`)
- Vérifier que le webhook est configuré correctement

### Le serveur backend ne démarre pas
- Vérifier que le port 3001 n'est pas déjà utilisé
- Vérifier que toutes les dépendances sont installées : `npm install`

## 📄 Licence

Ce projet est privé et propriétaire de Les Paniers d'Océane.

## 👥 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Développé avec ❤️ pour Les Paniers d'Océane**
