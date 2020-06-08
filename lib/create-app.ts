import path from 'path';
import makeDir from 'make-dir';

import { isDirEmpty } from './utils';
import { getTemplateType } from './template';
import { getResolver } from './resolvers';

export interface CreateAppProps {
  projectPath: string;
  template: string;
  debug: boolean;
};

export async function createApp({ projectPath, template, debug }: CreateAppProps) {
  if (debug) {
    console.log(`creating app with template: ${template} in directory: ${projectPath}`);
  }
  
  const appName = path.basename(projectPath);
  
  if (!(isDirEmpty(projectPath))) {
    console.log(`directory is not empty`);
    process.exit(1);
  }
  
  await makeDir(projectPath);
  process.chdir(projectPath);

  const templateType = getTemplateType(template);
  console.log(templateType)
    
  // await validateTemplate(templateType);
    
  const resolver = getResolver(template, templateType);
  console.log(resolver);

  if (await resolver.hasTemplate(template)) {
    console.log('has template')
        // resolver.downloadAndExtract(projectPath);
  } else {
    console.error(`resolver could not handle template`);
    process.exit(1);
  }
}