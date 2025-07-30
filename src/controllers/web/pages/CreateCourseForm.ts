export function renderCreateCourseFormPage(): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Créer un plat</title>
    </head>
    <body>
      <h1>Créer un plat</h1>
      <form method="POST" action="/courses/createCoursePost">
        <label for="name">Nom du plat :</label><br />
        <input type="text" id="name" name="name" required /><br /><br />

        <label for="description">Description :</label><br />
        <textarea id="description" name="description" rows="4" cols="50"></textarea><br /><br />

        <label for="ingredients">Ingrédients (un par ligne) :</label><br />
        <textarea id="ingredients" name="ingredients" rows="4" cols="50" style="resize: vertical; overflow-y: auto;"></textarea><br /><br />

        <label for="category">Catégorie :</label><br />
        <select id="category" name="category">
          <option value="Entrée">Entrée</option>
          <option value="Plat principal">Plat principal</option>
          <option value="Salade">Salade</option>
          <option value="Dessert">Dessert</option>
        </select><br /><br />

        <button type="submit">Créer</button>
      </form>
      <p><a href="/courses">Retour à la liste</a></p>
    </body>
    </html>
  `;
}
