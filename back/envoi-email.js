// Importer les modules nécessaires
const express = require('express');
const nodemailer = require('nodemailer');

// Configurer le serveur Express
const app = express();
app.use(express.json());

// Définir une route pour l'envoi d'e-mail
app.post('/send-email', async (req, res) => {
  try {
    // Récupérer les données du formulaire
    const { firstName, lastName, email, message } = req.body;

    // Créer un transporteur de messagerie
    const transporter = nodemailer.createTransport({
      // Configurer le transporteur de messagerie (SMTP, Gmail, etc.)
    });

    // Définir les options de l'e-mail
    const mailOptions = {
      from: 'your-email@example.com', // Votre adresse e-mail
      to: 'recipient@example.com', // Adresse e-mail du destinataire
      subject: 'Nouveau message de contact',
      text: `Nom: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage: ${message}`
    };

    // Envoyer l'e-mail
    await transporter.sendMail(mailOptions);

    // Répondre avec un statut de réussite
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    // Répondre avec un statut d'erreur
    res.sendStatus(500);
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Le serveur est en écoute sur le port 3000');
});
