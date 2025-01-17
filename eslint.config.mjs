import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            // Disable the rule entirely
            "@typescript-eslint/no-unused-vars": "off",

            // Alternatively, set it to "warn" or configure it
            // "@typescript-eslint/no-unused-vars": [
            //   "warn",
            //   {
            //     "vars": "all",
            //     "varsIgnorePattern": "^_",
            //     "args": "after-used",
            //     "argsIgnorePattern": "^_"
            //   }
            // ]
        },
    },
];

export default eslintConfig;
