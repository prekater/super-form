// eslint.config.mjs
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const sourceFiles = ["**/*.{js,mjs,cjs,jsx,ts,tsx}"];

export default defineConfig([
    {
        ignores: ["dist/**", "build/**", "coverage/**", "node_modules/**"],
    },

    // Базовые JS-правила
    js.configs.recommended,

    // Базовые TS-правила
    ...tseslint.configs.recommended,

    // Глобальные переменные для браузера
    {
        files: sourceFiles,
        languageOptions: {
            globals: globals.browser,
        },
    },

    // React
    {
        files: sourceFiles,
        ...react.configs.flat.recommended,
        settings: {
            react: {
                version: "detect",
            },
        },
    },

    // React JSX runtime
    {
        files: sourceFiles,
        ...react.configs.flat["jsx-runtime"],
    },

    // React Hooks
    {
        files: sourceFiles,
        ...reactHooks.configs.flat.recommended,
    },

    // Prettier (отключает конфликтующие формат-правила ESLint)
    eslintConfigPrettier,
]);