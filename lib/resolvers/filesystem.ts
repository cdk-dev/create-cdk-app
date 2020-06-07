import { Resolver } from './resolver';

export class FilesystemResolver extends Resolver {
  constructor() {
    super(url: string);
    this.url = url;
  }
  
  public async hasTemplate(name: string, packageFile='cdk.json'): Promise<boolean> {
    return isUrlOk(`${this.url}/contents/${encodeURIComponent(name)}/${packageFile}`)
  }
  
  public async downloadAndExtract() {
  
  }
};
