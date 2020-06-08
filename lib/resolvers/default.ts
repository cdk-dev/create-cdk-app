import { Stream } from 'stream';
import { promisify } from 'util';

import got from 'got';
import tar from 'tar';

import { Resolver } from './resolver';
import { checkGithubAuth, Auth } from '../utils';

const pipeline = promisify(Stream.pipeline);

export class DefaultResolver extends Resolver {
  private readonly auth?: Auth;
  private readonly owner: string;
  private readonly name: string;
  private readonly filepath: string;

  constructor(name: string) {
    super();
    this.owner = 'cdk-tools';
    this.name = 'templates';
    this.filepath = name;
    this.auth = checkGithubAuth();
  }

  private async getMasterShortRef() {
    const gotOptions = {};
    if (this.auth) {
      Object.assign(gotOptions, this.auth);
    }
    const endpoint = `https://api.github.com/repos/${this.owner}/${this.name}/git/ref/heads/master`;
    const res = await got(endpoint, gotOptions);
    const sha: string = JSON.parse(res.body).object.sha;
    return sha.substr(0, 7);
  }

  public async downloadAndExtract(dir: string, debug=false): Promise<void> {
    // https://developer.github.com/v3/repos/contents/#download-a-repository-archive
    const endpoint = `https://api.github.com/repos/${this.owner}/${this.name}/tarball/heads/master`;
    if (debug) {
        console.log(`fetching endpoint: ${endpoint}`)
    }
    const gotOptions = {};
    if (this.auth) {
      Object.assign(gotOptions, this.auth);
    }
    const sha = await this.getMasterShortRef();
    if (debug) {
        console.log(`starting stream of tarball into: ${dir}`)
    }
    return pipeline(
        got.stream(endpoint, gotOptions),
        tar.extract(
            { cwd: dir, strip: 3, strict: true },
            [`cdk-tools-templates-${sha}/${this.filepath}`]
        )
    );
  }
}
