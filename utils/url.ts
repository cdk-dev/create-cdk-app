export function isUrl(url: string) {
  try {
     new URL(url);
     return true;
   } catch (err) {
     return err.code !== 'ERR_INVALID_URL';
   }
}

export function validateUrl(address: string): void {
  const url = URL(address);
  
  if (url.origin !== 'https://github.com') {
    console.error('only github repos are supported right now');
    process.exit(1);
  }
}

export async function isUrlOk(url: string): Promise<boolean> {
  const res = await got(url).catch((e) => e)
  return res.statusCode === 200
}

export function hasTemplate(name: string, packageFile: string): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/cdk-tools/templates/contents/templates/${encodeURIComponent(
      name
    )}/${packageFile}`
  )
}

export async function listTemplates(repoId=''): Promise<any> {
  const res = await got(
    `https://api.github.com/repositories/${repoId}/contents/templates`
  )
  return JSON.parse(res.body)
}

export function getTemplateUrl(template: string): URL {
    if (isUrl(template)) {
      return { templateUrl: URL(template);
    } else {
      return URL('https://github.com/cdk-tools/templates');
    }
}