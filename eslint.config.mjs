import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

// Flat Config (ESLint v9+)
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        //코드의 파싱 방식을 정의//
        ecmaFeatures: {
          jsx: true, //JSX를 인식하도록 설정//
        },
      },
      globals: {
        ...globals.browser, // globalThis, window, console, alert, ...
        ...globals.node, // global, process
        ...globals.node, // global, process, ...
      },
    },
  },
  pluginJs.configs.recommended, //JavaScript에 대한 권장 ESLint 설정
  pluginReact.configs.flat.recommended, //React에 대한 권장 ESLint 설정
  {
    rules: {
      //특정 ESLint 규칙을 정의
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
      "react/react-in-jsx-scope": "off", //React를 JSX 스코프 내에서 자동으로 인식하도록 설정
    },
  },
];
