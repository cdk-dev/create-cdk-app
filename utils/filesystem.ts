import { promises as fsp } from 'fs';

export const isDirEmpty = (parent: string, child: string) => {
export async function isDirEmpty(dirname) {
  const dir = path.join(parent, child);
  return await fsp.readdir(dir).then(files => {
    return files.length === 0;
  }
};