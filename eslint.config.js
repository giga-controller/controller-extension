import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default antfu(
  {
    rules: {
      "tailwindcss/migration-from-tailwind-2": "off",
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "antfu/top-level-function": "off",
      "eslintperfectionist/sort-named-imports": "off",
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-named-imports": "off",
      "object-shorthand": "off",
      "no-console": "off",
      "ts/consistent-type-definitions": "off",
    },
  },
  ...compat.config({
    extends: [
      "plugin:tailwindcss/recommended",
      "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["tsconfig.*"],
  }),

  // shadcn/ui
  ...compat.config({
    ignorePatterns: [
      "src/components/ui/*",
      "src/lib/utils.ts",
      "tailwind.config.js",
    ],
  }),
);
