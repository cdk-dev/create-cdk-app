export abstract class Resolver {
  public abstract async downloadAndExtract(path: string, debug?: boolean): Promise<void>;
}
