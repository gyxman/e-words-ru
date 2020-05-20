module.exports = {
    preset: 'jest-preset-angular',
    setupFiles: ['<rootDir>/src/app/testing/localstorage-mock.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
