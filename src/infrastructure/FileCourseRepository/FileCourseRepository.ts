import { CourseModel } from '../../domain/ports/CourseModel';
import { CourseRepositoryModel } from '../../domain/ports/CourseRepositoryModel';
import { FileCourseRepositoryOptions } from './FileCourseRepositoryOptions';
import { readJson } from '../../utils/readJson';
import { writeJson } from '../../utils/writeJson';
import path from 'path';

export class FileCourseRepository implements CourseRepositoryModel {
  private filePath: string;
  private courses: CourseModel[] = [];

  constructor(options: FileCourseRepositoryOptions) {
    this.filePath = path.resolve(options.filePath);
  }

  async load(): Promise<void> {
    try {
      this.courses = await readJson<CourseModel[]>(this.filePath);
    } catch (err) {
      this.courses = [];
    }
  }

  async save(): Promise<void> {
    await writeJson(this.filePath, this.courses);
  }

  async create(course: CourseModel): Promise<void> {
    this.courses.push(course);
    await this.save();
  }

  async getAll(): Promise<CourseModel[]> {
    return [...this.courses];
  }

  async getByName(name: string): Promise<CourseModel | null> {
    return this.courses.find(c => c.name === name) || null;
  }
}
