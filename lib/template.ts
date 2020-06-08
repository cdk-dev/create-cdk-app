import { isUrl } from './utils';

export enum TemplateType {
  EXTERNAL='EXTERNAL',
  STANDARD='STANDARD'
}

export function getTemplateType(template: string, debug=false): TemplateType {
  if (isUrl(template)) {
    if (debug) {
      console.log('template is a url')
    }
    return TemplateType.EXTERNAL;
  } else {
    if (debug) {
      console.log('template was not a url. falling back to the standard resolver')
    }
    return TemplateType.STANDARD;
  }
}
