# create-cdk-app

Create CDK apps from templates.

## Usage

**NPM**

```bash
$ npx create-cdk-app
```

**Yarn**

```bash
$ yarn create cdk-app
```

If you choose a `default` template, you will be prompted to choose a language. This is then passed to a child-process that runs [cdk init](https://docs.aws.amazon.com/cdk/latest/guide/tools.html#cli-init). This requires [aws-cdk](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html) to be installed and available in the context of the shell.

### A template from [templates](https://github.com/cdk-tools/templates)

```bash
$ yarn create cdk-app -t default my-new-app
```

This will scaffold the [default](https://github.com/cdk-tools/templates/tree/master/templates/default) template into the `my-new-app` directory.

## Authentication

It is highly recommended that you set the following to environment variables:

```bash
GITHUB_USERNAME=<your username>
GITHUB_TOKEN=<personal access|oauth token>
```

These will be pulled in and used for all github-related requests.

Github will rate-limit you to 5000 calls per hour if you're not using authentication. This limit is easily reached if you use a lot of other tools that are making these types of requests, or if you share an internet connection with many other people interacting with github.

Using authentication also comes with the added benefit of being able to use private repos as template sources.

## Adding a template

Please review the template [contributing documentation](https://github.com/cdk-tools/templates/blob/master/CONTRIBUTING.md).

## Contributing

Please review the [contributing documentation](https://github.com/cdk-tools/create-cdk-app/blob/master/CONTRIBUTING.md).
