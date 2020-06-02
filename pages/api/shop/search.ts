import { restApiHandler } from '@api';
import { searchShopHandler } from '@api/shop/search';

export default restApiHandler({
  POST: searchShopHandler,
});
