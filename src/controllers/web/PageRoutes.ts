import { renderHomePage } from './pages/Home';
import { renderCourseListPage } from './pages/CourseList';
import { renderCreateCourseFormPage } from './pages/CreateCourseForm';
import { render404Page } from './pages/404';


import { CourseServiceModel } from '../../domain/ports/CourseServiceModel';
import { fromDomain } from './adapters/CourseAdapter';


import { handleCreateCoursePost } from './handleCreateCoursePost';

import { IncomingMessage, ServerResponse } from 'http';


export class PageRoutes {
  constructor(private readonly courseService: CourseServiceModel) {}

  async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    
    const method = req.method ?? 'GET';
    const url = req.url ?? '/';

    if (method === 'GET') {
      switch (url) {
        case '/':
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(renderHomePage());
          return;
        case '/courses':
          const models = await this.courseService.listCourses();
          const courseDto = models.map(fromDomain);
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(renderCourseListPage(courseDto));
          return;
        case '/courses/new':
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(renderCreateCourseFormPage());
          return;
        default:
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(render404Page());
          return;
      }
    }
    else if (method === 'POST' && url === '/courses/createCoursePost') {
      handleCreateCoursePost(req, res, this.courseService);
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Méthode non autorisée');
    }
  }
}

export interface PageResponse {
  statusCode: number;
  content: string;
}