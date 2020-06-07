export abstract class Resolver {
  public abstract readonly url: string;
  public abstract async downloadAndExtract(): Promise<void>;
  public abstract async hasTemplate(): Promise<Boolean>;
}