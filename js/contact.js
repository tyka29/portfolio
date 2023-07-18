document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupérer les valeurs saisies dans le formulaire
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Générer le contenu du QR code avec les informations de contact
    var qrData = 'Nom: ' + name + '\n' +
                 'Email: ' + email + '\n' +
                 'Message: ' + message;

    // Générer le QR code
    var qr = new QRious({
        element: document.getElementById('qr-code'),
        value: qrData,
        size: 200
    });

    // Envoyer l'e-mail avec le QR code en pièce jointe
    var mailtoUrl = 'mailto:contact@gmail.com' +
                    '?subject=Contact' +
                    '&body=' +
                    encodeURIComponent('Bonjour,\n\nVoici les informations de contact avec le QR code en pièce jointe :\n\n') +
                    encodeURIComponent('Nom: ' + name + '\n') +
                    encodeURIComponent('Email: ' + email + '\n') +
                    encodeURIComponent('Message: ' + message + '\n\n') +
                    encodeURIComponent('Cordialement,\nVotre nom') +
                    '&attachment=' + encodeURIComponent(qr.toDataURL());

    // Ouvrir l'URL "mailto" dans une nouvelle fenêtre pour envoyer l'e-mail
    window.open(mailtoUrl);
});
