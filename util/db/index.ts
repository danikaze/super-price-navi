import { MongoClient, Db } from 'mongodb';
import { init } from '@model/setup';

interface DbExport {
  ready: Promise<Db>;
}

if (!MONGO_URL) {
  throw new Error('MONGO_URL is not defined in /secrets.js');
}
if (!MONGO_DB_NAME) {
  throw new Error('MONGO_DB_NAME is not defined in /secrets.js');
}

const client = new MongoClient(MONGO_URL);

export const mongo = {
  ready: (async () => {
    try {
      console.log('Trying to connect to the DB...');
      await client.connect();
      console.log(`Connected to the DB`);
      const db = client.db(MONGO_DB_NAME);
      await init(db);
      return db;
    } catch (err) {
      throw new Error(`Error connecting to the database: ${err}`);
    }
  })(),
} as DbExport;
