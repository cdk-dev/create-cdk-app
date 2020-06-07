import { isUrl, isFilepath } from './utils';

export enum TemplateType {
  EXTERNAL='EXTERNAL',
  LOCAL='LOCAL',
  STANDARD='STANDARD'
};

export function getTemplateType(template: string): TemplateType {
  if (isUrl(template)) {
    return TemplateType.EXTERNAL;
  } else if (isFilepath(template)) {
    return TemplateType.LOCAL;
  } else {
    return TemplateType.STANDARD;
  }
};