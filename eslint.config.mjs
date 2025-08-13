import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base configurations - Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Prettier integration - should be last to override other configs
  ...compat.extends("prettier"),
  
  {
    plugins: {
      // Use the imported plugin object instead of string
      prettier: prettierPlugin
    },
    rules: {
      // ESLint rules for code quality (not formatting)
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      
      // Run prettier as an ESLint rule
      "prettier/prettier": "error"
    }
  },
];

export default eslintConfig;
