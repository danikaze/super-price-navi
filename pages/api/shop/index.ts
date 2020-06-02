import { restApiHandler } from '@api';
import { createShopHandler } from '@api/shop/create';
import { readShopHandler } from '@api/shop/read';
import { updateShopHandler } from '@api/shop/update';
import { deleteShopHandler } from '@api/shop/delete';

export default restApiHandler({
  POST: createShopHandler,
  GET: readShopHandler,
  PUT: updateShopHandler,
  DELETE: deleteShopHandler,
});
