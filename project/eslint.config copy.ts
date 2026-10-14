import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist', '.circleci/config.yml'] },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            import: importPlugin,
            react: reactPlugin,
            prettier: prettierPlugin,
        },
        extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
        rules: {
            // Ensure Prettier errors show up in ESLint
            'prettier/prettier': 'error',

            // React Refresh
            // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            // Semicolon enforcement
            semi: ['error', 'always'],

            // Unused variable warning
            '@typescript-eslint/no-unused-vars': ['warn'],

            // Quotes
            quotes: ['error', 'single', { avoidEscape: true }],
            'jsx-quotes': ['error', 'prefer-single'], // Enforces single quotes in JSX

            // Indentation
            // indent: ['error', 4, { SwitchCase: 1 }],

            // Import sorting
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                },
            ],

            // Ignore useEffect dependencies (use with caution)
            'react-hooks/exhaustive-deps': 'off',

            // Trailing spaces
            'no-trailing-spaces': 'error',

            // Disallow unused variables
            'no-unused-vars': 'off', // disable base rule

            // Disable base no-use-before-define
            'no-use-before-define': 'off',

            // Disallow use before definition (TS-aware)
            '@typescript-eslint/no-use-before-define': [
                'error',
                {
                    variables: false,
                    functions: false,
                },
            ],

            // Disable prop-types check (not needed with TypeScript)
            'react/prop-types': 'off',

            // Allow default exports without names
            'import/no-anonymous-default-export': 'off',

            // Disable requiring display name on React components
            'react/display-name': 'off',

            // Disable forcing class methods to use `this`
            'class-methods-use-this': 'off',

            // Disable base no-shadow rule
            'no-shadow': 'off',

            // Disallow variable shadowing (TS-aware)
            '@typescript-eslint/no-shadow': ['error'],

            // Disable line length restriction
            'max-len': 'off',

            // Allow omitting parens in arrow functions
            'arrow-parens': 'off',

            // Disable enforcing implicit arrow linebreaks
            'implicit-arrow-linebreak': 'off',

            // Disable specific linebreak style (LF/CRLF)
            'linebreak-style': 0,

            // Enforce consistent JSX indentation
            'react/jsx-indent': [1, 4],

            // Enforce consistent props indentation
            'react/jsx-indent-props': [1, 4],

            // Allow JSX in specific extensions
            'react/jsx-filename-extension': [
                1,
                {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            ],

            // Allow props spreading in JSX
            'react/jsx-props-no-spreading': 'off',

            // Enforce consistent line breaks inside curly braces
            'object-curly-newline': [2, { consistent: true }],

            // Allow variables starting with `_`
            'no-underscore-dangle': 'off',

            // Allow concise arrow bodies
            'arrow-body-style': 'off',

            // Warn about unused state in class components
            'react/no-unused-state': 'warn',

            // Allow importing devDependencies in any file
            'import/no-extraneous-dependencies': [
                1,
                {
                    devDependencies: true,
                },
            ],

            // Disable cycle check in import paths
            'import/no-cycle': 'off',

            // Enforce no extensions in import paths
            // 'import/extensions': ['error', 'ignorePackages', {
            //     js: 'never',
            //     jsx: 'never',
            //     ts: 'never',
            //     tsx: 'never'
            // }],

            // Disable explicit return types on modules
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            // Allow mutating function parameters (e.g., req.body)
            'no-param-reassign': [
                'error',
                {
                    props: false,
                },
            ],

            // Enforce arrow function style for React components
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                },
            ],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        // rules: {
        //     // Require explicit return types for TS modules
        //     '@typescript-eslint/explicit-module-boundary-types': ['error']
        // }
    },
);
