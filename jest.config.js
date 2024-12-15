/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js'
    }
};

module.exports = config;
