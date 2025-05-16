const nextJest = require('next/jest');

const createJestConfig = nextJest({
  //  path to Next.js app to load next.config.js and .env files
  dir: './',
});

// Any custom config goes here!!!
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Handle module aliases
  },

  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],   // Add setup options before each test is run

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }], // Use babel-jest to transpile tests with the next/babel preset
  },
  
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$', // Ignore CSS modules
  ],
};

// exporting to be used by next/jest
module.exports = createJestConfig(customJestConfig);
