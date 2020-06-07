export abstract class Resolver {
  public abstract async downloadAndExtract(): void;
  public abstract async hasTemplate(): Promise<Boolean>;
}