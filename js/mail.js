const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const message = document.getElementById('input-search').value;

    // Construire l'URL "mailto" avec les détails du message pré-remplis
    const mailtoUrl = `mailto:contact.tykadesign@gmail.com?subject=Nouveau%20message%20de%20contact&body=${encodeURIComponent(message)}`;

    // Ouvrir le client de messagerie par défaut avec l'URL "mailto"
    window.location.href = mailtoUrl;
});
