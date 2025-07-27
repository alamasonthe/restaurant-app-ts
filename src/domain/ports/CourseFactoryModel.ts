import { CourseModel } from './CourseModel';
import { CourseCategory } from '../enums/CourseCategory';

export interface CourseFactoryModel {
  create(
    name: string,
    description: string,
    ingredients: string[],
    category: CourseCategory
  ): CourseModel;
}
