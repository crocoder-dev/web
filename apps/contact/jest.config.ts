import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: false,
        tsconfig: "tsconfig.json",
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(nanoid)/)", // ensure nanoid gets transformed
  ],
  moduleFileExtensions: ["cjs", "js", "ts", "tsx", "json", "node"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/tests/playwright/"],
};

export default config;
