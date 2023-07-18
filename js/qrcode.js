require('dotenv').config();

var firstName, lastName, email, phone, mobile, website, company, position, address, postalCode, city;
var valeur;

document.forms[0].onchange = () => {
    console.log("chargement");
}

var qr = new QRious({
    element: document.querySelector('.qrious'),
    size: 250
});

function change(element) {
    switch (element.id) {
        case "firstName":
            firstName = element.value;
            break;
        case "lastName":
            lastName = element.value;
            break;
        case "email":
            email = element.value;
            break;
        case "phone":
            phone = element.value;
            break;
        case "mobile":
            mobile = element.value;
            break;
        case "website":
            website = element.value;
            break;
        case "company":
            company = element.value;
            break;
        case "position":
            position = element.value;
            break;
        case "address":
            address = element.value;
            break;
        case "postalCode":
            postalCode = element.value;
            break;
        case "city":
            city = element.value;
            break;
    }

    var vCardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:' + lastName + ';' + firstName + ';;;',
        'FN:' + firstName + ' ' + lastName,
        'EMAIL;TYPE=INTERNET:' + email,
        'TEL;TYPE=WORK:' + phone,
        'TEL;TYPE=CELL:' + mobile,
        'URL:' + website,
        'ORG:' + company,
        'TITLE:' + position,
        'ADR;TYPE=WORK:;;' + address + ';;' + city + ';;' + postalCode + ';;',
        'END:VCARD'
    ].join('\n');

    qr.value = vCardData;
}

function shareByEmail() {
    // Récupérer les valeurs des champs du formulaire
    var formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      mobile: document.getElementById('mobile').value,
      website: document.getElementById('website').value,
      company: document.getElementById('company').value,
      position: document.getElementById('position').value,
      address: document.getElementById('address').value,
      postalCode: document.getElementById('postalCode').value,
      city: document.getElementById('city').value
    };
  
    // Générer le contenu de l'e-mail
    var emailContent = 'Bonjour,\n\nVoici mon QR code vCard et mes informations de contact :\n\n';
    emailContent += 'Nom : ' + formData.lastName + ' ' + formData.firstName + '\n';
    emailContent += 'E-mail : ' + formData.email + '\n';
    emailContent += 'Téléphone : ' + formData.phone + '\n';
    emailContent += 'Mobile : ' + formData.mobile + '\n';
    emailContent += 'Site Web : ' + formData.website + '\n';
    emailContent += 'Entreprise : ' + formData.company + '\n';
    emailContent += 'Poste : ' + formData.position + '\n';
    emailContent += 'Adresse : ' + formData.address + '\n';
    emailContent += 'Code postal : ' + formData.postalCode + '\n';
    emailContent += 'Ville : ' + formData.city + '\n';
  
    // Générer le lien du QR code
    var qrCodeLink = 'Lien du QR code : ' + qr.toDataURL();
  
    // Générer le lien de partage par e-mail
    var mailToLink = 'mailto:' + process.env.MAIL_ADRESS + '?subject=Partage de ma carte de visite&body=' + encodeURIComponent(emailContent + qrCodeLink);

    // Ouvrir la fenêtre de composition d'e-mail avec les données pré-remplies
    window.location.href = mailToLink;
}
