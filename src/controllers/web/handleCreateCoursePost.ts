import { IncomingMessage, ServerResponse } from 'http';
import { parseFormData } from '../../utils/parseFormData';
import { CourseDTO } from './dto/CourseDTO';
import { toDomain, fromDomain } from './adapters/CourseAdapter';
import { renderCourseListPage } from './pages/CourseList';
import { CourseServiceModel } from '../../domain/ports/CourseServiceModel';

export function handleCreateCoursePost(
  req: IncomingMessage,
  res: ServerResponse,
  courseService: CourseServiceModel
): void {
  const chunks: Buffer[] = [];

  req.on('data', chunk => {
    chunks.push(chunk);
  });

  req.on('end', async () => {
    const body = Buffer.concat(chunks).toString();
    const parsed = parseFormData(body);

    const dto: CourseDTO = {
  name: parsed.name || '',
  description: parsed.description || '',
  ingredients: (parsed.ingredients || '')
  .split('\n')
  .map((s: string) => s.trim())
  .filter((s: string) => s.length > 0),

  category: parsed.category || '',
};

    try {
      const model = toDomain(dto);
      await courseService.addCourse(model);

      const allCourses = await courseService.listCourses();
      const courseDtos = allCourses.map(fromDomain);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(renderCourseListPage(courseDtos));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Erreur : création du plat impossible.');
    }
  });
}
