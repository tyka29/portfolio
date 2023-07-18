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
    width: 150,
    height: 150,
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

document.getElementById("sendEmailButton").addEventListener("click", () => {
  const qrCodeImage = document.querySelector("#qr img");
  const form = document.getElementById("vcardForm");
  const formData = new FormData(form);

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

// Réinitialisation du formulaire
document.getElementById("clearForm").addEventListener("click", () => {
  const form = document.getElementById("vcardForm");
  form.reset();
  const QR = document.getElementById("qr");
  QR.innerHTML = "";
});
})
