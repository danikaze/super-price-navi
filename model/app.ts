import { ObjectId } from 'mongodb';

export interface DataEntry {
  _id?: string | ObjectId;
  addedOn: number;
  updatedOn?: number;
}

export type QtyUnit = 'gr' | 'rations' | 'ml' | 'units';
export type Url = string;

/** A user (real person using the app) */
export interface User {
  username: string;
  bookmarkedShops: Shop[];
  bookmarkedItems: Item[];
}

/** A group of items created by the user */
export interface Group {
  name: string;
  items: Item[];
}

/** Unique product */
export interface Product {
  barcode: string;
  name: string;
  altNames: string[];
  quantity: string;
  unit: QtyUnit;
  images: Url[];
}

/** Company, if it has several shops */
export interface Company {
  name: string;
}

/** An instance of a physical shop */
export interface Shop extends Partial<DataEntry> {
  name: string;
  company?: Company;
  address?: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  gmaps?: Url;
  photos?: Url[];
}

/** An instance of a product (in a shop) */
export interface Item {
  product: Product;
  shop: Shop;
  price: number;
  currency: string;
}
