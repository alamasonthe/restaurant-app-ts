import { CourseModel } from './CourseModel';

export interface CourseRepositoryModel {
  create(course: CourseModel): Promise<void>;
  getByName(name: string): Promise<CourseModel | null>;
  getAll(): Promise<CourseModel[]>;
}
