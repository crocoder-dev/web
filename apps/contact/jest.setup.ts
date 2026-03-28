// Step 1: Polyfill encoders
import { TextEncoder, TextDecoder } from "util";
(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;

// Step 2: Polyfill ReadableStream
import { ReadableStream } from "web-streams-polyfill";
(globalThis as any).ReadableStream = ReadableStream;

// Step 3: Polyfill Web Fetch APIs using undici
import { fetch, Response, Request, Headers } from "undici";
(globalThis as any).fetch = fetch;
(globalThis as any).Response = Response;
(globalThis as any).Request = Request;
(globalThis as any).Headers = Headers;

if (typeof clearImmediate === "undefined") {
  (global as any).clearImmediate = (id: any) => {
    return clearTimeout(id);
  };
}

if (typeof setImmediate === "undefined") {
  (global as any).setImmediate = (fn: Function, ...args: any[]) => {
    return setTimeout(fn, 0, ...args);
  };
}

afterEach(async () => {
  jest.resetAllMocks();
});
