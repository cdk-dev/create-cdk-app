export abstract class Downloader {
  public abstract async downloadAndExtract(): void;
  public abstract async hasTemplate(): boolean;
}