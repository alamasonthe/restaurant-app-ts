import { WebPageRenderer } from './WebPageRenderer';

export class PageRoutes {
  constructor(private readonly pageRenderer: WebPageRenderer) {}

  handleRequest(url: string): PageResponse {
    switch (url) {
      case '/':
        return { statusCode: 200, content: this.pageRenderer.renderHome() };
      case '/courses':
        return { statusCode: 200, content: this.pageRenderer.renderCourseList() };
      case '/courses/new':
        return { statusCode: 200, content: this.pageRenderer.renderCreateCourseForm() };
      default:
        return { statusCode: 404, content: this.pageRenderer.render404() };
    }
  }
}

export interface PageResponse {
  statusCode: number;
  content: string;
}