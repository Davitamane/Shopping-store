import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";

export default [
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.{js,jsx}"],
    ...reactRecommended,
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
    },
    rules: {
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "no-undef": "error",
      "import/no-unresolved": "error",
      "import/named": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];
