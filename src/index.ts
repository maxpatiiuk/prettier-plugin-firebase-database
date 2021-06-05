import type { Parser, Printer, SupportLanguage } from 'prettier';

import type { Node } from './parser';
import { parser } from './parser';
import { printer } from './printer';

const pluginName = 'firebase-database';

export const languages: Readonly<SupportLanguage[]> = [
  {
    name: pluginName,
    parsers: [pluginName],
    extensions: ['.rules'],
    vscodeLanguageIds: ['firebasedatabaserules'],
  },
];

export const parsers: Readonly<Record<typeof pluginName, Parser<Node>>> = {
  [pluginName]: parser,
};

export const printers: Readonly<Record<typeof pluginName, Printer<Node>>> = {
  [pluginName]: printer,
};
