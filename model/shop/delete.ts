import { ObjectId } from 'mongodb';
import { mongo } from '@util/db';

export const deleteShop = async (id: string) => {
  const db = await mongo.ready;
  await db.collection('shops').deleteOne({ _id: new ObjectId(id) });
};
