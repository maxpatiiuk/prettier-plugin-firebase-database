import { format } from 'prettier';
import { readFileSync } from 'fs';
import { test, expect, toBe } from 'jest';

test('Try to preety-print a file', () => {
  expect(
    format(readFileSync('./example.in.rules').toString(), {
      plugins: ['../lib'],
    })
  );
});
