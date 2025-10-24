import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // keep Next.js defaults
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 👇 add this block to configure Tailwind rules
  {
    plugins: {
      tailwindcss: require("eslint-plugin-tailwindcss"),
    },
    rules: {
      // disable the canonical class warning
      "tailwindcss/enforces-canonical-classes": "off",
      // optionally disable other Tailwind nags
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-custom-classname": "off",
    },
  },
];

export default eslintConfig;
