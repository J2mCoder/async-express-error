# GitHub Actions - Configuration requise

⚠️ **IMPORTANT** : NPM a révoqué tous les "Classic Tokens" en 2024. Vous devez maintenant utiliser des **Granular Access Tokens**.

## Configuration du workflow de publication NPM

### 1. Créer un Granular Access Token sur NPM

1. Se connecter sur [npmjs.com](https://www.npmjs.com/)
2. Cliquer sur votre avatar (en haut à droite) → **Access Tokens**
3. Cliquer sur **Generate New Token** → Sélectionner **Granular Access Token**
4. Configurer le token :
   - **Token name** : `github-actions-async-express-error`
   - **Description** : `Token for GitHub Actions CI/CD`
   - **Expiration** : 90 jours (maximum, mais vous pouvez le renouveler)
   - **Packages and scopes** :
     - Sélectionner **Only select packages**
     - Chercher et sélectionner `async-express-error`
   - **Permissions** :
     - ✅ **Read and Write** (pour pouvoir publier)
5. Cliquer sur **Generate Token**
6. **Copier immédiatement le token** (il commence par `npm_...`)

⚠️ **Le token ne s'affichera qu'une seule fois !** Si vous le perdez, vous devrez en créer un nouveau.

### 2. Ajouter le secret dans GitHub

1. Aller sur le repository GitHub : `https://github.com/J2mCoder/async-express-error`
2. Cliquer sur l'onglet **Settings** (à droite)
3. Dans le menu de gauche : **Secrets and variables** → **Actions**
4. Cliquer sur le bouton vert **New repository secret**
5. Remplir le formulaire :
   - **Name** : `NPM_TOKEN` (doit être exactement ce nom)
   - **Secret** : Coller le token NPM copié à l'étape 1
6. Cliquer sur **Add secret**

✅ Configuration terminée !

### 3. Vérifier que le workflow fonctionne

Vous avez déjà poussé le tag `v2.0.0`. Pour déclencher la publication :

**Option A : Relancer le workflow existant**
1. Aller sur l'onglet **Actions** du repo
2. Cliquer sur le workflow **"Publish to NPM"** 
3. Trouver l'exécution qui a échoué (ou qui est en attente)
4. Cliquer sur **Re-run jobs**

**Option B : Supprimer et recréer le tag**
```bash
# Supprimer le tag local et distant
git tag -d v2.0.0
git push origin :refs/tags/v2.0.0

# Recréer et repousser (déclenchera le workflow)
git tag v2.0.0
git push origin v2.0.0
```

### 4. Comment publier les futures versions

```bash
# 1. Mettre à jour la version (crée automatiquement un tag)
npm version patch  # ou minor, ou major

# 2. Pousser les changements et le tag
git push origin main --tags

# 3. GitHub Actions publiera automatiquement sur npm !
```

### 5. Surveiller la publication

1. Aller sur l'onglet **Actions** de votre repo GitHub
2. Le workflow **"Publish to NPM"** doit être vert ✅
3. Vérifier sur [npmjs.com/package/async-express-error](https://www.npmjs.com/package/async-express-error)

---

## Résolution des problèmes

### "Classic tokens have been revoked"
Si vous voyez ce message, c'est que vous essayez d'utiliser un ancien token. Créez un **Granular Access Token** à la place.

### "404 Not Found - PUT"
Le package n'existe peut-être pas encore sur npm. Pour la première publication :
```bash
# Publication manuelle initiale (une seule fois)
npm publish --access=public
```

### Le workflow échoue avec "NPM_TOKEN not found"
Vérifiez que :
- Le secret s'appelle bien `NPM_TOKEN` (pas `npm_token` ou `NPM-TOKEN`)
- Le secret est bien dans **Repository secrets** (pas Environment secrets)

---

## Vérification manuelle (optionnel)

Si vous voulez tester la publication localement :

```bash
# Simuler la publication (dry-run)
npm publish --dry-run

# Vérifier les fichiers qui seront publiés
npm pack --dry-run
```
