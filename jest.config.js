module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-paper)/)"
  ],
  moduleNameMapper: {
    "^react-native-paper$": "<rootDir>/__mocks__/react-native-paper.js"
  },
};
