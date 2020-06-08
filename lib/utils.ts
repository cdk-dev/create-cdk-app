import { promises as fsp } from 'fs';
import { exec } from 'child_process';

export async function isDirEmpty(dir: string): Promise<boolean> {
  return await fsp.readdir(dir).then(f => f.length === 0);
}

export function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export async function executeCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, function(error: any, stdout: any, stderr: any){
      if (error) { reject(error) }
      if (stderr) { reject(stderr) }
      resolve(stdout)
    });
  });
}

export interface Auth {
  username: string,
  password: string;
}

export function checkGithubAuth(): Auth | undefined {
  const username = process.env.GITHUB_USERNAME;
  const password = process.env.GITHUB_TOKEN;

  if (username && password) {
    return {
      username,
      password
    };
  } else {
    return undefined;
  }
}