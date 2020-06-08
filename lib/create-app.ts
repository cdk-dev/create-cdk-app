import chalk from 'chalk';
import makeDir from 'make-dir';

import { isDirEmpty } from './utils';
import { getTemplateType } from './template';
import { getResolver } from './resolvers';

export interface CreateAppProps {
  projectPath: string;
  template: string;
  debug: boolean;
}

export async function createApp({ projectPath, template, debug }: CreateAppProps): Promise<void> {
  if (debug) {
    console.log(`creating app with template: ${template} in directory: ${projectPath}`);
  }

  if (debug) {
    console.log(`creating directory: ${projectPath}`)
  }

  await makeDir(projectPath);

  if (!(await isDirEmpty(projectPath))) {
    console.log(chalk.red(`directory: ${projectPath} is not empty`));
    process.exit(1);
  }

  if (debug) {
    console.log(`changing directories into: ${projectPath}`)
  }
  
  process.chdir(projectPath);

  const templateType = getTemplateType(template, debug);
  const resolver = getResolver(template, templateType, debug);
  await resolver.downloadAndExtract(projectPath, debug);
}