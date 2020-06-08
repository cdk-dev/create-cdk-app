export abstract class Resolver {
  public abstract readonly url: string;
  public abstract async downloadAndExtract(root: string, username: string, repo: string): Promise<void>;
  public abstract async hasTemplate(name: string, packageFile?: string): Promise<Boolean>;
}