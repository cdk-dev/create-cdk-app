import { Resolver } from './resolver';

export class FilesystemResolver extends Resolver {
  constructor(url: string) {
    super();
    this.url = url;
  }
  
  public async hasTemplate(name: string, packageFile='cdk.json'): Promise<boolean> {
    return isUrlOk(`${this.url}/contents/${encodeURIComponent(name)}/${packageFile}`)
  }
  
  public async downloadAndExtract() {
  
  }
};
