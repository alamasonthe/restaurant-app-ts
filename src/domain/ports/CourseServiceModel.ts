import { CourseModel } from './CourseModel';

export interface CourseServiceModel {
  addCourse(course: CourseModel): Promise<void>;
  listCourses(): Promise<CourseModel[]>;
  getCourseByName(name: string): Promise<CourseModel | null>;
}
