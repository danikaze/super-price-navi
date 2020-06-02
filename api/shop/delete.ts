import { ApiHandler } from '@api';
import { deleteShop } from '@model/shop/delete';
import { Shop } from '@model/app';
import { HttpStatus } from '@api/http-codes';

export type DeleteShopHandlerQuery = Required<Pick<Shop, '_id'>>;

export const deleteShopHandler: ApiHandler<
  void,
  DeleteShopHandlerQuery
> = async (req, res) => {
  await deleteShop(req.query._id as string);

  res.status(HttpStatus.OK).end();
};
