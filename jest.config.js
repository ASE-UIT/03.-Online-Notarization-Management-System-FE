module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/tests/mocks/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios|react-markdown|vfile|unist|unified|bail|is-plain-obj|trough|remark-parse|mdast-util-from-markdown|micromark|decode-named-character-reference|character-entities|mdast-util-to-string|space-separated-tokens|comma-separated-tokens|property-information|hast-util-whitespace)/)',
  ],
  testPathIgnorePatterns: ['src/App.test.js'],
};
