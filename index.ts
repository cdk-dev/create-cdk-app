#!/usr/bin/env node
import path from 'path';
import arg from 'arg';
import checkForUpdate from 'update-check';
import packageJson from './package.json';
import { createApp } from './lib/create-app';
import { promptForTemplate } from './lib/templates';

console.log('This package is still in developmet. Features will not work correctly until the dirst minor release');

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '--debug': Boolean,
  '--template': String,
  '-t': '--template',
  '-v': '--version',
  '-h': '--help',
  '-d': '--debug'
});

if (args['--version']) {
  console.log(`create-cdk-app v${packageJson.version}`);
  process.exit(0);
}

if (args['--help']) {
  console.log(`
    Usage
      $ create-cdk-app <project-directory>
    Options
      --template, -t  Template [name]|[url]
      --version, -v   Version number
      --help, -h      Displays this message
      --debug, -d     Enable verbose logging
  `);
  process.exit(0);
}

const debug = args['--debug'] ? args['--debug'] : false;

async function run() {
  const template = args['--template'] ? args['--template'] : promptForTemplate();
  if (args._.length === 0) {
    // no directory specified
  }
  
  const projectPath = path.resolve(args._[0]);
  // const projectName = path.basename(projectPath);
  
  await createApp({
    template,
    projectPath
  });
}

const update = checkForUpdate(packageJson).catch(() => null)

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
