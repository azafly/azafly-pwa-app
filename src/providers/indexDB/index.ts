import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
   user: `name, age`
});

export default db;