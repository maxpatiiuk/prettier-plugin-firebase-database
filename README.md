# Firebase Rules Formatter

Formatter for Firebase Realtime Database Rules with type safety

## Usage

Install this package:

```bash
npm install firebase-rules-formatter
```

Import the library into your script:

```js
import formatFirebaseRules, { ref } from 'firebase-rules-formatter';
```

Use the formatter:

```js
const formattedRulesString = formatFirebaseRules(({ newData, auth }) => ({
  read: false,
  write: false,
  schema: {
    users: {
      schema: {
        $userId: {
          write: () =>
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
console.log(formattedRulesString);
```
