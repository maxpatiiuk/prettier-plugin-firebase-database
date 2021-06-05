# Prettier for Firebase rules

Formatter for Firebase Realtime Database Rules

## Usage

Install this package:

```bash
npm install --save-dev prettier prettier-plugin-firebase
```

Then run it like this:

```bash
prettier --write firebase_database.rules
```

By default, this plugin would try to parse all files with the extension `.rules`
as Firebase Realtime Database Rules. You can customize this behaviour though
configuration overwrites in your `.perttierrc` or equivalent:

```json
{
  "overrides": [
    {
      "files": "firebase_database_rules.yaml",
      "options": {
        "parser": "firebase-database"
      }
    }
  ]
}
```
