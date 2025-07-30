import { CourseModel } from '../../../domain/ports/CourseModel';
import { CourseDTO } from '../dto/CourseDTO';
import { CourseCategory } from '../../../domain/enums/CourseCategory';

export function fromDomain(model: CourseModel): CourseDTO {
  return {
    name: model.name,
    description: model.description,
    ingredients: [...model.ingredients], // 👈 Copie défensive, car tableau
    category: translateCategory(model.category),
  };
}

export function toDomain(dto: CourseDTO): CourseModel {
  return {
    name: dto.name.trim(),
    description: dto.description.trim(),
    ingredients: dto.ingredients.map(i => i.trim()).filter(i => i.length > 0), // 👈 Directement un tableau
    category: parseCategory(dto.category),
  };
}

function translateCategory(cat: CourseCategory): string {
  switch (cat) {
    case CourseCategory.Main: return 'Plat principal';
    case CourseCategory.Starter: return 'Entrée';
    case CourseCategory.Dessert: return 'Dessert';
    case CourseCategory.Salad: return 'Salade';
    default: return 'Inconnu';
  }
}

function parseCategory(label: string): CourseCategory {
  const lower = label.trim().toLowerCase();

  switch (lower) {
    case 'plat principal': return CourseCategory.Main;
    case 'entrée': return CourseCategory.Starter;
    case 'dessert': return CourseCategory.Dessert;
    case 'salade': return CourseCategory.Salad;
    default:
      throw new Error(`Catégorie inconnue : '${label}'`);
  }
}
