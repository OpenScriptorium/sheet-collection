import { it, expect, describe } from 'vitest';
import { User } from "../fixtures/users.fixture";
import { createMemoryDatabase } from "../helpers/createMemoryDatabase";

describe('Collection', () => {
  it('should insert a document', () => {

    const db = createMemoryDatabase();

    const users =
      db.collection<User>('users');

    users.insert({
      id: '1',
      name: 'Eduardo'
    });

    expect(
      users.findAll()
    ).toEqual([
      {
        id: '1',
        name: 'Eduardo'
      }
    ]);

  });

  it('should generate id automatically when missing', () => {
    interface NumericUser {
      id: number;
      name: string;
    }

    const db = createMemoryDatabase();
    const users =
      db.collection<NumericUser>('users');

    users.insert({
      name: 'Maria'
    });

    expect(
      users.findAll()
    ).toEqual([
      {
        id: 1,
        name: 'Maria'
      }
    ]);
  });

  it('should generate unique ids for consecutive inserts', () => {
    interface NumericUser {
      id: number;
      name: string;
    }

    const db = createMemoryDatabase();
    const users =
      db.collection<NumericUser>('users');

    users.insert({
      name: 'Maria'
    });

    users.insert({
      name: 'Ana'
    });

    expect(
      users.findAll()
    ).toEqual([
      {
        id: 1,
        name: 'Maria'
      },
      {
        id: 2,
        name: 'Ana'
      }
    ]);
  });

  it('should preserve manual id when provided', () => {
    const db = createMemoryDatabase();
    const users =
      db.collection<User>('users');

    users.insert({
      id: '10',
      name: 'Maria'
    });

    expect(
      users.findAll()
    ).toEqual([
      {
        id: '10',
        name: 'Maria'
      }
    ]);
  });

  it('should find by id', () => {
    const db = createMemoryDatabase();

    const users =
      db.collection<User>('users');

    users.insert({
      id: '1',
      name: 'Eduardo'
    });

    expect(
      users.findById('1')
    ).toEqual({
      id: '1',
      name: 'Eduardo'
    });

  });

  it('should update document', () => {

    const db = createMemoryDatabase();

    const users =
      db.collection<User>('users');

    users.insert({
      id: '1',
      name: 'Eduardo'
    });

    users.update(
      '1',
      {
        name: 'Carlos'
      }
    );

    expect(
      users.findById('1')
    ).toEqual({
      id: '1',
      name: 'Carlos'
    });

  });

  it('should delete document', () => {

    const db = createMemoryDatabase();

    const users =
      db.collection<User>('users');

    users.insert({
      id: '1',
      name: 'Eduardo'
    });

    users.delete('1');

    expect(
      users.findAll()
    ).toHaveLength(0);

  });
});