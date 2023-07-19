// Variables pour stocker les données de personnalisation
let name = '';
let jobTitle = '';
let email = '';
let phone = '';
let fontFamily = 'Arial, sans-serif';
let textColor = '#000000';
let backgroundColor = '#ffffff';

// Fonction pour sélectionner un template
function selectTemplate(templateNumber) {
  const customization = document.getElementById('customization');
  customization.style.display = 'block';

  // Ici, vous pouvez afficher les options de personnalisation spécifiques au template sélectionné, si nécessaire.

  // Réinitialiser les données de personnalisation
  name = '';
  jobTitle = '';
  email = '';
  phone = '';
  fontFamily = 'Arial, sans-serif';
  textColor = '#000000';
  backgroundColor = '#ffffff';

  // Masquer l'aperçu de la carte de visite
  const cardPreview = document.getElementById('cardPreview');
  cardPreview.style.display = 'none';

  // Afficher le formulaire QR code uniquement lorsque le modèle est choisi
  if (templateNumber > 0) {
    selectedTemplate = templateNumber;
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.style.display = 'block';
  } else {
    selectedTemplate = 0;
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.style.display = 'none';
  }
}

// Fonction pour générer la carte de visite avec les options de personnalisation sélectionnées
function generateCard() {
  // Récupérer les valeurs des champs de personnalisation
  name = document.getElementById('name').value;
  jobTitle = document.getElementById('jobTitle').value;
  email = document.getElementById('email').value;
  phone = document.getElementById('phone').value;
  fontFamily = document.getElementById('fontFamily').value;
  textColor = document.getElementById('textColor').value;
  backgroundColor = document.getElementById('backgroundColor').value;

  

  // Créer le contenu de la carte de visite avec les bords arrondis
  const cardContent = `
    <div class="card-content" style="background-color: ${backgroundColor}; color: ${textColor}; font-family: ${fontFamily}; border-radius: 10px;">
      <h1>${name}</h1>
      <h2>${jobTitle}</h2>
      <p>Email: ${email}</p>
      <p>Téléphone: ${phone}</p>
    </div>
  `;

  // Afficher l'aperçu de la carte de visite avec les options de personnalisation sélectionnées
  const previewCard = document.getElementById('previewCard');
  previewCard.innerHTML = cardContent;

  const cardPreview = document.getElementById('cardPreview');
  cardPreview.style.display = 'block';
}

// Fonction pour télécharger la carte de visite au format HTML
function downloadAsHTML() {
  const cardContent = `
    <div class="card-content" style="background-color: ${backgroundColor}; color: ${textColor}; font-family: ${fontFamily}; border-radius: 10px;">
      <h1>${name}</h1>
      <h2>${jobTitle}</h2>
      <p>Email: ${email}</p>
      <p>Téléphone: ${phone}</p>
    </div>
  `;

  // Créer un fichier HTML avec le contenu de la carte de visite
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Ma carte de visite personnalisée</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: ${backgroundColor};
          color: ${textColor};
          font-family: ${fontFamily};
        }
        .card-content {
          text-align: center;
          border-radius: 10px;
        }
      </style>
    </head>
    <body>
      ${cardContent}
    </body>
    </html>
  `;

  // Créer un lien de téléchargement pour le fichier HTML
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ma_carte_de_visite.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Fonction pour partager la carte de visite par e-mail
function shareByEmail() {
  // Récupérer le contenu du QR code
  const qrCodeData = document.querySelector(".qrious canvas").toDataURL("image/png");

  // Mettre à jour le champ caché du formulaire avec les données du QR code
  const hiddenQrCodeDataInput = document.querySelector("input[name='qrcode_data']");
  hiddenQrCodeDataInput.value = qrCodeData;

  // Envoyer le formulaire pour envoyer l'e-mail
  const form = document.querySelector("form[action='send_email.php']");
  form.submit();
}

// Événements
document.getElementById('template1').addEventListener('click', () => selectTemplate(1));
document.getElementById('template2').addEventListener('click', () => selectTemplate(2));
document.getElementById('generateButton').addEventListener('click', generateCard);
document.getElementById('downloadButton').addEventListener('click', downloadAsHTML);
