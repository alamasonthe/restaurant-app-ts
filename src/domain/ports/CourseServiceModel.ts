import { CourseModel } from './CourseModel';

export interface CourseServiceModel {
  addCourse(course: CourseModel): Promise<void>;
  listCourses(): Promise<CourseModel[] | null>;
  getCourseByName(name: string): Promise<CourseModel | null>;
}
