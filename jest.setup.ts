// jest.setup.ts
import "@testing-library/jest-dom";

// Polyfill for TextEncoder (required by effect, zod, etc.)
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
