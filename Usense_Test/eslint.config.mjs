import globals from "globals";
import tseslint from "typescript-eslint";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import js from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["tsconfig.json"]
      },
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@angular-eslint": angular
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "_"
        }
      ],
      "@typescript-eslint/array-type": "error"
    }
  },
  {
    files: ["*.ts"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@angular-eslint/recommended",
      "plugin:@angular-eslint/template/process-inline-templates"
    ],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          "type": "attribute",
          "prefix": "usense",
          "style": "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          "type": "element",
          "prefix": "usense",
          "style": "kebab-case"
        }
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          "overrides": {
            "constructors": "off"
          }
        }
      ],
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "default",
          "format": ["camelCase"],
          "modifiers": ["public"]
        },
        {
          "selector": "variable",
          "format": ["camelCase", "StrictPascalCase", "UPPER_CASE"]
        },
        {
          "selector": ["variable"],
          "prefix": ["is", "has"],
          "types": ["boolean"],
          "format": ["StrictPascalCase"]
        },
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
          "selector": ["property", "parameterProperty", "method", "accessor"],
          "modifiers": ["private", "readonly"],
          "format": ["camelCase"]
        },
        {
          "selector": ["property", "parameterProperty", "method", "accessor"],
          "modifiers": ["private"],
          "format": ["camelCase"]
        },
        {
          "selector": "enum",
          "format": ["StrictPascalCase"]
        },
        {
          "selector": "enumMember",
          "format": ["StrictPascalCase"]
        }
      ],
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "*", "next": "return" },
        { "blankLine": "always", "prev": "*", "next": "try" },
        { "blankLine": "always", "prev": "*", "next": "if" },
        { "blankLine": "always", "prev": "*", "next": "switch" },
        { "blankLine": "always", "prev": "*", "next": "while" },
        { "blankLine": "always", "prev": "*", "next": "function" },
        { "blankLine": "always", "prev": "*", "next": "break" },
        { "blankLine": "always", "prev": ["default"], "next": "*" },
        { "blankLine": "always", "prev": ["case"], "next": ["default"] },
        { "blankLine": "always", "prev": ["const", "let"], "next": "*" },
        { "blankLine": "any", "prev": ["const", "let"], "next": ["const", "let"] },
        { "blankLine": "always", "prev": ["if", "try", "switch", "while", "function"], "next": "*" }
      ],
      "lines-between-class-members": ["error", "always"]
    }
  },
  {
    files: ["*.html"],
    plugins: {
      "@angular-eslint/template": angularTemplate
    },
    extends: ["plugin:@angular-eslint/template/recommended"],
    rules: {}
  }
];
