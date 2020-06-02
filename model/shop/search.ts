import { FilterQuery } from 'mongodb';
import { Shop } from '@model/app';
import { mongo } from '@util/db';
import {
  MAX_RESULTS_PER_PAGE_SHOPS,
  RESULTS_PER_PAGE_SHOPS,
  SEARCH_LOCATION_RADIUS_METERS,
} from '@constants/app';

export interface SearchShopOptions {
  offset?: number;
  resultsPerPage?: number;
  orderDirection?: 'asc' | 'desc';
  orderBy?: 'addedOn' | 'editedOn' | 'name';
}

export type SearchShopFilter = Partial<
  Pick<Shop, 'name' | 'latitude' | 'longitude'>
>;

function getPositionFilter(
  latitude: number,
  longitude: number
): FilterQuery<SearchShopFilter>[] {
  // tslint:disable:no-magic-numbers

  // https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
  const latRadius = SEARCH_LOCATION_RADIUS_METERS / 111320;
  const lonRadius =
    (SEARCH_LOCATION_RADIUS_METERS * 360) / (40075 * Math.cos(latitude));

  return [
    {
      latitude: { $gte: latitude - latRadius },
    },
    {
      latitude: { $lte: latitude + latRadius },
    },
    {
      longitude: { $gte: longitude - lonRadius },
    },
    {
      longitude: { $lte: longitude + lonRadius },
    },
  ];
}

export const searchShop = async (
  options?: SearchShopOptions,
  filter?: SearchShopFilter
) => {
  const offset = (options && options.offset) || 0;
  const resultsPerPage = Math.min(
    (options && options.resultsPerPage) || RESULTS_PER_PAGE_SHOPS,
    MAX_RESULTS_PER_PAGE_SHOPS
  );
  const sortDirection = options && options.orderDirection === 'desc' ? -1 : 1;
  const sortBy = (options && options.orderBy) || 'name';
  let fq: FilterQuery<SearchShopFilter> = {};

  if (filter) {
    if (filter.name) {
      fq.$text = {
        $search: filter.name,
      };
    }
    if (filter.latitude && filter.longitude) {
      fq = {
        $and: [fq, ...getPositionFilter(filter.latitude, filter.longitude)],
      };
    }
  }

  const db = await mongo.ready;
  const cursor = db
    .collection('shops')
    .find(fq)
    .sort(sortBy, sortDirection)
    .skip(offset)
    .limit(resultsPerPage);

  const res = [];
  while (await cursor.hasNext()) {
    res.push(await cursor.next());
  }

  return res;
};
