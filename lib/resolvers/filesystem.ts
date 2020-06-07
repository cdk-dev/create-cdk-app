import { Resolver } from './resolver';

export class FilesystemResolver extends Resolver {
  constructor() {
    super();
  }
  
  public async hasTemplate(name: string, packageFile='package.json'): Promise<boolean> {
    return isUrlOk(`${this.url}/contents/${encodeURIComponent(name)}/${packageFile}`)
  }
  
  public async downloadAndExtract() {
  
  }
};
