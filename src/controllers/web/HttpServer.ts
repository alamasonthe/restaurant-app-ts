import http, { IncomingMessage, ServerResponse } from 'http';
import { PageRoutes } from './PageRoutes';

export class HttpServer {
  constructor(private readonly pageRoutes: PageRoutes) {}

  start(port: number): void {
    const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
      try {
        await this.pageRoutes.handleRequest(req, res);
      } catch (error) {
        console.error('Erreur dans le traitement de la requête :', error);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erreur interne du serveur');
      }
    });

    server.listen(port, '0.0.0.0', () => {
      console.log(`Serveur en écoute sur http://0.0.0.0:${port}`);
    });
  }
}
