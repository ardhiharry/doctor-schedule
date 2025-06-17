import path from 'path';

export function rootPath(paths: string) {
  return path.join(process.cwd(), paths);
}
