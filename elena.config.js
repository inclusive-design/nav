import pkg from './package.json' with { type: 'json' };

/**
 * @type {import("@elenajs/bundler").ElenaConfig}
 */
export default {
	input: 'src',
	output: {
		dir: 'dist',
		format: 'esm',
		sourcemap: true,
	},
	bundle: 'src/index.js',
	banner: `/**
 * ${pkg.name} v${pkg.version}
 * (c) 2026–present OCAD University
 * @license BSD-3-Clause
 */`,
};
