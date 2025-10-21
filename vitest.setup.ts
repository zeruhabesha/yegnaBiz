import { expect } from 'vitest';

// attach expect to the globalThis so tests can use it without importing
(globalThis as any).expect = expect;