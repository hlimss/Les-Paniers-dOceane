# 📚 Guide de Configuration Notion

Ce guide vous aidera à configurer correctement vos bases de données Notion pour Les Paniers d'Océane.

## 🔧 Étape 1 : Créer une Intégration Notion

1. Aller sur https://www.notion.so/my-integrations
2. Cliquer sur **"+ New integration"**
3. Remplir les informations :
   - **Name** : `Les Paniers d'Océane`
   - **Logo** : (optionnel) Uploader un logo
   - **Associated workspace** : Sélectionner votre espace de travail
4. Cliquer sur **"Submit"**
5. **Copier le "Internal Integration Token"** (commence par `secret_`)
   - C'est votre `NOTION_API_KEY` et `VITE_NOTION_API_KEY`

## 📊 Étape 2 : Créer la Base de Données Clients

### Créer la base

1. Dans Notion, créer une nouvelle page
2. Taper `/database` et sélectionner **"Table - Inline"**
3. Nommer la base : **"Clients"**

### Ajouter les propriétés

Cliquer sur **"+ Add a property"** pour chaque propriété :

| Nom de la propriété | Type | Options |
|---------------------|------|---------|
| **Nom** | Title | (par défaut) |
| **Email** | Email | - |
| **Téléphone** | Phone | - |
| **Adresse** | Text | - |
| **Type de panier** | Select | Options : `Végétarien`, `Diététique`, `Sportif` |
| **Fréquence** | Select | Options : `Unique`, `Hebdomadaire`, `Bimensuelle` |
| **Allergies** | Text | - |
| **Date d'inscription** | Created time | (par défaut) |
| **Statut** | Select | Options : `Actif`, `Inactif` |

### Partager avec l'intégration

1. Cliquer sur **"..."** en haut à droite de la base
2. **"Add connections"**
3. Sélectionner **"Les Paniers d'Océane"** (votre intégration)
4. **Copier l'ID de la base** :
   - Ouvrir la base dans le navigateur
   - L'URL ressemble à : `https://notion.so/abc123def456?v=...`
   - L'ID est la partie entre `notion.so/` et `?v=`
   - Exemple : `abc123def456`
   - C'est votre `NOTION_CLIENTS_DB_ID` et `VITE_NOTION_CLIENTS_DB_ID`

## 📦 Étape 3 : Créer la Base de Données Commandes

### Créer la base

1. Créer une nouvelle page dans Notion
2. Taper `/database` et sélectionner **"Table - Inline"**
3. Nommer la base : **"Commandes"**

### Ajouter les propriétés

| Nom de la propriété | Type | Options |
|---------------------|------|---------|
| **N° Commande** | Title | (par défaut) |
| **Client** | Relation | Relation vers la base **"Clients"** |
| **Date** | Date | - |
| **Type panier** | Text | - |
| **Quantité** | Number | Format : Number |
| **Montant** | Number | Format : Number |
| **Statut** | Select | Options : `En attente`, `Confirmée`, `Livrée` |
| **Paiement confirmé** | Checkbox | - |
| **Stripe Payment ID** | Text | - |

### Partager avec l'intégration

1. Cliquer sur **"..."** en haut à droite
2. **"Add connections"**
3. Sélectionner **"Les Paniers d'Océane"**
4. **Copier l'ID de la base** → `NOTION_ORDERS_DB_ID` et `VITE_NOTION_ORDERS_DB_ID`

## 🍽️ Étape 4 : Créer la Base de Données Recettes (Optionnel)

Cette base est optionnelle mais peut être utile pour un futur blog ou admin.

### Créer la base

1. Créer une nouvelle page
2. Taper `/database` et sélectionner **"Table - Inline"**
3. Nommer : **"Recettes"**

### Ajouter les propriétés

| Nom de la propriété | Type | Options |
|---------------------|------|---------|
| **Nom recette** | Title | - |
| **Catégorie** | Select | Options : `Végétarienne`, `Diététique`, `Sportive` |
| **Ingrédients** | Multi-select | - |
| **Temps de préparation** | Number | Format : Number (en minutes) |
| **Coût matière** | Number | Format : Number |
| **Photo** | Files | - |

### Partager avec l'intégration

1. Partager avec l'intégration
2. **Copier l'ID** → `NOTION_RECIPES_DB_ID` et `VITE_NOTION_RECIPES_DB_ID`

## ✅ Vérification

Une fois toutes les bases créées et partagées :

1. Vérifier que toutes les propriétés ont les **exactement les mêmes noms** que dans ce guide
2. Vérifier que les options Select correspondent exactement
3. Vérifier que les bases sont bien partagées avec l'intégration
4. Copier tous les IDs dans votre fichier `.env`

## 🐛 Dépannage

### Erreur "Object not found"
- Vérifier que la base est bien partagée avec l'intégration
- Vérifier que l'ID de la base est correct

### Erreur "Property not found"
- Vérifier que le nom de la propriété correspond **exactement** (majuscules/minuscules, accents)
- Vérifier que le type de propriété est correct

### Erreur "Invalid select option"
- Vérifier que les options Select correspondent exactement aux valeurs dans le code
- Les valeurs sont sensibles à la casse et aux accents

## 📝 Exemple de Configuration .env

```env
# Notion API
VITE_NOTION_API_KEY=secret_abc123def456...
NOTION_API_KEY=secret_abc123def456...

# Database IDs
VITE_NOTION_CLIENTS_DB_ID=abc123def456...
NOTION_CLIENTS_DB_ID=abc123def456...

VITE_NOTION_ORDERS_DB_ID=xyz789ghi012...
NOTION_ORDERS_DB_ID=xyz789ghi012...

VITE_NOTION_RECIPES_DB_ID=def456jkl789... (optionnel)
NOTION_RECIPES_DB_ID=def456jkl789... (optionnel)
```

---

**Note** : Les IDs des bases de données sont sensibles. Ne les partagez pas publiquement.
