// Fonction pour générer le QR code
function QRcode() {
  const form = document.getElementById("vcardForm");
  const formData = new FormData(form);

  // Récupérer les valeurs saisies dans le formulaire
  const firstName = formData.get("firstName") || "";
  const lastName = formData.get("lastName") || "";
  const email = formData.get("email") || "";
  const phone = formData.get("phone") || "";
  const mobile = formData.get("mobile") || "";
  const website = formData.get("website") || "";
  const company = formData.get("company") || "";
  const position = formData.get("position") || "";
  const address = formData.get("address") || "";
  const postalCode = formData.get("postalCode") || "";
  const city = formData.get("city") || "";

  // Vérifier si l'adresse e-mail est saisie
  if (!email) {
    // Afficher un message d'erreur ou effectuer une action appropriée
    alert("Veuillez saisir une adresse e-mail.");
    return; // Arrêter l'exécution de la fonction
  }

  // Générer la vCard en utilisant les valeurs saisies
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${company}
TITLE:${position}
ADR:;;${address};${city};${postalCode};
TEL;CELL:${phone}
TEL;CELL:${mobile}
EMAIL:${email}
URL:${website}
END:VCARD`;

  const QR = document.getElementById("qr");
  QR.innerHTML = ""; // Effacer le contenu précédent du QR code

  // Générer le QR code au format PNG
  QRCode.toDataURL(vcard, { type: 'png' }, function (err, qrImageUrl) {
    if (err) {
      console.error(err);
      return;
    }

    // Créer une balise img avec l'URL du QR code
    const qrImage = document.createElement("img");
    qrImage.src = qrImageUrl;
    qrImage.alt = "QR Code";

    // Ajouter l'image du QR code à l'élément QR
    QR.appendChild(qrImage);
  });
}

// Ajouter un gestionnaire d'événement au bouton "GÉNÉRER"
document.getElementById("generateQR").addEventListener("click", (e) => {
  e.preventDefault();
  QRcode();
});

// Importer la bibliothèque QRCode
const QRCode = require('qrcode');

// Fonction pour envoyer l'e-mail
function sendEmail() {
  const form = document.getElementById("vcardForm");
  const formData = new FormData(form);

  // Récupérer les valeurs saisies dans le formulaire
  const firstName = formData.get("firstName") || "";
  const lastName = formData.get("lastName") || "";
  const email = formData.get("email") || "";
  const phone = formData.get("phone") || "";
  const mobile = formData.get("mobile") || "";
  const website = formData.get("website") || "";
  const company = formData.get("company") || "";
  const position = formData.get("position") || "";
  const address = formData.get("address") || "";
  const postalCode = formData.get("postalCode") || "";
  const city = formData.get("city") || "";

  // Vérifier si l'adresse e-mail est saisie
  if (!email) {
    // Afficher un message d'erreur ou effectuer une action appropriée
    alert("Veuillez saisir une adresse e-mail.");
    return; // Arrêter l'exécution de la fonction
  }

  // Générer l'URL "mailto" avec les données du formulaire
  const mailtoUrl = `mailto:${process.env.MAIL_ADDRESS}` +
    `?subject=Carte%20de%20visite` +
    `&body=Bonjour,%0D%0A%0D%0AVoici%20mes%20coordonnées%20professionnelles%3A%0D%0A%0D%0A` +
    `Prénom%3A%20${encodeURIComponent(firstName)}%0D%0A` +
    `Nom%3A%20${encodeURIComponent(lastName)}%0D%0A` +
    `Adresse%20e-mail%3A%20${encodeURIComponent(email)}%0D%0A` +
    `Téléphone%3A%20${encodeURIComponent(phone)}%0D%0A` +
    `Mobile%3A%20${encodeURIComponent(mobile)}%0D%0A` +
    `Site%20web%3A%20${encodeURIComponent(website)}%0D%0A` +
    `Société%3A%20${encodeURIComponent(company)}%0D%0A` +
    `Poste%3A%20${encodeURIComponent(position)}%0D%0A` +
    `Adresse%3A%20${encodeURIComponent(address)}%0D%0A` +
    `Code%20postal%3A%20${encodeURIComponent(postalCode)}%0D%0A` +
    `Ville%3A%20${encodeURIComponent(city)}%0D%0A`;

  // Générer le QR code au format PNG
  QRCode.toDataURL(mailtoUrl, { type: 'png' }, function (err, qrImageUrl) {
    if (err) {
      console.error(err);
      return;
    }

    // Ajouter l'URL de l'image au corps du message
    const mailtoUrlWithQR = `${mailtoUrl}%0D%0A%0D%0AQR%20Code%3A%0D%0A${encodeURIComponent(qrImageUrl)}`;

    // Ouvrir l'URL "mailto" dans une nouvelle fenêtre
    window.open(mailtoUrlWithQR);
  });
}

// Ajouter un gestionnaire d'événement au bouton "ENVOYER"
document.getElementById("sendEmailButton").addEventListener("click", () => {
  sendEmail();
});

// Réinitialisation du formulaire
document.getElementById("clearForm").addEventListener("click", () => {
  const form = document.getElementById("vcardForm");
  form.reset();
  const QR = document.getElementById("qr");
  QR.innerHTML = "";
});
