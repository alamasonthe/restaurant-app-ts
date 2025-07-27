import { CourseModel } from '../ports/CourseModel';
import { CourseCategory } from '../enums/CourseCategory';

export class Course implements CourseModel {
  public name: string;
  public description: string;
  public ingredients: string[];
  public category: CourseCategory;

  constructor(
    name: string,
    description: string,
    ingredients: string[],
    category: CourseCategory
  ) {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid course name');
    }

    if (!Array.isArray(ingredients) || !ingredients.every(i => typeof i === 'string')) {
      throw new Error('Ingredients must be an array of strings');
    }

    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.category = category;
  }
}
