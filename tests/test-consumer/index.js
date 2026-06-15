import '../../dist/SheetCollection.js';
import assert from 'node:assert/strict';

const db = SheetDB.connect({
  source: 'memory'
});

const users =
  db.collection('users');

users.insert({
  id: '1',
  name: 'Eduardo'
});

users.insert({
  id: '2',
  name: 'Maria'
});

const allReg = users.findAll();
console.log('findAll', allReg)
assert.equal(allReg.length, 2);

const findByID = users.findById('1');
console.log('findByID 1', findByID);
assert.equal(
    findByID.name,
    'Eduardo'
);

users.update(
  '1',
  {
    name: 'Carlos'
  }
);

const update = users.findById('1');
console.log('update 1', update)
assert.equal(
  update.name,
  'Carlos'
);

users.delete('2');
const del = users.findAll();
console.log('delete 2', del);
assert.equal(del.length, 1);

console.log(
  '✓ Distribution test passed'
);