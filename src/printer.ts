import type { Printer } from 'prettier';
import { format } from 'prettier';

import type { Node } from './parser';
import { ruleString } from './parser';

const MIN_PRINT_WIDTH = 30;

const print: Printer<Node>['print'] = ({ stack: [node] }, options) => {
  const lineEnding =
    {
      auto: '\n',
      crlf: '\n\r',
      cr: '\r',
      lf: '\n',
    }[options.endOfLine] ?? '\n';

  const indentSymbol = options.useTabs ? '\t' : ' ';

  const formattedStructure = format(node.structure, {
    ...options,
    parser: 'json-stringify',
  });

  const rules = Array.from(node.rules);

  const output = formattedStructure
    .split(lineEnding)
    .map((line) => {
      let rulePosition = line.search(ruleString);
      if (rulePosition === -1) return line;

      const rule = rules.shift();
      if (typeof rule === 'undefined')
        throw new Error('Failed printing the structure');

      const formattedRule = format(rule, {
        ...options,
        parser: 'babel',
        singleQuote: true,
        printWidth: options.printWidth - rulePosition,
        semi: false,
      }).trim();

      const splitRule = formattedRule.split(lineEnding);

      const wrapLine = options.printWidth - rulePosition < MIN_PRINT_WIDTH;
      if (wrapLine) rulePosition = line.search(/\S/) + options.tabWidth;

      const indentString = Array.from({
        length: options.useTabs
          ? Math.floor(rulePosition / options.tabWidth)
          : rulePosition,
      })
        .fill(indentSymbol)
        .join('');

      const indentedRule = wrapLine
        ? `${lineEnding}${splitRule
            .map((ruleLine) => `${indentString}${ruleLine}`)
            .join(lineEnding)}`
        : `${splitRule[0]}${splitRule.length === 1 ? '' : lineEnding}${splitRule
            .slice(1)
            .map((ruleLine) => `${indentString}${ruleLine}`)
            .join(lineEnding)}`;

      return `${line.slice(0, rulePosition)}${indentedRule}",`;
    })
    .join(lineEnding);

  if (rules.length > 0) throw new Error('Failed printing the structure');

  return output;
};

export const printer: Printer<Node> = {
  print,
};
