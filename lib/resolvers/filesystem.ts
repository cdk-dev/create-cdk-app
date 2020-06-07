import { Resolver } from './resolver';
import { isUrlOk } from '../utils';

export class FilesystemResolver extends Resolver {
  public readonly url: string;
  constructor(url: string) {
    super();
    this.url = url;
  }
  
  public async hasTemplate(name: string, packageFile='cdk.json'): Promise<Boolean> {
    return isUrlOk(`${this.url}/contents/${encodeURIComponent(name)}/${packageFile}`)
  }
  
  public async downloadAndExtract() {
  
  }
};
