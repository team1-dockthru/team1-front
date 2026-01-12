import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import checkFile from "eslint-plugin-check-file";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      "check-file": checkFile,
    },
    rules: {
      "prettier/prettier": "error",
      // import 순서 설정
      "no-unused-vars": "warn",
      "camelcase": ["error", { "properties": "always" }],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{js,jsx}": "KEBAB_CASE",
        },
        {
          "ignoreMiddleExtensions": true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/": "KEBAB_CASE",
        },
      ],
      "react/jsx-pascal-case": ["error", { "allowAllCaps": false }],
      
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "index"],
          pathGroups: [
            {
              pattern: "next",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["next"],
          "newlines-between": "always", // 그룹 간 줄바꿈
          alphabetize: { order: "asc", caseInsensitive: true }, // 알파벳 순
        },
      ],
    },
  },
  prettierConfig, // 마지막에 배치하여 다른 설정과의 충돌을 방지합니다.
  
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;