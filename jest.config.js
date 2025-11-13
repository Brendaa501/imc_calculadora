module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-toastify)/)",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
