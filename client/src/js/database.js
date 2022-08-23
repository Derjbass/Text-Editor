import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (index, content) => {
  //connect to DB
  const jateDatabase = await openDB('jate', 1);
  // set privileges and where to post
  const trans = jateDatabase.transaction('jate', 'readwrite');
  // open the object store
  const objSt = trans.objectStore('jate');
  // put content into database
  const req = objSt.put({id: index, value: content});
  // data submit confirmation
  const res = await req;
  console.log('Data saved to database', res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //connect to DB
  const jateDatabase = await openDB('jate', 1);
  // set privileges and where to post
  const trans = jateDatabase.transaction('jate', 'readwrite');
  // open the object store
  const objSt = trans.objectStore('jate');
  // get all to get data from db
  const req = objSt.getAll();
  // await data
  const res = await req;
  console.log('data received', res);
};

initdb();
