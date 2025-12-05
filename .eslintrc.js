module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    'no-irregular-whitespace': 'error',
    'react/no-unescaped-entities': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      excludedFiles: ['**/ai-chat.tsx', '**/LexicalToolbar.tsx'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'Literal[value=/&#\\d+;/]',
            message: 'HTML entities like &#39; are not allowed. Use proper quotes or escape characters instead.',
          },
          {
            selector: 'Literal[value=/&[a-z]+;/i]',
            message: 'HTML entities like &apos; &quot; are not allowed. Use proper quotes or escape characters instead.',
          },
        ],
      },
    },
    {
      files: ['**/ai-chat.tsx'],
      rules: {
        'no-restricted-syntax': 'off',
      },
    },
  ],
};
