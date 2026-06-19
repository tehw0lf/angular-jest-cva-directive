import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      // Newly enabled by the angular-eslint tsRecommended preset in v9; was not enforced before the upgrade.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      // Newly enabled by the angular-eslint tsRecommended preset in v9; was not enforced before the upgrade.
      '@angular-eslint/prefer-inject': 'off',
      // Newly enabled by typescript-eslint v8 recommended; was not enforced before the upgrade.
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  ...nx.configs['flat/angular-template'],
];
