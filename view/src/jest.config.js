module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^native-base$': '<rootDir>/__mocks__/native-base.js',
  },
  testEnvironment: 'jsdom', // Assicurati che l'ambiente di test sia jsdom
};
