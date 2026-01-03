<?php
// Configuration SMTP et Email
// Modifier ces variables selon votre hébergement OVH

// Configuration SMTP
$SMTP_HOST = 'ssl0.ovh.net';      // Serveur SMTP OVH
$SMTP_PORT = 465;                 // Port SMTP (465 pour SSL/TLS, 587 pour STARTTLS)
$SMTP_SECURE = 'ssl';             // 'ssl' ou 'tls'
$SMTP_AUTH = true;                // true si authentification requise

// Identifiants SMTP
$SMTP_USERNAME = 'contact@wealthia.fr';  // Email utilisé pour l'authentification SMTP
$SMTP_PASSWORD = '2v46wd!zU^Qf#I1N';         // Mot de passe d'application (pas le mot de passe du compte)

// Configuration des emails
$EMAIL_FROM = 'contact@wealthia.fr';     // Email de l'expéditeur
$EMAIL_FROM_NAME = 'Wealth IA';         // Nom de l'expéditeur affiché

$EMAIL_TO = 'alt.ri-cok0cpgk@yopmail.com';       // Email de destination (qui reçoit les formulaires)
$EMAIL_TO_NAME = 'Wealth IA';                      // Nom du destinataire
