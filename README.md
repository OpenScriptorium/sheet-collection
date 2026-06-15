# Sheet Collection

Typed Collection API for Google Sheets and Google Apps Script.

Transform spreadsheets into collections of typed documents using a simple CRUD API inspired by MongoDB.

---

## Features

* Typed collections with TypeScript generics
* Google Sheets as a document database
* In-memory driver for testing
* Automatic sheet creation
* CRUD operations
* Driver-based architecture
* Google Apps Script compatible
* Zero external dependencies at runtime

---

## Installation

### Google Apps Script

Import the generated bundle into your Apps Script project.

After deployment, the library exposes:

```javascript
SheetDB
connect
```

---

## Quick Start

### Connect to Active Spreadsheet

```javascript
const db = SheetCollection.SheetDB.connect({
  source: "google"
});
```

### Connect to Specific Spreadsheet

```javascript
const db = SheetCollection.SheetDB.connect({
  source: "google",
  properties: {
    spreadsheetId: "YOUR_SPREADSHEET_ID"
  }
});
```

---

## Creating a Collection

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const users =
  db.collection<User>("users");
```

If the sheet does not exist, it will be created automatically.

---

## Insert Documents

```typescript
users.insert({
  id: 1,
  name: "Eduardo",
  email: "eduardo@email.com"
});
```

The first insertion automatically generates the header row.

Result:

| id | name    | email                                         |
| -- | ------- | --------------------------------------------- |
| 1  | Eduardo | [eduardo@email.com](mailto:eduardo@email.com) |

---

## Find All Documents

```typescript
const documents =
  users.findAll();

Logger.log(
  JSON.stringify(documents)
);
```

Output:

```json
[
  {
    "id": 1,
    "name": "Eduardo",
    "email": "eduardo@email.com"
  }
]
```

---

## Find By Id

```typescript
const user =
  users.findById(1);
```

Output:

```json
{
  "id": 1,
  "name": "Eduardo",
  "email": "eduardo@email.com"
}
```

---

## Update Document

```typescript
users.update(
  1,
  {
    name: "Teste"
  }
);
```

---

## Delete Document

```typescript
users.delete(1);
```

---

# Drivers

The library uses a driver-based architecture.

## Google Driver

Uses Google Sheets as the storage engine.

```typescript
const db = SheetCollection.SheetDB.connect({
  source: "google"
});
```

or

```typescript
const db = SheetCollection.SheetDB.connect({
  source: "google",
  properties: {
    spreadsheetId: "abc123"
  }
});
```

---

## Memory Driver

Useful for tests and local development.

```typescript
const db = SheetCollection.SheetDB.connect({
  source: "memory"
});
```

Example:

```typescript
const users =
  db.collection<User>("users");

users.insert({
  id: 1,
  name: "Test User"
});

Logger.log(
  JSON.stringify(users.findAll())
);
```

---

# Architecture

```text
┌─────────────┐
│   SheetDB   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Collection  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│SheetAdapter │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ SheetSource │
└──────┬──────┘
       │
 ┌─────┴─────┐
 ▼           ▼
Google     Memory
```

---

## Core Components

### SheetDB

Main entry point of the library.

Responsible for:

* Creating connections
* Managing collections
* Accessing sources

### Collection<T>

Typed collection abstraction.

Provides:

* insert()
* findAll()
* findById()
* update()
* delete()

### SheetAdapter

Responsible for translating between:

```text
Spreadsheet Rows
       ↕
TypeScript Objects
```

### RowMapper

Converts:

```typescript
["id", "name"]
[1, "John"]
```

into:

```typescript
{
  id: 1,
  name: "John"
}
```

and vice versa.

---

# Extending the Library

To create a new storage provider:

### Create a SourceDriver

```typescript
export interface SourceDriver {

  getSheet(
    name: string
  ): SheetSource;

  getOrCreateSheet(
    name: string
  ): SheetSource;

}
```

### Create a SheetSource

```typescript
export interface SheetSource {

  getValues(): unknown[][];

  appendRow(
    values: unknown[]
  ): void;

  setValues(
    values: unknown[][]
  ): void;

}
```

### Register the Driver

```typescript
private readonly DRIVERS = {
  google: GASSourceDriver,
  memory: MemorySourceDriver,
  myDriver: MySourceDriver
};
```

---

# Development

## Build

```bash
npm run build
```

## Run Tests

```bash
npm test
```

## Validate Distribution

```bash
npm run verify
```

## Push to Apps Script

```bash
npm run push
```

---

# Roadmap

* Custom primary keys
* Query filters
* Sorting
* Pagination
* Transactions
* Batch operations
* Driver registration API
* Schema validation
* Indexes
* Collection hooks