import { CourseFactoryModel } from '../ports/CourseFactoryModel';
import { CourseModel } from '../ports/CourseModel';
import { CourseCategory } from '../enums/CourseCategory';
import { Course } from '../entities/Course';

export class CourseFactory implements CourseFactoryModel {
  create(
    name: string,
    description: string,
    ingredients: string[],
    category: CourseCategory
  ): CourseModel {
    return new Course(name, description, ingredients, category);
  }
}
