import { expect } from '@jest/globals';
import type { MatcherFunction } from 'expect';
import { isUUID } from 'class-validator';

expect.extend({
  toBeValidUUID(actual) {
    if (typeof actual !== 'string') {
      throw new Error('Input must be of type string!');
    }
    const pass = isUUID(actual, 'all');
    return {
      message: pass
        ? () => `expected ${actual} not to be a valid UUID string`
        : () => `expected ${actual} to be a valid UUID string`,
      pass: pass,
    };
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Expect {
      toBeValidUUID(): string;
    }
    interface ExpectExtendMap {
      setContaining: MatcherFunction<[expected: string[]]>;
    }
  }
}
