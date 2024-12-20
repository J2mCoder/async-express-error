# async-handler-js

## Description

`async-handler-js` est une bibliothèque utilitaire pour Express.js qui permet de gérer les erreurs de manière centralisée dans les fonctions asynchrones. Elle enveloppe les fonctions asynchrones pour capturer et transmettre les erreurs à la fonction `next` d'Express, simplifiant ainsi la gestion des erreurs dans les routes Express.

## Installation

Vous pouvez installer `async-handler-js` via npm :

```bash
npm install async-handler-js
```

## Utilisation

Voici un exemple d'utilisation de `async-handler-js` dans une application Express :

```javascript
const express = require("express")
const asyncHandler = require("async-handler-js")

const app = express()

// Exemple d'une route utilisant async-handler-js
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

## Futures améliorations

Voici quelques idées pour les futures améliorations de `async-handler-js` :

- **Support TypeScript** : Ajouter des définitions TypeScript pour une meilleure intégration avec les projets TypeScript.
- **Options de configuration** : Permettre la personnalisation du comportement de gestion des erreurs via des options de configuration.
- **Documentation améliorée** : Ajouter plus d'exemples et de cas d'utilisation dans la documentation.
- **Tests unitaires** : Augmenter la couverture des tests unitaires pour garantir la fiabilité de la bibliothèque.
- **Compatibilité avec d'autres frameworks** : Étendre la compatibilité à d'autres frameworks web en plus d'Express.js.
