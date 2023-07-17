const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const upload = multer();

app.post('/send-email', upload.single('qrCode'), (req, res) => {
  // Récupérer les données du formulaire
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const mobile = req.body.mobile;
  const website = req.body.website;
  const company = req.body.company;
  const position = req.body.position;
  const address = req.body.address;
  const postalCode = req.body.postalCode;
  const city = req.body.city;

  // Vérifier si une adresse e-mail est saisie
  if (!email) {
    return res.status(400).json({ error: 'Veuillez saisir une adresse e-mail.' });
  }

  // Créer un transporteur SMTP pour l'envoi d'e-mails
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  // Formatage du contenu du formulaire
  const formContent = `
  First Name: ${firstName}
  Last Name: ${lastName}
  Email: ${email}
  Phone: ${phone}
  Mobile: ${mobile}
  Website: ${website}
  Company: ${company}
  Position: ${position}
  Address: ${address}
  Postal Code: ${postalCode}
  City: ${city}
  `;

  // Options de l'e-mail
  const mailOptions = {
    from: email, // Utilise l'adresse e-mail saisie dans le formulaire comme adresse de l'expéditeur
    to: process.env.RECIPIENT_EMAIL, // Votre adresse e-mail
    subject: 'Ma carte de visite',
    text: formContent,
    attachments: [
      {
        filename: 'qr_code.png',
        content: req.file.buffer,
      },
    ],
  };

  // Envoyer l'e-mail avec la pièce jointe
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail.' });
    }
    console.log('E-mail envoyé :', info.response);
    return res.json({ message: 'E-mail envoyé avec succès.' });
  });
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000.');
});
