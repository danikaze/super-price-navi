import { NextApiHandler } from 'next';
import { addNewShop } from '@model/shop/new';
import { Shop } from '@model/app';
import { HttpStatus } from '@api/http-codes';

export const createShopHandler: NextApiHandler = async (req, res) => {
  const id = await addNewShop(req.body as Shop);

  res.status(HttpStatus.OK).json({ id });
};
