declare global {
  // allow tests to use `expect` globally
  var expect: typeof import('vitest')['expect'];
}

export {};
