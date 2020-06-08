import prompts from 'prompts';
import got from 'got';

const TEMPLATES_REPO_ID='270079803';

// https://github.com/aws-samples/aws-cdk-examples?files=1
const exampleLanguages = [
  'typescript',
  'python',
  'java',
  'csharp'
];

interface Auth {
  username: string,
  password: string;
}

function checkGithubAuth(): Auth | undefined {
  const username = process.env.GITHUB_USERNAME;
  const password = process.env.GITHUB_TOKEN;

  if (username && password) {
    return {
      username,
      password
    };
  } else {
    return undefined;
  }
}

async function listRepoPath(repoId: string, path: string): Promise<any> {
  const options = {};
  const auth = checkGithubAuth();
  if (auth) {
    Object.assign(options, auth);
  }
  const endpoint = `https://api.github.com/repositories/${repoId}/${path}`;
  const res = await got(endpoint, options);
  return JSON.parse(res.body);
}

async function listTemplates(): Promise<any> {
  try {
    return listRepoPath(TEMPLATES_REPO_ID, `contents/templates`);
  } catch (e) {
    console.error(`Failed to list templates`);
    process.exit(1);
  }
}

async function chooseTemplate() {
  const choices = await listTemplates();
  const example = await prompts({
    type: 'select',
    name: 'value',
    message: 'Select template',
    choices: choices.map((choice: any) => {
      return {
        title: choice.name,
        value: choice.name
      }
    })
  });
  
  if (!example.value) {
    console.log('Please specify a template');
    process.exit(1);
  }

  return example.value;
}

async function listCdkExamplesByLanguage(language: string): Promise<any> {
  console.log(`listing cdk examples for language: ${language}`)
  try {
    return listRepoPath('168772474', `contents/${language}`);
  } catch (e) {
    console.error(`Failed to list examples for language: ${language}.`);
    process.exit(1);
  }
}

async function chooseCdkExample(language: string) {
  const choices = await listCdkExamplesByLanguage(language);
  const example = await prompts({
    type: 'select',
    name: 'value',
    message: 'Pick an example',
    choices: choices.map((choice: any) => {
      return {
        title: choice.name,
        value: choice.name
      }
    })
  });
  
  if (!example.value) {
    console.log('Please specify an example');
    process.exit(1);
  }

  return example.value;
}

async function chooseLanguage(): Promise<string> {
  const language = await prompts({
    type: 'select',
    name: 'value',
    message: 'Pick a language',
    choices: exampleLanguages.map(language => {
      return {
        title: language,
        value: language
      }
    })
  });
  
  if (!language.value) {
    console.log('Please specify the language');
    process.exit(1);
  }
  
  return language.value;
}

export async function promptForTemplate(): Promise<string> {
  // choose cdktools, aws examples, default
  const template = await prompts({
    type: 'select',
    name: 'value',
    message: 'Pick a template',
    choices: [
      { title: 'Default cdk app', value: 'default' },
      { title: 'Example from aws-examples/cdk-examples', value: 'cdk-examples' },
      { title: 'Example from the cdk-tools/templates repo', value: 'templates' }
    ],
  });

  if (!template.value) {
    console.log('Please specify a template');
    process.exit(1);
  }
  
  // if default return default
  let choice: string;
  if (template.value === 'default') {
    choice = 'default';
  } else if (template.value === 'cdk-examples') {
    const language = await chooseLanguage();
    choice = await chooseCdkExample(language);
  } else if (template.value === 'templates') {
    const templateName = await chooseTemplate();
    choice = `https://api.github.com/repositories/${TEMPLATES_REPO_ID}/contents/templates/${templateName}`;
  } else {
    console.error(`Unknown template: ${template.value}`);
    process.exit(0);
  }

  return choice;
}