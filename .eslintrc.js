module.exports = {
    root: true,
    ignorePatterns: ['node_modules/**', 'build/**'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react-hooks', "prettier"],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        'typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_' }
        ],
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        '@typescript-eslint/prefer-as-const': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-this-alias': 0,
        'prefer-const': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'warn',
        'react/display-name': 'warn',
        'react/react-in-jsx-scope': 0,
        'react/jsx-key': 'warn',
        'react/no-children-prop': 'error',
        'react/no-render-return-value': 0,
        'react/prop-types': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
    }
};
