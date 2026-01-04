# Anti-Spam Protection

Le formulaire est protégé contre le spam par deux mécanismes:

## 1. Honeypot (Champ piège)

Un champ invisible est ajouté au formulaire:
- **Fonctionnement**: Les robots de spam remplissent tous les champs, y compris le champ honeypot caché. Les humains ne le voient pas et ne le remplissent pas.
- **Si le champ est rempli**: La demande est bloquée silencieusement (le bot pense que c'est un succès, mais aucun email n'est envoyé).
- **Implémentation**:
  - Champ caché dans `CTASection.tsx` avec `className="hidden"` et `tabIndex={-1}`
  - Vérification dans `send-email.php`: si `honeypot` est non-vide, retourne succès sans envoyer d'email

## 2. Rate Limiting (Limitation de fréquence)

Limitation du nombre d'envois par adresse IP:
- **Limite actuelle**: 3 soumissions par heure par IP
- **Fonctionnement**: Chaque soumission est enregistrée avec l'IP et le timestamp dans `rate_limit.json`
- **Si la limite est dépassée**: Retourne une erreur 429 "Trop de tentatives"
- **Nettoyage automatique**: Les entrées de plus d'une heure sont supprimées automatiquement

## Configuration

Pour modifier les limites:

### Rate Limiting

Dans `send-email.php`, modifiez:

```php
if (!checkRateLimit($clientIP, 3, 3600)) {
    //                              ^ nombre max de soumissions
    //                                    ^ période en secondes (3600 = 1 heure)
```

Valeurs recommandées:
- **Strict**: 2/heure
- **Modéré**: 3/heure (actuel)
- **Souple**: 5/heure

### Honeypot

Le honeypot est configuré dans `CTASection.tsx`:

```tsx
<FormField
  name="honeypot"
  render={({ field }) => (
    <FormItem className="hidden">
      <FormControl>
        <Input {...field} tabIndex={-1} autoComplete="off" />
      </FormControl>
    </FormItem>
  )}
/>
```

## Fichiers

- `components/sections/CTASection.tsx` - Contient le champ honeypot caché
- `lib/validations.ts` - Schema Zod avec le champ honeypot optionnel
- `send-email.php` - Vérification honeypot + rate limiting
- `.gitignore` - `rate_limit.json` ignoré du git
- `rate_limit.json` - Créé automatiquement sur le serveur (ne pas uploader)

## Sécurité supplémentaire (optionnelle)

Si vous avez besoin de plus de protection, vous pouvez ajouter:
- **Google reCAPTCHA** ou **hCaptcha** (nécessite une API key)
- **Filtrage par liste noire** d'adresses email
- **Vérification DNS** de l'expéditeur (SPF/DKIM côté serveur mail)
