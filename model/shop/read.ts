import { ObjectId } from 'mongodb';
import { mongo } from '@util/db';

export const readShop = async (id: string) => {
  const db = await mongo.ready;
  const doc = await db.collection('shops').findOne({ _id: new ObjectId(id) });

  return doc;
};
