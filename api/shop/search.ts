import { searchShop, SearchShopFilter } from '@model/shop/search';
import { ApiHandler } from '@api';
import { HttpStatus } from '@api/http-codes';
import { Shop } from '@model/app';

type ShopSearchHandler = ApiHandler<Shop[], never, SearchShopFilter>;

export const searchShopHandler: ShopSearchHandler = async (req, res) => {
  const filter = {
    name: req.body.name,
  };
  const shops = await searchShop({}, filter);

  res.status(HttpStatus.OK).json(shops);
};
