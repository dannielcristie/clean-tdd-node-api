module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],
  watchPathIgnorePatterns: ['globalConfig'],
  preset: '@shelf/jest-mongodb'
}
