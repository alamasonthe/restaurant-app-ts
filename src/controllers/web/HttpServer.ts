import http from 'http';
import { PageRoutes } from './PageRoutes';

export class HttpServer {
  constructor(private readonly pageRoutes: PageRoutes) {}

  start(port: number): void {
    const server = http.createServer((req, res) => {
      const url = req.url ?? '/';
      const response = this.pageRoutes.handleRequest(url);

      res.writeHead(response.statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(response.content);
    });

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}
