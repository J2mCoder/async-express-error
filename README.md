# async-express-error

## Description

`async-express-error` est une bibliothèque utilitaire pour Express.js qui permet de gérer les erreurs de manière centralisée dans les fonctions asynchrones. Elle enveloppe les fonctions asynchrones pour capturer et transmettre les erreurs à la fonction `next` d'Express, simplifiant ainsi la gestion des erreurs dans les routes Express.

## Installation

Vous pouvez installer `async-express-error` via npm :

```bash
npm install async-express-error
```

## Utilisation

Voici un exemple d'utilisation de `async-express-error` dans une application Express :

```javascript
const express = require("express")
const asyncHandler = require("async-express-error")

const app = express()

// Exemple d'une route utilisant async-express-error
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

- **Paramètres** :
  - `fn` : La fonction asynchrone que vous souhaitez envelopper.
- **Retourne** :
  - Une fonction enveloppée qui gère les erreurs et les transmet à la fonction `next` d'Express.

## Licence

Ce projet est sous licence ISC.

## Contributions

Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez soumettre une pull request ou ouvrir une issue sur GitHub.
