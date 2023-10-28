/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	verbose: true,
	testEnvironment: 'node',
	testRunner: 'jest-circus/runner',
	testMatch: [
		'**/dist/tests/**/*.test.js'
	],
	collectCoverage: true,
	collectCoverageFrom: [
		'**/dist/src/**/*.js',
		'!**/node_modules/**',
	]
};
