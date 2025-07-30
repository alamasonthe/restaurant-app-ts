const message: string = "Hello, TypeScript!";
console.log(message);

// Domain
import { CourseFactory } from './domain/factories/CourseFactory';
import { FileCourseRepository } from './infrastructure/FileCourseRepository';
import { CourseService } from './domain/services/CourseService';

const repository = new FileCourseRepository({ filePath: './data/courses.json' });
const courseFactory = new CourseFactory();
const courseService = new CourseService(repository);

// web
import { PageRoutes } from './controllers/web/PageRoutes';
import { HttpServer } from './controllers/web/HttpServer';
import { WebPageRenderer } from './controllers/web/WebPageRenderer';

const webPageRenderer = new WebPageRenderer();
const pageRoutes = new PageRoutes(courseService);
const server = new HttpServer(pageRoutes);

/*
const pageHtml = webController.renderSampleCoursePage();
console.log(pageHtml);
*/

server.start(3005);