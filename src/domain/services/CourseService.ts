import { CourseModel } from '../ports/CourseModel';
import { CourseServiceModel } from '../ports/CourseServiceModel';
import { CourseRepositoryModel } from '../ports/CourseRepositoryModel';

export class CourseService implements CourseServiceModel {
  constructor(private readonly repository: CourseRepositoryModel) {}

  async addCourse(course: CourseModel): Promise<void> {
    // TODO: Validation métier avant insertion
    await this.repository.create(course);
  }

  async listCourses(): Promise<CourseModel[]> {
    return this.repository.getAll();
  }

  async getCourseByName(name: string): Promise<CourseModel | null> {
    return this.repository.getByName(name);
  }
}
