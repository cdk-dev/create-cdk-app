import { Downloader } from './downloader';
import { GithubDownloader } from './github';

const downloaders = {
  'https://github.com': Github
};

export const getDownloader(origin: string): Downloader {
  if(!(origin in downloaders)) {
    throw new Error(`no downloader available to handler ${origin}`);
  }
  return downloaders[origin];
}