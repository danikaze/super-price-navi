import { NextApiHandler } from 'next';
import { readShop } from '@model/shop/read';
import { HttpStatus } from '@api/http-codes';

export const readShopHandler: NextApiHandler = async (req, res) => {
  const shop = await readShop(req.query.id as string);

  if (!shop) {
    res.status(HttpStatus.NOT_FOUND).end();
    return;
  }

  res.status(HttpStatus.OK).json(shop);
};
