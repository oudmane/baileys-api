import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	{
		extends: compat.extends(
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			"prettier",
		),

		plugins: {
			"@typescript-eslint": typescriptEslint,
		},

		languageOptions: {
			globals: {
				...globals.node,
			},

			parser: tsParser,
		},

		rules: {
			semi: [
				"error",
				"always",
				{
					omitLastInOneLineClassBody: true,
				},
			],

			quotes: ["error", "double"],
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/no-non-null-assertion": "off",
		},
	},
]);
