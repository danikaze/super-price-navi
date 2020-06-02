import { mongo } from '@util/db';
import { Shop } from '@model/app';
import { validateNewData } from './validation/new';

export const addNewShop = async (shop: Shop): Promise<string> => {
  const shopData = validateNewData(shop);

  const data = {
    ...shopData,
    addedOn: Date.now(),
  };

  const db = await mongo.ready;
  const doc = await db.collection('shops').insertOne(data);

  return doc.insertedId;
};
