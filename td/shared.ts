/*
 * Global types
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
/* | 'CONNECT' | 'OPTIONS' | 'TRACE' */

export interface ScalarKeyValue {
  [key: string]: number | string;
}
