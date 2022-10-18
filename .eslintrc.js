module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:import/errors', 'plugin:import/warnings', 'google', 'prettier', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['simple-import-sort', 'prettier', 'html'],
	rules: {
		quotes: ['error', 'single'],
		'require-jsdoc': 'off',
		'max-len': [
			'error',
			{
				ignorePattern: '^import [^,]+ from |^export | implements',
				code: 150,
			},
		],
		'simple-import-sort/imports': 'warn',
		'comma-dangle': ['error', 'always-multiline'],
		'prettier/prettier': [
			'error',
			{
				trailingComma: 'all',
			},
		],
		indent: 'off',
		'spaced-comment': ['error', 'always', { markers: ['/'] }],
		'no-trailing-spaces': 'error',
		semi: ['error', 'always'],
		'no-shadow': ['error'],
		'jsx-quotes': ['error', 'prefer-double'],
		'arrow-parens': ['warn', 'always'],
		'no-console': 'warn',
		'import/no-unresolved': 'off',
		'no-unused-vars': 'warn',
	},
	settings: {
		'import/resolver': {
			node: {},
		},
	},
};
