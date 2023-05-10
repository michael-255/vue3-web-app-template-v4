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

---

# Lunch Ideas

## Validating Data with `yup`

### DataSchema Validator

- Add the type Validator to `dataSchema`

```typescript
const dataSchema = {
  {
    validator: logValidator
  }
}
```

### `add`

- Must validate record properties and ignore unknown ones
- Failure should produce an `Error` and stop operation

### `update`

- Must validate the `changes` properties
- Failure should produce an `Error` and stop operation

### `bulkAdd` (importRecords)

- Must loop through records and validate properties
- Build an `Id Replacement` object to store lookups to the new ids
- Must take into account the `reservedIds` list
- Call `bulkAdd` on the validated records
- What do I do with records that failed validation? (ignore them?)
- Failed items can have there `id` reported in a string

```typescript
async function importRecords(backupData: BackupData) {
  // Check that its from this app (appName)
  const AppName = 'My App'
  if (backupData.appName !== AppName) {
    return new Error(`Can only import data from app ${AppName} (recieved ${backupData.appName})`)
  }
  // Run 'yup' validation on Settings
  // - Only 'keep' settings that are valid for importing
  // Run 'yup' validation on Records
  // - Translate ids that fail validation to new UIDs
  // Complete the import
}

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

## Code Improvements

- Move some of the confusing `ParentInfoCard` logic to a composable with good error messages
