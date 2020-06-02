import { NextApiHandler } from 'next';
import { Shop } from '@model/app';
import { updateShop } from '@model/shop/update';
import { HttpStatus } from '@api/http-codes';

export const updateShopHandler: NextApiHandler = async (req, res) => {
  await updateShop(req.body as Shop);

  res.status(HttpStatus.OK).end();
};
