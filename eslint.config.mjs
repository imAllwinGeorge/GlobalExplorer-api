import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import jsoncPlugin from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";

export default [
  {
    ignores: ["dist/", "node_modules/", "package-lock.json", "tsconfig.json"],
  },
  {
    ...js.configs.recommended,
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-empty-interface": "warn",
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.json"],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      jsonc: jsoncPlugin,
    },
    rules: {
      "jsonc/auto": "error",
      "jsonc/no-dupe-keys": "error",
      "jsonc/no-octal-escape": "error",
      "jsonc/valid-json-number": "error",
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
