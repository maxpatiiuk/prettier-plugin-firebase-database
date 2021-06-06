import { format } from 'prettier';
import { readFileSync } from 'fs';

test('Try to pretty-print a file', () =>
  expect(
    format(readFileSync('./__tests__/example.1.in.rules').toString(), {
      plugins: ['./lib'],
      parser: 'firebase-database'
    })
  ).toBe(readFileSync('./__tests__/example.out.rules').toString())
);

test('Try to pretty-print a minified file', () =>
  expect(
    format(readFileSync('./__tests__/example.2.in.rules').toString(), {
      plugins: ['./lib'],
      parser: 'firebase-database'
    })
  ).toBe(readFileSync('./__tests__/example.out.rules').toString())
);
