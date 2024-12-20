# async-handler

## Description

`async-handler` est une bibliothèque utilitaire pour Express.js qui permet de gérer les erreurs de manière centralisée dans les fonctions asynchrones. Elle enveloppe les fonctions asynchrones pour capturer et transmettre les erreurs à la fonction `next` d'Express, simplifiant ainsi la gestion des erreurs dans les routes Express.

## Installation

Vous pouvez installer `async-handler` via npm :

```bash
npm install async-handler
```

## Utilisation

Voici un exemple d'utilisation de `async-handler` dans une application Express :

```javascript
const express = require("express")
const asyncHandler = require("async-handler")

const app = express()

// Exemple d'une route utilisant async-handler
app.get(
  "/example",
  asyncHandler(async (req, res, next) => {
    // Votre logique asynchrone ici
    const data = await fetchData()
    res.send(data)
  })
)

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err) // Log de l'erreur pour le développement
  res.status(500).send("Erreur serveur")
})

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000")
})
```

## API

### `asyncHandler(fn)`

- `fn` : La fonction asynchrone que vous souhaitez envelopper.
- **Retourne** : Une fonction enveloppée qui gère les erreurs.

## Licence

Ce projet est sous licence ISC.
