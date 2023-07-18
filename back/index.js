require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour analyser le corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route pour envoyer l'e-mail
app.post('/send-email', (req, res) => {
  const { firstName, lastName, email, phone, mobile, website, company, position, address, postalCode, city } = req.body;

  // Configuration du transporteur de messagerie
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // Contenu de l'e-mail
  const emailContent = `
    Bonjour,
    
    Voici mon QR code vCard et mes informations de contact :
    
    Nom : ${lastName} ${firstName}
    E-mail : ${email}
    Téléphone : ${phone}
    Mobile : ${mobile}
    Site Web : ${website}
    Entreprise : ${company}
    Poste : ${position}
    Adresse : ${address}
    Code postal : ${postalCode}
    Ville : ${city}
  `;

  // Options de l'e-mail
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: 'Partage de ma carte de visite',
    text: emailContent,
  };

  // Envoi de l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi de l\'e-mail.' });
    } else {
      console.log('E-mail envoyé avec succès:', info.response);
      res.status(200).json({ message: 'E-mail envoyé avec succès.' });
    }
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}.`);
});
