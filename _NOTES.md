# Notes

## Imports

- Ignore Logs during import

## Scripting App Changes

Would like a script that can change various variables throughout the app.

- App Name
- App Colors
- etc...

### `bulkAdd` (importRecords)

- Must loop through records and validate properties
- Build an `Id Replacement` object to store lookups to the new ids
- Must take into account the `reservedIds` list
- Call `bulkAdd` on the validated records
- What do I do with records that failed validation? (ignore them?)
- Failed items can have there `id` reported in a string

```typescript
function test() {
  const failedRecords = [
    'test-123',
    Infinity,
    'abc-123',
    'bad-id-1',
    NaN,
    'not-an-id',
    12345,
    null,
    undefined,
    undefined,
    null,
  ]
  new Error(`The following records could not be imported: ${failedRecords.map(String).join(', ')}`)
}

const replacementIds = {
  'my-old-id': uuid(), // 1
  'another-old-id': uuid(), // 2
  // ...
}

const newId = replacementIds['my-old-id'] // 1
```

### Reserved UIDs

- Create a reserved UID enum that can contain the UIDs used for defaults in the app

```typescript
export enum ReservedId {
  UID_01 = 'uuid-123'
  UID_02 = 'uuid-456'
  // ...
}
```
