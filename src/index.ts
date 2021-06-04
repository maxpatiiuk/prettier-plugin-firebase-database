import prettier from 'prettier';

type Data = {
  readonly val: () => unknown;
  readonly exists: () => boolean;
  readonly hasChild: (child: string) => boolean;
  readonly hasChildren: (children: Readonly<string[]>) => boolean;
};

type Operation = boolean | (() => boolean);

type MetaKeys = 'read' | 'write' | 'validate';
type RuleLevel = Readonly<Partial<Record<MetaKeys, Operation>>> & {
  readonly indexOn?: Readonly<string[]>;
  readonly schema?: Record<string, RuleLevel>;
};

type Auth = {
  readonly uid: string;
};

export function ref(name: string): string {
  return name;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ResolvedRules
  extends Readonly<
    Record<string, ResolvedRules | boolean | string | Readonly<string[]>>
  > {}

const formatFunction = (
  operation: Exclude<Operation, boolean>,
  indent: string
): string =>
  (prettier.format(operation.toString(), { parser: 'babel' }) as string)
    .split('\n')
    .slice(1)
    .map((line) => line.slice(indent.length))
    .join('\n');

const isArray = (value: unknown): value is Readonly<unknown[]> =>
  Array.isArray(value);

const resolveFunctions = (
  rulesObject: RuleLevel,
  indent: string
): ResolvedRules =>
  Object.entries(rulesObject)
    .map(([key, value]) => [
      key,
      typeof value === 'object' && !isArray(value)
        ? resolveFunctions(value, indent)
        : typeof value === 'function'
        ? formatFunction(value, indent)
        : value!,
    ])
    .reduce<ResolvedRules>((object, [key, value]) => {
      if (key === 'schema' && typeof value === 'object' && !isArray(value))
        object = {
          ...object,
          ...value,
        };
      // @ts-expect-error Writing to a read-only value here
      else object[key] = value;
      return object;
    }, {});

export default function formatRules(
  rules: ({
    newData,
    data,
    root,
    auth,
  }: {
    readonly newData: Data;
    readonly data: Data;
    readonly root: Data;
    readonly auth: Auth;
  }) => RuleLevel,
  indent = '  '
): string {
  const data = undefined as unknown as Data;
  const auth = undefined as unknown as Auth;
  const rulesObject = rules({ newData: data, data, root: data, auth });
  return JSON.stringify(
    resolveFunctions(rulesObject, indent),
    undefined,
    indent
  );
}

formatRules(({ newData, auth }) => ({
  read: false,
  write: false,
  schema: {
    users: {
      schema: {
        $userId: {
          write: (): boolean =>
            ref('$userId') === auth.uid &&
            (!newData.exists() ||
              newData.hasChildren([
                'subscribeToNewsletter',
                'sources',
                'postsContent',
                'listeningStats',
                'totalStats',
                'deletedPostsMeta',
                'deletedPostsContent',
              ])),
        },
      },
    },
  },
}));
