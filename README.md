# 🌿 CircuitVert

**CircuitVert** est une application mobile connectée à une API Symfony.  
Elle met en relation les **utilisateurs** et les **professionnels agricoles** afin de favoriser les circuits courts et la consommation locale.

---

## 🚀 Fonctionnalités principales

### 👤 Utilisateurs
- Inscription et connexion via **API REST (JWT)**
- Gestion du profil (affichage, modification, suppression)
- Rôles :
  - `ROLE_USER` → utilisateur classique
  - `ROLE_PRO` → professionnel avec fiche d’exploitation
- Ajout de fermes en favoris

### 🏡 Professionnels
- Création et gestion d’une fiche **ProfessionalInfo** :
  - Nom de la ferme
  - Description
  - Moyens de paiement
  - Galerie de photos
- Accès sécurisé selon le rôle (`ROLE_PRO`)

---

## 🧩 Architecture du projet

### Backend — Symfony 7
- **ORM :** Doctrine  
- **Authentification :** LexikJWTAuthenticationBundle  
- **Base de données :** MySQL  
- **Endpoints clés :**
  - `/api/register` → inscription
  - `/api/login_check` → connexion JWT
  - `/api/user/me` → profil utilisateur (GET/PUT/DELETE)
  - `/api/professional_info` → CRUD fiche pro

### Frontend — React Native (Expo)
- **Langage :** TypeScript  
- **Navigation :** React Navigation  
- **Stockage :** AsyncStorage (token JWT)  
- **Appels API :** via un utilitaire `apiFetch`
- **Écrans :**
  - Login / Register / Profil
  - (à venir) Fermes et favoris

---

## ⚙️ Installation

### Backend (Symfony)
```bash
git clone https://github.com/toncompte/CircuitVert.git
cd backend
composer install
cp .env .env.local
php bin/console lexik:jwt:generate-keypair
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
symfony server:start
```

### Frontend 
```bash
cd frontend
npm install
npx expo start