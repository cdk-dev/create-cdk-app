export enum TemplateType {
  
};

export class Template {
  public url: string;

  constructor(templateName: string) {
    try {
      this.url = new URL(props.template);
    } catch (err) {
      if (err.code !== 'ERR_INVALID_URL') {
        console.error(err);
        process.exit(1);
      } else {
        this.type = TemplateType
    }
  }
}

{
  name: 
  packageFile: 