import { Resolver } from './resolver';
import { isUrlOk } from '../utils';
import { downloadAndExtractRepo } from './utils';

export class GithubResolver extends Resolver {
  public readonly url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public async hasTemplate(packageFile = 'cdk.json'): Promise<Boolean> {
    return isUrlOk(`${this.url}/${packageFile}`);
  }

  public async downloadAndExtract(root: string, username: string, repo: string): Promise<void> {
    return downloadAndExtractRepo(root, username, repo);
  }
};
