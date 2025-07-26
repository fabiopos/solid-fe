// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // 👈 Map @ to /src
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};

export default config;
