<?php
require __DIR__ . '/vendor/autoload.php'; // Path to the Dotenv library autoloader

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Retrieve the value of the reply-to email address from the environment variables
$replyToEmail = $_ENV['REPLY_TO_EMAIL'];

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$recipientEmail = $_POST['recipientEmail'];
$qrCodeImage = $_POST['qrCodeImage'];

// Generate the email
$to = $recipientEmail;
$subject = 'Carte de visite avec QR Code';
$message = "Bonjour,\n\nVoici la carte de visite avec le QR Code:\n\n";
$message .= "Prénom: $firstName\n";
$message .= "Nom: $lastName\n";
$message .= "E-mail: $email\n";
$message .= "Téléphone: $phone\n";

// Attachment: QR code
$filename = 'qr_code.png';
file_put_contents($filename, file_get_contents($qrCodeImage));

// Send the email with the QR code as an attachment
$headers = "From: $email\r\n";
$headers .= "Reply-To: $replyToEmail\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"boundary\"\r\n";

$message = "--boundary\r\n";
$message .= "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n";
$message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$message .= $message."\r\n\r\n";
$message .= "--boundary\r\n";
$message .= "Content-Type: image/png; name=\"$filename\"\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n";
$message .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
$message .= chunk_split(base64_encode(file_get_contents($filename)))."\r\n";
$message .= "--boundary--";

// Send the email
$mailSent = mail($to, $subject, $message, $headers);

// Delete the temporary QR code file
unlink($filename);

if ($mailSent) {
    echo "L'e-mail a été envoyé avec succès !";
} else {
    echo "Une erreur s'est produite lors de l'envoi de l'e-mail.";
}
?>
