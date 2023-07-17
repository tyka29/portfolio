// Récupérer les données du fichier JSON
fetch('perso.json')
  .then(response => response.json())
  .then(data => {
    // Utiliser les données pour générer les miniatures de projet
    const projectsContainer = document.querySelector('.thumbnails-perso');
    data.forEach(project => {
      const projectThumbnail = document.createElement('div');
      projectThumbnail.classList.add('perso-thumbnail');
      projectThumbnail.innerHTML = `
        <img src="${project.image}" alt="${project.alt}">
        <h3><span>${project.title}</span></h3>
        <p>${project.description}</p>
        <span><strong>Option</span></strong>: ${project.option}
        <a href="${project.link}">En savoir plus</a>
      `;
      projectsContainer.appendChild(projectThumbnail);
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement des données db.json :', error);
  });

