# create-cdk-app

**WIP**

## Usage

**NPM**

```bash
$ npx create-cdk-app
```

**Yarn**

```bash
$ yarn create cdk-app
```

### A template from [templates]()

```bash
$ yarn create cdk-app -t my-app
```

### An example from [CDK examples](https://github.com/aws-samples/aws-cdk-examples)

```bash
$ yarn create cdk-app -t my-app
```

## Authentication

It is highly recommended that you set the following to environment variables:

```bash
GITHUB_USERNAME=<your username>
GITHUB_TOKEN=<personal access|oauth token>
```

These will be pulled in and used for all github-related requests.

Github rate-limits api calls to [5000 an hour]() if you're not using authentication. This limit is easily reached if you use a lot of other tools that are making these types of requests, or if you share an internet connection with many other people interacting with github.

Using authentication also comes with the added benefit of being able to use private repos as template sources.

## Adding a template

## Contributing
