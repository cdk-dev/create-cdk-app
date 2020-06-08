import { Stream } from 'stream';
import { promisify } from 'util';
import got from 'got';
import tar from 'tar';

const pipeline = promisify(Stream.pipeline);

export async function downloadAndExtractRepo(root: string, username: string, repo: string): Promise<void> {
    const endpoint = `https://api.github.com/repos/${username}/${repo}/tarball`;
    const options = { cwd: root };
    return pipeline(
        got.stream(endpoint),
        tar.extract(options, [''])
    )
}