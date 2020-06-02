import { Shop } from '@model/app';
import { filterObject } from '@util/filter-object';

export function validateNewData(shop: Shop): Shop | undefined {
  if (!shop.name) throw new Error('shop.name is missing');

  return filterObject(shop, field => !!field) as Shop;
}
