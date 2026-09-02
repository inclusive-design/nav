import { defineConfig } from 'eslint/config';
import eslintConfigInclusiveDesign from '@inclusive-design/eslint-config';

export default defineConfig([
	{
		extends: [eslintConfigInclusiveDesign],
		rules: {
			'new-cap': ['error', { capIsNewExceptionPattern: '^Elena' }],
			'no-constant-binary-expression': 'off',
			'unicorn/no-top-level-side-effects': 'off',
		},
	},
	{
		ignores: ['dist/**', 'README.md'],
	},
]);
