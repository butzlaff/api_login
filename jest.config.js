module.exports = {
  roots: ['<rootDir>./src/', '<rootDir>./__tests__/'],
  testRegex: './*\\.test\\.js$',
  testTimeout: 180000,
  testPathIgnorePatterns: [
    './node_modules/', 
    './__tests__/mocks/*',
    '<rootDir>./src/lib/*',
    '<rootDir>./src/auth/*',
  ],
};
