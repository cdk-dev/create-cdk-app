
import { TemplateType } from '../template';
import { Resolver } from './resolver';
import { DefaultResolver } from './default';

export function getResolver(template: string, templateType: TemplateType, debug=false): Resolver {
  if (templateType === TemplateType.EXTERNAL) {
    console.error('no resolvers available for external urls');
    process.exit(0);
  } else {
    if (debug) {
      console.log(`using default resolver`)
    }
    return new DefaultResolver(template);
  }
}
