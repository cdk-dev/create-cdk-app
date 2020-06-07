import { promises as fsp } from 'fs';
import { URL } from 'url';
import got from 'got';

export function isDirEmpty(parent: string, child: string): Boolean {
export async function isDirEmpty(dirname) {
  const dir = path.join(parent, child);
  return await fsp.readdir(dir).then(files => {
    return files.length === 0;
  }
};

export function isUrl(url: string) {
  return false;
}

export function isFilepath(path; string) {
  return false;
}

export async function isUrlOk(url: string): Promise<boolean> {
  const res = await got(url).catch((e) => e)
  return res.statusCode === 200
}
