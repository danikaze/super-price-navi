import { Db } from 'mongodb';

export async function init(db: Db): Promise<void> {
  console.log('Initializing Db model...');
  await db.collection('shops').createIndex({
    name: 'text',
    'company.name': 'text',
  });
  console.log('Db model ready');
}
