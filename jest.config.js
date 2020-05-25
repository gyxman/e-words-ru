module.exports = {
    preset: 'jest-preset-angular',
    setupFiles: ['<rootDir>/src/app/testing/localstorage-mock.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
