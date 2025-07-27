export class WebPageRenderer {
  renderHome(): string {
    return `
      <h1>Menu principal</h1>
      <ul>
        <li><a href="/courses">Liste des plats</a></li>
        <li><a href="/courses/new">Créer un plat</a></li>
      </ul>
    `;
  }

  renderCourseList(): string {
    return `<h1>Liste des plats</h1>`;
  }

  renderCreateCourseForm(): string {
    return `<h1>Créer un plat</h1>`;
  }

  render404(): string {
    return `<h1>404 - Page non trouvée</h1>`;
  }
}
