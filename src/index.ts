// Domain
import { CourseFactory } from './domain/factories/CourseFactory';
import { CourseService } from './domain/services/CourseService';

// web
import { PageRoutes } from './controllers/web/PageRoutes';
import { HttpServer } from './controllers/web/HttpServer';

async function main() {
  // Course repository
  const repoType: string = 'file';

  let repository;
  switch (repoType) {
    case 'file': {
      const { FileCourseRepository } = await import('./infrastructure/FileCourseRepository');
      repository = new FileCourseRepository('./dist/data/courses.json');
      break;
    }
    case 'sqlite': {
      const { SqliteCourseRepository } = await import('./infrastructure/SqliteCourseRepository');
      repository = new SqliteCourseRepository('./dist/data/restaurant.db');
      break;
    }
    default:
      throw new Error(`Unsupported repository type: ${repoType}`);
  }

  const courseFactory = new CourseFactory();
  const courseService = new CourseService(repository);

  const pageRoutes = new PageRoutes(courseService);
  const server = new HttpServer(pageRoutes);

  server.start(3005);
}

main();
