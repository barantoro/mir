/** @type {import('jest').Config} */
module.exports = {
    // preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'vue'],
    testMatch: ['**/tests/**/*.spec.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
}
