
import { TemplateType } from '../template';

import { Resolver } from './resolver';
import { GithubResolver } from './github';
import { FilesystemResolver } from './filesystem';

const webResolvers: any = {
  'https://github.com': GithubResolver
};

export function getResolver(template: string, templateType: TemplateType): Resolver {
  if (templateType === TemplateType.EXTERNAL) {
    const origin = '';
    if (!(origin in webResolvers)) {
      console.error(`no resolver available for origin: ${origin}`);
      process.exit(1);
    }
    return webResolvers[origin](template);
  } else if (templateType === TemplateType.LOCAL) {
    return new FilesystemResolver(template);
  } else {
    return new GithubResolver(template);
  }
}