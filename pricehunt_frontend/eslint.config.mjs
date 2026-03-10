import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      "build/",
      "dist/",
      "*.log",
      "*.tmp",
      "*.tsbuildinfo",
      "coverage/",
      ".vscode/",
      ".idea/",
      "*.config.mjs",
      "*.config.js",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Your custom rules here
    },
  },
  {
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        Promise: "readonly",
        HTMLElement: "readonly",
        navigator: "readonly",
      },
    },
  },
];
