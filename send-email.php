<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit();
}

// Load Composer autoloader
require_once __DIR__ . '/vendor/autoload.php';

// Load email configuration
require_once __DIR__ . '/email-config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        throw new Exception('Données invalides');
    }

    // Validate required fields
    $required = ['name', 'profession', 'email', 'advisorsCount', 'clientsCount'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new Exception("Le champ $field est requis");
        }
    }

    // Create PHPMailer instance
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';

    // Configuration SMTP (chargée depuis email-config.php)
    $mail->isSMTP();
    $mail->Host = $SMTP_HOST;
    $mail->Port = $SMTP_PORT;
    $mail->SMTPSecure = $SMTP_SECURE === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAuth = $SMTP_AUTH;
    $mail->Username = $SMTP_USERNAME;
    $mail->Password = $SMTP_PASSWORD;

    // Email de destination (chargé depuis email-config.php)
    $mail->setFrom($EMAIL_FROM, $EMAIL_FROM_NAME);
    $mail->addAddress($EMAIL_TO, $EMAIL_TO_NAME);

    // Contenu de l'email
    $mail->isHTML(true);
    $mail->Subject = 'Nouvelle inscription waitlist - Wealth IA';

    // Formatage des données
    $professionDisplay = [
        'CGP' => 'CGP / Family Office',
        'Expert-comptable' => 'Expert-comptable',
        'Avocat' => 'Avocat Fiscaliste',
        'Banquier' => 'Banquier Privé',
        'Autre' => 'Autre'
    ];

    $profession = isset($professionDisplay[$data['profession']])
        ? $professionDisplay[$data['profession']]
        : $data['profession'];

    $painPoint = !empty($data['painPoint']) ? htmlspecialchars($data['painPoint']) : 'Non renseigné';

    $mail->Body = "
    <h2>Nouvelle inscription sur la waitlist</h2>
    <table style='border-collapse: collapse; width: 100%;'>
        <tr style='border-bottom: 1px solid #ddd;'>
            <td style='padding: 10px; font-weight: bold;'>Nom / Cabinet</td>
            <td style='padding: 10px;'>" . htmlspecialchars($data['name']) . "</td>
        </tr>
        <tr style='border-bottom: 1px solid #ddd;'>
            <td style='padding: 10px; font-weight: bold;'>Profession</td>
            <td style='padding: 10px;'>" . htmlspecialchars($profession) . "</td>
        </tr>
        <tr style='border-bottom: 1px solid #ddd;'>
            <td style='padding: 10px; font-weight: bold;'>Email</td>
            <td style='padding: 10px;'><a href='mailto:" . htmlspecialchars($data['email']) . "'>" . htmlspecialchars($data['email']) . "</a></td>
        </tr>
        <tr style='border-bottom: 1px solid #ddd;'>
            <td style='padding: 10px; font-weight: bold;'>Collaborateurs</td>
            <td style='padding: 10px;'>" . htmlspecialchars($data['advisorsCount']) . "</td>
        </tr>
        <tr style='border-bottom: 1px solid #ddd;'>
            <td style='padding: 10px; font-weight: bold;'>Clients</td>
            <td style='padding: 10px;'>" . htmlspecialchars($data['clientsCount']) . "</td>
        </tr>
        <tr>
            <td style='padding: 10px; font-weight: bold; vertical-align: top;'>Points de frustration</td>
            <td style='padding: 10px;'>" . $painPoint . "</td>
        </tr>
    </table>
    <hr style='margin: 20px 0;'>
    <p style='color: #666; font-size: 12px;'>Email envoyé automatiquement depuis le formulaire Wealthia</p>
    ";

    $mail->AltBody = "Nouvelle inscription sur la waitlist Wealth IA\n\n" .
        "Nom: " . $data['name'] . "\n" .
        "Profession: " . $profession . "\n" .
        "Email: " . $data['email'] . "\n" .
        "Collaborateurs: " . $data['advisorsCount'] . "\n" .
        "Clients: " . $data['clientsCount'] . "\n" .
        "Points de frustration: " . $painPoint;

    // Send email
    $mail->send();

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Inscription validée']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erreur lors de l\'envoi',
        'error' => $mail->ErrorInfo ?? $e->getMessage()
    ]);
}
