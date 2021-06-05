import type { Parser } from 'prettier';

export interface Node {
  readonly structure: string;
  readonly rules: Readonly<string[]>;
}

const regex = /: ?"([^"]+)"/g;
export const ruleString = '~~rule~~';

const parse: Parser<Node>['parse'] = (text) => {
  const rules: string[] = [];
  const structure = text.replace(regex, (_match, rule) => {
    rules.push(rule);
    return `: "${ruleString}"`;
  });
  return {
    structure,
    rules,
  };
};

export const parser: Parser<Node> = {
  parse,
  astFormat: 'firebase-database',
  locStart: () => 0,
  locEnd: () => 0,
};
