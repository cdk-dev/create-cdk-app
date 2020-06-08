import prompts from 'prompts';
import got from 'got';
import { capitalize } from './utils';

// https://github.com/aws-samples/aws-cdk-examples?files=1
const exampleLanguages = [
  'typescript',
  'python',
  'java',
  'csharp'
];

async function listCdkExamplesByLanguage(language: string): Promise<void> {
  return
}

async function listRepoPath(repoId: string, path: string): Promise<any> {
  const res = await got(
    `https://api.github.com/repositories/${repoId}/contents/${path}`
  )
  return JSON.parse(res.body)
}

async function listCdkTemplates(language: string): Promise<any> {
  return listRepoPath('', 'contents/templates');
}

async function chooseLanguage(): Promise<String> {
  const language = await prompts({
    type: 'select',
    name: 'value',
    message: 'Pick a language',
    choices: exampleLanguages.map(language => {
      return {
        title: capitalize(language),
        value: language
      }
    })
  });
  
  return language;
}

export async function promptForTemplate(): Promise<string> {
  // choose cdktools, aws examples, default
  const template = await prompts({
    type: 'select',
    name: 'value',
    message: 'Pick a template',
    choices: [
      { title: 'Default cdk app', value: 'default' },
      { title: 'Example from the cdk examples repo', value: 'cdk-examples' },
      { title: 'Example from the templates repo', value: 'cdk-templates' },
    ],
  });
  
  if (!template.value) {
    console.log('Please specify the template');
    process.exit(1);
  }
  
  // if default return default
  if (template.value === 'default') {
    console.log('default');
  } else if (template.value === 'cdk-examples') {
    console.log('examples');
  } else if (template.value === 'cdk-templates') {
    console.log('templates');
  } else {
    console.error('');
    process.exit(0);
  }

  return '';
}