# Notes

## Web App Template Complex Examples

- Have `Examples` reference `Tests` as a way to learn how to manage those types of Records
- Might only need the Id for the Tests as you can use that to get the Parent or Child Records
- Make a relationship between the Child records as well?

```typescript
const exampleParent = {
  id: 'example-parent-123',
  timestamp: 1234567890,
  type: 'example',
  relation: 'parent',
  name: 'Example',
  desc: '',
  enabled: true,
  favorite: false,
  testIds: ['test-parent-123', 'test-parent-456', 'test-parent-789'],
}

const exampleChild = {
  id: 'example-child-456',
  timestamp: 1234567890,
  type: 'example',
  relation: 'child',
  note: '',
  testChildIds: ['test-child-123', 'test-child-456', 'test-child-789'],
}

const testParent = {
  id: 'test-parent-123',
  timestamp: 1234567890,
  type: 'test',
  relation: 'parent',
  name: 'Test',
  desc: '',
  enabled: true,
  favorite: false,
  dataInputs: ['percent', 'testNumber'],
}

const testChild = {
  id: 'test-child-456',
  timestamp: 1234567890,
  type: 'test',
  relation: 'child',
  note: '',
  data: {
    percent: 95,
    testNumber: 42,
  },
}
```

## Id for Records

- Should ALWAYS be a random UID
- Should always be over 8 characters long
- User should NOT have access within the app to change the Id (create/edit)
- Ensures safe usage of Timestamp as compound part of key for Parent Records

## Timstamp for Parents

- This can be used as normal (no need to zero it out)
- Allow user to alter the Timestamp (create/edit)

## Imports

- Ignore Logs during import
- Include Settings during import
- NO Records in current database = `fastRecordImport`
- Records in database = `slowRecordImport`
- Slow version checks fields, perhaps alters Ids/Timestamps during import? (maybe)

## Data Reliability and Validity

`ADD RECORD` - `&[id+timestamp]`

- Look at Record `type` to determine valid fields
- Record must have required fields that pass minimum validity rules (Regex?)
- Record must NOT already exist in the Database
- Auto remediate small issues like undefined notes and descriptions

`UPDATE RECORD` - `&[id+timestamp]`

- Get `original` Record and look at the `type` to determine valid fields
- Ignore fields in `changes` that don't match the Record `type`
- Update `changes` must pass minimum validity rules (Regex?)
- Auto remediate small issues like undefined notes and descriptions

`DELETE RECORD` - `&[id+timestamp]` (Child)

- Warn user they are about to delete a record
- Delete the exact child record

`DELETE RECORD` - `id` (Parent)

- Warn the user they are about to delete a parent record with all associated children records
- Delete the records (Parent and Children)

## Scripting App Changes

Would like a script that can change various variables throughout the app.

- App Name
- App Colors
- etc...
