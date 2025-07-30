import Database from 'better-sqlite3';
import path from 'path';
import { CourseRepositoryModel } from '../../domain/ports/CourseRepositoryModel';
import { CourseModel } from '../../domain/ports/CourseModel';
import { CourseCategory } from '../../domain/enums/CourseCategory';
import { SqliteCourseRepositoryOptions } from './SqliteCourseRepositoryOptions';

type CourseRow = {
  id: number;
  name: string;
  description: string;
  category: string;
  ingredient: string | null;
};

type IngredientRow = { name: string };
type CourseMetaRow = { id: number; name: string; description: string; category: string };
type IdRow = { id: number };

export class SqliteCourseRepository implements CourseRepositoryModel {
  private db: Database.Database;

  constructor(options: SqliteCourseRepositoryOptions) {
    const resolvedPath = path.resolve(options.filePath);
    this.db = new Database(resolvedPath);
    console.log('Ouverture DB OK');
  }

  async getAll(): Promise<CourseModel[]> {
    const rows = this.db.prepare(`
      SELECT c.id, c.name, c.description, cc.name as category, i.name as ingredient
      FROM Course c
      JOIN CourseCategory cc ON c.category_id = cc.id
      LEFT JOIN CourseIngredient ci ON ci.course_id = c.id
      LEFT JOIN Ingredient i ON ci.ingredient_id = i.id
      ORDER BY c.id
    `).all() as CourseRow[];

    const grouped: Map<number, CourseModel> = new Map();

    for (const row of rows) {
      if (!grouped.has(row.id)) {
        grouped.set(row.id, {
          name: row.name,
          description: row.description,
          category: this.mapCategory(row.category),
          ingredients: row.ingredient ? [row.ingredient] : [],
        });
      } else if (row.ingredient) {
        grouped.get(row.id)!.ingredients.push(row.ingredient);
      }
    }

    return Array.from(grouped.values());
  }

  async getByName(name: string): Promise<CourseModel | null> {
    const courseRow = this.db.prepare(`
      SELECT c.id, c.name, c.description, cc.name as category
      FROM Course c
      JOIN CourseCategory cc ON c.category_id = cc.id
      WHERE c.name = ?
    `).get(name) as CourseMetaRow | undefined;

    if (!courseRow) return null;

    const ingredientRows = this.db.prepare(`
      SELECT i.name
      FROM Ingredient i
      JOIN CourseIngredient ci ON ci.ingredient_id = i.id
      WHERE ci.course_id = ?
    `).all(courseRow.id) as IngredientRow[];

    return {
      name: courseRow.name,
      description: courseRow.description,
      category: this.mapCategory(courseRow.category),
      ingredients: ingredientRows.map(r => r.name),
    };
  }

  async create(course: CourseModel): Promise<void> {
    const insertCourse = this.db.prepare(`
      INSERT INTO Course (name, description, category_id)
      VALUES (?, ?, (SELECT id FROM CourseCategory WHERE name = ?))
    `);

    const insertIngredient = this.db.prepare(`
      INSERT INTO Ingredient (name) VALUES (?)
      ON CONFLICT(name) DO NOTHING
    `);

    const getIngredientId = this.db.prepare(`
      SELECT id FROM Ingredient WHERE name = ?
    `);

    const insertCourseIngredient = this.db.prepare(`
      INSERT INTO CourseIngredient (course_id, ingredient_id) VALUES (?, ?)
    `);

    const tx = this.db.transaction((course: CourseModel) => {
      insertCourse.run(course.name, course.description, course.category);

      const row = this.db.prepare('SELECT last_insert_rowid() as id').get() as IdRow;
      const courseId = row.id;

      for (const ing of course.ingredients) {
        insertIngredient.run(ing);
        const idRow = getIngredientId.get(ing) as IdRow | undefined;
        if (!idRow) throw new Error(`Ingrédient non trouvé après insertion : ${ing}`);
        insertCourseIngredient.run(courseId, idRow.id);
      }
    });

    tx(course);
  }

  private mapCategory(label: string): CourseCategory {
    const normalized = label.trim().toLowerCase();
    switch (normalized) {
      case 'starter': return CourseCategory.Starter;
      case 'main': return CourseCategory.Main;
      case 'salad': return CourseCategory.Salad;
      case 'dessert': return CourseCategory.Dessert;
      default:
        throw new Error(`Catégorie inconnue : ${label}`);
    }
  }
}
