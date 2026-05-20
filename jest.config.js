/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|png|jpg|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        module: 'commonjs',
        moduleResolution: 'node',
        jsx: 'react-jsx',
        esModuleInterop: true,
      },
    }],
  },
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts?(x)'],
};

module.exports = config;
