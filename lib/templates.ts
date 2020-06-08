import prompts from 'prompts';

// https://github.com/aws-samples/aws-cdk-examples?files=1
const exampleLanguages = [
  'typescript',
  'python',
  'java',
  'csharp'
];

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