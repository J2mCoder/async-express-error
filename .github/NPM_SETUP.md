# GitHub Actions - Configuration requise

## Configuration du workflow de publication NPM

### 1. Créer un token NPM

1. Se connecter sur [npmjs.com](https://www.npmjs.com/)
2. Aller dans **Access Tokens** > **Generate New Token**
3. Créer un token **Granular Access Token** ou **Classic Token** (automation)
4. Copier le token

### 2. Ajouter le secret dans GitHub

1. Aller sur le repository GitHub : `https://github.com/J2mCoder/async-express-error`
2. Cliquer sur **Settings** > **Secrets and variables** > **Actions**
3. Cliquer sur **New repository secret**
4. Nom : `NPM_TOKEN`
5. Value : Coller le token NPM copié
6. Cliquer sur **Add secret**

### 3. Activer les workflows

Les workflows sont déjà configurés dans `.github/workflows/` :

- **ci.yml** : Exécute les tests sur chaque push/PR (Node.js 18, 20, 22)
- **publish.yml** : Publie automatiquement sur npm quand un tag `v*` est poussé

### 4. Comment publier une nouvelle version

```bash
# 1. Mettre à jour la version dans package.json
npm version patch  # ou minor, ou major

# 2. Le tag est créé automatiquement, pousser tout
git push origin main --tags

# 3. GitHub Actions publiera automatiquement sur npm !
```

### 5. Protection de la branche main (Recommandé)

Dans GitHub Settings > Branches :
- Activer "Require a pull request before merging"
- Activer "Require status checks to pass"
- Sélectionner le check "test (20.x)"

---

## Vérification manuelle (optionnel)

Si vous voulez tester la publication localement :

```bash
# Simuler la publication (dry-run)
npm publish --dry-run

# Vérifier les fichiers qui seront publiés
npm pack --dry-run
```
