import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "no-console": 1,
      "@typescript-eslint/no-unused-vars": 1,
      "@typescript-eslint/no-explicit-any": 1,
      "import/extensions": 0,
      "import/no-duplicates": 2,
      "import/no-useless-path-segments": 1,
      "import/prefer-default-export": "off",
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
          extensions: [".ts", ".tsx"],
          paths: ["./src"],
          baseUrl: "./",
          tsconfigRootDir: "./",
        },
        node: {
          paths: ["./src"],
        },
      },
    },
  }),
];

export default eslintConfig;
