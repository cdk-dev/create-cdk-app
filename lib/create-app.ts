import path from 'path';
import makeDir from 'make-dir';

import { isDirEmpty } from './utils';
import { getTemplateType } from './template';
import { getResolver } from './resolvers';

export interface CreateAppProps {
  appPath: string;
  template?: string;
};

export async function createApp(props: CreateAppProps) {
  const template = props.template || 'default';
  const root = path.resolve(props.appPath);
  const appName = path.basename(root);
  const projectPath = path.join(root, appName);
  
  if (!(isDirEmpty(projectPath))) {
    console.log(`directory is not empty`);
    process.exit(1);
  }
  
  await makeDir(root);
  process.chdir(root);
  
  const templateName = template ? template : './templates/default';
  
  const templateType = getTemplateType(templateName);
    
  // await validateTemplate(templateType);
    
  const resolver = getResolver(template, templateType);
  /*
  if (await   resolver.hasTemplate(templateName)) {
        resolver.downloadAndExtract(projectPath);
  } else {
    console.error(`resolver could not handle template`);
    process.exit(1);
  }
  */
}