# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

## [2.0.0] - 2024-02-01

### ⚠️ Breaking Changes
- Migration complète vers TypeScript
- Le fichier `index.js` est remplacé par `dist/index.js` (compilation TypeScript)

### ✨ Nouvelles fonctionnalités
- Support TypeScript complet avec types Express
- Types génériques pour `Request` et `Response`
- Compilation TypeScript stricte activée

### 🧪 Tests
- Suite de tests Jest complète avec 11 tests
- Couverture de tous les cas d'utilisation
- Tests automatisés via GitHub Actions

### 🔧 Tooling
- ESLint configuré avec règles TypeScript strictes
- Prettier pour le formatage automatique du code
- Configuration EditorConfig pour la cohérence IDE
- Scripts npm automatisés (build, test, lint, format)

### 📦 Package
- Métadonnées npm complètes (engines, exports, keywords)
- Peer dependencies pour Express
- Publication automatique via GitHub Actions

### 📝 Documentation
- README.md avec exemples TypeScript complets
- LICENSE MIT officiel
- Ce fichier CHANGELOG

## [1.0.6] - 2024-02-01

### 🎉 Version initiale
- Support JavaScript uniquement
- Fonction `asyncHandler` de base pour Express
- Gestion automatique des erreurs dans les fonctions asynchrones
