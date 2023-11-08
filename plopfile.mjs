/* eslint-disable import/no-anonymous-default-export */
// NOTE: https://github.com/plopjs/plop/issues/296
import { spawnSync } from 'child_process';

export default function (plop) {
  plop.setActionType('script', (_answers, config) => {
    const { status } = spawnSync('yarn', [config.script], { shell: true, stdio: 'inherit' });
    if (status !== 0) throw new Error(`yarn ${config.script} failed`);
    return `yarn ${config.script} success`;
  });
  plop.setGenerator('model', {
    description: 'Create a model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your model name? (ex. user)',
      },
      {
        type: 'input',
        name: 'pluralName',
        message: 'What is your plural of model name? (ex. users)',
      },
      {
        type: 'confirm',
        name: 'subCollection',
        message: 'Is your model sub collection?',
        default: false,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'functions/packages/shared/src/types/{{name}}.ts',
        templateFile: 'plop/templates/model/shared/type.ts.hbs',
      },
      {
        type: 'modify',
        path: 'functions/packages/shared/src/types/index.ts',
        transform: (fileContent, { name }) => {
          const exportContent = `export * from './${name}';`;
          return `${fileContent}${exportContent}`;
        },
      },
      {
        type: 'add',
        path: 'functions/src/types/{{name}}.ts',
        templateFile: 'plop/templates/model/functions/type.ts.hbs',
      },
      {
        type: 'modify',
        path: 'functions/src/types/index.ts',
        transform: (fileContent, { name }) => {
          const exportContent = `export * from './${name}';`;
          return `${fileContent}${exportContent}`;
        },
      },
      {
        type: 'add',
        path: 'functions/src/models/{{name}}.ts',
        templateFile: 'plop/templates/model/functions/model.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/types/{{name}}.ts',
        templateFile: 'plop/templates/model/src/type.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/types/index.ts',
        transform: (fileContent, { name }) => {
          const exportContent = `export * from './${name}';`;
          return `${fileContent}${exportContent}`;
        },
      },
      {
        type: 'add',
        path: 'src/models/{{name}}/index.ts',
        templateFile: 'plop/templates/model/src/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{name}}/{{name}}.ts',
        templateFile: 'plop/templates/model/src/model.ts.hbs',
      },
      {
        type: 'script',
        script: 'update:shared',
      },
      {
        type: 'script',
        script: 'format',
      },
    ],
  });
}
