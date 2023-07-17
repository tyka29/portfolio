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

  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    type: "png",
    data: vcard,
    margin: 0,
  });

  qrCode.append(QR);
}

document.getElementById("generateQR").addEventListener("click", (e) => {
  e.preventDefault();
  QRcode();
});

document.getElementById("downloadButton").addEventListener("click", () => {
  const qrCodeImage = document.querySelector("#qr img");

  // Vérifier si l'image du QR code existe
  if (qrCodeImage) {
    // Créer un lien de téléchargement
    const link = document.createElement("a");
    link.href = qrCodeImage.src;
    link.download = "qr_code.png"; // Spécifier le nom du fichier à télécharger

    // Cliquez sur le lien pour déclencher le téléchargement
    link.click();
  }
});

// Réinitialisation du formulaire
document.getElementById("clearForm").addEventListener("click", () => {
  const form = document.getElementById("vcardForm");
  form.reset();
  const QR = document.getElementById("qr");
  QR.innerHTML = "";
});

// Importer la bibliothèque QRCode
const QRCode = require('qrcode');

function sendEmail() {
  // Capturer les données du formulaire
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  // ...

  // Générer l'URL "mailto"
  var mailtoUrl = "mailto:" + email +
    "?subject=Carte%20de%20visite" +
    "&body=Bonjour%20,%0D%0A%0D%0AVoici%20mes%20coordonn%C3%A9es%20professionnelles%3A%0D%0A%0D%0A" +
    "Pr%C3%A9nom%3A%20" + encodeURIComponent(firstName) + "%0D%0A" +
    "Nom%3A%20" + encodeURIComponent(lastName) + "%0D%0A" +
    // ...

  // Générer le QR code
  QRCode.toDataURL(mailtoUrl, function (err, qrImageUrl) {
    if (err) {
      console.error(err);
      return;
    }

    // Ajouter l'URL de l'image au corps du message
    mailtoUrl += "%0D%0A%0D%0AQR%20Code%3A%0D%0A" + encodeURIComponent(qrImageUrl);

    // Ouvrir l'URL "mailto" dans une nouvelle fenêtre
    window.open(mailtoUrl);
  });
}
