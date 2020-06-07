import path from 'path';
import makeDir from 'make-dir';

import { isDirEmpty, isUrl, validateUrl } from './utils';

export interface CreateAppProps {
  appPath: string;
  template?: string;
  templatePath?: string;
};

export async function createApp(props: CreateAppProps) {
  const root = path.resolve(props.appPath);
  const appName = path.basename(root);
  const projectPath = path.join(root, appName);
  const cwd = process.cwd();
  
  if (!(isDirEmpty(projectPath))) {
    console.log(`directory is not empty`);
    process.exit(1);
  }
  
  await makeDir(root);
  process.chdir(root);
  
  if (template) { 
    const { templateUrl, templateName } = getTemplateUrl(template);
    // get downloader for origin
    const downloader = getDownloader(templateUrl);
    // check if downloader has template
    if (await downloader.hasTemplate(templateName)) {
      downloader.downloadAndExtract()
    } else {
      console.error(`downloader could not handle template`);
      process.exit(1);
    }
  } else {
    // render default
  }

  // install dependencies
  // git init
}