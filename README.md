# async-express-error

[![npm version](https://badge.fury.io/js/async-express-error.svg)](https://www.npmjs.com/package/async-express-error)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

`async-express-error` est une bibliothèque utilitaire pour Express.js qui permet de gérer les erreurs de manière centralisée dans les fonctions asynchrones. Elle enveloppe les fonctions asynchrones pour capturer et transmettre automatiquement les erreurs au middleware `next()` d'Express, simplifiant ainsi la gestion des erreurs dans vos routes.

✨ **Nouveau dans la v2.0.0** : Support TypeScript complet avec types génériques !

## Fonctionnalités

- 🎯 **Gestion automatique des erreurs** - Plus besoin de try/catch dans chaque route
- 🔷 **TypeScript support complet** - Types génériques pour une inférence de type optimale
- 🧪 **100% testé** - Suite de tests complète avec Jest
- 📦 **Léger** - Zéro dépendance runtime
- ⚡ **Compatible** - Fonctionne avec Express 4 et 5

## Installation

```bash
npm install async-express-error
```

## Utilisation

### JavaScript

```javascript
const express = require("express");
const asyncHandler = require("async-express-error");

const app = express();

// Exemple d'une route utilisant async-express-error
app.get(
  "/users/:id",
  asyncHandler(async (req, res, next) => {
    const user = await getUserById(req.params.id);
    res.json(user);
  })
);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(3000);
```

### TypeScript (Recommandé)

```typescript
import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "async-express-error";

const app = express();

// Avec types génériques pour une meilleure sécurité de type
interface UserParams {
  id: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

app.get(
  "/users/:id",
  asyncHandler<UserParams, User>(async (req, res) => {
    // req.params.id est typé comme string
    const user = await getUserById(req.params.id);
    // res.json attend un objet de type User
    res.json(user);
  })
);

// Middleware de gestion des erreurs typé
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});
```

### Exemples avancés

#### Avec body et query typés

```typescript
import asyncHandler from "async-express-error";

interface CreateUserBody {
  name: string;
  email: string;
}

interface SearchQuery {
  q: string;
  limit?: string;
}

interface UserListResponse {
  users: User[];
  total: number;
}

app.post(
  "/users",
  asyncHandler<Record<string, never>, User, CreateUserBody>(async (req, res) => {
    // req.body est typé comme CreateUserBody
    const { name, email } = req.body;
    const newUser = await createUser({ name, email });
    res.status(201).json(newUser);
  })
);

app.get(
  "/search",
  asyncHandler<Record<string, never>, UserListResponse, never, SearchQuery>(
    async (req, res) => {
      // req.query est typé comme SearchQuery
      const { q, limit } = req.query;
      const users = await searchUsers(q, parseInt(limit || "10"));
      res.json({ users, total: users.length });
    }
  )
);
```

#### Avec plusieurs middlewares

```typescript
const validateUser = asyncHandler(async (req, res, next) => {
  const user = await getUserByToken(req.headers.authorization);
  req.user = user;
  next();
});

app.get(
  "/protected",
  validateUser,
  asyncHandler(async (req, res) => {
    res.json({ message: "Accès autorisé", user: req.user });
  })
);
```

## API

### `asyncHandler(fn)`

Enveloppe une fonction asynchrone Express pour capturer automatiquement les erreurs.

#### Paramètres de type générique

- `P` - Type des paramètres de route (`req.params`)
- `ResBody` - Type du corps de réponse (`res.json()`)
- `ReqBody` - Type du corps de requête (`req.body`)
- `ReqQuery` - Type des paramètres de requête (`req.query`)

#### Paramètres

- `fn` : `AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>` - La fonction asynchrone à envelopper

#### Retourne

Une fonction middleware Express qui gère automatiquement les erreurs.

## Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Développement local

```bash
# Installation des dépendances
npm install

# Compilation TypeScript
npm run build

# Lancer les tests
npm test

# Lancer les tests en mode watch
npm run test:watch

# Linter
npm run lint

# Formater le code
npm run format
```

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Changelog

### 2.0.0

- ✨ Support TypeScript complet avec types génériques
- 🧪 Suite de tests Jest complète
- 🔧 Configuration ESLint + Prettier
- 📦 Exports améliorés pour CommonJS et ESM
- 📝 Documentation TypeScript améliorée

### 1.0.6

- Version initiale avec support JavaScript
