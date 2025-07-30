export function renderHomePage(): string {
  return `
    <html>
      <head><title>Accueil</title></head>
      <body>
        <h1>Menu principal</h1>
        <ul>
            <li><a href="/courses">Liste des plats</a></li>
            <li><a href="/courses/new">Créer un plat</a></li>
        </ul>
      </body>
    </html>
  `;
}
