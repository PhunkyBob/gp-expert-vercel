# Configuration PHPMailer pour OVH

## Étape 1: Installer PHPMailer localement

Exécutez cette commande **en local** sur votre machine:

```bash
composer install
```

Cela créera un dossier `vendor/` avec PHPMailer et toutes ses dépendances.

**Important:** Le dossier `vendor/` ne sera PAS déployé par Next.js. Il faut l'uploader par FTP sur le serveur OVH.

## Étape 2: Configurer le script PHP

Ouvrez `email-config.php` et modifiez les variables suivantes:

```php
// Configuration SMTP
$SMTP_HOST = 'ssl0.ovh.net';                       // Serveur SMTP OVH
$SMTP_PORT = 465;                                  // Port SMTP (465 pour SSL/TLS, 587 pour STARTTLS)
$SMTP_SECURE = 'ssl';                              // 'ssl' ou 'tls'
$SMTP_AUTH = true;                                 // true si authentification requise

// Identifiants SMTP
$SMTP_USERNAME = 'votre-email@votre-domaine.com';  // Email utilisé pour l'authentification SMTP
$SMTP_PASSWORD = 'votre-mot-de-passe-app';         // Mot de passe d'application (pas le mot de passe du compte)

// Configuration des emails
$EMAIL_FROM = 'votre-email@votre-domaine.com';    // Email de l'expéditeur
$EMAIL_FROM_NAME = 'Wealthia Formulaire';          // Nom de l'expéditeur affiché

$EMAIL_TO = 'votre-email@votre-domaine.com';      // Email de destination (qui reçoit les formulaires)
$EMAIL_TO_NAME = 'Wealthia';                       // Nom du destinataire
```

### Trouver vos informations SMTP OVH

1. Connectez-vous à votre manager OVH
2. Allez dans "Web Cloud" → "Domaines" → Sélectionnez votre domaine
3. Allez dans "Emails" → Sélectionnez votre adresse email
4. Cliquez sur l'icône "..." → "Configuration"
5. Vous trouverez les informations SMTP là

**Serveur SMTP OVH selon votre offre:**
- ssl0.ovh.net (SSL/TLS sur port 465) - le plus courant
- ns0.ovh.net (STARTTLS sur port 587)
- smtp.mon-domaine.com (si configuré)

## Étape 3: Mot de passe d'application

Pour l'authentification SMTP OVH, vous devez créer un mot de passe d'application:

1. Dans le manager OVH, allez dans votre email
2. Dans "Gestion de la sécurité", créez un nouveau "Mot de passe d'application"
3. Copiez ce mot de passe (il ne sera plus affiché après)
4. Utilisez-le comme `$mail->Password` dans `send-email.php`

## Étape 4: Déploiement

1. Build le projet Next.js:
   ```bash
   npm run build
   ```

2. Upload sur OVH **via FTP**:
   - Dossier `out/` → `www/` ou le dossier racine de votre hébergement
   - Dossier `vendor/` (créé localement par `composer install`) → à côté de `out/`
   - Fichier `send-email.php` → à la racine de l'hébergement
   - Fichier `composer.json` → à la racine (optionnel, pour référence)

3. Structure finale sur le serveur:
   ```
   /www
     /out              # Fichiers statiques Next.js
     /vendor           # PHPMailer et dépendances (upload via FTP)
     send-email.php    # Script d'envoi d'email
     email-config.php  # Configuration SMTP (à modifier avec vos identifiants)
     composer.json     # Configuration Composer (optionnel)
   ```

**Note:** Ne PAS uploader `vendor/` via le déploiement Next.js/Vercel. Uploader manuellement via FTP uniquement.

## Étape 5: Configuration CORS (si nécessaire)

Si vous rencontrez des erreurs CORS, vous devrez peut-être configurer les headers dans votre hébergement OVH ou utiliser un fichier `.htaccess`.

Testez le formulaire et vérifiez les logs PHP si vous rencontrez des erreurs.
