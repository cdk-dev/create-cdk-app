#!/usr/bin/env node
import arg from 'arg';
import checkForUpdate from 'check-update';
import package from './package.json';
// import { createApp } from './app';

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '--debug': Boolean,
  '-v': '--version',
  '-h': '--help',
  '-d': '--debug'
});

if (args['--version']) {
  console.log(`create-cdk-app v${package.version}`);
  process.exit(0);
}

if (args['--help']) {
  console.log(`
    Usage
      $ create-cdk-app <template> <project-directory>
    Arguments
     <template>       Name of the template
      <project-directory>
    Options
      --version, -v   Version number
      --help, -h      Displays this message
      --debug, -d     Enable verbose logging
  `);
  process.exit(0);
}

const debug = args['--debug'] ? args['--debug'] : false;

async function run() {
  console.log('run');
}

const update = checkForUpdate(package).catch(() => null)

async function notifyUpdate(): Promise<void> {
  try {
    const res = await update
    if (res?.latest) {
      console.log('A new version of `create-cdk-app` is available!')
      console.log(
        'You can update by running: yarn global add create-cdk-app');
    }
    process.exit();
  } catch {
    // ignore error
  }
}

run()
  .then(notifyUpdate)
  .catch(async (reason) => {
    console.log('Aborting installation.');
    console.log('Unexpected error');
    console.log(reason);
    await notifyUpdate();
    process.exit(1);
  })
