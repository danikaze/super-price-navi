import { ObjectId } from 'mongodb';
import { mongo } from '@util/db';
import { Shop } from '@model/app';
import { isObjectEmpty } from '@util/is-object-empty';

export const updateShop = async (shop: Shop) => {
  const db = await mongo.ready;
  const { _id, ...data } = shop;

  if (!_id) {
    throw new Error('ID required for updating the shop');
  }
  if (isObjectEmpty(data)) return;
  data.updatedOn = Date.now();

  await db
    .collection('shops')
    .updateOne({ _id: new ObjectId(_id) }, { $set: data });
};
