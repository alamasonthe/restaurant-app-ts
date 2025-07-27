import { CourseCategory } from '../enums/CourseCategory';

export interface CourseModel {
  name: string;
  description: string;
  ingredients: string[];
  category: CourseCategory;
}
