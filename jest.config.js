module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js'],
  watchPathIgnorePatterns: ['globalConfig'],
  preset: '@shelf/jest-mongodb'
}
