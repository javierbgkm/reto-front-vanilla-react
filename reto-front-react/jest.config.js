export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.[tj]sx?$": ["babel-jest", { configFile: "./babel.config.cjs" }]
  },
  extensionsToTreatAsEsm: [".jsx"],
  testPathIgnorePatterns: ["/node_modules/", "/vanilla/"]
};
