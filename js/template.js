// Variables pour stocker les données de personnalisation
let name = '';
let jobTitle = '';
let email = '';
let phone = '';
let fontFamily = 'Arial, sans-serif';
let textColor = '#000000';
let backgroundColor = '#ffffff';
let selectedTemplate = 0;

// Fonction pour sélectionner un template
function selectTemplate(templateNumber) {
  const customization = document.getElementById('customization');
  customization.style.display = 'block';}

  // Ici, vous pouvez afficher les options de personnalisation spécifiques au template sélectionné, si nécessaire.
// Afficher le logo dans la prévisualisation
const logoInput = document.getElementById('logo');
if (logoInput.files.length > 0) {
  const logoFile = logoInput.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const logoUrl = event.target.result;
    // ... (le code existant ici)
  };
  reader.readAsDataURL(logoFile);
  // Réinitialiser les données de personnalisation
  name = '';
  jobTitle = '';
  email = '';
  phone = '';
  fontFamily = 'Arial, sans-serif';
  textColor = '#000000';
  backgroundColor = '#ffffff';
  const boldText = false;
  const textAlignment = 'center';
  const singleLineContact = false;

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
  const boldText = document.getElementById('boldText').checked;
  const textAlignment = document.getElementById('textAlignment').value;
  const singleLineContact = document.getElementById('singleLineContact').checked;

  // Créer le contenu de la carte de visite avec les bords arrondis
  let cardContent = `
    <div class="card-content" style="background-color: ${backgroundColor}; color: ${textColor}; font-family: ${fontFamily}; text-align: ${textAlignment}; border-radius: 15px;">
      <h1 style="${boldText ? 'font-weight: bold;' : ''}">${name}</h1>
      <h2 style="${boldText ? 'font-weight: bold;' : ''}">${jobTitle}</h2>`;

  // Afficher l'email et le numéro de téléphone sur une seule ligne si l'option est cochée
  if (singleLineContact) {
    cardContent += `
      <p style="display: inline;">Email: ${email}</p>
      <p style="display: inline; margin-left: 10px;">Téléphone: ${phone}</p>
    `;
  } else {
    cardContent += `
      <p>Email: ${email}</p>
      <p>Téléphone: ${phone}</p>
    `;
  }

  cardContent += `</div>`;

  // Afficher le logo si un fichier est sélectionné
  const logoInput = document.getElementById('logo');
  if (logoInput.files.length > 0) {
    const logoFile = logoInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const logoUrl = event.target.result;
      cardContent = `<img src="${logoUrl}" alt="Logo" style="max-width: 100px; max-height: 100px; margin-bottom: 10px;">` + cardContent;

      // Afficher l'aperçu de la carte de visite avec les options de personnalisation sélectionnées
      const previewCard = document.getElementById('previewCard');
      previewCard.innerHTML = cardContent;

      const cardPreview = document.getElementById('cardPreview');
      cardPreview.style.display = 'block';
    };
    reader.readAsDataURL(logoFile);
  } else {
    // Afficher l'aperçu de la carte de visite avec les options de personnalisation sélectionnées
    const previewCard = document.getElementById('previewCard');
    previewCard.innerHTML = cardContent;

    const cardPreview = document.getElementById('cardPreview');
    cardPreview.style.display = 'block';
  }
}

// Fonction pour télécharger la carte de visite au format HTML
function downloadAsHTML() {
  const cardContent = `
    <div class="card-content" style="background-color: ${backgroundColor}; color: ${textColor}; font-family: ${fontFamily}; text-align: ${textAlignment}; border-radius: 10px;">
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

// Événements
document.getElementById('template1').addEventListener('click', function() {
  selectTemplate(1);
});

document.getElementById('template2').addEventListener('click', function() {
  selectTemplate(2);
});

document.getElementById('customization').addEventListener('change', function() {
  generateCard();
});

document.getElementById('logo').addEventListener('change', function() {
  generateCard();
});

document.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('loader');
  setTimeout(function() {
    loader.style.display = 'none';
  }, 7000);
});
