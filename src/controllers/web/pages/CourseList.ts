import { CourseDTO } from '../dto/CourseDTO';

export function renderCourseListPage(courses: CourseDTO[]): string {
  return `
    <html>
      <head><title>Liste des plats</title></head>
      <body>
        <h1>Liste des plats</h1>
        <ul>
          ${courses.map(c => `<li>${c.name} (${c.category})</li>`).join('\n')}
        </ul>
      </body>
    </html>
  `;
}
