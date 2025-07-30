import { CourseModel } from '../../domain/ports/CourseModel';
import { CourseRepositoryModel } from '../../domain/ports/CourseRepositoryModel';
import { readJson } from '../../utils/readJson';
import { writeJson } from '../../utils/writeJson';
import path from 'path';

export class FileCourseRepository implements CourseRepositoryModel {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = path.resolve(filePath);
  }

  async create(course: CourseModel): Promise<void> {
    const courses = await this.readAllFromFile();
    courses.push(course);
    await writeJson(this.filePath, courses);
  }

  async getAll(): Promise<CourseModel[]> {
    return this.readAllFromFile();
  }

  async getByName(name: string): Promise<CourseModel | null> {
    const courses = await this.readAllFromFile();
    return courses.find(c => c.name === name) || null;
  }

  private async readAllFromFile(): Promise<CourseModel[]> {
    try {
      return await readJson<CourseModel[]>(this.filePath);
    } catch (err) {
      return [];
    }
  }
}
