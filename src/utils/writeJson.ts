import { writeFile } from 'fs/promises';

export async function writeJson<T>(filePath: string, data: T): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  await writeFile(filePath, content, 'utf-8');
}
